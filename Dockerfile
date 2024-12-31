FROM node:21.7.3 as build
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install --legacy-peer-deps

# install app dependencies
# COPY package.json ./
# COPY *.js ./
# COPY *.ts ./
# COPY ./*.json ./
# COPY ./src ./

COPY . .


RUN npm install

FROM build as web-app

RUN  npm run build

ENTRYPOINT [ "npm", "run", "start"]
