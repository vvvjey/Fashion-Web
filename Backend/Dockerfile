FROM node:18-alpine

WORKDIR /hoangtu1289/backend

COPY package*.json ./


RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN npm run build-src

CMD ["npm","run","build"]
# CMD ["npm","start"]
