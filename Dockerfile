FROM node:18

WORKDIR /apps

COPY . /apps

RUN npm install -g npm@latest && npm cache clean -f && npm i --legacy-peer-deps && npm run build

COPY . /apps

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--port", "5173", "--host"]