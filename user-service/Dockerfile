FROM node:12.13-alpine As development

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.13-alpine as production

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /user/src/app/dist ./dist

CMD ["node", "dist/main"]