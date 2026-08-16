// ============================================================
// BLOODLINK - FRONTEND JAVASCRIPT
// ============================================================

const API_URL = "http://localhost:5000/api";


// ============================================================
// 1. DONOR REGISTRATION
// ============================================================

const donorForm = document.getElementById("donorForm");

if (donorForm) {

    donorForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const bloodGroup = document.getElementById("bloodGroup").value;
        const city = document.getElementById("city").value.trim();
        const locality = document.getElementById("locality").value.trim();
        const pinCode = document.getElementById("pinCode").value.trim();
        const availability =
            document.getElementById("availability").checked;

        const otherInformation =
            document.getElementById("otherInformation").value.trim();


        // ----------------------------
        // Validation
        // ----------------------------

        if (phone.length !== 10 || isNaN(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        if (pinCode.length !== 6 || isNaN(pinCode)) {
            alert("Please enter a valid 6-digit PIN code.");
            return;
        }


        const donorData = {
            name,
            email,
            phone,
            bloodGroup,
            city,
            locality,
            pinCode,
            availability,
            otherInformation
        };


        try {

            const response = await fetch(`${API_URL}/donors`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(donorData)

            });


            const result = await response.json();


            if (!response.ok) {

                alert(result.message || "Registration failed.");

                return;
            }


            alert("Donor registered successfully!");

            donorForm.reset();

            console.log("New donor:", result.data);

        } catch (error) {

            console.error(error);

            alert(
                "Unable to connect to the server. " +
                "Make sure the backend is running."
            );
        }

    });

}


// ============================================================
// 2. FIND / SEARCH DONORS
// ============================================================

const donorSearchForm =
    document.getElementById("donorSearchForm");

const donorResults =
    document.getElementById("donorResults");


if (donorSearchForm && donorResults) {

    donorSearchForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const bloodGroup =
            document.getElementById("bloodGroup").value;

        const city =
            document.getElementById("city").value.trim();

        const locality =
            document.getElementById("locality").value.trim();

        const availability =
            document.getElementById("availability").value;


        // Build query parameters

        const params = new URLSearchParams();


        if (bloodGroup) {
            params.append("bloodGroup", bloodGroup);
        }

        if (city) {
            params.append("city", city);
        }

        if (locality) {
            params.append("locality", locality);
        }

        if (availability) {
            params.append("availability", availability);
        }


        const queryString = params.toString();


        const url = queryString
            ? `${API_URL}/donors/search?${queryString}`
            : `${API_URL}/donors`;


        donorResults.innerHTML =
            "<p>Searching for donors...</p>";


        try {

            const response = await fetch(url);

            const result = await response.json();


            if (!response.ok) {

                donorResults.innerHTML =
                    `<p>${result.message}</p>`;

                return;
            }


            displayDonors(result.data);

        } catch (error) {

            console.error(error);

            donorResults.innerHTML =
                "<p>Unable to connect to the server.</p>";
        }

    });


    // Clear filters

    const clearFilters =
        document.getElementById("clearFilters");


    if (clearFilters) {

        clearFilters.addEventListener("click", function () {

            donorResults.innerHTML =
                "<p>Use the filters above to find donors.</p>";

        });

    }

}


// ============================================================
// 3. DISPLAY DONORS
// ============================================================

function displayDonors(donors) {

    if (donors.length === 0) {

        donorResults.innerHTML = `
            <div class="empty-message">
                <h3>No matching donors found</h3>
                <p>
                    Try changing the blood group or location.
                </p>
            </div>
        `;

        return;
    }


    donorResults.innerHTML = "";


    donors.forEach(function (donor) {

        const donorCard =
            document.createElement("article");


        donorCard.innerHTML = `

            <h3>${donor.name}</h3>

            <p>
                <strong>Blood Group:</strong>
                ${donor.bloodGroup}
            </p>

            <p>
                <strong>Location:</strong>
                ${donor.locality}, ${donor.city}
            </p>

            <p>
                <strong>PIN:</strong>
                ${donor.pinCode}
            </p>

            <p>
                <strong>Contact:</strong>
                ${donor.phone}
            </p>

            <p>
                <strong>Status:</strong>
                ${
                    donor.availability
                        ? "Available"
                        : "Currently Unavailable"
                }
            </p>

            ${
                donor.otherInformation
                    ? `<p>${donor.otherInformation}</p>`
                    : ""
            }

        `;


        donorResults.appendChild(donorCard);

    });

}


// ============================================================
// 4. EMERGENCY REQUEST FORM
// ============================================================

const emergencyForm =
    document.getElementById("emergencyRequestForm");


