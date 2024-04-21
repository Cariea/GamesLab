
import "./App.css";
import DrawerList from "./components/DrawerList";
import {  SessionProvider } from "./context";
import { Box } from "@mui/material";

function App() {


 

  return (
    <>
      <SessionProvider>
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 64px)",
            backgroundColor: "#003844"
          }}
        >
          <DrawerList />
     
        </Box>
      </SessionProvider>
    </>
  );
}

export default App;
