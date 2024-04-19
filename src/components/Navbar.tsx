import { AppBar,Toolbar,Typography } from "@mui/material";
import { SessionContext } from "../context";
import { useContext } from "react";

export default function Navbar() {
  const {session  } = useContext(SessionContext);
  return (
 
    <AppBar position="fixed" color="success" sx={{ top: 'auto', bottom: 0}}>
    <Toolbar sx={{justifyContent:'space-between'}}>

      
      <div>
      <Typography sx={{textAlign:'start'}} variant="h6" component="div">
        Player Name: {session.user} 
      </Typography>
      <Typography sx={{textAlign:'start'}} variant="h6" component="div">
        Config File Name: {session.fileName}
      </Typography>
      </div>
      
      <div className="text">
      <Typography sx={{textAlign:'start'}} variant="h6" component="div">
        Game Score:  {session.currentGameScore}
      </Typography>
      <Typography sx={{textAlign:'start'}} variant="h6" component="div">
        General Score:  {session.generalScore}
      </Typography>
      </div>
    </Toolbar>
  </AppBar>

  );
}