if (emergencyForm) {

    emergencyForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const requesterName =
            document.getElementById("requesterName")
                .value.trim();

        const contactNumber =
            document.getElementById("contactNumber")
                .value.trim();

        const requiredBloodGroup =
            document.getElementById("requiredBloodGroup")
                .value;

        const quantity =
            document.getElementById("quantity").value;

        const patientName =
            document.getElementById("patientName")
                .value.trim();

        const hospital =
            document.getElementById("hospital")
                .value.trim();

        const city =
            document.getElementById("city")
                .value.trim();

        const locality =
            document.getElementById("locality")
                .value.trim();

        const pinCode =
            document.getElementById("pinCode")
                .value.trim();

        const requiredDateTime =
            document.getElementById("requiredDateTime")
                .value;

        const description =
            document.getElementById("description")
                .value.trim();


        // ----------------------------
        // Validation
        // ----------------------------

        if (
            contactNumber.length !== 10 ||
            isNaN(contactNumber)
        ) {

            alert(
                "Please enter a valid 10-digit contact number."
            );

            return;
        }


        if (Number(quantity) <= 0) {

            alert(
                "Blood quantity must be greater than zero."
            );

            return;
        }


        if (
            pinCode.length !== 6 ||
            isNaN(pinCode)
        ) {

            alert("Please enter a valid 6-digit PIN code.");

            return;
        }


        const requestData = {

            requesterName,
            requiredBloodGroup,
            quantity: Number(quantity),
            patientName,
            hospital,
            city,
            locality,
            pinCode,
            requiredDateTime,
            description,
            contactNumber

        };


        try {

            const response = await fetch(
                `${API_URL}/requests`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(requestData)

                }
            );


            const result = await response.json();


            if (!response.ok) {

                alert(
                    result.message ||
                    "Unable to create emergency request."
                );

                return;
            }


            alert(
                "Emergency request created successfully!"
            );


            console.log(
                "Matching donors:",
                result.matchingDonors
            );


            emergencyForm.reset();


            // Redirect to emergency request page

            window.location.href =
                "emergency-request.html";


        } catch (error) {

            console.error(error);

            alert(
                "Unable to connect to the server. " +
                "Make sure the backend is running."
            );
        }

    });

}


// ============================================================
// 5. EMERGENCY REQUEST LIST
// ============================================================

const requestResults =
    document.getElementById("requestResults");


const requestStatus =
    document.getElementById("requestStatus");


if (requestResults) {

    loadEmergencyRequests();


    if (requestStatus) {

        requestStatus.addEventListener(
            "change",
            loadEmergencyRequests
        );

    }

}


async function loadEmergencyRequests() {

    requestResults.innerHTML =
        "<p>Loading emergency requests...</p>";


    try {

        const response =
            await fetch(`${API_URL}/requests`);

        const result =
            await response.json();


        if (!response.ok) {

            requestResults.innerHTML =
                `<p>${result.message}</p>`;

            return;
        }


        let requests = result.data;


        // Filter by status

        if (
            requestStatus &&
            requestStatus.value !== "ALL"
        ) {

            requests = requests.filter(
                request =>
                    request.status ===
                    requestStatus.value
            );

        }


        displayRequests(requests);


    } catch (error) {

        console.error(error);

        requestResults.innerHTML =
            "<p>Unable to load emergency requests.</p>";
    }

}


// ============================================================
// 6. DISPLAY EMERGENCY REQUESTS
// ============================================================

function displayRequests(requests) {

    if (requests.length === 0) {

        requestResults.innerHTML = `
            <div class="empty-message">

                <h3>No requests found</h3>

                <p>
                    There are currently no requests
                    matching this status.
                </p>

            </div>
        `;

        return;
    }


    requestResults.innerHTML = "";


    requests.forEach(function (request) {

        const requestCard =
            document.createElement("article");


        requestCard.innerHTML = `

            <h3>
                🚨 ${request.requiredBloodGroup}
                Blood Required
            </h3>

            <p>
                <strong>Quantity:</strong>
                ${request.quantity} unit(s)
            </p>

            <p>
                <strong>Patient:</strong>
                ${request.patientName}
            </p>

            <p>
                <strong>Hospital:</strong>
                ${request.hospital}
            </p>

            <p>
                <strong>Location:</strong>
                ${request.locality},
                ${request.city}
            </p>

            <p>
                <strong>Required By:</strong>
                ${request.requiredDateTime}
            </p>

            <p>
                <strong>Status:</strong>
                <span class="status">
                    ${request.status}
                </span>
            </p>

            <a
                class="button"
                href="request-details.html?id=${request.id}"
            >
                View Details
            </a>

        `;


        requestResults.appendChild(requestCard);

    });

}


