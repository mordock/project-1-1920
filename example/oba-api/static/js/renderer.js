import{catImage, removeHidden, addHidden} from './app.js'

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

  const exampleList = ['computers', 'tijgers', 'bomen',
 'internet', 'bloemen', 'ridders', 'middeleeuwen',
  'haai', 'torenvalk', 'Verenigde Staten', 'Nederland',
  'koffie', 'bacteriën', 'Tweede wereldoorlog', 'muziek',
  'auto', 'hout', 'oertijd', 'dinosaurus'];

export function renderBookDetail(data, id){
    catImage.src = './static/img/Smart.png';
    addHidden('books');
    addHidden('gotData');
  
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
    catImage.src = './static/img/Wow.png';
  
    //loop through results
    results.forEach((item, i) => {
      let randomImage = imageList[Math.floor(Math.random() * imageList.length)];
  
      if(i % 2 == 0){
        const html = `
              <article class="bottomItem">
                <h2>${item.titles[0]}</h2>
                <a class="bookItem" href="#/${item.id}">${item.summaries ? item.summaries[0] : 'Geen samenvatting'}</a><br>
                <img src="${
                  item.coverimages ? item.coverimages[1] : 'Geen samenvatting'
                }"><br>
                <a href=${item.detailLink ? item.detailLink : 'geen link naar site'}>Link naar de oba</a>
              </article>
              `;
              
              //Transparency.render(document.getElementById('books'), newData);
        //main.insertAdjacentHTML('afterend', html);
        const bookArticle = document.getElementById('books');
        bookArticle.innerHTML += html;
        }else{
          const html = `
            <article classs="bottomItem">
              <img id="catImage" class="bottomImage" src=${randomImage}>
            </article>
          `;
          const bookArticle = document.getElementById('books');
        bookArticle.innerHTML += html;
        }
    });
}

export function renderRandomSubjects(){
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