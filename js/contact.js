const form = document.querySelector('form');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const getData = new FormData(form);

    const data = {};
    getData.forEach((value, key) => {
        data[key] = value;
    });

    console.log(JSON.stringify(data));

    const hey = document.createElement("dialog");
    hey.innerHTML = `
    <p>Dear <span> ${data.name},</span></p><br>
    <p>Thank you for using our service. We appreciate your feedback and will review it carefully. Our team will reach out to you if further information is needed.</p><br>
    <p>Thank you once again for your valuable input!</p><br>
    <p>Best regards,<br>Your <span>Health-Fit<span></p><br><br>
`;

    hey.style.backgroundColor = "purple";
    
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
        hey.close(); 
        form.reset();
    });

    hey.appendChild(closeButton);
    document.body.appendChild(hey);
    
    hey.showModal(); // Show the dialog
});
