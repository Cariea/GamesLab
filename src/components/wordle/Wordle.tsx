import { Box, Button } from '@mui/material';
import WordRow from './WordRow';
import EmptyWordRow from './EmptyWordRow';
import CurrentWordRow from './CurrentWordRow';
import { useEffect, useRef, useState,useContext } from 'react';
import { GameStatus } from '../../types/types';
import { useWindow } from '../../hooks/useWindow'; 
import { SessionContext } from '../../context';
const keys = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
export default function Wordle() {

  const [currentSolution,setCurrentSolution] = useState<string>('');
  const [currentWord, setCurrentWord] = useState("");
  const [turns, setTurns] = useState<number>(1);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);
  const resetButtonRef = useRef<HTMLButtonElement | null>(null);
  const { addScore } = useContext(SessionContext);
  const handleReset = () => {
    console.log("Reset");
    setCurrentWord("");
    setTurns(1);
    setCompletedWords([]);
    setGameStatus(GameStatus.Playing); 
    if (resetButtonRef.current) {
      resetButtonRef.current.blur();
    }
  
  }

  const handleKeyDown = (event: KeyboardEvent) => {

    if(gameStatus !== GameStatus.Playing) return;

    if(event.key === "Backspace" && currentWord.length > 0){
      console.log("Backspace");
      setCurrentWord(currentWord.slice(0,-1));
    }
    if(event.key === "Enter" && currentWord.length === currentSolution.length && turns <= 6 && gameStatus === GameStatus.Playing){
      console.log("Enter");
        if(gameStatus !== GameStatus.Playing) return;

        if(currentWord === currentSolution){
          setCompletedWords([...completedWords, currentWord]);
          setGameStatus(GameStatus.Won);
          addScore(1);
          return;
        }
        if(turns === 6 && currentWord !== currentSolution){
          setCompletedWords([...completedWords, currentWord]);
          setGameStatus(GameStatus.Lost);
          return;
        }
        setCompletedWords([...completedWords, currentWord]);
        setTurns(turns + 1);
        setCurrentWord("");

        //validar su existe la palabra
      return;
    }

    if(currentWord.length === currentSolution.length) return;

    //Ingresar letra al estado
    if(keys.includes(event.key.toUpperCase())){
      setCurrentWord(currentWord + event.key.toUpperCase());
      return;
    }
  }


  
  useWindow("keydown", handleKeyDown)
  useEffect(() => {
    
    setCurrentSolution("PADROS");
  }, [gameStatus]);
  return (
    <Box sx={{ display:"flex",justifyContent:"center", alignItems:"center"}}>
      <Button ref={ resetButtonRef} sx={{marginRight:2  }} variant="outlined" onClick={handleReset}>Restart</Button>
      <div>
        
      {
        completedWords.map((word, index) => {
          return <WordRow key={index} word={word} solution={currentSolution}/>
        })
      }
      {
        gameStatus == GameStatus.Playing ? <CurrentWordRow word={currentWord} solution={currentSolution}/> : null
      }
      {
        Array.from(Array(6 - turns), (_, i) => (
          <EmptyWordRow key={i} word="" solution={currentSolution}/>
        ))
      }
    </div>
      



      
    </Box>
  );
}