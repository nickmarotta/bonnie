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

# ==========================
# == Chub deployment help ==
# ==========================

# task cloudformationPackage {
#     description 'cloudformation package'
#     group 'deployment'
#     doLast {
#         exec {
#             commandLine 'bash', '-c',
#                 """
#                 aws cloudformation package \
#                     --template-file cloudformation/master.yaml \
#                     --output-template-file build/cfn/packaged-stack.yaml \
#                     --s3-bucket <redacted> \
#                     --s3-prefix ${app}/${project.deployVersion}/cloudformation
#                 """
#         }
#     }
# }

# task cloudformationDeploy {
#     description 'cloudformation deploy'
#     group 'deployment'
#     doLast {
#         exec {
#             commandLine 'bash', '-c',
#                 """
#                 aws cloudformation deploy \
#                   --template-file build/cfn/packaged-stack.yaml \
#                   --stack-name chip-${project.env}-${app} \
#                   --no-fail-on-empty-changeset \
#                   --parameter-overrides \
#                         Team=chip \
#                         Version=${project.deployVersion} \
#                         Environment=${project.env} \
#                         App=${app} \
#                         ImageName=${project.properties['ecrRepoLocation']}${project.deployVersion} \
#                         \$(cat cloudformation/overrides/${project.env}.properties) \
#                   --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND
#                 """
#         }
#     }
# }

# task pushDockerImage {
#     description 'push docker image to ECR'
#     group 'deployment'
#     doLast {
#         exec {
#             commandLine 'bash', '-c',
#             """
#             \$(aws ecr get-login --region us-east-1 --no-include-email --profile <redacted_aws_username>)
#             docker build --force-rm=true --tag=${project.properties['ecrRepoLocation']}${project.deployVersion} .
#             docker push ${project.properties['ecrRepoLocation']}${project.deployVersion}
#             """
#         }
#     }
# }
