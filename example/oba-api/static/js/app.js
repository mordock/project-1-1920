import{GetData} from './api.js'
import{renderRandomSubjects} from './renderer.js'
import{routing} from './routing.js'

//https://zoeken.oba.nl/api/v1/details/?id=|oba-catalogus|376584&authorization=1e19898c87464e239192c8bfe422f280&detaillevel=Extended&output=json

let currentSubject;

export const catImage = document.getElementById('catImage');

init();
routing();

function init(){
  removeHidden('begin');

  //declaration of all buttons
  const trueButton = document.getElementById('trueButton');
  const falseButton = document.getElementById('falseButton');
  const restartButton = document.getElementById('restart');
  const renderBooksButton = document.getElementById('renderBooks');
  const renderRandomSubjectsButton = document.getElementById('renderRandomSubjects');
  const p1Button = document.getElementById('p1');
  const p2Button = document.getElementById('p2');
  const p3Button = document.getElementById('p3');
  const p4Button = document.getElementById('p4');
  const p5Button = document.getElementById('p5');
  const randomTrueButton = document.getElementById('randomTrueButton');
  const randomFalseButton = document.getElementById('randomFalseButton');
  const detailBack = document.getElementById('detailBack');
  trueButton.onclick = function(){
    CheckIfSubject(true);
  } 
  falseButton.onclick = function(){
    CheckIfSubject(false);
  }
  restartButton.onclick = function(){
    restart();
  }
  renderBooksButton.onclick = function(){
    renderBooks();
  }
  renderRandomSubjectsButton.onclick = function(){
    renderRandomSubjects();
  }
  p1Button.onclick = function(){
    checkSubject('p1');
  }
  p2Button.onclick = function(){
    checkSubject('p2');
  }
  p3Button.onclick = function(){
    checkSubject('p3');
  }
  p4Button.onclick = function(){
    checkSubject('p4');
  }
  p5Button.onclick = function(){
    checkSubject('p5');
  }
  randomTrueButton.onclick = function(){
    checkRandomSubject(true);
  }
  randomFalseButton.onclick = function(){
    checkRandomSubject(false);
  }
  detailBack.onclick = function(){
    detailBackToList();
  }

  routie("");
}

function CheckIfSubject(clickedYes){
  console.log('AAHHHH');
  if(clickedYes){
    //child has a subject and has to enter it in a input field
    removeHidden('onderwerpInput');
    catImage.src = './static/img/questionMark.png'
    //clear input
    document.getElementById('onderwerpInputValue').value = '';
    
    addHidden('begin');
    removeHidden('restart');
  }else{
    //child doesn't have subject and needs help choosing
    renderRandomSubjects();
    addHidden('begin');
    removeHidden('restart');
  }
}

// yes route
//called when clicking oke after input
function renderBooks(){
  const subject = document.getElementById('onderwerpInputValue').value;

  console.log('boe');

  catImage.src = './static/img/Wait.png';

  let regex = /^[A-Za-z0-9 ]+$/;

  //check if special characters used
  let isValid = regex.test(subject);

  if(isValid){
    console.log('correct');
    addHidden('onderwerpInput');
  
    removeHidden('gotSubject');

    currentSubject = subject;
  
    GetData(subject);
  }else{
    console.log('not correct');
    removeHidden('incorrectCheck');
  }
}

// no route
//called after clicking button with random subject
function checkSubject(id){
  catImage.src = './static/img/questionMark.png';

  const randomSubject = document.getElementById(id).textContent;

  const checkElement = document.getElementById('randomSubjectCheck');

  checkElement.textContent = randomSubject;
  //set subject
  currentSubject = randomSubject;

  addHidden('noSubject');
  removeHidden('confirmRandomSubject');

  console.log(randomSubject);
}

//check if person wants that subject
function checkRandomSubject(clickedYes){
  if(clickedYes){
    if(currentSubject != null){
      removeHidden('gotSubject');
      addHidden('confirmRandomSubject');
      catImage.src = './static/img/Wait.png';
      GetData(currentSubject);
    }
  }else{
    removeHidden('noSubject');
    addHidden('confirmRandomSubject');
  }
}

function detailBackToList(){
  addHidden('bookDetail');
  removeHidden('books');

  routie('');
}

//restart text
function restart(){
  location.reload();
}

//functional methods
export function removeHidden(idValue){
  const beginArticle = document.getElementById(idValue);
  beginArticle.classList.remove('hidden');
}

export function addHidden(idValue){
  const beginArticle = document.getElementById(idValue);
  beginArticle.classList.add('hidden');
}