const heroText = document.querySelector("#page1 .left h1");
const header = document.querySelector(".naviagtion .nav");
const loader = document.querySelector(".loading");
const main = document.querySelector("#root")

loader.style.display = "flex";
main.style.display = "none";

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loader.style.display = "none";
    main.style.display = "block";
  }, 2000);
});
setInterval(() => {
  const heroTexts = [
    "The Body Says What Words Cannot.",
    "Exercise not only changes your Body, it changes your Mind, your Attitude and your Mood.",
    "Exercise should be regarded as a tribute to the Heart.",
    "Good things come to those who Sweat.",
    "Reading is to the Mind what exercise is to the Body.",
  ];
  const index = heroTexts.indexOf(heroText.innerText);
  heroText.innerText = heroTexts[(index + 1) % heroTexts.length];
}, 12000);


