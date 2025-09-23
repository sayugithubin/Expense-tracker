# Expense-Tracker

The Expense Tracker is a full-stack MERN + Firebase application that allows users to manage their expenses efficiently.
Users can log their incomes and expenses, view summaries, and gain insights through interactive data visualizations.
Firebase is used for Authentication and Cloud Firestore Database, ensuring scalability and security.


## Table of contents
- [Installation].(#installation)
- [Tech stack].(#tech stack)
- [Usage].(#usage)
- [Contributing].(#contributing)
- [License].(#license)

## Installation

Clone the repository

git clone https://github.com/yourusername/mern-firebase-expense-tracker.git
cd mern-firebase-expense-tracker


Install dependencies

npm install


Setup Firebase

Go to Firebase Console

Create a project

Enable Authentication (Email/Password or Google Sign-in)

Enable Cloud Firestore

Copy your Firebase config

Create a .env file in the frontend folder:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id


Start the app

npm start


## Tech stack

Tech Stack

Frontend:

React.js

Redux (Optional)

Chart.js / Recharts for data visualization

CSS / Tailwind / Material-UI (choose one)

Backend / Database:

Firebase Authentication

Firebase Firestore Database

Other Tools:

Git & GitHub

Postman (for API testing if needed)


## Usage 

Sign up or log in with Firebase Authentication.

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
