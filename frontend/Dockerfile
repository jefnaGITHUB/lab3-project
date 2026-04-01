FROM node:20

RUN npm install -g pnpm serve

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

RUN pnpm run build

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
