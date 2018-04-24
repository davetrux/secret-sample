#!/usr/bin/env bash

if [ -z ${BUILD_NUMBER+x} ];
	then 
		export BUILD_NUMBER=999
fi

echo
echo  "DOCKER:  *** Stopping containers ***"
echo 
docker-compose down

echo
echo "DOCKER:  *** Removing images ***"
docker rmi $(docker images | awk '$1 ~ /^sample/ { print $3 }')


echo
echo "DOCKER:  *** Creating and starting new containers ***"
docker-compose up -d