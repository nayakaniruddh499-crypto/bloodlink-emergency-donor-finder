const requests = require("./requests");
const donors = require("./data/donors");

// ================================
// GET ALL EMERGENCY REQUESTS
// ================================

const getAllRequests = (req, res) => {
    res.status(200).json({
        success: true,
        count: requests.length,
        data: requests
    });
};


// ================================
// GET ONE EMERGENCY REQUEST
// ================================

const getRequestById = (req, res) => {
    const id = Number(req.params.id);

    const request = requests.find(request => request.id === id);

    if (!request) {
        return res.status(404).json({
            success: false,
            message: "Emergency request not found"
        });
    }

    res.status(200).json({
        success: true,
        data: request
    });
};

// ================================
// FIND MATCHING DONORS
// ================================

const findMatchingDonors = (request) => {

    const matchingDonors = donors.filter(donor => {

        const sameBloodGroup =
            donor.bloodGroup.toLowerCase() ===
            request.requiredBloodGroup.toLowerCase();

        const available =
            donor.availability === true;

        const sameCity =
            donor.city.toLowerCase() ===
            request.city.toLowerCase();

        const sameLocality =
            donor.locality.toLowerCase() ===
            request.locality.toLowerCase();

        return (
            sameBloodGroup &&
            available &&
            sameCity &&
            sameLocality
        );
    });

    return matchingDonors;
};

// ================================
// CREATE EMERGENCY REQUEST
// ================================

const createRequest = (req, res) => {

    const {
        requesterName,
        requiredBloodGroup,
        quantity,
        patientName,
        hospital,
        city,
        locality,
        pinCode,
        requiredDateTime,
        description,
        contactNumber
    } = req.body;

    // Basic validation
    if (
        !requesterName ||
        !requiredBloodGroup ||
        !quantity ||
        !patientName ||
        !hospital ||
        !city ||
        !locality ||
        !pinCode ||
        !requiredDateTime ||
        !contactNumber
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required emergency request information"
        });
    }

    // Quantity must be a positive number
    if (Number(quantity) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Blood quantity must be greater than zero"
        });
    }

    const newRequest = {
        id: requests.length > 0
            ? requests[requests.length - 1].id + 1
            : 1,

        requesterName,
        requiredBloodGroup,
        quantity: Number(quantity),
        patientName,
        hospital,
        city,
        locality,
        pinCode,
        requiredDateTime,
        description: description || "",
        contactNumber,
        status: "ACTIVE"
    };

    requests.push(newRequest);

// Find matching donors
const matchingDonors = findMatchingDonors(newRequest);

res.status(201).json({
    success: true,
    message: "Emergency request created successfully",
    data: newRequest,
    matchingDonors: matchingDonors
});
};


// ================================
// UPDATE EMERGENCY REQUEST
// ================================

const updateRequest = (req, res) => {
    const id = Number(req.params.id);

    const requestIndex = requests.findIndex(
        request => request.id === id
    );

    if (requestIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Emergency request not found"
        });
    }

    const updatedRequest = {
        ...requests[requestIndex],
        ...req.body,
        id: id
    };

    requests[requestIndex] = updatedRequest;

    res.status(200).json({
        success: true,
        message: "Emergency request updated successfully",
        data: updatedRequest
    });
};


// ================================
// DELETE EMERGENCY REQUEST
// ================================

const deleteRequest = (req, res) => {
    const id = Number(req.params.id);

    const requestIndex = requests.findIndex(
        request => request.id === id
    );

    if (requestIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Emergency request not found"
        });
    }

    const deletedRequest = requests.splice(requestIndex, 1);

    res.status(200).json({
        success: true,
        message: "Emergency request deleted successfully",
        data: deletedRequest[0]
    });
};


module.exports = {
    getAllRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest
};