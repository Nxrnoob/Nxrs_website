// sakura.js

document.addEventListener("DOMContentLoaded", function () {
  const numberOfPetals = 30;
  const body = document.body;

  for (let i = 0; i < numberOfPetals; i++) {
    const petal = document.createElement("div");
    petal.classList.add("sakura");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDelay = Math.random() * 10 + "s";
    petal.style.animationDuration = 5 + Math.random() * 5 + "s";
    body.appendChild(petal);
  }
});

