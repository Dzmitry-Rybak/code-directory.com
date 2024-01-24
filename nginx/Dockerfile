FROM nginx:1.15-alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/* 

# OpenSSL
RUN apk --no-cache add openssl

COPY ./nginx.conf /etc/nginx/

# Expose the listening port
EXPOSE 80
EXPOSE 443

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]