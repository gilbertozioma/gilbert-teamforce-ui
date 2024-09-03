// EmailJS
// var swiper = new Swiper(".swiper-container", {
//   slidesPerView: 1,
//   spaceBetween: 50,
//   loop: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

//__________________________ FAQ ____________________________________________

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item, index) => {
  const icon = item.querySelector(".icon");
  const question = item.querySelector(".question");
  const content = item.querySelector("p");

  // Open the first FAQ item by default
  if (index === 1) {
    item.classList.add("open");
    icon.textContent = "-";
  }

  icon.addEventListener("click", () => {
    item.classList.toggle("open");
    icon.classList.toggle("active");
    if (item.classList.contains("open")) {
      icon.textContent = "-";
    } else {
      icon.textContent = "+";
    }
  });
  question.addEventListener("click", () => {
    item.classList.toggle("open");
    question.classList.toggle("active");
    if (item.classList.contains("open")) {
      icon.textContent = "-";
    } else {
      icon.textContent = "+";
    }
  });
});

// Contact Form
//__________________________ Contact form ____________________________________________

function showError(input, message) {
  input.classList.add("is-invalid");
  document.querySelector("#" + input.id + "_error").innerText = message;
  return false;
}

function removeError(input) {
  input.classList.remove("is-invalid");
  document.querySelector("#" + input.id + "_error").innerText = "";
}

function sendMessage() {
  var sender_name = document.querySelector("#sender_name");
  var sender_email = document.querySelector("#sender_email");
  var subject = document.querySelector("#subject");
  var message = document.querySelector("#message");

  // Individual field validation
  var hasEmptyField = false;
  if (sender_name.value === "") {
    showError(sender_name, "Please enter your name");
    hasEmptyField = true;
  } else {
    removeError(sender_name);
  }

  if (sender_email.value === "") {
    showError(sender_email, "Please enter your email address");
    hasEmptyField = true;
  } else if (!sender_email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    showError(sender_email, "Invalid email address");
    hasEmptyField = true;
  } else {
    removeError(sender_email);
  }

  if (subject.value === "") {
    showError(subject, "Please enter a subject");
    hasEmptyField = true;
  } else {
    removeError(subject);
  }

  if (message.value === "") {
    showError(message, "Please enter a message");
    hasEmptyField = true;
  } else {
    removeError(message);
  }

  // Initialize EmailJS
  if (!hasEmptyField) {
    var sendButton = document.getElementById("sendMessage");
    var spinner = document.getElementById("spinner");
    var buttonText = document.getElementById("button-text");

    // Show spinner and disable button
    spinner.classList.remove("d-none");
    buttonText.textContent = "Sending...";

    /* -------------------------------------------- */
    /*  Attention, the following keys are paid API keys.
    /   
    /   Please use only for this assessment.
    /   
    / -------------------------------------------- */
    emailjs.init("_zhsB5c1MbMGb4mLv");

    var serviceID = "service_tyyiuwm";
    var templateID = "template_qbmtw9o";

    /* -------------------------------------------- */

    var params = {
      sender_name: sender_name.value,
      sender_email: sender_email.value,
      subject: subject.value,
      message: message.value,
    };

    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        // Reset form fields
        removeError(sender_name);
        removeError(sender_email);
        removeError(subject);
        removeError(message);
        sender_name.value = "";
        sender_email.value = "";
        subject.value = "";
        message.value = "";
        window.location.href = "thank-you.html";
      })
      .catch((error) => {
        window.location.href = "message-not-sent.html";
        console.log("FAILED...", error);
      })
      .finally(() => {
        // Hide spinner and re-enable button
        spinner.classList.add("d-none");
        buttonText.textContent = "Get Started Now";
      });
  }
}

//__________________________ Back to top button ____________________________________________

// Get the button
var backToTopBtn = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}