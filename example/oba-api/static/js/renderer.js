import { catImage, removeHidden, addHidden } from './app.js'

const imageList = [
  './example/oba-api/static/img/Stretch.png',
  './example/oba-api/static/img/Clapping.png',
  './example/oba-api/static/img/Power.png',
  './example/oba-api/static/img/Happy.png',
  './example/oba-api/static/img/Smart.png',
  './example/oba-api/static/img/Good.png',
  './example/oba-api/static/img/Think.png',
  './example/oba-api/static/img/IGetIt.png',
  './example/oba-api/static/img/Awesome.png'
];

const exampleList = ['computers', 'tijgers', 'bomen',
  'internet', 'bloemen', 'ridders', 'middeleeuwen',
  'haai', 'torenvalk', 'Verenigde Staten', 'Nederland',
  'koffie', 'bacteriën', 'Tweede wereldoorlog', 'muziek',
  'auto', 'hout', 'oertijd', 'dinosaurus', 'internet', 'kat',
  'honden',];

export function renderBookDetail(data, id) {
  catImage.src = './example/oba-api/static/img/Smart.png';
  addHidden('books');
  addHidden('gotData');
  addHidden('restart');

  removeHidden('detailText');
  removeHidden('bookDetail');

  let newdata = {
    detailTitle: data.record.titles[0],
    detailAuthor: 'auteur: ' + data.record.authors[0] + ' - ' + data.record.year,
    detailSummary: data.record.summaries[0],
  };

  const detailImage = document.getElementById('detailImage');
  const detailObaLink = document.getElementById('detailObaLink');

  //images, href can't be done via transparency 
  detailImage.src = data.record.coverimages[0];
  detailObaLink.href = data.record.detailLink;

  Transparency.render(document.getElementById('bookDetail'), newdata);
}

// render data
export function render(data) {
  const results = data.results;
  console.dir(results);

  //data is in and stuff can be changed
  removeHidden('books');
  removeHidden('gotData');
  addHidden('gotSubject');
  catImage.src = './example/oba-api/static/img/Wow.png';

  //loop through results
  results.forEach((item, i) => {
    let randomImage = imageList[Math.floor(Math.random() * imageList.length)];

    if (i % 2 == 0) {
      const html = `
        <article class="bottomItem">
          <h2>${item.titles[0]}</h2>
          <a class="bookItem" href="#/${item.id}">${item.summaries ? item.summaries[0] : 'Geen samenvatting'}</a><br>
          <img src="${item.coverimages ? item.coverimages[1] : 'Geen samenvatting'}"><br>
          <a href=${item.detailLink ? item.detailLink : 'geen link naar site'}>Link naar de oba</a>
        </article>`;
      const bookArticle = document.getElementById('books');
      bookArticle.innerHTML += html;
    } else {
      const html = `
          <article classs="bottomItem">
            <img id="catImage" class="bottomImage" src=${randomImage}>
          </article>`;
      const bookArticle = document.getElementById('books');
      bookArticle.innerHTML += html;
    }
  });
}

export function renderRandomSubjects() {
  catImage.src = './example/oba-api/static/img/Right.png';
  removeHidden('noSubject');

  let randomExamples = [];

  //add 5 random subjects to array
  for (let i = 0; i < 6; i++) {
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