FROM nginx:mainline-alpine

COPY ./nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf

COPY /dist/browser /app
