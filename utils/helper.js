export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function truncateText(text = "", length = 100) {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

export function generateId() {
  return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}
