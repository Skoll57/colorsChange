const cols = document.querySelectorAll(".col");
const title = document.querySelectorAll("h2");

document.addEventListener("keydown", (e) => {
  e.preventDefault();

  if (e.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (e) => {
  const type = e.target.dataset.type;

  if (type === "lock") {
    const node =
      e.target.tagName.toLowerCase() === "i" ? e.target : e.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickboard(e.target.textContent);
  }
});

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function generateColor() {
  const hexCodes = "1234567890ABCDEF";
  let color = "";

  for (i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }

  return "#" + color;
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const title = col.querySelector("h2");
    const btn = col.querySelector("button");

    if (isLocked) {
      colors.push(title.textContent);
      return;
    }

    const color = isInitial ? colors[index] : generateColor();

    if (!isInitial) {
      colors.push(color);
    }

    title.textContent = color;
    col.style.background = color;

    setTextColor(title, color);
    setTextColor(btn, color);
  });

  updateColorsHash(colors);
}

// Luminance Text
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

// Colors in Hash
function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColors(true);
