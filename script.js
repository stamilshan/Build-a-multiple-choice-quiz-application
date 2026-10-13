
const questions=[
    {
    question: "What is the output of console.log(typeof null); in JavaScript?",
    answers: [
        {text:"null", correct:false},
        {text:"object", correct:true},
        {text:"undefined", correct:false},
        {text:"function", correct:false}
        ]
    },
    {
    question: "Which keyword is used to declare a block-scoped variable that cannot be reassigned?",
    answers: [
        {text:"var", correct:false},
        {text:"let", correct:false},
        {text:"const", correct:true},
        {text:"static", correct:false}
        ]
    },
    {
    question: "What will console.log(false == '0'); output?",
    answers: [
        {text:"false", correct:false},
        {text:"true", correct:true},
        {text:"typeError", correct:false},
        {text:"undefined", correct:false}
        ]
    },
    {
    question: "What is the output of console.log(typeof NaN); in JavaScript?",
    answers: [
        {text:"NaN", correct:false},
        {text:"null", correct:false},
        {text:"undefined", correct:false},
        {text:"number", correct:true}
        ]
    },
    {
    question: "What will be the output of console.log([] == ![]); in JavaScript?",
    answers: [
        {text:"true", correct:true},
        {text:"false", correct:false},
        {text:"undefined", correct:false},
        {text:"TypeError", correct:false}
        ]
    },
    {
    question: "What is the primary data type of the value true in JavaScript?",
    answers: [
        {text:"Boolean", correct:true},
        {text:"String", correct:false},
        {text:"Number", correct:false},
        {text:"Object", correct:false}
        ]
    },
    {
    question: "In HTML forms, which attribute determines where to send the form-data when a form is submitted?",
    answers: [
        {text:"method", correct:false},
        {text:"action", correct:true},
        {text:"target", correct:false},
        {text:"href", correct:false}
        ]
    },
    {
    question: "Given the CSS rule padding: 10px 20px 30px;, which side of the element receives 20px of padding?",
    answers: [
        {text:"Top", correct:false},
        {text:"Bottom", correct:false},
        {text:"Left and Right", correct:true},
        {text:"Right only", correct:false}
        ]
    }

];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

//quiz start
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    // nextButton.innerHTML="Next";
    showQuestions();
}

//get questions and answers
function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " +currentQuestion.question;

    currentQuestion.answers.forEach((answers)=>{
        const button=document.createElement("button");
        button.innerHTML=answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answers.correct){
            button.dataset.correct=answers.correct;
        }
            
        button.addEventListener("click", selectAnswer);

    });

}

//to clear firstchild
function resetState(){
    // nextButton.style.display="none";
    while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e){

    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;    
    }else
    {
        selectedBtn.classList.add("incorrect")
    }


    Array.from(answerButtons.children).forEach((button)=>{
        if(button.dataset.correct==="true")
        {
        button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
};

//score to show
function showScore(){
    resetState();
    questionElement.innerHTML=`your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Restart";
    nextButton.style.display="block";

};

//handle next function
function handleNextButton(){
     currentQuestionIndex++;
     if(currentQuestionIndex < questions.length){
        showQuestions();
     }else{
        showScore();
     }   
};

//
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else
    {
        startQuiz();
    }

});
startQuiz();
