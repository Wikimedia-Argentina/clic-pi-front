This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Create your environment file

```bash
cp .env.local.example .env.local
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploy on Docker

```sh
# FIRST CREATE THE .env.docker and .env FILE (an examples are available at .env.docker.example and .env.example)

# Create the network using the needed driver and set up in .env file
docker network create corvus-network

# THEN start APP container
TAG=[x.x.x] docker compose -f compose.yml -f compose.prod.yml up -d app
```

## Building LOCAL and DEPLOY

### On local machine

```sh
#!bash
export DOCKER_BUILDKIT=1

export COMPOSE_DOCKER_CLI_BUILD=1

## Tag, build and start containers.
DOCKER_DEFAULT_PLATFORM=linux/amd64 TAG=[API-VERSION] docker compose -f compose.yml -f compose.prod.yml build

## Push image
docker push registry.khem.io/khemlabs/corvus-frontend:[API-VERSION]
```

### On the server

```sh
#!bash

## Pull image
docker pull registry.khem.io/khemlabs/corvus-frontend:[API-VERSION]

## Run
TAG=[API-VERSION] docker compose -f compose.yml -f compose.prod.yml up -d
```
