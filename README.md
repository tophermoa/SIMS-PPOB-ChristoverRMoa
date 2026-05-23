# SIMS PPOB - Web Application

Take Home Test Web Programmer (React JS) PT Nutech Integrasi

## Features

- **User Authentication:** Login and Registration with JWT handling
- **Dashboard:** Interactive overview of services, current balance, and promo banners
- **Balance Management:** Seamlessly check current balance with a secure masked view
- **Top Up:** Deposit funds directly to your wallet
- **Transactions:** Pay for available services like PDAM, PLN, Internet, etc.
- **Transaction History:** Paginated historical view of all payments and top-ups
- **Profile Management:** View user profile information and securely log out

## Technology Stack

- **Framework:** React 19 + Vite 8
- **State Management:** Redux Toolkit (`react-redux`, `@reduxjs/toolkit`)
- **Styling:** Tailwind CSS + Vanilla CSS (`index.css`)
- **UI Components:** Ant Design (Icons, Spinners, Skeleton Loaders)
- **Routing:** React Router v7
- **HTTP Client:** Axios (with global interceptors for auth handling)
- **Testing:** Jest + React Testing Library

---

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18.x or higher recommended)
- `npm` (comes with Node.js)

### 1. Clone the Repository

Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/sims-ppob.git
cd sims-ppob
```

### 2. Install Dependencies

Install all the required packages using npm:
```bash
npm install
```

### 3. Environment Setup

The application requires environment variables to connect to the backend API.
We have provided a template file named `.env.example`.

Copy or rename `.env.example` to `.env`:
```bash
cp .env.example .env
```
*Note for Windows users: You can rename the file manually in your IDE or file explorer, or run `copy .env.example .env` in the Command Prompt.*


### 4. Run the Development Server

Start the Vite development server:
```bash
npm run dev
```
The application will usually be available at `http://localhost:5173`. Open this URL in your browser to view the app.

---

## Available Scripts

In the project directory, you can run the following commands:

### `npm run dev`
Runs the app in development mode. The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run build`
Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`
Boot up a local static web server that serves the files from your `dist` folder. This is an easy way to check if the production build looks OK in your local environment.

### `npm run test`
Launches the Jest test runner. We use React Testing Library to test components, Redux reducers, and async API calls.
*Note: Make sure your test environment supports ES modules if you run into syntax errors regarding `import` or `import.meta`.*

---

## Folder Structure

```text
sims-ppob/
├── public/                 # Static assets that bypass the bundler
├── src/
│   ├── api/                # Axios instance and API endpoint definitions
│   ├── assets/             # Images, SVGs, and other media
│   ├── components/         # Reusable global UI components (Navbar, Modal, BalanceCard, etc.)
│   ├── hooks/              # Global custom React hooks (useForm, etc.)
│   ├── pages/              # Main route pages (Login, Registration, Home, Topup, etc.)
│   ├── store/              # Redux setup and state slices (balanceSlice, authSlice, etc.)
│   ├── utils/              # Helper functions (validators, formatters)
│   ├── __tests__/          # Unit tests mapped mirroring the src structure
│   ├── __mocks__/          # Jest mocks for Axios, images, and third-party libraries
│   ├── App.jsx             # Main application and Router setup
│   ├── index.css           # Global CSS and Tailwind directives
│   └── main.jsx            # React root mount point
├── .env.example            # Example environment variables
├── jest.config.cjs         # Jest configuration
├── package.json            # Project metadata and dependencies
├── tailwind.config.js      # Tailwind CSS configurations
└── vite.config.js          # Vite configurations
```

