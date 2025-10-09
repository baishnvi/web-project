const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("responseMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop form from reloading the page

  // Collect values
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  let isValid = true;

  // Basic client-side validation
  if (username.value.trim().length < 3) {
    username.classList.add("is-invalid");
    isValid = false;
  } else username.classList.remove("is-invalid");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    email.classList.add("is-invalid");
    isValid = false;
  } else email.classList.remove("is-invalid");

  if (message.value.trim().length < 10) {
    message.classList.add("is-invalid");
    isValid = false;
  } else message.classList.remove("is-invalid");

  // If valid, send data to server
  if (isValid) {
    const data = {
      username: username.value,
      email: email.value,
      message: message.value,
    };

    const res = await fetch("/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    // Dynamic DOM update
    if (result.success) {
      responseMsg.textContent = "✅ Message sent successfully!";
      responseMsg.style.color = "green";
      form.reset();
    } else {
      responseMsg.textContent = `❌ ${result.error}`;
      responseMsg.style.color = "red";
    }
  }
});
