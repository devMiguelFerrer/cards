FROM node:12.13-alpine As development

WORKDIR /ownerstatistics/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.13-alpine as production

WORKDIR /ownerstatistics/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /ownerstatistics/src/app/dist ./dist

CMD ["node", "dist/main"]