This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Start [here](https://github.com/ppalms/ok-wildscapes-api) to deploy the backend stack.
- Open the AWS AppSync console and copy the API ID for **ok-wildscapes-api**.
- Replace the `appId` property in **.graphqlconfig.yml** with your API ID.
- Rename **.env.local.emample** to **.env.local** and replace the environment variables with values from the AWS console

### API Schema Updates

Run `yarn codegen` to get the latest version of your AppSync API schema and re-generate models and resolvers.

### Next.js

Run `yarn dev` to start the development server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing a page by modifying `[path]/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

To initialize Amplify Codegen in a new project: `npx @aws-amplify/cli codegen add --apiId AppSyncAPIID --region us-east-1`
