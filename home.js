
document.body.innerHTML = "";

document.body.style.background = "black";
document.body.style.margin = "0";
document.body.style.overflow = "hidden";


// ================================
// CANVAS
// ================================

const canvas =
    document.createElement("canvas");

document.body.appendChild(canvas);

canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx =
    canvas.getContext("2d");


// ================================
// HEART
// ================================

ctx.fillStyle = "#ffb6c1";

ctx.font =
    "bold 10px Arial";

ctx.textAlign =
    "center";

const scale = 15;


for (let i = 0; i < 600; i++) {

    const angle =
        (i * Math.PI * 2) / 600;


    const x =
        16 * Math.sin(angle) ** 3;


    const y =
        13 * Math.cos(angle)
        - 5 * Math.cos(2 * angle)
        - 2 * Math.cos(3 * angle)
        - Math.cos(4 * angle);


    const px =
        innerWidth / 2 + x * scale;


    const py =
        innerHeight / 2 - y * scale;


    ctx.fillText(
        "I love you",
        px,
        py
    );
}


// ================================
// BUTTON
// ================================

const button =
    document.createElement("button");

button.innerText =
    "❤️ Continue";


button.style.position =
    "fixed";

button.style.bottom =
    "30px";

button.style.left =
    "50%";

button.style.transform =
    "translateX(-50%)";

button.style.padding =
    "15px 35px";

button.style.border =
    "none";

button.style.borderRadius =
    "30px";

button.style.background =
    "#ff69b4";

button.style.color =
    "white";

button.style.fontSize =
    "18px";

button.style.fontWeight =
    "bold";

button.style.cursor =
    "pointer";


button.onclick = function () {

    window.location.href =
        "2home.html";

};


document.body.appendChild(button);

