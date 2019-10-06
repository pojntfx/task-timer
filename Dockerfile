# Setup env
FROM node:10-buster-slim AS build
RUN mkdir -p /app
WORKDIR /app

# Setup app
COPY package.json .
COPY package-lock.json .
RUN npm install

# Add app
COPY src src

# Compile app
RUN npm run build

# Setup env
FROM debian:10-slim

# Add app
COPY --from=build /app/dist/app app

# Run app
CMD ["./app"]