/*** Fetching data -> refactor into module later ***/
const main = document.querySelector('main');
const cors = 'https://cors-anywhere.herokuapp.com/';
const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
const key = 'f60b69054b02f50180d9c088e06270ea';
const secret = '34dd0c6e69370e1b0d2b06fb8343c17f';
const detail = 'Default';
const lang = 'nl';

let currentSubject;

const exampleList = ['computers', 'tijgers', 'bomen',
 'internet', 'bloemen', 'ridders', 'middeleeuwen',
  'haai', 'torenvalk', 'Verenigde Staten', 'Nederland',
  'koffie', 'bacteriën', 'Tweede wereldoorlog', 'muziek',
  'auto', 'hout', 'oertijd', 'dinosaurus'];

const imageList = [
  './static/img/Stretch.png', 
  './static/img/Clapping.png', 
  './static/img/Power.png', 
  './static/img/Happy.png',
  './static/img/Smart.png',
  './static/img/Good.png', 
  './static/img/Think.png', 
  './static/img/IGetIt.png', 
  './static/img/Awesome.png'
];

const config = {
  Authorization: `Bearer ${secret}`
};

const catImage = document.getElementById('catImage');

function init(){
  removeHidden('begin');
}

function CheckIfSubject(clickedYes){
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
function renderRandomSubjects(){
  catImage.src = './static/img/Right.png';
  removeHidden('noSubject');

  let randomExamples = [];

  //add 5 random subjects to array
  for(let i = 0; i < 6; i++){
    let randomNumber = exampleList[Math.floor(Math.random() * exampleList.length)];
  
    randomExamples.push(randomNumber);
  }

  let data = {
    p1: randomExamples[0],
    p2: randomExamples[1],
    p3: randomExamples[2],
    p4: randomExamples[3],
    p5: randomExamples[4]
  }
  
  Transparency.render(document.getElementById('randomExamples'), data);
}

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

//restart text
function restart(){
  location.reload();
}

//functional methods
function removeHidden(idValue){
  let beginArticle = document.getElementById(idValue);
  beginArticle.classList.remove('hidden');
}

function addHidden(idValue){
  let beginArticle = document.getElementById(idValue);
  beginArticle.classList.add('hidden');
}

function buildUrl(query){
  const url = `${cors}${endpoint}${query}&authorization=${key}&lang=${lang}&detaillevel=${detail}&output=json&p=jeugd`;
  return url;
}

//api call
function GetData(query){
  fetch(buildUrl(query), config)
    .then(response => {
      //handle client error with fetch
      if(response.ok) {
        return response.json();
      }else{
        return Promise.reject(response);
      } 
    })
    .then(data => {
      render(data);
    })
    .catch(err => {
      console.log(err);
    });
}

// render data
function render(data) {
  const results = data.results;
  console.dir(results);

let newData = {
  h2: results
}

  results.forEach((item, i) => {
    console.log(i);
    if(i % 2 == 0){
      const html = `
              <article class="bottomItem">
                <h2>${item.titles[0]}</h2>
                <p>${item.summaries ? item.summaries[0] : 'Geen samenvatting'}</p>
                <img src="${
                  item.coverimages ? item.coverimages[1] : 'Geen samenvatting'
                }">
                <p>${item.detailLink ? item.detailLink : 'geen link naar site'}</p>
              </article>
            `;
            removeHidden('books');
            catImage.src = './static/img/Wow.png';
            //Transparency.render(document.getElementById('books'), newData);
      //main.insertAdjacentHTML('afterend', html);
      const bookArticle = document.getElementById('books');
      bookArticle.innerHTML += html;
      }else{
        const html = `
          <article classs="bottomItem">
            <img id="catImage" src="./static/img/hello.png">
          </article>
        `;
        const bookArticle = document.getElementById('books');
      bookArticle.innerHTML += html;
      }
    });
}

function routing(){
  routie({
      'overview': () => {
      overview();
      },
      '/:name': () => {
          details();
      }
  });
}
