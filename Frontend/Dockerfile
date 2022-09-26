FROM node:alpine
WORKDIR "/Frontend/usr/src/app"
COPY package.json ./
RUN npm install --save --legacy-peer-deps
COPY ./ ./
CMD ["npm","run","start"]