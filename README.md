# Smart Expense Manager with AI Component

A modern React-based expense tracker application that helps users manage their finances and provides simple AI-based spending insights.

## Features

- **Authentication**: Secure Login and Registration.
- **Dashboard**: Overview of Income, Expenses, and Balance.
- **Expense Management**: Add, Edit, Delete, and List expenses.
- **AI Insights**: Rule-based analysis of spending habits (e.g., "High spending in Food").
- **Responsive Design**: Works on mobile and desktop.

## Technologies Used

- **Frontend**: React (Vite)
- **Styling**: React-Bootstrap, Bootstrap 5, Custom CSS
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **Backend (Mock)**: JSON Server
- **Persistence**: Local Storage

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1.  Navigate to the project directory:
    ```bash
    cd smart-expense-manager
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

This project requires **two** terminals running simultaneously: one for the mocked backend and one for the frontend.

**Terminal 1: Start Backend (JSON Server)**

```bash
npx json-server --watch db.json --port 3001
```

**Terminal 2: Start Frontend (React App)**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
smart-expense-manager/
├── src/
│   ├── api/            # Axios API configuration
│   ├── components/     # Reusable UI components (Nav, Forms, etc.)
│   ├── context/        # Global State (Auth, Expenses)
│   ├── pages/          # Application Pages (Login, Dashboard, etc.)
│   ├── utils/          # Helper functions (AI Insights logic)
│   ├── App.jsx         # Main Router setup
│   └── main.jsx        # Entry point
├── db.json             # Mock Database
└── README.md           # Documentation
```

## Contributing
Feel free to fork this project and submit pull requests.
