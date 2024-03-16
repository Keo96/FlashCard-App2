import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ( {questions} ) => {
    return (
        <div className = "card-grid">
           {questions.map((question, index) => {
                return <Flashcard question={question} 
                key={index}
                />
           })}
        </div>
    );
}

export default FlashcardList;