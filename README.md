
# 💰 Expense Tracker - MERN Stack Application

A comprehensive web-based financial management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) to help users track, analyze, and control their daily income and expenses efficiently.

## 🎯 Features

### ✅ User Authentication & Security
- User registration and login with JWT-based authentication
- Secure password hashing with bcryptjs
- Personal expense data isolation per user
- Token-based authorization for API endpoints

### 💼 Income & Expense Management
- Add, edit, and delete transactions
- Support for both income and expense entries
- Date-wise transaction recording
- Notes/description for each transaction
- Multiple payment methods (cash, card, online, UPI)

### 🏷️ Category-Wise Expense Tracking
- Predefined categories (Food, Travel, Rent, Shopping, Medical, etc.)
- Custom category creation
- Category-wise expense analysis
- Color-coded categories for better visualization

### 📊 Data Visualization
- **Pie Chart** - Category-wise expense distribution
- **Bar Chart** - Monthly income vs expenses comparison
- **Line Chart** - Spending trends over time
- Real-time chart updates

### 📈 Reports & Analytics
- Monthly income vs expense summary
- Yearly financial overview
- Savings estimation
- Category breakdown analysis
- Filter transactions by date range, category, and type

### 📱 Dashboard Overview
- Total income display
- Total expenses display
- Current balance calculation
- Recent transactions list
- Visual summary cards
- Category spending breakdown

### 🔍 Search & Filter Options
- Filter by date range
- Filter by category
- Filter by income/expense type
- Advanced search functionality

### 📱 Responsive UI
- Works on desktop, tablet, and mobile
- Clean and user-friendly design
- Fast loading React components
- Bootstrap-based styling

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **Bootstrap 5** - UI framework
- **React Bootstrap** - Bootstrap components for React


## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn


### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🚀 Usage

### 1. User Registration
- Go to `/register` page
- Enter name, email, password
- Click "Register"

### 2. User Login
- Go to `/login` page
- Enter email and password
- Click "Login"

### 3. Dashboard
- View total income, expenses, and balance
- See recent transactions
- View expense distribution by category
- Quick overview of financial status

### 4. Add Transaction
- Click "Add Transaction" button
- Select type (Income/Expense)
- Choose category
- Enter amount
- Add date and description
- Select payment method
- Click "Add Transaction"

### 5. View & Manage Transactions
- Go to Transactions page
- Filter by type, category, or date range
- Edit any transaction
- Delete transactions

### 6. View Reports
- Go to Reports page
- Select report type (Monthly/Yearly)
- Choose year and month
- Generate report with charts and analysis
- View category breakdown and savings ratio

