import React from 'react';
import { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ question }) => {
    const [flip, setFlip] = useState(false);
    const {question: flashcardQuestion, answer, difficulty, image} = question;

    return (
        <div
        className={`card ${flip ? 'flip' : ''} ${difficulty}`} 
        onClick={() => setFlip(!flip)}
        >
            <div className='front'>
                {flashcardQuestion}
                {image && <img src={image} alt='flashcard' className='question-image' />}
            </div>
            <div className='back'>{answer}</div>
        </div>
    );
};

export default Flashcard;
