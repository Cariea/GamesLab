import { Box } from "@mui/material";
import LetterBox from "./LetterBox";

interface WordRowProps {
  word: string;
  solution: string;
}

export default function EmptyWordRow({ word, solution}: WordRowProps) {
  return (
    <Box sx={{display:'flex',gap:0.5, marginBottom:0.5, textTransform:'uppercase'}} >
      {Array.from({ length: solution.length }, (_, i) => (
        <LetterBox key={i} value="" status="empty" />
      ))}
    </Box>
  );
}