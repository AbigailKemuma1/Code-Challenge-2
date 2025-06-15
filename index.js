//Enter your code here//
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guest-form");
  const guestList = document.getElementById("guest-list");
  const guestNameInput = document.getElementById("guest-name");
  const guestCategory = document.getElementById("guest-category");

  let guests = [];

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = guestNameInput.value.trim();
    const category = guestCategory.value;

    if (!name) return;

    if (guests.length >= 10) {
      alert("Guest list limit reached (10 guests).");
      return;
    }

    const guest = {
      name,
      category,
      attending: true,
      timeAdded: new Date().toLocaleTimeString(),
    };

    guests.push(guest);
    renderGuests();
    form.reset();
  });

  function renderGuests() {
    guestList.innerHTML = "";
    guests.forEach((guest, index) => {
      const li = document.createElement("li");
      li.className = `category-${guest.category.toLowerCase()}`;

      const statusText = guest.attending ? "Can't wait" : "Oops, Sitamake";

      li.innerHTML = `
        <strong>${guest.name}</strong> [${guest.category}] - ${statusText} <br>
        <small>Added at: ${guest.timeAdded}</small>
        <br />
        <button class="toggle-btn">RSVP</button>
        <button class="edit-btn">Edit</button>
        <button class="remove-btn">Remove</button>
      `;

      li.querySelector(".remove-btn").addEventListener("click", () => {
        guests.splice(index, 1);
        renderGuests();
      });

      li.querySelector(".toggle-btn").addEventListener("click", () => {
        guest.attending = !guest.attending;
        renderGuests();
      });

      li.querySelector(".edit-btn").addEventListener("click", () => {
        const newName = prompt("Edit guest name:", guest.name);
        if (newName) {
          guest.name = newName.trim();
          renderGuests();
        }
      });

      guestList.appendChild(li);
    });
  }
});

