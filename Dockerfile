FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
# COPY --from=build /app/dist/restaurant-manager-client/browser/. /usr/share/nginx/html
COPY --from=build /opt/render/project/src/dist/restaurant-manager-client/browser/. /usr/share/nginx/html
# RUN mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html
RUN mv /opt/render/project/src/dist/restaurant-manager-client/browser/index.csr.html /opt/render/project/src/dist/restaurant-manager-client/browser/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]