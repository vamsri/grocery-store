# Use the official Node.js image.
FROM node:14

# Set working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available).
COPY package*.json ./

# Copy the .npmrc file to the working directory.
COPY .npmrc ./

# Install app dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the app.
RUN npm run build

# Install serve to serve the app.
RUN npm install -g serve

# Start the app.
CMD [ "serve", "-s", "build" ]

# Bind the app to port 3000.
EXPOSE 3000
