const SUPABASE_URL = "https://hnrmlwepcstecbzntvza.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_10EOWbDQGoEOBSi0mXzjDQ_3G64Rvtd";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadMessages() {
  const messageList = document.getElementById("messageList");
  messageList.innerHTML = "";

  const { data, error } = await supabaseClient
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("读取失败：", error);
    return;
  }

  data.forEach((item) => {
  const card = document.createElement("div");
  card.className = "message-card";

  const time = document.createElement("div");
  time.className = "message-time";
  time.textContent = new Date(item.created_at).toLocaleString("zh-CN");

  const content = document.createElement("div");
  content.className = "message-text";
  content.textContent = item.content;

  card.appendChild(time);
  card.appendChild(content);
  messageList.appendChild(card);
});
}

async function addMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (!text) {
    alert("先写一点内容吧。");
    return;
  }

  const { error } = await supabaseClient
    .from("posts")
    .insert([{ content: text }]);

  if (error) {
    alert("发布失败，请稍后再试。");
    console.error(error);
    return;
  }

  input.value = "";
  loadMessages();
}

window.addEventListener("DOMContentLoaded", loadMessages);
