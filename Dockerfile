# docker build -t quadtree .
# docker run -e PORT=PORTNUMBER -p PORTNUMBER:PORTNUMBER quadtree
# docker run -p 8080:3000 quadtree

FROM node:18-alpine
WORKDIR /app
# Install nginx, supervisor, tini and netcat-openbsd (for nc port listening with awaitnode.sh)
RUN apk add --no-cache nginx supervisor tini gettext netcat-openbsd
# Create necessary directories
RUN mkdir -p /var/log/supervisor /run/nginx /usr/share/nginx/html
# Create error page
RUN echo "<html><body><h1>Server Error</h1></body></html>" > /usr/share/nginx/html/50x.html
# Install app dependencies
COPY package*.json ./
RUN npm install
# Copy app files
COPY . .
# Copy Nginx and Supervisor configs
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY supervisord.conf /etc/supervisord.conf
RUN chmod -R 777 /app/static
# Bashscript forcing nginx to wait for node to fix coldstart issues on cloud
COPY ./nginx/awaitnode.sh /etc/nginx/awaitnode.sh
RUN chmod +x /etc/nginx/awaitnode.sh
EXPOSE 8080 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]