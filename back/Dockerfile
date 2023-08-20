FROM node:18.17

WORKDIR /app

RUN npm install -g pnpm
COPY . .
RUN pnpm install

EXPOSE 3001
CMD ["pnpm", "run", "start"]
