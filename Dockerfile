FROM nickmarotta/ubuntu-node:latest 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install    
EXPOSE 1800
CMD [ "node", "src/express-server.js" ]


#Connect to docker container from windows by using 192.168.99.100 instead of localhost

#Build Command
#docker build -t bonnie .

#Run Command 
#docker run -p 1800:1800 bonnie 

#Enter Container 
#docker exec -it $1 /bin/sh

# Get Auth Command 
# aws ecr get-login --no-include-email --region us-east-2

# Force New Deployment 
#   - this sort of works but the task needed to be stopped first, which i did in the console. 
#  aws ecs update-service --force-new-deployment --service bonnie-service --region us-east-2 --cluster bonnie-cluster