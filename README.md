# bonnie

This is a discord bot that accepts requests and runs action against the 
Poor Diplomacy Discord Server. 

## Usage 
Build the docker app with:
```shell
docker build -t bonnie .
```

Run the app in a container with 
```shell
docker run bonnie
```

In order for the app to function, it needs to have a `src/config.json` file populated with the build. This file won't be stored in source control. 

## Deploy 

// Google didn't really work out. MOving to Vultr hosting and doing it myself. Going to host the images docker hub /shrug. 

Prep for deploy with this: 
```sh
docker build -t nickmarotta/bonnie .
```
!!! YOU NEED TO DELETE THE NODE MODULES DIRECTORY BEFORE YOU BUILD!! OTHERWISE THE APP DOESNT WORK!!!


Push the image with 
```shell
docker push nickmarotta/bonnie:tagname
```

Login to the hosted server and start pull the fresh container with 
```sh
docker pull nickmarotta/bonnie
```

Start the container on the server with 
```sh
docker run -d -p 1800:1800 nickmarotta/bonnie
```


// ********************
// ********************

Configure gcloud docker 
```sh
gcloud auth configure-docker
```

Tag the built image to prep for gcloud container repository push
```sh
docker tag bonnie gcr.io/<google-project-id>/bonnie
```

Push the image 
```sh
docker push gcr.io/<google-project-id>/bonnie
```

Cleanup step? https://cloud.google.com/container-registry/docs/quickstart
```sh
gcloud container images delete gcr.io/PROJECT_ID/quickstart-image:tag1 --force-delete-tags
```

// Below is probably outdated 
Tag the built image to prep for gcloud container repository push
```shell
docker tag bonnie gcr.io/<google-project-id>/bonnie
```

Push the image to gcr 
```shell
gcloud docker push gcr.io/phrasal-acolyte-295422/bonnie
```
