const msgForm = document.getElementById("msgForm");
const msgInput = document.getElementById("msgInput");
const msgList = document.getElementById("msgList");

// --- Load messages from the API ---
async function loadMessages() {
  const res = await fetch("/api/messages");
  const data = await res.json();
  msgList.innerHTML = "";
  if (data.success) {
    data.messages.forEach(m => {
      const li = document.createElement("li");
      li.textContent = m.text;
      msgList.appendChild(li);
    });
  }
}

// --- Submit new message ---
msgForm.addEventListener("submit", async e => {
  e.preventDefault();
  const text = msgInput.value.trim();
  if (!text) return;

  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const result = await res.json();

  if (result.success) {
    msgInput.value = "";
    loadMessages(); // Refresh list dynamically
  } else {
    alert(result.error);
  }
});

// Initial load
loadMessages();
