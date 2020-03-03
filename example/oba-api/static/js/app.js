/*** Fetching data -> refactor into module later ***/
const main = document.querySelector('main');
const cors = 'https://cors-anywhere.herokuapp.com/';
const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
const query = 'haai';
const key = '1e19898c87464e239192c8bfe422f280';
const secret = '4289fec4e962a33118340c888699438d';
const detail = 'Default';
const lang = 'nl';
const url = `${cors}${endpoint}${query}&authorization=${key}&lang=${lang}&detaillevel=${detail}&output=json`;

const exampleList = ['computers', 'tijgers', 'bomen',
 'internet', 'bloemen', 'ridders', 'middeleeuwen',
  'haai', 'torenvalk', 'Verenigde Staten', 'Nederland',
   'koffie', 'bacteriën', 'Tweede wereldoorlog', 'muziek', 'auto'];

const config = {
  Authorization: `Bearer ${secret}`
};

function init(){
  removeHidden('begin');
}

function renderBegin(clickedYes){
  if(clickedYes){
    //child has a subject and has to enter it in a input field
    removeHidden('onderwerpInput');
  }else{
    //child doesn't have subject and needs help choosing
    renderRandomSubjects();
  }
}

function renderRandomSubjects(){
  removeHidden('noSubject');

  let randomExamples = [];

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

function renderBooks(){
  addHidden('begin');
  addHidden('onderwerpInput');

  removeHidden('gotSubject');

  GetData();
}

function removeHidden(idValue){
  let beginArticle = document.getElementById(idValue);
  beginArticle.classList.remove('hidden');
}

function addHidden(idValue){
  let beginArticle = document.getElementById(idValue);
  beginArticle.classList.add('hidden');
}

function GetData(){
  fetch(url, config)
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
  results.forEach((item, i) => {
    const html = `
            <article>
              <h2>${item.titles[0]}</h2>
              <p>${item.summaries ? item.summaries[0] : 'Geen samenvatting'}</p>
              <img src="${
                item.coverimages ? item.coverimages[1] : 'Geen samenvatting'
              }">
            </article>
          `;
    main.insertAdjacentHTML('beforeend', html);
  });
}
