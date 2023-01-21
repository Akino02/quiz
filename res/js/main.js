const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const answer = document.getElementsByClassName("odpoved");
const odpovedi = document.getElementById("odpovedi");
const od1 = document.getElementById("od1");
const od2 = document.getElementById("od2");
const od3 = document.getElementById("od3");
const od4 = document.getElementById("od4");
const next = document.getElementById("next");
const body = document.getElementById("body");
const log = document.getElementById("log");
let id = 0;
let correct = 0;

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
    q: "Co je volatilní",
    a: [
      { text: "HDD", isCorrect: false },
      { text: "SDD", isCorrect: false },
      { text: "RAM", isCorrect: true },
      { text: "Flash-disk", isCorrect: false },
    ],
  },
  {
    id: 3,
    q: "Konec",
    a: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
  },
];

start.addEventListener("click", () => {
  start.style.display = "none";
  quiz.style.display = "block";
  next.style.display = "flex";
  question.innerText = Questions[id].q;
  od1.innerText = Questions[id].a[0].text;
  od2.innerText = Questions[id].a[1].text;
  od3.innerText = Questions[id].a[2].text;
  od4.innerText = Questions[id].a[3].text;
  od1.value = Questions[id].a[0].isCorrect;
  od2.value = Questions[id].a[1].isCorrect;
  od3.value = Questions[id].a[2].isCorrect;
  od4.value = Questions[id].a[3].isCorrect;
});

let selected = "";

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
      log.innerHTML += `<p>${id + 1}. otázka</p>`;
    }
    id++;
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
    if (id == 3) {
      quiz.style.display = "none";
      next.style.display = "none";
      body.style.display = "flex";
      body.innerHTML = correct + "/" + id;
    }
  }
});
