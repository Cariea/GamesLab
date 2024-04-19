
import  { BoxStatus}  from "../../types/types";

interface BoxProps {
  value: string;
  status: BoxStatus;
}


export default function LetterBox({value, status}:BoxProps){


  return (
    <div>
      <div className={status} >{value}</div>
    </div>
  );
}