import { Box, Button, Typography } from '@mui/material';
import WordRow from './WordRow';
import EmptyWordRow from './EmptyWordRow';
import CurrentWordRow from './CurrentWordRow';
import { useEffect, useRef, useState,useContext } from 'react';
import { GameStatus } from '../../types/types';
import { useWindow } from '../../hooks/useWindow'; 
import { SessionContext } from '../../context';
const keys = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
export default function Wordle() {
  const [correctCompletedWords, setCorrectCompletedWords] = useState<string[]>([])
  const [currentSolution,setCurrentSolution] = useState<string>('');
  const [currentWord, setCurrentWord] = useState("");
  const [turns, setTurns] = useState<number>(1);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);
  const resetButtonRef = useRef<HTMLButtonElement | null>(null);
  const { addScore,session,} = useContext(SessionContext);

  const SelectRandomWord = () => {
    const word =  session.games[0].words[Math.floor(Math.random() * session.games[0].words.length)];

    if(completedWords.length === session.games[0].words.length){
      setCompletedWords([]);
    }

    if(!completedWords.includes(word.toUpperCase())) {
      setCurrentSolution(word.toUpperCase());

    }else{
      SelectRandomWord();
    }
  
     
  }
  const handleReset = () => {

    setCurrentWord("");
    setTurns(1);
    setCompletedWords([]);
    setGameStatus(GameStatus.Playing); 
    SelectRandomWord();
    if (resetButtonRef.current) {
      resetButtonRef.current.blur();
    }
   
  
  }

  const handleKeyDown = (event: KeyboardEvent) => {

    if(gameStatus !== GameStatus.Playing) return;

    if(event.key === "Backspace" && currentWord.length > 0){
      setCurrentWord(currentWord.slice(0,-1));
    }
    if(event.key === "Enter" && currentWord.length === currentSolution.length && turns <= 6 && gameStatus === GameStatus.Playing){
        if(gameStatus !== GameStatus.Playing) return;

        if(currentWord === currentSolution){
          if(correctCompletedWords.length >5){
            setCorrectCompletedWords([]);
          }else{

            setCorrectCompletedWords([...correctCompletedWords, currentWord]);
          }
          setCompletedWords([...completedWords, currentWord]);
          setGameStatus(GameStatus.Won);
          addScore( 6 - turns );
          return;
        }
        if(turns === 6 && currentWord !== currentSolution){
          setCompletedWords([...completedWords, currentWord]);
          addScore(-1);
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
   

    SelectRandomWord();

  }, []);
  
  return (
    <Box sx={{ display:"flex"}}>
      <Box sx={{paddingRight:1, marginTop:'2px'}}>
        <Box sx={{width:'240px', height:'400px',backgroundColor:'#78A1BB'}}>
            <Typography sx={{textAlign:'center'}} variant="h6">{gameStatus === 0 ? 'Jugando' : gameStatus === 1 ? 'Ganaste' : 'Perdiste' }</Typography>
            <Typography variant="h6">Turno: {turns}</Typography>
            {gameStatus === 1 && <Typography variant="h6" sx={{color:'green'}}>Ganaste {6 - turns} puntos, Felicidades</Typography>}
            {gameStatus === 2 && <Typography variant="h6" sx={{color:'red'}}>La palabra era: {currentSolution}, Perdiste 1 punto</Typography>}
        </Box>
        <Button ref={ resetButtonRef} sx={{width:'100%',marginTop:'2px'  }} variant="outlined" onClick={handleReset}>Restart</Button>
      </Box>
      <Box sx={{  justifyContent:"center", alignItems:"center"}}>    
        {
          completedWords.map((word, index) => {
            return <WordRow key={index} word={word} solution={currentSolution}/>
          })
        }
        {
          gameStatus == GameStatus.Playing ? <CurrentWordRow word={currentWord} solution={currentSolution}/> : null
        }
        { currentSolution !== '' &&
          Array.from(Array(6 - turns), (_, i) => (
            <EmptyWordRow key={i} word="" solution={currentSolution}/>
          ))
        }
      </Box>
    </Box>
  );
}