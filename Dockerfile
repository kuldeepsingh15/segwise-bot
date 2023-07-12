FROM alpine
RUN apk add --update nodejs npm && \
    mkdir /var/server && \
    mkdir /var/server/node_modules
WORKDIR /var/server
COPY package*.json ./
RUN npm ci  
COPY ./ ./
EXPOSE 5000
CMD ["node","./server.js"]
