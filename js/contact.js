const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log(JSON.stringify(data));

  // Create dialog
  const dialog = document.createElement("dialog");
  dialog.classList.add("feedback-dialog");
  dialog.innerHTML = `
    <div class="dialog-content">
      <h2>Thank You, <span>${data.name || "User"}</span>!</h2>
      <p>
        We truly appreciate your feedback and the time you took to reach out to us. 
        Our team will carefully review your message and contact you if more details are needed.
      </p>
      <p>Stay healthy and fit with <b>HealthFit</b> 💪</p>
    </div>
  `;

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.classList.add("close-btn");

  closeButton.addEventListener("click", () => {
    dialog.classList.add("fade-out");
    setTimeout(() => {
      dialog.close();
      dialog.remove();
      form.reset();
    }, 300); // match animation duration
  });

  dialog.querySelector(".dialog-content").appendChild(closeButton);
  document.body.appendChild(dialog);

  // Open with animation
  dialog.showModal();
  dialog.classList.add("fade-in");
});
