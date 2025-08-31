# OK Wildscapes - GitHub Copilot Instructions

OK Wildscapes is a Next.js 14 TypeScript application for a landscaping business that specializes in native plant gardens. The application has public marketing pages and an authenticated backoffice for managing consultations, plant sheets, and business operations.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Setup

- **CRITICAL**: Copy environment file: `cp .env.local.example .env.local`
- Edit `.env.local` with actual AWS Amplify values (API URL, keys, pools, region)
- Install dependencies: `yarn install --frozen-lockfile` -- takes 11-55 seconds (varies by cache). NEVER CANCEL. Set timeout to 120+ seconds.

### Build and Development

- **Build**: `yarn build` -- takes 38 seconds normally. NEVER CANCEL. Set timeout to 120+ seconds.
  - **NETWORK LIMITATION**: Build may fail with Google Fonts fetch error in restricted environments
  - **WORKAROUND**: Temporarily comment out Google Fonts import in `src/app/layout.tsx` if network-restricted
- **Development**: `yarn dev` -- starts in 1.8 seconds, runs on http://localhost:3000
- **Linting**: `yarn lint` -- takes 2 seconds
- **Formatting**: `npx prettier --write .` -- takes 2-3 seconds for repository-wide formatting

### GraphQL Operations

- **Codegen**: `yarn codegen` -- regenerates GraphQL types from AWS AppSync schema
  - **NETWORK LIMITATION**: Requires AWS CLI access, may fail in restricted environments
  - Generated files: `src/graphql/types.ts`, `src/graphql/queries.ts`, `src/graphql/mutations.ts`

## Validation

### Manual Testing Scenarios

**ALWAYS run through these scenarios after making changes:**

1. **Public Site Validation**:

   - Navigate to http://localhost:3000 and verify homepage loads
     - Should display OK Wildscapes branding, hero section, consultation CTA, projects section
     - Navigation should work correctly between pages
   - Test consultation form at http://localhost:3000/consultation
     - Form should have fields for name, email, zip, phone, project size, message
     - Form validation should work properly
   - Check resources page at http://localhost:3000/resources
     - Should display links to plant databases and downloadable guides
   - Verify all components render without console errors

2. **Authentication Flow**:

   - Visit any backoffice route (e.g., `/dashboard`) - should redirect to `/login`
   - Test login page functionality at http://localhost:3000/login
   - Note: Login requires valid AWS Cognito credentials from environment variables

3. **Backoffice Functionality** (requires authentication):

   - Dashboard: http://localhost:3000/dashboard
   - Plant Sheets: http://localhost:3000/plant-sheets
   - Plant Sheet Upload: http://localhost:3000/plant-sheets/upload
   - Jobs Management: http://localhost:3000/jobs
   - Ledger: http://localhost:3000/ledger

4. **Visual Testing**:
   - Homepage should display properly with logo, navigation, hero section, and carousel
   - Consultation page should show the form alongside a beautiful garden image
   - All pages should be responsive and use the Tailwind CSS styling correctly

### Pre-commit Validation

- **ALWAYS run these before committing changes:**
  - `yarn lint` -- must pass with no errors
  - `npx prettier --write .` -- format all code
  - `yarn build` -- must complete successfully (unless network-restricted)

## Architecture Overview

### Route Structure

- `src/app/(main)/` -- Public marketing pages (home, consultation, resources)
- `src/app/(backoffice)/` -- Authenticated admin pages (dashboard, jobs, plant-sheets, ledger)
- `src/app/(auth)/` -- Authentication pages (login)

### Key Directories

- `src/components/ui/main/` -- Public site components
- `src/components/ui/backoffice/` -- Admin interface components
- `src/components/ui/` -- Shared UI components (buttons, forms, tables)
- `src/graphql/` -- **AUTO-GENERATED** GraphQL types and operations (do not edit manually)
- `src/utils/` -- Utility functions including Amplify server configuration
- `src/providers/` -- React context providers

### Important Files

- `src/middleware.ts` -- Authentication middleware for protected routes
- `src/app/actions.ts` -- Server actions for file uploads and form processing
- `src/app/data.ts` -- Server-side data fetching functions
- `src/utils/amplify-server-utils.ts` -- AWS Amplify server configuration
- `.graphqlconfig.yml` -- GraphQL schema configuration (apiId: owfutb6shbdkdn7vxhw7w3mnly)

## Common Tasks

### Working with GraphQL

- **NEVER** manually edit files in `src/graphql/` -- they are auto-generated
- After schema changes in AWS AppSync, run `yarn codegen` to regenerate types
- Use the generated types from `src/graphql/types.ts` for type safety
- Server-side queries use `cookiesClient` from `src/utils/amplify-server-utils.ts`
- Client-side queries use `generateClient()` from `aws-amplify/api`

### Adding New Features

- Public pages: Add to `src/app/(main)/`
- Admin pages: Add to `src/app/(backoffice)/` (automatically protected by middleware)
- Components: Add to appropriate `src/components/ui/` subdirectory
- Follow existing patterns for server components vs client components
- Use TypeScript strict mode -- all files must be properly typed

### Styling and UI

- Uses Tailwind CSS for styling
- UI components in `src/components/ui/` follow shadcn/ui patterns
- Form handling uses react-hook-form with Zod validation
- Responsive design with mobile-first approach

### Environment Variables (in .env.local)

```
NEXT_PUBLIC_API_URL=https://[api-id].appsync-api.us-east-1.amazonaws.com/graphql
NEXT_PUBLIC_API_KEY=[your-api-key]
NEXT_PUBLIC_REGION=us-east-1
NEXT_PUBLIC_USER_POOL_ID=us-east-1_[pool-id]
NEXT_PUBLIC_USER_POOL_CLIENT_ID=[client-id]
NEXT_PUBLIC_IDENTITY_POOL_ID=us-east-1:[identity-pool-id]
NEXT_PUBLIC_ASSETS_URL=https://[cloudfront-id].cloudfront.net
```

## Troubleshooting

### Network-Related Issues

- **Google Fonts Error**: Temporarily modify font imports in `src/app/layout.tsx`
- **Codegen Fails**: GraphQL types are already generated, manually update if needed
- **Amplify CLI Issues**: Use environment variables instead of CLI for configuration

### Build Issues

- **Type Errors**: Ensure all GraphQL operations use generated types
- **CSS Issues**: Check Tailwind configuration and component imports
- **Middleware Errors**: Verify AWS Amplify configuration in environment variables

### Development Server Issues

- **Port Conflicts**: Default port 3000, specify different port with `yarn dev --port 3001`
- **Auth Redirects**: Ensure `.env.local` has correct AWS configuration
- **GraphQL Errors**: Check API endpoint and authentication configuration

## File Organization Reference

```
src/
├── app/
│   ├── (main)/          # Public pages
│   ├── (backoffice)/    # Admin pages
│   ├── (auth)/          # Auth pages
│   ├── actions.ts       # Server actions
│   ├── data.ts          # Data fetching
│   └── layout.tsx       # Root layout
├── components/ui/
│   ├── main/            # Public components
│   ├── backoffice/      # Admin components
│   └── *.tsx            # Shared components
├── graphql/             # AUTO-GENERATED
├── providers/           # React providers
├── styles/              # Global styles
└── utils/               # Utilities
```

**Remember: This is a production application. Always test thoroughly and follow the validation scenarios before committing changes.**
