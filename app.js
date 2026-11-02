(function () {
  "use strict";

  const storage = {
    get: function (key, fallback) {
      try {
        const saved = localStorage.getItem(key);
        return saved === null ? fallback : JSON.parse(saved);
      } catch (error) {
        return fallback; // storage blocked or broken: just carry on
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        // storage blocked (e.g. private window): ignore
      }
    }
  };

  let plants = storage.get("verdantPlants", STARTER_PLANTS);
  const plantList = document.getElementById("plant-list");
  const emptyState = document.getElementById("empty-state");
  const dialog = document.getElementById("plant-dialog");
  const form = document.getElementById("plant-form");

  function localDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function daysBetween(from, to) {
    const fromParts = from.split("-").map(Number);
    const toParts = to.split("-").map(Number);
    const fromUtc = Date.UTC(fromParts[0], fromParts[1] - 1, fromParts[2]);
    const toUtc = Date.UTC(toParts[0], toParts[1] - 1, toParts[2]);
    return Math.floor((toUtc - fromUtc) / 86400000);
  }

  function urgencyFor(plant, today) {
    const daysSinceWatering = daysBetween(plant.lastWatered, today);
    const daysUntilWatering = plant.interval - daysSinceWatering;
    if (daysUntilWatering < 0) {
      return { daysUntil: daysUntilWatering, label: "Overdue by " + Math.abs(daysUntilWatering) + " " + (Math.abs(daysUntilWatering) === 1 ? "day" : "days"), status: "overdue" };
    }
    if (daysUntilWatering === 0) {
      return { daysUntil: 0, label: "Water today", status: "today" };
    }
    if (daysUntilWatering === 1) {
      return { daysUntil: 1, label: "Water tomorrow", status: "soon" };
    }
    return { daysUntil: daysUntilWatering, label: "In " + daysUntilWatering + " days", status: "upcoming" };
  }

  function savePlants() {
    storage.set("verdantPlants", plants);
  }

  function makePlantRow(plant, urgency) {
    const row = document.createElement("article");
    row.className = "plant-row";

    const marker = document.createElement("span");
    marker.className = "plant-marker " + urgency.status;
    marker.setAttribute("aria-hidden", "true");
    marker.textContent = plant.name.trim().charAt(0).toUpperCase();

    const details = document.createElement("div");
    details.className = "plant-details";
    const name = document.createElement("h3");
    name.textContent = plant.name;
    const schedule = document.createElement("p");
    schedule.textContent = "Every " + plant.interval + " days · Last watered " + new Date(plant.lastWatered + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" });
    details.append(name, schedule);

    const status = document.createElement("span");
    status.className = "urgency " + urgency.status;
    status.textContent = urgency.label;

    const wateredButton = document.createElement("button");
    wateredButton.type = "button";
    wateredButton.className = "button water-button";
    wateredButton.textContent = "✓ Watered";
    wateredButton.setAttribute("aria-label", "Mark " + plant.name + " as watered today");
    wateredButton.addEventListener("click", function () {
      plant.lastWatered = localDateString(new Date());
      savePlants();
      renderPlants();
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "icon-button remove-button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", "Remove " + plant.name);
    removeButton.title = "Remove plant";
    removeButton.addEventListener("click", function () {
      plants = plants.filter(function (savedPlant) { return savedPlant.id !== plant.id; });
      savePlants();
      renderPlants();
    });

    row.append(marker, details, status, wateredButton, removeButton);
    return row;
  }

  function renderPlants() {
    const today = localDateString(new Date());
    const rankedPlants = plants.map(function (plant) {
      return { plant: plant, urgency: urgencyFor(plant, today) };
    }).sort(function (first, second) {
      return first.urgency.daysUntil - second.urgency.daysUntil || first.plant.name.localeCompare(second.plant.name);
    });
    const dueCount = rankedPlants.filter(function (item) { return item.urgency.daysUntil <= 0; }).length;

    document.getElementById("today-label").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
    document.getElementById("plant-count").textContent = plants.length;
    document.getElementById("due-summary").textContent = plants.length === 0
      ? "No plants to water yet"
      : dueCount === 0
        ? "All caught up. Nice work!"
        : dueCount + (dueCount === 1 ? " plant needs" : " plants need") + " water";
    plantList.replaceChildren.apply(plantList, rankedPlants.map(function (item) {
      return makePlantRow(item.plant, item.urgency);
    }));
    emptyState.hidden = plants.length > 0;
    plantList.hidden = plants.length === 0;
  }

  function openForm() {
    form.reset();
    document.getElementById("last-watered").value = localDateString(new Date());
    dialog.showModal();
    document.getElementById("plant-name").focus();
  }

  document.getElementById("open-form").addEventListener("click", openForm);
  document.getElementById("empty-add").addEventListener("click", openForm);
  document.getElementById("close-form").addEventListener("click", function () { dialog.close(); });
  document.getElementById("cancel-form").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    plants.push({
      id: "plant-" + Date.now(),
      name: String(formData.get("name")).trim(),
      interval: Number(formData.get("interval")),
      lastWatered: String(formData.get("lastWatered"))
    });
    savePlants();
    renderPlants();
    dialog.close();
  });

  renderPlants();
})();
