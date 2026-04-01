FROM node:20

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 5000

CMD ["node", "src/index.js"]
