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

<img width="1763" height="1867" alt="image" src="https://github.com/user-attachments/assets/9e655428-2954-4e31-aaf8-3c767c37aba7" />
<img width="1763" height="1652" alt="image" src="https://github.com/user-attachments/assets/0b4fbcd9-0bb2-49a9-a3d4-d082444d84d5" />
<img width="1763" height="2985" alt="image" src="https://github.com/user-attachments/assets/5b72dd8f-b5bb-49d0-8a28-21e851509764" />
<img width="1763" height="2489" alt="image" src="https://github.com/user-attachments/assets/452a5828-ae1b-4e64-80f2-c0e674bc221a" />




## Testing and Verification

The project was checked for:

- backend startup
- route availability
- frontend script syntax validation
- broken link cleanup
- responsive CSS rules for multiple screen sizes
<img width="1035" height="597" alt="Screenshot 2026-08-16 143558" src="https://github.com/user-attachments/assets/ff5530f6-610a-47b5-9318-d0067301f3f1" />
<img width="872" height="833" alt="Screenshot 2026-08-16 143938" src="https://github.com/user-attachments/assets/463922dc-15d8-4aca-8ce6-eb01e43b138c" />
<img width="850" height="839" alt="Screenshot 2026-08-16 144331" src="https://github.com/user-attachments/assets/9889e3f4-0e8f-4fce-8603-88f9089407e7" />
<img width="838" height="735" alt="Screenshot 2026-08-16 144551" src="https://github.com/user-attachments/assets/a75d3626-ead1-4728-b1c1-30b553e28c0d" />
<img width="849" height="729" alt="Screenshot 2026-08-16 144704" src="https://github.com/user-attachments/assets/b4d32683-66c2-47f6-9340-7babb6453810" />
<img width="905" height="831" alt="Screenshot 2026-08-16 145146" src="https://github.com/user-attachments/assets/8b910895-0478-4cb7-b7c1-338aa5248783" />
<img width="857" height="828" alt="Screenshot 2026-08-16 145426" src="https://github.com/user-attachments/assets/42691bbe-ac78-4e84-8d01-539caeed4b71" />
<img width="840" height="791" alt="Screenshot 2026-08-16 145519" src="https://github.com/user-attachments/assets/2b809efb-20a0-4034-8594-0484e476a6df" />
<img width="883" height="809" alt="Screenshot 2026-08-16 145846" src="https://github.com/user-attachments/assets/f52925fc-6503-45c7-970f-6a252cafff85" />
<img width="840" height="473" alt="Screenshot 2026-08-16 150055" src="https://github.com/user-attachments/assets/12ffdfac-cb36-4367-aa5c-7e7299fb27b5" />
<img width="902" height="474" alt="Screenshot 2026-08-16 150207" src="https://github.com/user-attachments/assets/6c166290-e47b-4de8-8ce0-a847dff89bc3" />

## Short Explanation of the Solution

This project solves the problem of finding suitable blood donors during emergencies by providing a simple web-based system where donors can register, users can search for available donors, and emergency requests can be created and managed. The backend exposes REST APIs for donor and request management, while the frontend provides user-friendly forms and pages for interaction. The application focuses on making the core workflow functional, verifiable, and easy to understand.

## Submission Notes

This project is a functional prototype for a blood donation and emergency donor finder, focused on implementing the required problem solution clearly and efficiently rather than building a large-scale production system.
