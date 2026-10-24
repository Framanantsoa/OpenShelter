# OpenShelter

## Overview
A real-time community platform designed to locate, manage and coordinate emergency shelters and vital resources during crises.

---

## Features
### 🏠 1. Shelter Locator & Map
- **Live Map:** See nearby open shelters, how full they are, and what items they have right now.
- **Easy Filters:** Sort shelters by distance, size, wheelchair access, pets allowed, medical help, and utilities (water, power, Wi-Fi).
- **Status Colors:** Quick color codes (Green = Open, Yellow = Almost Full, Red = Full or Closed).
- **Directions:** Get clear routes to guide people safely to open shelters.

### 📊 2. Live Capacity & Supplies
- **Capacity Tracking:** Live updates on how many people are inside, managed by staff or auto check-ins.
- **Supply Tracking:** Real-time counts of key items like food, clean water, blankets, and medical kits.
- **Urgent Wishlist:** Shelters can quickly ask donors and helpers for items they are running low on.

### 👥 3. Community & Volunteers
- **Volunteer Sign-up:** Register helpers based on their skills (like medical help or translation) and set their work shifts.
- **Donation Board:** A simple place where people can offer supplies or find drop-off points.
- **Emergency Alerts:** Official safety warnings and updates sent straight to users in affected zones.

### 🛡️ 4. User Roles & Offline Use
- **User Roles:**
    - **Public:** Search shelters, check status, and ask for help.
    - **Staff:** Update room counts, post needed supplies, and manage check-ins.
    - **Admins:** Approve new shelters and send official safety alerts.
- **Works Offline (PWA):** App works even with a weak signal, letting users view saved maps and save actions until internet returns.

---

## Tech Stack
- **Full-Stack Framework**: Nuxt.js 4 (Vue.js 3 / Drizzle-ORM / Tailwind CSS)
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
