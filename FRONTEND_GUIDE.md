# Frontend File Structure

## /frontend/

### 📁 Core Files
- **package.json** - Frontend dependencies and scripts
- **src/index.js** - React entry point
- **src/App.js** - Main application component
- **public/index.html** - HTML template

### 📁 /src/api
- **api.js** - Axios configuration and API call functions
  - `authAPI` - Auth related calls
  - `transactionAPI` - Transaction related calls
  - `categoryAPI` - Category related calls

### 📁 /src/context
- **AuthContext.js** - React Context for authentication state management
  - User state
  - Token state
  - Login/logout functions

### 📁 /src/components
- **Navigation.js** - Top navigation bar with user menu
- **PrivateRoute.js** - Route protection component
- **Navigation.css** - Navigation styling

### 📁 /src/pages
#### Authentication Pages
- **Login.js** - Login page
- **Register.js** - Registration page
- **Auth.css** - Auth pages styling

#### Main Pages
- **Dashboard.js** - Main dashboard with stats and charts
- **Dashboard.css** - Dashboard styling

- **Transactions.js** - Transaction list, add, edit, delete
- **Transactions.css** - Transactions page styling

- **Reports.js** - Monthly and yearly reports with analytics
- **Reports.css** - Reports page styling

## Component Hierarchy

```
App.js
├── AuthProvider (Context)
├── Router
│   ├── Navigation
│   ├── Routes
│   │   ├── /login → Login
│   │   ├── /register → Register
│   │   ├── /dashboard → PrivateRoute → Dashboard
│   │   │   ├── StatCard (Income)
│   │   │   ├── StatCard (Expense)
│   │   │   ├── StatCard (Balance)
│   │   │   ├── PieChart
│   │   │   ├── BarChart
│   │   │   └── TransactionsTable
│   │   ├── /transactions → PrivateRoute → Transactions
│   │   │   ├── FilterPanel
│   │   │   ├── TransactionsTable
│   │   │   └── TransactionModal
│   │   └── /reports → PrivateRoute → Reports
│   │       ├── ReportSettings
│   │       ├── SummaryCards
│   │       ├── BarChart
│   │       ├── LineChart
│   │       └── CategoryBreakdown
```

## Running Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

## Features Overview

### Login/Register
- Form validation
- Error handling
- JWT token storage
- Automatic redirect

### Dashboard
- Real-time stats cards
- Pie chart (category breakdown)
- Bar chart (category-wise expense)
- Recent transactions table
- Summary cards (Income, Expense, Balance)

### Transactions
- Add transaction modal
- Edit transactions
- Delete transactions
- Filter by type, category, date
- Payment method selection
- Responsive table

### Reports
- Monthly reports with summary
- Yearly reports with trends
- Bar chart (monthly comparison)
- Line chart (savings trend)
- Category breakdown
- Savings ratio calculation

### Navigation
- User profile dropdown
- Logout functionality
- Active route highlighting
- Responsive mobile menu

## State Management

Uses React Context API for:
- User authentication state
- Token management
- User data persistence

## Styling

- Bootstrap 5 for responsive layout
- Custom CSS for specific components
- Gradient backgrounds for cards
- Smooth transitions and hover effects

## API Integration

All API calls go through `/api/api.js` with:
- Automatic token injection
- Error handling
- Response formatting
- Base URL configuration

## Component Props Flow

```
authContext (user, token)
  ↓
App.js
  ↓
Routes & PrivateRoute
  ↓
Pages (Dashboard, Transactions, Reports)
  ↓
Sub-components (Cards, Tables, Charts)
```
