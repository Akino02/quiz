const start = document.getElementById("start");
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

function viewquest() {
  setInterval(() => {
    if (id == 10) {
      hard.innerHTML = "HTML/CSS/JS"
    } else if (id == 20) {
      hard.innerHTML = "Java"
    }
    else if (id == 30){
      hard.innerHTML = "Konec quizu";
      qnum.style.display = "none";
    }
    qnum.innerHTML = `${id+1}/30`
  }, 1);
}

window.onload = async () => {
  const file = await fetch("./res/data/quiz1.json");

  const Questions = await file.json(file);

  console.log(Questions[30].numq);

  start.addEventListener("click", () => {
    viewquest();
    hard.style.display = "block";
    qnum.style.display = "block";
    start.style.display = "none";
    quiz.style.display = "block";
    next.style.display = "flex";
    log.style.display = "block";
    title.style.marginBottom = "0px";
    //setquestions
    question.innerText = Questions[id].q;
    od1.innerText = Questions[id].text[0];
    od2.innerText = Questions[id].text[1];
    od3.innerText = Questions[id].text[2];
    od4.innerText = Questions[id].text[3];
    od1.value = Questions[id].isCorrect[0];
    od2.value = Questions[id].isCorrect[1];
    od3.value = Questions[id].isCorrect[2];
    od4.value = Questions[id].isCorrect[3];
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

  let check = Questions[30].numq; //tady se nap????e posledn?? ot??zka a kolik tam je ot??zek

  next.addEventListener("click", () => {
    if (selected != "") {
      if (selected == "true") {
        correct++;
      } else {
        log.innerHTML += `${cviceni}. ot??zka: `;
        log.innerHTML += `${Questions[id].q}. `;
        if (od1.value == "true") {
          log.innerHTML += `Spr??vn?? je ${Questions[id].text[0]}<br>`;
        } else if (od2.value == "true") {
          log.innerHTML += `Spr??vn?? je ${Questions[id].text[1]}<br>`;
        } else if (od3.value == "true") {
          log.innerHTML += `Spr??vn?? je ${Questions[id].text[2]}<br>`;
        } else if (od4.value == "true") {
          log.innerHTML += `Spr??vn?? je ${Questions[id].text[3]}<br>`;
        }
      }
      id++;
      cviceni++;
      console.log(id);
      question.innerText = Questions[id].q;
      od1.innerText = Questions[id].text[0];
      od2.innerText = Questions[id].text[1];
      od3.innerText = Questions[id].text[2];
      od4.innerText = Questions[id].text[3];
      od1.value = Questions[id].isCorrect[0];
      od2.value = Questions[id].isCorrect[1];
      od3.value = Questions[id].isCorrect[2];
      od4.value = Questions[id].isCorrect[3];
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
};
