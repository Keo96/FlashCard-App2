import { useState, useEffect} from 'react'
import {FaArrowRight, FaArrowLeft, FaRandom} from 'react-icons/fa'
import questions from './Data/questions'
import FlashcardList from './Components/FlashcardList'
import './App.css'

const App = () => {
  const [category, setCategory] = useState('biology');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answerCorrectness, setAnswerCorrectness] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    resetQuiz();
  }, [category]);
  
  const getInitialQuestions = () => questions.filter(question => question.category === category);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const resetQuiz = ()  => {
    const initialQuestions = getInitialQuestions();
    setFilteredQuestions(initialQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setAnswerCorrectness(null);
  }

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
      setUserAnswer('');
      setAnswerCorrectness(null);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
      setUserAnswer('');
      setAnswerCorrectness(null);
  };

  const handleShuffleQuestions = () => {
    const shuffledQuestions = [...filteredQuestions].sort(() => Math.random() - 0.5);
    setFilteredQuestions(shuffledQuestions);
    setUserAnswer('');
  };

  const handleSubmit = () => {
      const isCorrect = userAnswer.trim().toLowerCase() === filteredQuestions[currentQuestionIndex].answer.trim().toLowerCase();
      setAnswerCorrectness(isCorrect ? 'correct' : 'incorrect');
      if (isCorrect) {
        updateStreak(true);
      } else {
        updateStreak(false);
      }
    }

  const updateStreak = (isCorrect) => {
    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setCurrentStreak(0);
    }
  };


  return (
    <div className="App">
      <h1> The Ultimate Quiz Game</h1>
      <h4>Are you ready for a challenge? Put your knowledge to test! </h4>
      <p>Number of Cards: {filteredQuestions.length} </p>
      <p>Current Streak: {currentStreak} | Longest Streak: {longestStreak}</p>
      <label htmlFor="category">Select a category:  </label>
      <select value={category} onChange={handleCategoryChange}>
        <option value="biology">Biology</option>
        <option value="physics">Physics</option>
        <option value="movies">Movies</option>
        <option value="music">Music</option>
      </select>
      <div className="card-container">
      {filteredQuestions.length > 0 && (
        <FlashcardList
        questions={[filteredQuestions[currentQuestionIndex]]}
      />
      )}
      </div>
      <input
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Your answer"
        className={answerCorrectness === 'correct' ? 'input-correct' : answerCorrectness === 'incorrect' ? 'input-incorrect' : ''}
      />
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      <div className="navigation">
        <button onClick={handlePrevious} className="navigation-button"><FaArrowLeft /></button>
        <button onClick={handleNext} className="navigation-button"><FaArrowRight /></button>
        <button onClick={handleShuffleQuestions} className="shuffle-button"><FaRandom /> Shuffle</button>
      </div>
    </div>
  );
}

export default App
