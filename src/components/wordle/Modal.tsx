interface ModalProps {
  type: 'win' | 'lose';
  completedWords: string[];
  solution: string;
}

export default function Modal({type, completedWords, solution}:ModalProps){
  return (
    <div className="modal-container">
      <div className="modal-view">
        <h2>{type === 'win' ? 'You Win!' : 'You Lose!'}</h2>
        <p>{type === 'win' ? 'Congratulations!' : 'Better luck next time!'}</p>
        <p>The solution was: {solution}</p>
        <p>You completed the following words:</p>
        <ul>
          {completedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}