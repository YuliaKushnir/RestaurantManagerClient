FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /dist/restaurant-manager-client /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]