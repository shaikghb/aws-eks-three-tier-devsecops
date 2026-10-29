FROM node:22-alpine AS build
WORKDIR /workspace
COPY package*.json ./
RUN npm install --no-audit --no-fund
COPY index.html ./
COPY src ./src
ARG VITE_API_BASE_URL=http://localhost:3000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build
FROM nginxinc/nginx-unprivileged:stable-alpine AS runtime
COPY --from=build /workspace/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8080/health || exit 1
