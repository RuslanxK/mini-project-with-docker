FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci 

EXPOSE 5173

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]

