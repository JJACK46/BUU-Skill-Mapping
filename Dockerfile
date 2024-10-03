# Use bun image as base
# FROM oven/bun:latest
FROM node:lts

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY bun.lockb ./
COPY package.json ./

# Install dependencies
# RUN bun install
# RUN bun i -g @quasar/cli
RUN npm install
RUN npm i -g @quasar/cli

# Copy the entire project to the container
COPY . .

# Build the Quasar project
# RUN bunx quasar build
RUN npx quasar build

# Expose the port that the Quasar app will run on
EXPOSE 8080

# production stage
# FROM nginx:latest as production-stage
# COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
# EXPOSE 80
CMD ["quasar", "serve", "./dist/spa"]
