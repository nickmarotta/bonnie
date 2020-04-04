FROM ubuntu
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash \
    && apt-get install nodejs -yq
RUN npm install    
EXPOSE 1800
CMD [ "node", "express-server.js" ]


#Connect to docker container from windows by using 192.168.99.100 instead of localhost

#Build Command
#docker build -t bonnie .

#Run Command 
#docker run -p 1800:1800 bonnie 

#Enter Container 
#docker exec -it $1 /bin/sh