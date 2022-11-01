---
title: Amplify Hosting NextJS Static Web
description: Use Amplify To Host a Static Web
author: haimtran
publishedDate: 09/06/2022
date: 2022-09-06
---

## Introduction

[Github]() shows two ways to host a static with Amplify

- From aws console - cloudfront enabled
- From amplify cli - only S3
- Amplify connect GitHub to create a pipeline (CloudFront distribution)

<LinkedImage
  href="https://youtu.be/pKiPciFBrhk"
  height={400}
  alt="Amplify Hosting NextJS Static Web"
  src="/thumbnail/amplify-hosting-static.png"
/>

## From AWS Console

Connect GitHub repository with Amplify to create a CI/CI pipeline. Goto amplify console and connect to the GitHub repository, then deploy, please pay attention to the build.yaml. Here, add force because not very clean dependencies in package.json. Cache option can saves time when re-build and re-deploy.

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --force
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: out
    files:
      - "**/*"
  cache:
    paths:
```

## From Amplify CLI

Amplify cli offer many deployment option, here only try manual deploy with S3 hosting. The reasons is short time deployment and save cost as no cloudfront. it is noted that we need to indicate [SSG](https://docs.aws.amazon.com/amplify/latest/userguide/server-side-rendering-amplify.html) in package.json. This helep Amplify detect that this is a pure static web not the hybrid (SSR)

```bash
amplify init
```

add hosting and select manual deployment

```bash
amplfy add hosting
```

check the package.json

```json
next build && next export
```

delete the amplify project

```bash
amplfy delete
```

## Troubleshooting

next.config.json

```tsx
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
```

## Create NextJS Project

It is possible to clone an existing NextJS project or create a new one

```bash
npx create-next-app@latest my-site --typescript
```

double check the package.json and next.config.json to avoid npm build error

```json
"scripts": {
  "build": "next build && next export"
}
```
