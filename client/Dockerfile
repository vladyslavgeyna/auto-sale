FROM node:20.10-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.10-alpine

WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY package*.json ./

RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
