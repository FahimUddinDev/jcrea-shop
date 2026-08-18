# JCrea Shop

# Live Demo

URL: https://jcrea-shop.vercel.app

---

# Setup Instructions

# 1. Clone the repository

git clone https://github.com/FahimUddinDev/jcrea-shop.git
cd jcrea-shop

# 2. Install dependencies

npm install

# 3. Configure environment variables

Create a ".env" file in the root directory:

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
AUTH_SECRET=your_nextauth_secret

# 4. Run development server

npm run dev
Open http://localhost:3000 in your browser.

# Tech Decisions: Why Zustand vs Redux?

We chose "Zustand" over "Redux Toolkit" for this application because:

- Zero Boilerplate: No actions, reducers, or complex store wrappers needed.
- Tiny Bundle Size: less footprint compared to Redux Toolkit.
- React Context Free: Prevents unnecessary full-tree re-renders when updating items.
- Built-in LocalStorage Persistence: Simple middleware (`persist`) handles saving data.

# Bonus Features Completed

-Edge Middleware :Middleware automatically redirects unauthenticated users to `/login` and authenticated users away from `/login` directly to `/dashboard`.

-Role-Based Access Control (RBAC): Separate **Admin** and **User** sign-in options; and login as admin you will see extra ui top of dashboard and role-restricted actions `Add New Product` and `Edit Stock` buttons are automatically hidden for user accounts.

-Cart Persistence: Immediate cart Persistence using zustand presist middleware.
