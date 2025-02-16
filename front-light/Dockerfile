# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build project
RUN npm run build

# Install `serve` to host the built project
RUN npm install -g serve

# Run the server on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
