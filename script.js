const images = document.querySelectorAll('.choice-grid div');

function restartQuiz()
{
    for(const img of images)
    {
        img.querySelector('.checkbox').src = 'images/unchecked.png';
        img.classList.remove('checked');
        img.classList.remove('opacity');
        img.addEventListener('click', checkBox);
    }
    
    const answerBox = document.querySelector('section[data-id="quiz-result"]')
    answerBox.classList.remove('visible');
    answerBox.innerHTML = "";
}

//Versione funzione che vale per un quiz di 3 domande
//Più efficiente per questo sito in particolare rispetto a quella commentata
function getResult()
{
    const givenAnswers = document.querySelectorAll('.choice-grid div.checked');
    
    if(givenAnswers[1].dataset.choiceId === givenAnswers[2].dataset.choiceId)
    {
        return givenAnswers[1].dataset.choiceId;
    }
    else
    {
        return givenAnswers[0].dataset.choiceId;
    }
}

/*

//Versione che vale per un quiz con un generico numero di domande
//Funziona per un quiz con un qualsiasi numero di domande ma meno efficiente della funzione precedente
//Utilizzo la funzione precedente per motivi di efficienza


function getResult1()
{
    const givenAnswers = document.querySelectorAll('.choice-grid div.checked');
    
    //Creo una mappa per contare le occorrenze delle risposte date nel quiz, quindi trovo il massimo numero e restituisco la risposta vincitrice del quiz
    let answersOccurences = {
        blep: 0,
        happy: 0,
        sleeping: 0,
        dopey: 0,
        burger: 0,
        cart: 0,
        nerd: 0,
        shy: 0,
        sleepy: 0
    };
    
    //Aggiornamento mappa
    for(let answer in answersOccurences)
    {
        for(const givenAnswer of givenAnswers)
        {
            if(answer === givenAnswer.dataset.choiceId)
            {
                answersOccurences[answer]++;
            }
        }
    }
    
    //Ricerca massimo
    
    let max = 0;
    let bestAnswer = '';
    
    for(let answer in answersOccurences)
    {
        if(answersOccurences[answer] > max)
        {
            max = answersOccurences[answer];
            bestAnswer = answer;
        }
    }
    
    //Se il massimo di occorrenze è uguale a 1 le risposte date sono tutte diverse tra loro: imposto la risposta vincente quella corrispondente alla prima domanda
    if(max === 1)
    {
        bestAnswer = givenAnswers[0].dataset.choiceId;
    }
    
    //Restituisco la risposta con il maggior numero di occorrenze o, in caso di risposte tutte diverse, la prima risposta
    return bestAnswer;
}

*/

function displayResult()
{
    const result = getResult();
    
    const resultSection = document.querySelector('section[data-id="quiz-result"]');
    
    const header = document.createElement('h1');
    const paragraph = document.createElement('p');
    const button = document.createElement('div');
    
    header.textContent = RESULTS_MAP[result].title;
    paragraph.textContent = RESULTS_MAP[result].contents;
    button.textContent = 'Ricomincia il quiz';
    
    button.classList.add('complete-btn');
    
    button.addEventListener('click', restartQuiz);
    
    resultSection.appendChild(header);
    resultSection.appendChild(paragraph);
    resultSection.appendChild(button);
}

function getSectionNumber()
{
    return document.querySelectorAll('.choice-grid').length;
}

function isFinished()
{
    const sectionNumber = getSectionNumber();
    
    const i = document.querySelectorAll('.checked').length;
    
    if(i === sectionNumber)
    {
        return true;
    }
    
    return false;
}

function removeCheckListners()
{
    for(const image of images)
    {
        image.removeEventListener('click', checkBox);
    }
}

function checkBox(e)
{
    const div = e.currentTarget;
    const image = div.querySelector('.checkbox');
    
    const imgsCurrentSection = div.parentNode.querySelectorAll('.checkbox');
    for(const imgCurrentSection of imgsCurrentSection)
    {
        imgCurrentSection.src = 'images/unchecked.png';
        imgCurrentSection.parentNode.classList.remove('checked');
        imgCurrentSection.parentNode.classList.add('opacity');
    }
    image.src = 'images/checked.png';
    image.parentNode.classList.remove('opacity');
    image.parentNode.classList.add('checked');
    
    if(isFinished())
    {
        removeCheckListners();
        displayResult();
        document.querySelector('section[data-id="quiz-result"]').classList.add('visible');
    }
}


for(const image of images)
{
    image.addEventListener('click', checkBox);
}