const start = document.getElementById("start");
const title = document.getElementById("name");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const answer = document.getElementsByClassName("answer");
const od1 = document.getElementById("od1");
const od2 = document.getElementById("od2");
const od3 = document.getElementById("od3");
const od4 = document.getElementById("od4");
const next = document.getElementById("next");
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

//quetions
const Questions = [
  {
    id: 0,
    q: "Jaké maximální napětí naměříme v počítači",
    a: [
      { text: "10V", isCorrect: false },
      { text: "12V", isCorrect: true },
      { text: "8V", isCorrect: false },
      { text: "20V", isCorrect: false },
    ],
  },
  {
    id: 1,
    q: "Jakou barvu mají kabely s 12V",
    a: [
      { text: "Zelenou", isCorrect: false },
      { text: "Oranžovou", isCorrect: false },
      { text: "Červenou", isCorrect: false },
      { text: "Žlutou", isCorrect: true },
    ],
  },
  {
    id: 2,
    q: "Co je z toho volatilní",
    a: [
      { text: "HDD", isCorrect: false },
      { text: "SDD", isCorrect: false },
      { text: "RAM", isCorrect: true },
      { text: "Flash-disk", isCorrect: false },
    ],
  },
  {
    id: 3,
    q: "Z čeho se vyrábí procesor(CPU)",
    a: [
      { text: "Křemíku", isCorrect: true },
      { text: "Dřeva", isCorrect: false },
      { text: "Bronzu", isCorrect: false },
      { text: "Hliníku", isCorrect: false },
    ],
  },
  {
    id: 4,
    q: "end",
    a: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
  },
];

start.addEventListener("click", () => {
  start.style.display = "none";
  quiz.style.display = "block";
  next.style.display = "flex";
  log.style.display = "block";
  title.style.marginBottom = "0px";
  //setquestions
  question.innerText = Questions[id].q;
  od1.innerText = Questions[id].a[0].text;
  od2.innerText = Questions[id].a[1].text;
  od3.innerText = Questions[id].a[2].text;
  od4.innerText = Questions[id].a[3].text;
  od1.value = Questions[id].a[0].isCorrect;
  od2.value = Questions[id].a[1].isCorrect;
  od3.value = Questions[id].a[2].isCorrect;
  od4.value = Questions[id].a[3].isCorrect;
  //timer
  setInterval(() => {
    if (desec % 5 == 0 && sec % 9 == 0 && desec != 0 && sec != 0) {
      sec = 0;
      desec = 0;
      min++;
      /*time.innerHTML = `${min + ":" + desec + "" + sec}`;*/
    } else if (sec % 9 == 0 && sec != 0) {
      sec = 0;
      desec++;
      /*time.innerHTML = `${min + ":" + desec + "" + sec}`;*/
    }
    else{
      sec++;
    }
    timer.innerHTML = `${min}:${desec}${sec}`
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
});

od2.addEventListener("click", () => {
  od1.style.backgroundColor = "lightskyblue";
  od2.style.backgroundColor = "lightgoldenrodyellow";
  od3.style.backgroundColor = "lightskyblue";
  od4.style.backgroundColor = "lightskyblue";
  selected = od2.value;
});

od3.addEventListener("click", () => {
  od1.style.backgroundColor = "lightskyblue";
  od2.style.backgroundColor = "lightskyblue";
  od3.style.backgroundColor = "lightgoldenrodyellow";
  od4.style.backgroundColor = "lightskyblue";
  selected = od3.value;
});

od4.addEventListener("click", () => {
  od1.style.backgroundColor = "lightskyblue";
  od2.style.backgroundColor = "lightskyblue";
  od3.style.backgroundColor = "lightskyblue";
  od4.style.backgroundColor = "lightgoldenrodyellow";
  selected = od4.value;
});

next.addEventListener("click", () => {
  if (selected != "") {
    if (selected == "true") {
      correct++;
    } else {
      log.innerHTML += `${id + 1}. otázka: `;
      log.innerHTML += `${Questions[id].q}<br>`;
    }
    id++;
    cviceni++;

    question.innerText = Questions[id].q;
    od1.innerText = Questions[id].a[0].text;
    od2.innerText = Questions[id].a[1].text;
    od3.innerText = Questions[id].a[2].text;
    od4.innerText = Questions[id].a[3].text;
    od1.value = Questions[id].a[0].isCorrect;
    od2.value = Questions[id].a[1].isCorrect;
    od3.value = Questions[id].a[2].isCorrect;
    od4.value = Questions[id].a[3].isCorrect;
    od1.style.backgroundColor = "lightskyblue";
    od2.style.backgroundColor = "lightskyblue";
    od3.style.backgroundColor = "lightskyblue";
    od4.style.backgroundColor = "lightskyblue";
    selected = "";
    //result
    if (id == 4) {
      let b = (100 * correct) / 4;
      quiz.style.display = "none";
      next.style.display = "none";
      points.style.display = "flex";
      if (log.innerHTML != "") {
        wrongcontainer.style.display = "block";
      }
      points.innerHTML += `${correct + "/" + id}`;
      procents.innerHTML += `${b.toFixed(1)}%`;
      title.style.marginBottom = "125px"
      end.style.display = "block";
    }
  }
});
