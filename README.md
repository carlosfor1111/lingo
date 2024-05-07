This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# lingo

```
lingo
├─ .gitignore
├─ .vscode
│  └─ settings.json
├─ actions
│  ├─ challenge-progress.ts
│  ├─ user-progress.ts
│  └─ user-subscription.ts
├─ app
│  ├─ (main)
│  │  ├─ courses
│  │  │  ├─ card.tsx
│  │  │  ├─ list.tsx
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  ├─ leaderboard
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  ├─ learn
│  │  │  ├─ header.tsx
│  │  │  ├─ lesson-button.tsx
│  │  │  ├─ page.tsx
│  │  │  ├─ unit-banner.tsx
│  │  │  └─ unit.tsx
│  │  ├─ quests
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  └─ shop
│  │     ├─ items.tsx
│  │     ├─ loading.tsx
│  │     ├─ page.tsx
│  │     └─ [Plan]
│  │        ├─ items.tsx
│  │        └─ page.tsx
│  ├─ (marketing)
│  │  ├─ footer.tsx
│  │  ├─ header.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ admin
│  │  ├─ app.tsx
│  │  ├─ challenge
│  │  │  ├─ create.tsx
│  │  │  ├─ edit.tsx
│  │  │  └─ list.tsx
│  │  ├─ challengeOption
│  │  │  ├─ create.tsx
│  │  │  ├─ edit.tsx
│  │  │  └─ list.tsx
│  │  ├─ course
│  │  │  ├─ create.tsx
│  │  │  ├─ edit.tsx
│  │  │  └─ list.tsx
│  │  ├─ lesson
│  │  │  ├─ create.tsx
│  │  │  ├─ edit.tsx
│  │  │  └─ list.tsx
│  │  ├─ page.tsx
│  │  └─ unit
│  │     ├─ create.tsx
│  │     ├─ edit.tsx
│  │     └─ list.tsx
│  ├─ api
│  │  ├─ challengeOptions
│  │  │  ├─ route.ts
│  │  │  └─ [challengeOptionId]
│  │  │     └─ route.ts
│  │  ├─ challenges
│  │  │  ├─ route.ts
│  │  │  └─ [challengeId]
│  │  │     └─ route.ts
│  │  ├─ courses
│  │  │  ├─ route.ts
│  │  │  └─ [courseId]
│  │  │     └─ route.ts
│  │  ├─ lessons
│  │  │  ├─ route.ts
│  │  │  └─ [lessonId]
│  │  │     └─ route.ts
│  │  ├─ pay
│  │  │  └─ route.ts
│  │  └─ units
│  │     ├─ route.ts
│  │     └─ [unitId]
│  │        └─ route.ts
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ lesson
│     ├─ card.tsx
│     ├─ challenge.tsx
│     ├─ footer.tsx
│     ├─ header.tsx
│     ├─ layout.tsx
│     ├─ page.tsx
│     ├─ question-bubble.tsx
│     ├─ quiz.tsx
│     ├─ result-card.tsx
│     └─ [lessonId]
│        └─ page.tsx
├─ components
│  ├─ feed-wrapper.tsx
│  ├─ mobile-header.tsx
│  ├─ mobile-sidebar.tsx
│  ├─ modals
│  │  ├─ exit-modal.tsx
│  │  ├─ hearts-modal.tsx
│  │  └─ practice-modal.tsx
│  ├─ promo.tsx
│  ├─ quests.tsx
│  ├─ sidebar-item.tsx
│  ├─ sidebar.tsx
│  ├─ sticky-wrapper.tsx
│  ├─ ui
│  │  ├─ avatar.tsx
│  │  ├─ button.tsx
│  │  ├─ dialog.tsx
│  │  ├─ progress.tsx
│  │  ├─ separator.tsx
│  │  ├─ sheet.tsx
│  │  └─ sonner.tsx
│  └─ user-progress.tsx
├─ components.json
├─ constants.ts
├─ db
│  ├─ config.ts
│  ├─ db.ts
│  ├─ drizzle
│  │  ├─ 0000_spooky_boom_boom.sql
│  │  └─ meta
│  │     ├─ 0000_snapshot.json
│  │     └─ _journal.json
│  ├─ queries.ts
│  └─ schema.ts
├─ drizzle.config.ts
├─ lib
│  ├─ admin.ts
│  ├─ cookie.ts
│  └─ utils.ts
├─ middleware.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ boy.svg
│  ├─ cn.svg
│  ├─ cn_boy.mp3
│  ├─ cn_man.mp3
│  ├─ cn_woman.mp3
│  ├─ correct.wav
│  ├─ es.svg
│  ├─ es_boy.mp3
│  ├─ es_girl.mp3
│  ├─ es_man.mp3
│  ├─ es_robot.mp3
│  ├─ es_woman.mp3
│  ├─ es_zombie.mp3
│  ├─ finish.mp3
│  ├─ finish.svg
│  ├─ fr.svg
│  ├─ girl.svg
│  ├─ heart.svg
│  ├─ hero.svg
│  ├─ hr.svg
│  ├─ incorrect.wav
│  ├─ it.svg
│  ├─ jp.svg
│  ├─ leaderboard.svg
│  ├─ learn.svg
│  ├─ man.svg
│  ├─ mascot.svg
│  ├─ mascot_bad.svg
│  ├─ mascot_sad.svg
│  ├─ next.svg
│  ├─ plan.svg
│  ├─ points.svg
│  ├─ quests.svg
│  ├─ robot.svg
│  ├─ schema diagrams.png
│  ├─ shop.svg
│  ├─ tw.svg
│  ├─ unlimited.svg
│  ├─ us.svg
│  ├─ vercel.svg
│  ├─ woman.svg
│  └─ zombie.svg
├─ README.md
├─ scripts
│  ├─ migrate.ts
│  ├─ prod.ts
│  ├─ reset.ts
│  └─ seed.ts
├─ store
│  ├─ use-exit-modal.ts
│  ├─ use-hearts-modal.ts
│  └─ use-practice-modal.ts
├─ tailwind.config.ts
└─ tsconfig.json

```