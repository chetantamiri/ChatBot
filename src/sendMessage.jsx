// frontend/src/sendMessage.js
export async function sendMessage(userMessage) {
  try {
    const response = await fetch("http://localhost:5174/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userMessage }),
    });

    const data = await response.json();
    return data.response || "Sorry, no response";
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    return "Error: Could not get response.";
  }
}
