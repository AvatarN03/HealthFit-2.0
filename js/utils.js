const menu = document.querySelector(".menu-btn i");
const navItems = document.querySelector(".navigation .nav");
const rellax = new Rellax(".rellax");

// const main = document.querySelector("#root");
// const loader = document.querySelector(".loader");

// loader.style.display = "flex";
// main.style.display = "none";

// document.addEventListener("DOMContentLoaded", () => {
//   setTimeout(() => {
//     loader.style.display = "none";
//     main.style.display = "";
//   }, 2000);
// });

menu.addEventListener("click", () => {
  console.log("hii");
  
  menu.classList.toggle("fa-times");
  menu.classList.toggle("active");

  navItems.classList.toggle("active");
});
