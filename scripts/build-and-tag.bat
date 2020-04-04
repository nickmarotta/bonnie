rmdir /Q /S ".\node_modules"
docker build -t bonnie . 
docker tag bonnie:latest 799654022176.dkr.ecr.us-east-2.amazonaws.com/bonnie:latest
docker push 799654022176.dkr.ecr.us-east-2.amazonaws.com/bonnie:latest