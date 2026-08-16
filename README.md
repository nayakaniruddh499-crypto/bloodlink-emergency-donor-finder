# BloodLink

BloodLink is a blood donation and emergency donor finder web application designed to help users quickly register as donors and create emergency blood requests during urgent medical situations.

## Project Overview

The application allows:

- Donors to register with their personal and medical information
- Users to search and filter available donors
- Users to create emergency blood requests
- Requesters to view emergency requests
- Request details to be viewed and updated
- Donor and request information to be managed through backend APIs

## Features

### Frontend

- Donor registration form
- Donor search and filter functionality
- Emergency request form
- Emergency request listing page
- Request details page
- Request status update controls
- Responsive layout for desktop, tablet, and mobile screens

### Backend

- Create donor records
- Retrieve all donors or a specific donor
- Search donors by blood group, city, locality, and availability
- Update donor availability and details
- Create emergency requests
- Retrieve all requests or a single request
- Update request status
- Handle invalid data and missing records gracefully

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Express.js

## Project Structure

```text
bdfinder/
├── backend/
│   ├── data/
│   │   ├── donorcontroller.js
│   │   ├── donors.js
│   │   └── ...
│   ├── requestcontroller.js
│   ├── requests.js
│   └── server.js
├── frontend/
│   ├── app.js
│   ├── dashboard.html
│   ├── emergency-request.html
│   ├── emergency-requests.html
│   ├── find-donor.html
│   ├── index.html
│   ├── register.html
│   ├── request-details.html
│   └── style.css
├── package.json
├── README.md
└── .gitignore
```

## Installation

1. Open a terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

## Running the Application

### Start the backend server

```bash
node backend/server.js
```

The server will run at:

```text
http://localhost:5000
```

### Open the frontend

Open the HTML pages from the frontend folder in a browser, or use a local static server if preferred.

Example:

```text
frontend/index.html
```

## API Endpoints

### Donors

- GET /api/donors
- GET /api/donors/:id
- GET /api/donors/search
- POST /api/donors
- PUT /api/donors/:id
- DELETE /api/donors/:id

### Emergency Requests

- GET /api/requests
- GET /api/requests/:id
- POST /api/requests
- PUT /api/requests/:id
- DELETE /api/requests/:id

## Example Request Flow

1. Register a donor using the donor form.
2. Search donors by blood group and location.
3. Submit an emergency blood request.
4. View all active requests.
5. Open a request to see details.
6. Update the request status as fulfilled or cancelled.

## Screenshots

Add screenshots here after running the app:

- Home page
- Donor registration page
- Search donor page
- Emergency request page
- Emergency request listing page
- Request details page

## Testing and Verification

The project was checked for:

- backend startup
- route availability
- frontend script syntax validation
- broken link cleanup
- responsive CSS rules for multiple screen sizes

## Short Explanation of the Solution

This project solves the problem of finding suitable blood donors during emergencies by providing a simple web-based system where donors can register, users can search for available donors, and emergency requests can be created and managed. The backend exposes REST APIs for donor and request management, while the frontend provides user-friendly forms and pages for interaction. The application focuses on making the core workflow functional, verifiable, and easy to understand.

## Submission Notes

This project is a functional prototype for a blood donation and emergency donor finder, focused on implementing the required problem solution clearly and efficiently rather than building a large-scale production system.
