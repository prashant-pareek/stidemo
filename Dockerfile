FROM alpine:3.10
RUN apk update
RUN apk add nginx
RUN mkdir -p /run/nginx
RUN mkdir -p /var/www/html
COPY ${pwd}/build/ /var/www/html
COPY ${pwd}/nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
