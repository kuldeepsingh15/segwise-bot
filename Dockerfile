FROM node:alpine

# Change the working directory back to project's root directory
RUN mkdir /var/server/ 

#Change the working directpry to /var/app
WORKDIR /var/server

RUN yarn && \
    yarn add axios@1.1.3 && \
    wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && \
    node-prune

COPY ./ ./
EXPOSE 5000
# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "node", "./server.js" ]