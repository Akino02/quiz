const start = document.getElementById("start");
const typesofquizzes = document.getElementById("typeofquiz");
const typequiz = document.getElementsByClassName("typequiz");
const hard = document.getElementById("hard");
const qnum = document.getElementById("qnum");
const title = document.getElementById("name");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const answer = document.getElementsByClassName("answer");
const od1 = document.getElementById("od1");
const od2 = document.getElementById("od2");
const od3 = document.getElementById("od3");
const od4 = document.getElementById("od4");
const next = document.getElementById("next");
const backtomenu = document.getElementById("backtomenu");
const points = document.getElementById("points");
const log = document.getElementById("log");
const procents = document.getElementById("procents");
const wrongcontainer = document.getElementById("wrongcontainer");
const end = document.getElementById("end");
const timer = document.getElementById("timer");
let id = 0;
let correct = 0;
let cviceni = 1;
let sec = 0;
let desec = 0;
let min = 0;
let demin = 0;
let clock;

let lastselect;
let typeofquiz;

function viewquest() {
  setInterval(() => {
    if (id == 10 && typeofquiz == 1) {
      hard.innerHTML = "HTML/CSS/JS";
    } else if (id == 20 && typeofquiz == 1) {
      hard.innerHTML = "Java";
    } else if (id == 30) {
      hard.innerHTML = "Konec quizu";
      qnum.style.display = "none";
    }
    else if(id == 0 && typeofquiz == 2){
      hard.innerHTML = "Sítě";
    }
    qnum.innerHTML = `${id + 1}/30`;
  }, 1);
}

function worldclock() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let time = hour + ":" + minutes + ":" + seconds;

  document.getElementById("clock").innerText = time;
  let t = setTimeout(function () {
    worldclock();
  }, 1000);
}
worldclock();

let canvaswidth = document.body.offsetWidth;
let canvasheight = document.body.offsetHeight;

setInterval(() => {
  //každých 100s se restartuje velikost canvasu
  canvaswidth = document.body.offsetWidth;
  canvasheight = document.body.offsetHeight + 100;
  canvas.width = canvaswidth;
  canvas.height = canvasheight - 100;
  //console.log(canvas.width);
  //console.log(canvas.height);
}, 10000);

//Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const mousecoor = document.getElementById("mousecoor");

canvas.width = canvaswidth;
canvas.height = canvasheight;

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let snow = Math.random(Math.floor) * canvas.width;
let changepossX = Math.random(Math.floor) * 50;
let changepossY = Math.random(Math.floor) * 50;
let changepossXY1 = Math.random(Math.floor) * 25;
let circlesposs = [];
let maxcircles = 20;
let radius = Math.random(Math.floor) * 15;
let radiusarr = [];

//color
let redr = Math.random(Math.floor) * 256;
let greenr = Math.random(Math.floor) * 256;
let bluer = Math.random(Math.floor) * 256;
let savecolor = [];

let distToCircle;
let distCircleToCircle;

let randompossX = Math.random(Math.floor) * canvas.width;
let randompossY = Math.random(Math.floor) * canvas.height;
let speedX = Math.random(Math.floor) * 1;
let speedY = Math.random(Math.floor) * 1;
let speedXY = [];

function mousepos() {
  canvas.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY; //-84 aby myš byla správně napozicována
    mousecoor.innerHTML = `${mouseX},${mouseY}`;
  });
}

