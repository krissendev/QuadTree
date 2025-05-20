FROM node:18-alpine AS node-builder

WORKDIR /app

# Install dependencies and build app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# -------------------------------------------

# Final stage
FROM alpine:3.14

# Install nginx, nodejs (runtime only), supervisord, and tini
RUN apk add --no-cache nginx supervisor tini


# Create necessary directories
RUN mkdir -p /var/log/supervisor /run/nginx

# Copy built Node.js app
COPY --from=node-builder /app /app

# Copy Node.js binary and lib from builder stage
COPY --from=node-builder /usr/local/bin/node /usr/local/bin/node
COPY --from=node-builder /usr/local/lib/node_modules /usr/local/lib/node_modules
ENV PATH="/usr/local/lib/node_modules/npm/bin:${PATH}"

# Copy Nginx config
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy supervisor config
COPY supervisord.conf /etc/supervisord.conf

# Expose ports (Nginx frontend and Node.js backend)
EXPOSE 8080 3000

# Use Tini as the init system to prevent nginx from crashing on gcloud
# https://medium.com/google-cloud/cloud-run-multiple-processes-4b6f1b3827e
# https://computingforgeeks.com/use-tini-init-system-in-docker-containers/
ENTRYPOINT ["/sbin/tini", "--"]

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]