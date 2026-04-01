FROM node:20
 
RUN npm install pnpm

WORKDIR /app
 
COPY package*.json ./

RUN pnpm install
 
COPY . .

RUN pnpm run build
 
EXPOSE 5000
 
CMD ["node", "index.js"]