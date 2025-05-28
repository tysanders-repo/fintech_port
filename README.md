<!-- # Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information. -->



# FINTECH PORTFOLIO PIECE

# 📋 Project TODO

## 1. Project & Infrastructure Setup
- [x] Scaffold new T3 app (`create-t3-app`)
- [x] Install & configure TailwindCSS
- [x] setup shadui
- [ ] setup visx (gen library/ skip for now until)
- [ ] Configure global layout & styles
- [x] Initialize Drizzle ORM  
  - [x] Set up database connection  
  - [x] Create initial migrations
- [x] Set up tRPC  
  - [x] Create `appRouter`  
  - [x] Wire up `createNextApiHandler`
- [x] Design ER diagram for database schema
- [ ] Configure Vercel (or preferred host) for CI/CD

## 2. Database Modeling
- [x] Define Drizzle schema  
 ```Drizzle
  //user related models
  model Users { … }
  model Accounts { … }
  model Sessions { … }
  model verificationTokens { … }

  //finanial related models
  model BankAccounts { … }
  model Transactions { … }
  model RoundUps { … }
  ```
- [ ] Run `prisma migrate dev` & generate client
- [ ] Seed with test data (optional)

## 3. CSV inport integration
- [ ] Create CSV upload endpoint  
  - [ ] Use `multer` or similar for file handling
- [ ] Parse CSV file
  - [ ] Use `papaparse` or `csv-parser`
  - [ ] Validate data against Prisma schema
- [ ] Insert parsed data into database
- [ ] Create tRPC mutation for CSV upload
  - [ ] Handle errors & edge cases
- [ ] UI component for CSV upload
- [ ] Display upload progress & results
- [ ] Add unit tests for CSV parsing & upload logic
- [ ] Document CSV format requirements
- [ ] Add error handling for invalid CSV formats

## 4. Authentication & User Management
- [ ] Install & configure NextAuth.js  
  - [ ] Email/password provider (or OAuth)  
  - [ ] Session callbacks → attach to Prisma `User`
- [ ] Create tRPC utilities  
  - [ ] `getSession()` and `getUser()` queries  
  - [ ] Protect server procedures with `isAuthed` middleware
- [ ] UI components  
  - [ ] Sign-in form  
  - [ ] Sign-out button  
  - [ ] Session state handling in layout

## 4. Pages & Flows

### 4.1 Landing Flow

- [ ] --Hero & Features--

  - [ ] Hero section copy + CTAs
  - [ ] Feature highlights (round-ups, savings jar, dashboard)
- [ ] --Footer & Legal--

  - [ ] Links: Terms, Privacy, Contact
  - [ ] Social & branding assets

### 4.2 Sign-Up / Onboarding Flow

- [ ] --Sign-Up Page--

  - [ ] Form fields: name, email, password
  - [ ] Client-side validation (zod)
  - [ ] tRPC mutation → create account
- [ ] --Email Verification--

  - [ ] Send verification link
  - [ ] Verification handler page
- [ ] --First-Time Onboarding--

  - [ ] Modal/steps:

    - [ ] Link your first bank
    - [ ] See a sample round-up
    - [ ] Set a savings goal
  - [ ] Persist “completedOnboarding” flag

### 4.3 Dashboard & Connected Entities

- [ ] --Dashboard Layout--

  - [ ] Sidebar / top nav (Profile, Settings, Logout)
  - [ ] Main content area with cards/tiles
- [ ] --Bank Accounts--

  - [ ] tRPC query: fetch linked accounts
  - [ ] “Add Bank” button → Plaid Link integration
  - [ ] List view: name, last 4 digits, balance
- [ ] --Transactions Feed--

  - [ ] tRPC query: paginated transactions + round-up cents
  - [ ] UI: date, description, amount, round-up badge
  - [ ] Infinite scroll or “Load More”
- [ ] --Round-Up Summary--

  - [ ] tRPC query: sum of round-up for period
  - [ ] Chart or progress bar toward goal
- [ ] --Savings Jar (Transfer)--

  - [ ] Button: “Transfer \$X to savings”
  - [ ] tRPC mutation: record transfer (or call Plaid Transfer)
  - [ ] Confirmation toast / modal
- [ ] --Settings & Profile--

  - [ ] Edit profile (name, email)
  - [ ] Manage linked banks (unlink)
  - [ ] Round-up settings (round to \$1 vs. \$0.50)

## 5. Notifications & Webhooks (Optional)

- [ ] Set up CRON job for daily summary emails
- [ ] In-app toasts for new round-ups
- [ ] tRPC notification queries & mutations

## 6. Testing & QA

- [ ] Unit tests for round-up logic (`vitest`)
- [ ] Component tests (`@testing-library/react`)
- [ ] E2E tests (Playwright)
- [ ] Accessibility audit (Lighthouse)

## 7. Polish & Deployment

- [ ] Final UI tweaks & responsive checks
- [ ] Performance optimizations (code splitting)
- [ ] Final deploy & monitoring (Sentry, Vercel logs)

## 8. Documentation & Maintenance
- [ ] README with setup & usage instructions
- [ ] API docs (tRPC Swagger or OpenAPI)
- [ ] User guide (if applicable)
- [ ] Changelog for future updates



<!-- ### Wishlist

# 📝 Wishlist TODO -->
<!-- 
- [ ] ML-backed transaction categorization (TensorFlow.js or Plaid categorizer)  
- [ ] Custom budget creation with threshold alerts (email & in-app toasts)  
- [ ] Multi-goal savings “jars” (e.g. Vacation, Emergency Fund)  
- [ ] Interactive time-series charts for goal progress and projections  
- [ ] Friend groups & shared savings goals with progress leaderboards  
- [ ] Achievement badges & streaks (e.g. “Saved $100 in 7 days”)  
- [ ] Charitable round-ups with Stripe integration  
- [ ] Charity directory and impact dashboard  
- [ ] Real-time transaction/round-up streaming (WebSockets or SSE)  
- [ ] Push notifications via PWA (or Expo for mobile)  
- [ ] Installable PWA with offline mode (service workers & caching)  
- [ ] End-to-end encryption for stored data  
- [ ] Multi-factor authentication (TOTP via Authenticator apps)  
- [ ] Audit logs & role-based access control  
- [ ] Internationalization & multi-currency support  
- [ ] UI localization in at least 2–3 major languages  
- [ ] Data analytics integration (Segment/Mixpanel)  
- [ ] Admin dashboard for user metrics & error logs  
- [ ] Storybook for design-system components  
- [ ] Auto-generated API docs (OpenAPI or tRPC Swagger)  
- [ ] Polished README and a 2–3 min video walkthrough/demo  
- [ ] GitHub Actions CI/CD pipeline (lint, tests, deploy previews)  
- [ ] Error tracking (Sentry) & uptime monitoring  
- [ ] In-app AI chatbot advisor (“How can I save more?”)  
- [ ] Forecasting model prototype (“You’ll save $X next month”)

---

# 💬 Advanced User Interactions

- [ ] Real-time dashboard updates via WebSockets or Server-Sent Events  
- [ ] Push notifications (PWA/browser & mobile) for round-up alerts  
- [ ] PWA installable with read-only offline access & sync on reconnect  
- [ ] Achievement badges with animated UI feedback  
- [ ] Social challenges: friend group savings competitions & leaderboards  
- [ ] In-app AI chatbot for personalized saving tips  
- [ ] Interactive, filterable time-series savings charts with tooltips  
- [ ] Charitable donation flow with dynamic impact feedback modals   -->
