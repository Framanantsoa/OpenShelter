# OpenShelter

## Overview
A real-time community platform designed to locate, manage and coordinate emergency shelters and vital resources during crises.

---

## Features


---

## Tech Stack
- **Full-Stack Framework**: Nuxt.js 4 (Vue.js 3 / Tailwind CSS)
- **Database**: PostgreSQL
- **Runtime**: Node.js 22+

---

## Local Setup — Step by Step

### 1. Clone the repository
```sh
git clone https://github.com/Framanantsoa/OpenShelter
cd OpenShelter/web-app
```

### 2. Install dependencies
```sh
npm install
```

### 3. Create & Edit the .env file
```code
# Drizzle
DATABASE_URL="postgres://user:password@host:port/db-name"
```

### 4. Run database migrations
```sh
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 5. Start the dev server
```sh
npm run dev
```
