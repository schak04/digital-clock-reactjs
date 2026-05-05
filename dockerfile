FROM node:22 as builder
WORKDIR /
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder /dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]