function drawCanvas() {
  ctx.fillStyle = "white";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //circles
  //myš //circlesposs.push({ x: (mouseX+changepossX-changepossXY1), y: (mouseY+changepossY-changepossXY1) });
  //obrazovka je top //circlesposs.push({ x: snow, y: 0});
  circlesposs.push({ x: randompossX, y: randompossY }); //obrazovka všude

  savecolor.push({ x: redr, y: greenr, z: bluer }); //color

  speedXY.push({ x: speedX, y: speedY }); //Speed

  radiusarr.push({ x: radius });
  if (circlesposs.length >= 100) {
    for (let i = 0; i < 100; i++) {
      if (radiusarr[i].x < 0) {
        radiusarr[i].x = Math.abs(radiusarr[i].x);
      }
      ctx.beginPath();
      ctx.fillStyle = `rgb(${savecolor[i].x},${savecolor[i].y},${savecolor[i].z})`; //barva kruhů
      ctx.arc(
        circlesposs[i].x,
        circlesposs[i].y,
        radiusarr[i].x,
        0,
        Math.PI * 2
      );
      ctx.fill();

      distToCircle = Math.sqrt(
        (mouseX - circlesposs[i].x) ** 2 + (mouseY - circlesposs[i].y) ** 2
      );
      for (let y = 0; y < 100; y++) {
        distCircleToCircle = Math.sqrt(
          (circlesposs[y].x - circlesposs[i].x) ** 2 +
            (circlesposs[y].y - circlesposs[i].y) ** 2
        );
        if (distCircleToCircle < 100) {
          ctx.beginPath();
          //ctx.strokeStyle = `rgba(256,0,0,${opacitystick})`;                                                //barva kruhu s kruhem
          ctx.moveTo(circlesposs[y].x, circlesposs[y].y);
          ctx.lineTo(circlesposs[i].x, circlesposs[i].y);
          ctx.stroke();
        }
      }
      if (distToCircle < 100) {
        //let opacitystick = (1-(distToCircle/100)); //čím blíže tím bude plnější
        let opacitystick = distToCircle / 100; //čím blíže tím bude prázdnější                               //barva kruhu s myší
        ctx.beginPath();
        ctx.strokeStyle = `rgba(256,0,0,${opacitystick})`;
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(circlesposs[i].x, circlesposs[i].y);
        ctx.stroke();
      }
    }
  }
}
//opacity podle vzdálenosti k objektu
function fall() {
  for (let i = 0; i < circlesposs.length; i++) {
    circlesposs[i].y += speedXY[i].y;
    circlesposs[i].x -= speedXY[i].x;
    //if (circlesposs[i].y <= canvas.height && radiusarr[i].x > 0) {
    //  circlesposs[i].y += speedXY[i].y;
    //  //radiusarr[i].x -= 0.01;   //potom navazuje čáru s 0
    //  if (circlesposs[i].y == canvas.height) {
    //    circlesposs[i].x = 0; //pokud by to vycházelo na celou stránku
    //  }
    //} else if (radiusarr[i].x <= 0 || circlesposs[i].y >= canvas.height) {
    //  radiusarr[i].x = 0;
    //}
    if (
      circlesposs[i].y + radiusarr[i].x > canvas.height ||
      circlesposs[i].x + radiusarr[i].x > canvas.width
    ) {
      //bottom
      if (circlesposs[i].y > 0) {
        circlesposs[i].y -= speedXY[i].y;
        speedXY[i].y = speedXY[i].y * -1;
      }
      if (circlesposs[i].x > 0) {
        circlesposs[i].x += speedXY[i].x;
        speedXY[i].x = speedXY[i].x * -1;
        //console.log("ahoj right");
      }
    } else if (
      circlesposs[i].y + radiusarr[i].x < canvas.height ||
      circlesposs[i].x + radiusarr[i].x < canvas.width
    ) {
      //top   //left
      if (circlesposs[i].y < 0) {
        circlesposs[i].y -= speedXY[i].y;
        speedXY[i].y = speedXY[i].y * -1;
        //console.log("Ahoj top");
      } else if (circlesposs[i].x < 0) {
        circlesposs[i].x += speedXY[i].x;
        speedXY[i].x = speedXY[i].x * -1;
        //console.log("ahoj left");
      }
    }
  }
}

//https://stackoverflow.com/questions/37101054/how-to-make-object-bounce-off-edge-of-canvas
function bounce() {
  for (let i = 0; i < 100; i++) {
    if (circlesposs[i].y + radiusarr[i].x >= canvas.height) {
      circlesposs[i].y -= 1;
    } else if (circlesposs[i].y + radiusarr[i].x <= canvas.height) {
      circlesposs[i].y += 1;
    } else if (circlesposs[i].x + radiusarr[i].x >= canvas.width) {
      circlesposs[i].x += 1;
    } else if (circlesposs[i].x + radiusarr[i].x <= canvas.width) {
      circlesposs[i].x -= 1;
    }
  }
}

function drawingLoop() {
  setInterval(() => {
    radius = Math.random(Math.floor) * 15;
    changepossX = Math.random(Math.floor) * 50;
    changepossY = Math.random(Math.floor) * 50;
    changepossXY1 = Math.random(Math.floor) * 25;
    snow = Math.random(Math.floor) * canvas.width;

    redr = Math.random(Math.floor) * 256;
    greenr = Math.random(Math.floor) * 256;
    bluer = Math.random(Math.floor) * 256;
    randompossX = Math.random(Math.floor) * canvas.width;
    randompossY = Math.random(Math.floor) * canvas.height;
    speedX = Math.random(Math.floor) * 1;
    speedY = Math.random(Math.floor) * 1;
    drawCanvas();
  }, 50);
  setInterval(() => {
    fall();
  }, 10);
}
//konec canvasu

