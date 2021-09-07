FROM node:lts as build
WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json .

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]