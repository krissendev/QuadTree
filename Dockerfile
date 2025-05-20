FROM node:18-alpine AS node-builder

WORKDIR /app

# Install dependencies and build app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# -------------------------------------------

FROM alpine:3.14

# Install nginx, nodejs (runtime only), and supervisord
RUN apk add --no-cache nginx supervisor


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

# Run both processes under supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]