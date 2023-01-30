const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const popupp = document.getElementById('popup-containerr');
const message_el = document.getElementById('success-message');
const wrongLetters_el=document.getElementById('wrong-letters');
const message_el1=document.getElementById('message');
const message_el2 = document.getElementById('success-messagee');

const btn=document.getElementById('play-again');
const btna=document.getElementById('play-againn');

const items=document.querySelectorAll('.item');
const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
    const words = ["javascript","java","python","typescript","csharp","kotlin","sql","html","css","cplusplus"];
    return words[Math.floor(Math.random() * words.length)];

    
}
btn.addEventListener('click',function(){
correctLetters.splice(0);
wrongLetters.splice(0);


selectedWord=getRandomWord();
    displayWord();

    updateWrongLetters();
    popup.style.display='none';
    
});
btna.addEventListener('click',function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    
    selectedWord=getRandomWord();
        displayWord();
    
        updateWrongLetters();
     
        popupp.style.display='none';
    });

function displayWord() {    
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}
    
    `;

    const w = word_el.innerText.replace(/\n/g,'');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler kazandınız.';
    }
}
function updateWrongLetters(){
    wrongLetters_el.innerHTML=`
    ${wrongLetters.length>0?'<h3>Hatalı Harfler</h3>':''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;

    items.forEach((item,index)=>{
        const errorCount=wrongLetters.length;
        if(index<errorCount){
            item.style.display='block';
        }else{
            item.style.display='none';
        }
    })

    if(wrongLetters.length===items.length){
        popupp.style.display = 'flex';
        message_el2.innerText = 'Kaybettiniz';
    }
}
function displayMessage(){
    message_el1.classList.add('show');
    setTimeout(function() {
        message_el1.classList.remove('show');
    }, 2000);
}

window.addEventListener('keydown', function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {        
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
               
               
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }
    }
});

displayWord()