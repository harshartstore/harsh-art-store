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
}
function closeForm() {
    document.getElementById("addressForm").style.display = "none";
}

