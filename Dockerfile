FROM node
WORKDIR /usr/src/simpleChat
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]