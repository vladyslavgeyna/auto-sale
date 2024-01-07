FROM node:20.10-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.10-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package*.json ./

RUN npm install --production

EXPOSE 5000

CMD ["npm", "start"]