// ============================================================
// 7. REQUEST DETAILS
// ============================================================

const requestDetails =
    document.getElementById("requestDetails");


if (requestDetails) {

    loadRequestDetails();

}


async function loadRequestDetails() {

    const params =
        new URLSearchParams(window.location.search);


    const id = params.get("id");


    if (!id) {

        requestDetails.innerHTML =
            "<p>Invalid request ID.</p>";

        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/requests/${id}`);

        const result =
            await response.json();


        if (!response.ok) {

            requestDetails.innerHTML =
                `<p>${result.message}</p>`;

            return;
        }


        const request = result.data;


        requestDetails.innerHTML = `

            <article>

                <h2>
                    🚨 ${request.requiredBloodGroup}
                    Blood Required
                </h2>

                <p>
                    <strong>Quantity:</strong>
                    ${request.quantity} unit(s)
                </p>

                <p>
                    <strong>Patient:</strong>
                    ${request.patientName}
                </p>

                <p>
                    <strong>Hospital:</strong>
                    ${request.hospital}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${request.locality},
                    ${request.city}
                    - ${request.pinCode}
                </p>

                <p>
                    <strong>Required By:</strong>
                    ${request.requiredDateTime}
                </p>

                <p>
                    <strong>Requester:</strong>
                    ${request.requesterName}
                </p>

                <p>
                    <strong>Contact:</strong>
                    ${request.contactNumber}
                </p>

                <p>
                    <strong>Emergency Details:</strong>
                    ${request.description || "Not provided"}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${request.status}
                </p>

            </article>

        `;


        // Hide management buttons if request isn't active

        if (request.status !== "ACTIVE") {

            const actions =
                document.getElementById("requestActions");

            if (actions) {
                actions.style.display = "none";
            }

        }

    } catch (error) {

        console.error(error);

        requestDetails.innerHTML =
            "<p>Unable to load request details.</p>";
    }

}


// ============================================================
// 8. UPDATE REQUEST STATUS
// ============================================================

const fulfillButton =
    document.getElementById("fulfillButton");

const cancelButton =
    document.getElementById("cancelButton");


if (fulfillButton) {

    fulfillButton.addEventListener(
        "click",
        function () {

            updateRequestStatus("FULFILLED");

        }
    );

}


if (cancelButton) {

    cancelButton.addEventListener(
        "click",
        function () {

            updateRequestStatus("CANCELLED");

        }
    );

}


async function updateRequestStatus(status) {

    const params =
        new URLSearchParams(window.location.search);


    const id = params.get("id");


    if (!id) {

        alert("Invalid request ID.");

        return;
    }


    const confirmed =
        confirm(
            `Are you sure you want to mark this request as ${status}?`
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/requests/${id}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        status: status
                    })

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            alert(
                result.message ||
                "Unable to update request."
            );

            return;
        }


        alert(
            `Request marked as ${status}.`
        );


        window.location.reload();


    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the server."
        );
    }

}


// ============================================================
// 9. DASHBOARD
// ============================================================

const userName =
    document.getElementById("userName");


if (userName) {

    loadDashboard();

}


async function loadDashboard() {

    try {

        // For demonstration, use donor ID 1

        const response =
            await fetch(`${API_URL}/donors/1`);

        const result =
            await response.json();


        if (!response.ok) {
            return;
        }


        const donor = result.data;


        document.getElementById("userName")
            .textContent = donor.name;


        document.getElementById("userBloodGroup")
            .textContent = donor.bloodGroup;


        document.getElementById("userLocation")
            .textContent =
                `${donor.locality}, ${donor.city}`;


        document.getElementById("userAvailability")
            .textContent =
                donor.availability
                    ? "Available"
                    : "Unavailable";


        const availabilityToggle =
            document.getElementById(
                "availabilityToggle"
            );


        if (availabilityToggle) {

            availabilityToggle.checked =
                donor.availability;


            availabilityToggle.addEventListener(
                "change",
                function () {

                    updateDonorAvailability(
                        donor.id,
                        availabilityToggle.checked
                    );

                }
            );

        }

    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

    }

}


// ============================================================
// 10. UPDATE DONOR AVAILABILITY
// ============================================================

async function updateDonorAvailability(
    donorId,
    availability
) {

    try {

        const response =
            await fetch(
                `${API_URL}/donors/${donorId}`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        availability:
                            availability
                    })

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            alert(
                result.message ||
                "Unable to update availability."
            );

            return;
        }


        const status =
            document.getElementById(
                "userAvailability"
            );


        if (status) {

            status.textContent =
                availability
                    ? "Available"
                    : "Unavailable";

        }

    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the server."
        );

    }

}