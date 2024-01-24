# Use the official Node.js image
FROM node:alpine

# Create the application directory in the image
WORKDIR /app

EXPOSE 3000

# Copy package.json and package-lock.json into the application directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files
COPY . .

# Build the Next.js application
RUN npm run build

# Command to run the application on container startup
CMD ["npm", "run", "start"]