// Fictional starter plants make the watering priorities visible in the prototype.
// Plants added or changed by the user are saved in this browser's localStorage.
function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

const STARTER_PLANTS = [
  { id: "starter-pothos", name: "Golden pothos", interval: 7, lastWatered: daysAgo(8) },
  { id: "starter-peace-lily", name: "Peace lily", interval: 5, lastWatered: daysAgo(4) },
  { id: "starter-snake-plant", name: "Snake plant", interval: 21, lastWatered: daysAgo(13) }
];
