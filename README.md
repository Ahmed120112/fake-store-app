E-Commerce Store

An interactive, front-end e-commerce store prototype built with React. This project showcases various products, allows users to add items to a cart, view product details, and simulate an order checkout process with payment functionality. The application also supports user authentication (login and registration) and stores user data locally using a JSON server.

Table of Contents

	•	Features
	•	Tech Stack
	•	Setup and Installation
	•	Usage
	•	Project Structure
	•	Available Scripts
	•	License

Features

	•	Product Listing and Details: Browse and search for products, with detailed pages for each item.
	•	Shopping Cart: Add products to a shopping cart, adjust quantities, and remove items.
	•	Order Summary and Checkout: View an order summary with total costs, and proceed to a payment simulation.
	•	Authentication: User login, registration, and logout features with user data saved locally.
	•	Receipt Tracking: After payment, each user’s purchases are saved to a local JSON server.
	•	Responsive Design: Fully responsive layout optimized for both desktop and mobile devices.

Tech Stack

	•	Frontend: React, Bootstrap, CSS
	•	Backend: JSON Server (for simulating backend functionalities)
	•	Payment Simulation: Stripe.js (configured as a prototype without actual payment processing)

Setup and Installation

Prerequisites

	•	Node.js: Ensure you have Node.js and npm installed on your machine.
	•	JSON Server: To run a mock backend, we use JSON Server.

Installation

	1.	Clone the repository:

git clone https://github.com/your-username/e-commerce-store.git
cd e-commerce-store


	2.	Install dependencies:

npm install


	3.	Install JSON Server globally:

npm install -g json-server


	4.	Create a db.json file in the root directory to store user and order data. Add the following structure to db.json:

{
  "users": [],
  "receipts": []
}


	5.	Start JSON Server:

json-server --watch db.json --port 5001


	6.	Run the development server:

npm start



The app should now be accessible at http://localhost:3000.

Stripe Setup

To use the Stripe payment prototype, you need a Stripe publishable key. Replace 'your-publishable-key-from-stripe' in the Payment.js file with your actual publishable key.

Usage

Authentication

	•	Go to Register to create a new account.
	•	Once registered, login with your email and password.

Shopping

	•	Browse products on the Products page.
	•	Use the Add to Cart button to add items to your cart.
	•	Adjust item quantities and remove items within the cart view.

Checkout

	•	View your cart by selecting Order Now.
	•	Confirm your order to proceed to the Payment page.
	•	On successful payment, a receipt is generated and stored in the JSON server.

Project Structure

e-commerce-store/
├── public/
│   └── index.html
├── src/
│   ├── includs/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ProductDetails.js
│   │   │   ├── Order.js
│   │   │   └── Payment.js
│   │   └── css/
│   │       ├── Navbar.css
│   │       ├── Footer.css
│   │       └── Order.css
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── css/
│   │       ├── Home.css
│   │       ├── Products.css
│   │       ├── About.css
│   │       ├── Contact.css
│   │       ├── Login.css
│   │       └── Register.css
│   ├── AuthContext.js
│   ├── App.js
│   └── index.js
├── db.json
├── .gitignore
├── README.md
└── package.json

In this structure:

	•	src/includs/css/: Contains common styles for components used across different pages, like the Navbar, Footer, Order, and Payment components.
	•	src/pages/css/: Contains individual styles for each specific page, including Home, Products, About, Contact, Login, and Register.

Available Scripts

In the project directory, you can run:

	•	npm start: Runs the app in development mode.
	•	npm run build: Builds the app for production to the build folder.
	•	json-server --watch db.json --port 5001: Starts the JSON server for mock data handling.

License

This project is licensed under the MIT License. You are free to use and modify it for personal and commercial use.

This README provides an overview of the project setup, usage, and structure to make it easier for others to understand and work with the codebase.