window.onload = async () => {
  typeofquiz = 0;
//udělat lepší podmínku pro kontrolu JSON
  typequiz[0].addEventListener("click", () => {
    typeofquiz = 1;
    if (typeofquiz == 1) {
      typequiz[0].style.backgroundColor = "lightgrey";
      typequiz[1].style.backgroundColor = "grey";
      start.style.display = "flex";
    }
  });
  typequiz[1].addEventListener("click", () => {
    typeofquiz = 2;
    if (typeofquiz == 2) {
      typequiz[1].style.backgroundColor = "lightgrey";
      typequiz[0].style.backgroundColor = "grey";
      start.style.display = "flex";
    }
  });

  const file1 = await fetch("./res/data/quiz1.json");
  const file2 = await fetch("./res/data/quiz2.json");

  const Questions = await file1.json(file1);
  const Questions2 = await file2.json(file2);

  console.log(Questions[30].numq);
  console.log(Questions2[30].numq);

  start.addEventListener("click", () => {
    viewquest();
    typesofquizzes.style.display = "none";
    hard.style.display = "block";
    qnum.style.display = "block";
    start.style.display = "none";
    quiz.style.display = "block";
    next.style.display = "flex";
    log.style.display = "block";
    title.style.marginBottom = "0px";
    //setquestions
    if (typeofquiz == 1) {
      question.innerText = Questions[id].q;
      od1.innerText = Questions[id].text[0];
      od2.innerText = Questions[id].text[1];
      od3.innerText = Questions[id].text[2];
      od4.innerText = Questions[id].text[3];
      od1.value = Questions[id].isCorrect[0];
      od2.value = Questions[id].isCorrect[1];
      od3.value = Questions[id].isCorrect[2];
      od4.value = Questions[id].isCorrect[3];
    } else if (typeofquiz == 2) {
      question.innerText = Questions2[id].q;
      od1.innerText = Questions2[id].text[0];
      od2.innerText = Questions2[id].text[1];
      od3.innerText = Questions2[id].text[2];
      od4.innerText = Questions2[id].text[3];
      od1.value = Questions2[id].isCorrect[0];
      od2.value = Questions2[id].isCorrect[1];
      od3.value = Questions2[id].isCorrect[2];
      od4.value = Questions2[id].isCorrect[3];
    }
    //timer
    clock = setInterval(() => {
      if (desec % 5 == 0 && sec % 9 == 0 && desec != 0 && sec != 0) {
        sec = 0;
        desec = 0;
        min++;
      } else if (sec % 9 == 0 && sec != 0) {
        sec = 0;
        desec++;
      } else {
        sec++;
      }
      timer.innerHTML = `${min}:${desec}${sec}`;
    }, 1000);
  });

  let selected = "";
  //selector
  od1.addEventListener("click", () => {
    od1.style.backgroundColor = "lightgoldenrodyellow";
    od2.style.backgroundColor = "lightskyblue";
    od3.style.backgroundColor = "lightskyblue";
    od4.style.backgroundColor = "lightskyblue";
    selected = od1.value;
    lastselect = 0;
  });

  od2.addEventListener("click", () => {
    od1.style.backgroundColor = "lightskyblue";
    od2.style.backgroundColor = "lightgoldenrodyellow";
    od3.style.backgroundColor = "lightskyblue";
    od4.style.backgroundColor = "lightskyblue";
    selected = od2.value;
    lastselect = 1;
  });

  od3.addEventListener("click", () => {
    od1.style.backgroundColor = "lightskyblue";
    od2.style.backgroundColor = "lightskyblue";
    od3.style.backgroundColor = "lightgoldenrodyellow";
    od4.style.backgroundColor = "lightskyblue";
    selected = od3.value;
    lastselect = 2;
  });

  od4.addEventListener("click", () => {
    od1.style.backgroundColor = "lightskyblue";
    od2.style.backgroundColor = "lightskyblue";
    od3.style.backgroundColor = "lightskyblue";
    od4.style.backgroundColor = "lightgoldenrodyellow";
    selected = od4.value;
    lastselect = 3;
  });

  let check = Questions[30].numq; //tady se napíše poslední otázka a kolik tam je otázek

  next.addEventListener("click", () => {
    if (selected != "") {
      if (selected == "true") {
        correct++;
      } else {
        log.innerHTML += `${cviceni}. otázka: `;
        if(typeofquiz == 1){
          log.innerHTML += `${Questions[id].q}. `;
        }
        else if(typeofquiz == 2){
          log.innerHTML += `${Questions2[id].q}. `;
        }
        if (typeofquiz == 1) {
          if (od1.value == "true") {
            log.innerHTML += `Správně je ${Questions[id].text[0]}<br>`;
            log.innerHTML += `Vy jste dal ${Questions[id].text[lastselect]}<br>`;
          } else if (od2.value == "true") {
            log.innerHTML += `Správně je ${Questions[id].text[1]}<br>`;
            log.innerHTML += `Vy jste dal ${Questions[id].text[lastselect]}<br>`;
          } else if (od3.value == "true") {
            log.innerHTML += `Správně je ${Questions[id].text[2]}<br>`;
            log.innerHTML += `Vy jste dal ${Questions[id].text[lastselect]}<br>`;
          } else if (od4.value == "true") {
            log.innerHTML += `Správně je ${Questions[id].text[3]}<br>`;
            log.innerHTML += `Vy jste dal ${Questions[id].text[lastselect]}<br>`;
          }
          console.log("CHYBA")
        } else if (typeofquiz == 2) {
          if (od1.value == "true") {
            log.innerHTML += `Správně je ${Questions2[id].text[0]}<br>`;
            log.innerHTML += `Vy jste dal ${Questions2[id].text[lastselect]}<br>`;
          } else if (od2.value == "true") {
            log.innerHTML += `Správně je ${Questions2[id].text[1]}<br>`;
            log.innerHTML += `Vy jste dal ${Questions2[id].text[lastselect]}<br>`;
          } else if (od3.value == "true") {
            log.innerHTML += `Správně je ${Questions2[id].text[2]}<br>`;
            log.innerHTML += `Vy jste dal ${Questions2[id].text[lastselect]}<br>`;
          } else if (od4.value == "true") {
            log.innerHTML += `Správně je ${Questions2[id].text[3]}<br>`;
            log.innerHTML += `Vy jste dal ${Questions2[id].text[lastselect]}<br>`;
          }
        }
      }
      id++;
      cviceni++;
      console.log(id);
      if (typeofquiz == 1) {
        question.innerText = Questions[id].q;
        od1.innerText = Questions[id].text[0];
        od2.innerText = Questions[id].text[1];
        od3.innerText = Questions[id].text[2];
        od4.innerText = Questions[id].text[3];
        od1.value = Questions[id].isCorrect[0];
        od2.value = Questions[id].isCorrect[1];
        od3.value = Questions[id].isCorrect[2];
        od4.value = Questions[id].isCorrect[3];
      }
      else if(typeofquiz == 2){
        question.innerText = Questions2[id].q;
      od1.innerText = Questions2[id].text[0];
      od2.innerText = Questions2[id].text[1];
      od3.innerText = Questions2[id].text[2];
      od4.innerText = Questions2[id].text[3];
      od1.value = Questions2[id].isCorrect[0];
      od2.value = Questions2[id].isCorrect[1];
      od3.value = Questions2[id].isCorrect[2];
      od4.value = Questions2[id].isCorrect[3];
      }
      od1.style.backgroundColor = "lightskyblue";
      od2.style.backgroundColor = "lightskyblue";
      od3.style.backgroundColor = "lightskyblue";
      od4.style.backgroundColor = "lightskyblue";
      selected = "";
      //result
      if (id == check) {
        clearInterval(clock);
        let b = (100 * correct) / id;
        quiz.style.display = "none";
        next.style.display = "none";
        backtomenu.style.display = "flex";
        points.style.display = "flex";
        if (log.innerHTML != "") {
          wrongcontainer.style.display = "block";
        }
        points.innerHTML += `${correct + "/" + id}`;
        procents.innerHTML += `${b.toFixed(1)}%`;
        title.style.marginBottom = "125px";
        end.style.display = "block";
      }
    }
  });
  backtomenu.addEventListener("click", () => {
    location.reload();
  });
  //canvas
  mousepos();
  drawingLoop();
};

let docTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "Come back :(";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});