import { Box } from "@mui/material";
import LetterBox from "./LetterBox";

interface CurrentRowProps {
  word: string;
  solution: string;
}

export default function CurrentWordRow({word,solution}:CurrentRowProps){
  return (
    <Box sx={{display:'flex',gap:0.5, marginBottom:0.5, textTransform:'uppercase'}} >
       {
        word.split('').map((letter, index) => {
          return <LetterBox key={index} value={letter} status="edit"/>
        })
       }
       {
        Array.from({ length: solution.length - word.length }, (_, i) => (
          <LetterBox key={i} value="" status="empty" />
        ))
       }
    </Box>
  );
}