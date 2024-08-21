import  { useRef, useState, useEffect } from "react";
import './Quiz.css'
import {data, data as questions} from "../../assets/questions.js"

function Quiz(){
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(questions[index]);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    let [selectedAnswer, setSelectedAnswer] = useState(new Array(data.length).fill(null));
    let [answered, setAnswered] = useState(false);
    let [correctAnswers, setcorrectAnswers] = useState(new Array(data.length).fill(null));

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1,Option2,Option3,Option4];

    useEffect(() => {
        setQuestion(questions[index]);
        resetOptions();
        highlightSelectedAnswer();
    }, [index]);

    const highlightSelectedAnswer = () => {
        const selected = selectedAnswer[index];
        if (selected !== null) {
            option_array[selected - 1].current.classList.add("selected");
        }
    };

    const checkAns = (e, ans) => {
        option_array.forEach((option) => {
            option.current.classList.remove("selected");
            option.current.classList.remove("correct");
            option.current.classList.remove("wrong")
        });
        e.target.classList.add("selected");

        const updatedSelectedAnswer =[...selectedAnswer]
        updatedSelectedAnswer[index] = ans;

        setSelectedAnswer(updatedSelectedAnswer);
        setAnswered(true);
    }

    const submitAnswer = () => {            
          const wasCorrect = selectedAnswer[index] === question.ans;
          const wasPreviouslyCorrect = correctAnswers[index];
        
          if(wasCorrect){
            if(!wasPreviouslyCorrect){
                setScore(prev => prev + 1);
            const updatedCorrectAnswers = [...correctAnswers];
            updatedCorrectAnswers[index] = true;
            setcorrectAnswers(updatedCorrectAnswers);
            }
          
             option_array[selectedAnswer[index] - 1].current.classList.add("correct"); 
          } else {
            option_array[selectedAnswer[index] - 1].current.classList.add("wrong");
            option_array[question.ans-1].current.classList.add("correct");
          }
        };
    const next = () => {
        if(answered){
            submitAnswer();
            if(index < data.length - 1){
                setIndex(prev => prev + 1);
            }else{
                setResult(true);
            }
            setAnswered(false);

        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex(prev => prev - 1);
            setQuestion(data[index - 1]);
            setAnswered(false);
            resetOptions();
        }
    };

    const resetOptions = () => {
        option_array.forEach(option => {
            option.current.classList.remove("wrong");
            option.current.classList.remove("correct");
            option.current.classList.remove("selected");
        });
    };

     const reset = () =>{
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setResult(false);
        setAnswered(false);
        setSelectedAnswer(new Array(data.length).fill(null));
        resetOptions();

        
    }
    return(
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {result?<></>:<><h2>{index + 1}.{question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e) => {checkAns(e,1)}}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => {checkAns(e,2)}}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => {checkAns(e,3)}}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => {checkAns(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={prev} disabled={index === 0}>Previous</button>
            <button onClick={next}>{index === data.length - 1 ? 'Finish' : 'Next'}</button>
            <div className="index">{index + 1} of {data.length} questions</div></>}
            
            {result?<><h2>You Scored {score} out of {data.length}</h2>  
            <button onClick={reset}>Reset</button></>:<></>}
            
        </div>
    );
}
export default Quiz