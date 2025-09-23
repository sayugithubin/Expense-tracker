# Expense-Tracker

The Expense Tracker is a full-stack MERN application that allows users to manage their expenses efficiently. Users can log their incomes and expenses, view summaries, and gain insights through interactive data visualizations. This project helps in budgeting and understanding spending habits.

## Table of contents
- [Installation].(#installation)
- [Tech stack].(#tech stack)
- [Usage].(#usage)
- [Contributing].(#contributing)
- [License].(#license)

## Installation

Clone the repository

git clone https://github.com/yourusername/mern-expense-tracker.git
cd mern-expense-tracker


Backend setup

cd backend
npm install


Create a .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Start the server:

npm start


Frontend setup

cd ../frontend
npm install


Create a .env file:

REACT_APP_API_URL=http://localhost:5000/api


Start the React app:

npm start

## Tech stack

Tech Stack

Frontend:

React.js

Redux (Optional)

Chart.js / Recharts for data visualization

CSS / Tailwind / Material-UI (choose one)

Backend:

Node.js

Express.js

MongoDB (with Mongoose)

JWT Authentication

Other Tools:

Git & GitHub

Postman (for API testing)

## Usage 

Sign up or log in as a user.

Add income and expense transactions with category and amount.

View summary and charts for spending insights.

Edit or delete transactions as needed.

## Contributing

Fork the repository

Create a new branch (git checkout -b feature/feature-name)

Make your changes and commit (git commit -m 'Add some feature')

Push to the branch (git push origin feature/feature-name)

Open a Pull Request

## License

This project is licensed under the MIT License.
