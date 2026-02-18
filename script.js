// ===== ADD REVIEW FUNCTION =====
function addReview() {

    let name = document.getElementById("review-name").value.trim();
    let reviewText = document.getElementById("review-input").value.trim();

    let delivery = document.getElementById("delivery-rating").value;
    let behaviour = document.getElementById("behaviour-rating").value;
    let experience = document.getElementById("experience-rating").value;
    let support = document.getElementById("support-rating").value;

    if (name === "" || reviewText === "") {
        alert("Please enter your name and review!");
        return;
    }

    let reviewObject = {
        name: name,
        text: reviewText,
        delivery: delivery,
        behaviour: behaviour,
        experience: experience,
        support: support
    };

    // Get old reviews or empty array
    let savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    // Add new review
    savedReviews.push(reviewObject);

    // Save again
    localStorage.setItem("reviews", JSON.stringify(savedReviews));

    // Show immediately
    displayReview(reviewObject);

    // Clear input fields
    document.getElementById("review-name").value = "";
    document.getElementById("review-input").value = "";
}


// ===== DISPLAY REVIEW FUNCTION =====
function displayReview(review) {

    const reviewList = document.getElementById("reviewList");

    const reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review");

    reviewDiv.innerHTML = `
        <h4>${review.name}</h4>
        <p>${review.text}</p>
        <p>Delivery: ${review.delivery} ⭐</p>
        <p>Behaviour: ${review.behaviour} ⭐</p>
        <p>Experience: ${review.experience} ⭐</p>
        <p>Support: ${review.support} ⭐</p>
        <hr>
    `;

    reviewList.appendChild(reviewDiv);
}


// ===== LOAD REVIEWS ON PAGE LOAD =====
window.onload = function () {

    let savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];

    savedReviews.forEach(function(review) {
        displayReview(review);
    });

};
function openForm(price) {
    document.getElementById("addressForm").style.display = "block";
    document.getElementById("price").value = price;
}

function closeForm() {
    document.getElementById("addressForm").style.display = "none";
}
let paymentLink = "";

function openShippingForm(link) {
    paymentLink = link;
    document.getElementById("shippingForm").style.display = "block";
}

function closeShippingForm() {
    document.getElementById("shippingForm").style.display = "none";
}


function submitShippingAndPay() {

    let name = document.getElementById("custName").value;
    let address = document.getElementById("custAddress").value;
    let city = document.getElementById("custCity").value;
    let pincode = document.getElementById("custPincode").value;
    let phone = document.getElementById("custPhone").value;
    let product = paymentLink; // or store product name separately

    if (!name || !address || !city || !pincode || !phone) {
        alert("Please fill all fields!");
        return;
    }

    // Google Form POST
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScox8z5uYgypv_FAYaEI9I4jRvqWuYi_zEfEEd1xoHQeNO0hw/formResponse";

    const formData = new FormData();
    formData.append("entry.438195876", name);
    formData.append("entry.2034393407", address);
    formData.append("entry.1637147278", city);
    formData.append("entry.338986151", pincode);
    formData.append("entry.1922405515", phone);
    formData.append("entry.96881697", product);

    fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData
    });

    // Open Razorpay link
    window.open(paymentLink, "_blank");

    closeShippingForm();
}
