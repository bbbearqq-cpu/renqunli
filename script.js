function addMessage() {
  const input = document.getElementById("messageInput");
  const messageList = document.getElementById("messageList");
  const text = input.value.trim();

  if (!text) {
    alert("先写一点内容吧。");
    return;
  }

  const card = document.createElement("div");
  card.className = "message-card";
  card.textContent = text;

  messageList.prepend(card);
  input.value = "";
}