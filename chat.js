const chatDiv = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Função para enviar mensagem
async function enviarMensagem() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("Você: " + message, "user");
  userInput.value = "";
  sendBtn.disabled = true; // evita múltiplos cliques

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) throw new Error("Erro ao conectar com o servidor");

    const data = await res.json();
    appendMessage("GPT: " + data.answer, "gpt");

  } catch (err) {
    console.error(err);
    appendMessage("Erro: não foi possível obter resposta do GPT.", "error");
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
}

// Evento de clique no botão
sendBtn.addEventListener("click", enviarMensagem);

// Evento de Enter no input
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") enviarMensagem();
});

// Função para adicionar mensagem ao chat
function appendMessage(msg, cls) {
  const p = document.createElement("p");
  p.textContent = msg;
  p.className = cls;
  chatDiv.appendChild(p);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}
