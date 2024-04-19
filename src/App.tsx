// import { useState } from "react";
 
// import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import DrawerList from "./components/DrawerList";
import { SessionProvider } from "./context";
import { Box } from "@mui/material";
function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  // async function readFile() {
    //   setSession(await invoke("read_file", { name }));
    // }
    
  
  return (
    <>
    <SessionProvider >
    <Box sx={{width:'100%', height:'calc(100vh - 64px)',backgroundColor:'#003844'}}>
      <DrawerList />
      
    </Box>
      
    </SessionProvider>
    </>
  );
}

export default App;
