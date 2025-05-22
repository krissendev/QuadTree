FROM node:18-alpine
WORKDIR /app
# Install nginx, supervisor, and tini
RUN apk add --no-cache nginx supervisor tini
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
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY supervisord.conf /etc/supervisord.conf
EXPOSE 8080 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]