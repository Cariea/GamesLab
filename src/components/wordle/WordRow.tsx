import { Box } from "@mui/material";
import LetterBox from "./LetterBox";

interface WordRowProps {
  word: string;
  solution: string;
}

export default function WordRow({word, solution}:WordRowProps){

  const checkLetter = (index: number,letter: string) => {


    if(solution.includes(letter)){
      if(solution[index] === letter){
        return 'correct';
      }else {
        const solutionCount = solution.split(letter).length - 1;
        const wordCount = word.split(letter).length - 1;

        if (solutionCount >= wordCount) {
          return 'present';
        }else{
          return 'absent';
        }
      }
    }else{
      return 'absent';
    }
  }
  return (
    <Box sx={{display:'flex',gap:0.5, marginBottom:0.5, textTransform:'uppercase'}} >
       {
        Array.from(Array(solution.length)).map((_, index) => {
          return <LetterBox key={index} value={word[index]} status={checkLetter(index,word[index])}/>
        })
       }
    </Box>
  );
}