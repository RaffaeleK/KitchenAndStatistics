FROM node:18-alpine3.18 as build
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./ .
RUN npm install
RUN npm run build

# stage 2
FROM nginx:alpine
COPY --from=build /opt/app/dist/kitchen-and-statistics/browser /usr/share/nginx/html
COPY ./nginx-custom.conf  /etc/nginx/conf.d/default.conf
CMD exec nginx -g 'daemon off;'