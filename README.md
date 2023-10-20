# Auth Dashboard

Link [Demo](https://demo.draweditor.com)

## Application

- server

  - nestjs
  - prisma - postgres

- client
  - vite & react & react-router-dom & material-ui

## Prerequisites

To run this project, you need:

- Node.js 18.17.0 or higher

- PNPM 8.9 or higher

- Postgres

- Kubernetes cluster such as Microk8s, Minikube, Kind, etc (For deploy)

## Installation:

To install the dependencies, run:

`pnpm install`

To build the project, run:

`pnpm build`

## Usage

To start the frontend app, run:

`pnpm client dev`

To start the backend app, run:

`pnpm svr dev`

To deploy the apps to Kubernetes using Helm, run:

`kubectl create namespace demo`

`helm install release-name infra/helms`

Clone values file `infra/helms/values.yaml` to `infra/helms/values.prod.yaml` make change envs and apply your change with command:

`helm upgrade release-name infra/helms -f infra/helms/values.prod.yaml`

## TODO

- [ ] Refactor Dockerfile for optimize build images process
- [ ] Create hash service in common module
