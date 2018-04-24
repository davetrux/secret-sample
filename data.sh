#!/usr/bin/env bash

ADMIN_USER="admin"
ADMIN_PASS="$(credstash get sample-db-admin)"
APP_USER="service"
APP_PASS="$(credstash get sample-db-user)"

FOUND=0
docker exec sample-db ls /data/db/.mongodb_password_set || FOUND=$?

echo ""
echo "Previous DB setup file found: ${FOUND}"
echo ""

if [ "$FOUND" -ne "0" ]; then

	echo ""
	echo 'DATABASE:  *** Creating Admin User ***'
	echo ""
	sleep 1

	docker exec sample-db mongo admin --eval "db.createUser({user: '${ADMIN_USER}', pwd: '${ADMIN_PASS}', roles:[{role:'root',db:'admin'}]});"

	echo ""
	echo 'DATABASE:  *** Creating App User ***'
	echo ""
		
	sleep 2

	docker exec sample-db mongo sample -u $ADMIN_USER -p $ADMIN_PASS --authenticationDatabase admin --eval "db.createUser({user: '${APP_USER}', pwd: '${APP_PASS}', roles:[{role:'dbOwner', db:'sample'}]});"

	docker exec sample-db touch /data/db/.mongodb_password_set

	sleep 1
	
	docker restart sample-service
fi

if [ "$FOUND" -ne "0" -o "$BUILD_TYPE" = "Reset" ]; then
	echo ""
	echo 'DATABASE:  *** Loading or Restoring Initial Data ***'
	echo ""
	
	docker exec sample-db mongo sample -u $APP_USER -p $APP_PASS --authenticationDatabase sample /data/setup.js
fi

echo ""
echo "DATABASE:  *** Database Setup Complete ***"
echo ""
