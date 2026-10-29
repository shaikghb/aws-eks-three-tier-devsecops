FROM node:22-alpine AS dependencies
WORKDIR /srv/app
COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund
FROM node:22-alpine AS runtime
ENV NODE_ENV=production PORT=3000
WORKDIR /srv/app
RUN addgroup -S app && adduser -S -G app app
COPY --from=dependencies --chown=app:app /srv/app/node_modules ./node_modules
COPY --chown=app:app src ./src
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "src/server.js"]
