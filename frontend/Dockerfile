FROM node:20

RUN npm install pnpm serve
 
WORKDIR /app
 
COPY package*.json ./

RUN pnpm install
 
COPY . .

RUN pnpm run build
 
EXPOSE 3000
 
CMD ["serve", "-s", "build", "-l", "3000"]