# 💰 Smart Finance Tracker

Smart Finance Tracker is a full-stack personal finance management application engineered with a **backend-first philosophy**. Unlike typical client-side trackers, this project focuses on robust authentication, relational data integrity, and a scalable architecture designed to support future AI-driven financial agents.

---

## 🚀 Key Features

### 🔐 Secure Authentication
* **Custom JWT Implementation:** Handcrafted authentication flow using JSON Web Tokens.
* **Secure Sessions:** Uses HTTP-only cookies to prevent XSS and manage persistent sessions.
* **Route Protection:** Middleware-based authorization to secure the dashboard and sensitive API endpoints.

### 💳 Finance Management
* **Transaction Lifecycle:** Full CRUD operations for tracking income and expenses.
* **Categorization:** Structured data model for organizing spending habits.
* **Budgeting:** Real-time monitoring of spending against user-defined financial goals.

### 📊 Engineering-Focused Dashboard
* **Shared Layout Architecture:** Persistent navigation with Next.js layout patterns.
* **Relational Data:** Powered by a SQL-based model to ensure data consistency and complex query capabilities.
* **Analytics:** Dedicated sections for transaction history and financial trend analysis.

---

## 🛠 Tech Stack

### Frontend & Core
* **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/)

### Backend & Security
* **Logic:** Next.js Server Actions
* **Database:** PostgreSQL
* **Auth:** JWT & Middleware-based protection

### Future AI Layer (Planned)
* **Language:** Python (FastAPI)
* **Models:** Gemini API
* **Framework:** Agentic AI architecture for financial decision support

---

## 🏗 System Design

The project is built to ensure a clean separation between the user interface and the data layer. By utilizing **Server Actions**, we reduce client-side overhead and ensure that sensitive business logic stays on the server.