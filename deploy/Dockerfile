# ---- Build stage: compile the Angular application ----
FROM node:26-alpine AS build

WORKDIR /app

# Install all dependencies; the Angular CLI and its builder are devDependencies,
# so --omit=dev would leave nothing to build with.
COPY package.json package-lock.json ./
RUN npm ci

# Compile the application. The production configuration fingerprints every asset
# filename, which is what lets nginx serve them as immutable below.
COPY angular.json tsconfig.json tsconfig.app.json ./
COPY src ./src
RUN npm run build:production

# ---- Runtime stage: nginx serving the static bundle ----
FROM nginx:1.31-alpine AS runtime

# The stock server block does not know about the single-page fallback, so it is
# replaced rather than added to.
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx.conf /etc/nginx/conf.d/planechase.conf

# The application builder writes the browser bundle to dist/browser.
COPY --from=build /app/dist/browser /app

# Nothing is published to the host; the reverse proxy reaches this over the
# shared "edge" network as http://planechase:80.
EXPOSE 80
