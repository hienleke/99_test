FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# Default: use nodemon for development
CMD ["npm", "run", "dev:problem5"] 