const donors = require("./donors");

// ================================
// GET ALL DONORS
// ================================
const getAllDonors = (req, res) => {
    res.status(200).json({
        success: true,
        count: donors.length,
        data: donors
    });
};

// ================================
// SEARCH / FILTER DONORS
// ================================

const searchDonors = (req, res) => {
    const {
        bloodGroup,
        city,
        locality,
        availability
    } = req.query;

    let filteredDonors = donors;

    // Filter by blood group
    if (bloodGroup) {
        filteredDonors = filteredDonors.filter(
            donor =>
                donor.bloodGroup.toLowerCase() ===
                bloodGroup.toLowerCase()
        );
    }

    // Filter by city
    if (city) {
        filteredDonors = filteredDonors.filter(
            donor =>
                donor.city.toLowerCase().includes(
                    city.toLowerCase()
                )
        );
    }

    // Filter by locality
    if (locality) {
        filteredDonors = filteredDonors.filter(
            donor =>
                donor.locality.toLowerCase().includes(
                    locality.toLowerCase()
                )
        );
    }

    // Filter by availability
    if (availability !== undefined) {
        const isAvailable = availability === "true";

        filteredDonors = filteredDonors.filter(
            donor => donor.availability === isAvailable
        );
    }

    res.status(200).json({
        success: true,
        count: filteredDonors.length,
        data: filteredDonors
    });
};

// ================================
// GET ONE DONOR
// ================================
const getDonorById = (req, res) => {
    const id = Number(req.params.id);

    const donor = donors.find(donor => donor.id === id);

    if (!donor) {
        return res.status(404).json({
            success: false,
            message: "Donor not found"
        });
    }

    res.status(200).json({
        success: true,
        data: donor
    });
};


// ================================
// CREATE DONOR
// ================================
const createDonor = (req, res) => {
    const {
        name,
        email,
        phone,
        bloodGroup,
        city,
        locality,
        pinCode,
        availability,
        otherInformation
    } = req.body;

    // Basic validation
    if (
        !name ||
        !email ||
        !phone ||
        !bloodGroup ||
        !city ||
        !locality ||
        !pinCode
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required donor information"
        });
    }

    const newDonor = {
        id: donors.length > 0
            ? donors[donors.length - 1].id + 1
            : 1,

        name,
        email,
        phone,
        bloodGroup,
        city,
        locality,
        pinCode,
        availability: availability ?? true,
        otherInformation: otherInformation || ""
    };

    donors.push(newDonor);

    res.status(201).json({
        success: true,
        message: "Donor created successfully",
        data: newDonor
    });
};


// ================================
// UPDATE DONOR
// ================================
const updateDonor = (req, res) => {
    const id = Number(req.params.id);

    const donorIndex = donors.findIndex(donor => donor.id === id);

    if (donorIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Donor not found"
        });
    }

    const updatedDonor = {
        ...donors[donorIndex],
        ...req.body,
        id: id
    };

    donors[donorIndex] = updatedDonor;

    res.status(200).json({
        success: true,
        message: "Donor updated successfully",
        data: updatedDonor
    });
};


// ================================
// DELETE DONOR
// ================================
const deleteDonor = (req, res) => {
    const id = Number(req.params.id);

    const donorIndex = donors.findIndex(donor => donor.id === id);

    if (donorIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Donor not found"
        });
    }

    const deletedDonor = donors.splice(donorIndex, 1);

    res.status(200).json({
        success: true,
        message: "Donor deleted successfully",
        data: deletedDonor[0]
    });
};


module.exports = {
    getAllDonors,
    getDonorById,
    createDonor,
    updateDonor,
    deleteDonor,
    searchDonors
};