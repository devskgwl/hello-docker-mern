# Step 1: Use an official lightweight Node.js runtime as a parent image
FROM node:20-alpine

# Step 2: Set the working directory inside the container runtime environment
WORKDIR /app

# Step 3: Copy manifests first to leverage Docker layer caching architecture
COPY package*.json ./

# Step 4: Install production dependencies strictly
RUN npm install

# Step 5: Copy the remaining source infrastructure into the image context
COPY . .

# Step 6: Expose the network socket port matching our Express configuration
EXPOSE 5000

# Step 7: Define the execution runtime command
CMD ["npm", "start"]