#! /bin/sh

REGISTRY=demo.registry.io
GCLOUD_REGISTRY=australia-southeast1-docker.pkg.dev/booking-system-386813/staging

docker build --platform linux/amd64 --build-arg GIT_COMMIT=$(git rev-parse HEAD) -t $REGISTRY/server -f infra/docker/Dockerfile.server .
docker build --platform linux/amd64 --build-arg GIT_COMMIT=$(git rev-parse HEAD) -t $REGISTRY/client -f infra/docker/Dockerfile.client .

docker tag $REGISTRY/server $GCLOUD_REGISTRY/server
docker tag $REGISTRY/client $GCLOUD_REGISTRY/client

docker push $GCLOUD_REGISTRY/server
docker push $GCLOUD_REGISTRY/client
