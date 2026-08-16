const express = require("express");
const cors = require("cors");

const {
    getAllDonors,
    getDonorById,
    createDonor,
    updateDonor,
    deleteDonor,
    searchDonors
} = require("./data/donorcontroller");

const {
    getAllRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest
} = require("./requestcontroller");

const app = express();
const PORT = 5000;

// ================================
// MIDDLEWARE
// ================================

app.use(cors());
app.use(express.json());


// ================================
// HOME ROUTE
// ================================

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Blood Donor Finder API is running!"
    });
});


// ================================
// DONOR ROUTES
// ================================

app.get("/api/donors", getAllDonors);

app.get("/api/donors/search", searchDonors);

app.get("/api/donors/:id", getDonorById);

// POST new donor
app.post("/api/donors", createDonor);

// PUT update donor
app.put("/api/donors/:id", updateDonor);

// DELETE donor
app.delete("/api/donors/:id", deleteDonor);

// ================================
// EMERGENCY REQUEST ROUTES
// ================================

// GET all emergency requests
app.get("/api/requests", getAllRequests);

// GET one emergency request
app.get("/api/requests/:id", getRequestById);

// POST new emergency request
app.post("/api/requests", createRequest);

// PUT update emergency request
app.put("/api/requests/:id", updateRequest);

// DELETE emergency request
app.delete("/api/requests/:id", deleteRequest);


// ================================
// START SERVER
// ================================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});