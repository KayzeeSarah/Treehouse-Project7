const overlay = document.getElementById('overlay');
let title = document.querySelector ('.title');
const qwerty = document.getElementById ('qwerty');
let phrase = document.getElementById ('phrase');
let missed = 0;
const reset = document.querySelector ('.btn__reset');
let phrases = ["crystal maiden", "outworld devourer", "chaos knight", "skywrath mage", "drow ranger"];
const ul = document.querySelector ('ul');
const tries = document.querySelectorAll ('.tries img');

reset.addEventListener('click', ()=> {
      if (reset.textContent === 'Start Game') {
        overlay.style.display="none";
      }
      else {
        window.location.reload(true);
      }
  });

function getRandomPhraseArray (arr) {
  let random = Math.floor(Math.random() * arr.length);
  console.log(random);
  let phrase = arr[random];
  console.log(phrase);
  let phraseArray = phrase.split('');
  console.log(phraseArray);
  return phraseArray;
}

function addPhraseToDisplay (arr) {
  for (let i=0; i<arr.length; i+=1){
    const li = document.createElement('li');
    const alph = arr[i];
    console.log(alph);
    li.textContent = alph;
    ul.appendChild(li);
    if (alph === ' ') {
      li.className='space';
    }
    else {
      li.className='letter';
    }
  }
  return phrase;
}

let randomPhrase = getRandomPhraseArray (phrases);
addPhraseToDisplay (randomPhrase);

function checkLetter(e) {
  console.log(randomPhrase);
    const letter = document.getElementsByClassName('letter');
    let match = null;
      for(let i=0; i<letter.length; i+=1) {
        if (e.textContent === letter[i].textContent) {
          console.log('yup');
          letter[i].classList.add('show');
          match = letter[i].textContent;
        }
      }
      return match;
}

function checkWin () {
  const show = document.getElementsByClassName ('show');
  const letter = document.getElementsByClassName('letter');
  if (show.length === letter.length || missed >= 5){
    qwerty.removeEventListener ('click', keyboard);
    setTimeout(function() {
     if (show.length === letter.length) {
       overlay.style.display = 'flex';
       overlay.className = 'win';
       title.textContent = 'You won!';
       reset.textContent = 'Reset';

     } else if (missed >= 5) {
       overlay.style.display = 'flex';
       overlay.className = 'lose';
       title.textContent = 'You lost!';
       reset.textContent = 'Reset';
     }
   },500);
}
}


let keyboard = function(e) {
  let button = e.target;
  if ( button.tagName === 'BUTTON'){
  button.className = 'chosen';
  button.disabled = true;
  let letterFound = checkLetter(button);
   if (letterFound === null) {
     tries[missed].src = "images/thumbsDown.png";
     missed +=1;
   }
  }
  checkWin ();
}
qwerty.addEventListener ('click', keyboard);
