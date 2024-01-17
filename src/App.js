import React, { useState, useEffect } from "react";
import "./App.css";
import ResultsTable from "./components/ResultsTable";

function App() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [userName, setUserName] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);





  const questions = [
    {
      text: "Eesti pealinn on ?",
      options: [
        { id: 0, text: "Narva", isCorrect: false },
        { id: 1, text: "Rakvere", isCorrect: false },
        { id: 2, text: "Tartu", isCorrect: false },
        { id: 3, text: "Tallinn", isCorrect: true },
      ],
    },
    {
      text: "Eesti iseseisvumine toimus? ",
      options: [
        { id: 0, text: "1918", isCorrect: true },
        { id: 1, text: "1920", isCorrect: false },
        { id: 2, text: "1915", isCorrect: false },
        { id: 3, text: "1925", isCorrect: false },
      ],
    },
    {
      text: "Eesti esimene president oli ?",
      options: [
        { id: 0, text: "Konstantin Päts", isCorrect: true },
        { id: 1, text: "Lennart Meri", isCorrect: false },
        { id: 2, text: "	Arnold Rüütel", isCorrect: false },
        { id: 3, text: "Toomas Hendrik Ilves", isCorrect: false },
      ],
    },
    {
      text: "Eesti maakond, kus elab kõige rohkem inimesi ? ",
      options: [
        { id: 0, text: "Rapla ", isCorrect: false },
        { id: 1, text: "Harju", isCorrect: true },
        { id: 2, text: "Tartu", isCorrect: false },
        { id: 3, text: "Valga", isCorrect: false },
      ],
    },
    {
      text: "Riik, mis ei ole Eesti naaber ?",
      options: [
        { id: 0, text: "Venemaa", isCorrect: false },
        { id: 1, text: "Läti", isCorrect: false },
        { id: 2, text: "Jaapan", isCorrect: true },
        { id: 3, text: "Soome", isCorrect: false },
      ],
    },
  ];

  useEffect(() => {
    if (!userName) {
      const enteredName = prompt("Sisestage nimi");
      if (enteredName) {
        setUserName(enteredName);
      }
    }
  }, [userName]);

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect, optionId) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
      setAnswerFeedback("{[Õige]}!");
    } else {
      setAnswerFeedback("Vale!");
    }

    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = isCorrect;
      return updatedAnswers;
    });

    setSelectedAnswer({ optionId, isCorrect });

    // Delay moving to the next question to allow time for feedback
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null); // Reset selected answer after moving to the next question
        setAnswerFeedback("");
      } else {
        setShowResults(true);
      }
    }, 1000); // You can adjust the delay time (in milliseconds) as needed
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setAnswerFeedback("");
  };


  return (
    <div className="App">
      {/* 1. Header  */}
      {/* Black header with white text */}
      <header className="header">
      <h1 className="header-text"> Eesti viktoriin </h1>
    </header>

      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Reusltaat</h1>
          <h2>
          {userName}, teie skoor on {score}. <br /> Maksimum õigete vastuste arv  on  {questions.length}.  - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Uus mäng</button>
          <ResultsTable questions={questions} userAnswers={userAnswers} />

        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
        {questions[currentQuestion].options.map((option) => {
          const isAnswerSelected = selectedAnswer && selectedAnswer.optionId === option.id;
          const answerStyle = isAnswerSelected
            ? selectedAnswer.isCorrect
              ? "correct-answer"
              : "wrong-answer"
            : "";

          return (
            <li
              key={option.id}
              onClick={() => optionClicked(option.isCorrect, option.id)}
              className={answerStyle}
            >
              {option.text}
            </li>
          );
        })}
      </ul>
      {/* Display answer feedback */}
      {answerFeedback && (
        <div className="answer-feedback">
          <p>{answerFeedback}</p>
        </div>
      )}
        </div>
      )}
    </div>
  );
}

export default App;
