const main = document.querySelector("#root");
const loader = document.querySelector(".loader");

loader.style.display = "flex";
main.style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loader.style.display = "none";
    main.style.display = "";
  }, 2000);
});