# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json vite.config.ts ./
COPY src ./src
COPY ui ./ui
RUN npm run build

# --- runtime stage ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/dist-ui ./dist-ui
COPY manifest.json ./
# Render (and most hosts) inject PORT; the server reads process.env.PORT.
EXPOSE 8787
CMD ["node", "dist/http.js"]
