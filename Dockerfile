FROM oven/bun:1 AS build

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Set build arguments for public environment variables
ARG PUBLIC_APPWRITE_ENDPOINT
ARG PUBLIC_APPWRITE_PROJECT_ID

# Export them as environment variables for the build
ENV PUBLIC_APPWRITE_ENDPOINT=$PUBLIC_APPWRITE_ENDPOINT
ENV PUBLIC_APPWRITE_PROJECT_ID=$PUBLIC_APPWRITE_PROJECT_ID
ENV NODE_ENV=production

# Build the app
RUN bun run build

FROM oven/bun:1 AS runtime

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install only production dependencies
RUN bun install --frozen-lockfile --production

# Copy built app from build stage
COPY --from=build /app/build ./build
COPY --from=build /app/static ./static

# Expose port
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Start the application
CMD ["bun", "run", "start"] 