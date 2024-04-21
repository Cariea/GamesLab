import {useState,useContext, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { SessionContext } from '../context';
import Wordle from './wordle/Wordle';
import { invoke } from "@tauri-apps/api/tauri";

import { GameConfig } from "../types/types";
const drawerWidth = 240;



interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



export default function PersistentDrawerLeft() {
  const {session,setCurrentGame,addGames,setFileName } = useContext(SessionContext);
  const [open, setOpen] = useState(false);

  const handleGame = (name: string) => {
    setCurrentGame(name);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = (_e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setOpen(false);
  };

  async function get_config() {
    let config:{file_name: string, games: GameConfig[]} = await invoke("get_config");
    setFileName(config?.file_name);
    addGames(config?.games);
    setCurrentGame(config?.games[0].name);
  }

  useEffect(() => {
    get_config();
  }, []);
  return (
    <>
    <Box sx={{ display: 'flex' }}  >
      <CssBaseline />
      <AppBar position="fixed" open={open}  sx={{backgroundColor:'#006C67'}} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {session.currentGame}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer onClick={(e) =>handleDrawerClose(e)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
    

        <List>
          {session.games.map((game) => (
            <ListItem key={game.name} disablePadding>
              <ListItemButton disabled={!game.active} onClick={() =>{
                handleGame(game.name);
                handleDrawerClose
              }
              }>
                <ListItemIcon>
                  { <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={game.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
    <Box component="main" sx={{ display:'flex',justifyContent:'center', marginTop:'78px'}}>
      {session.currentGame === "wordle" && <Wordle />}
      {session.currentGame === "sopa de letras" && <p>{session.currentGame}</p>}
      
    </Box>
    <AppBar position="fixed" open={open}  sx={{ top: 'auto', bottom: 0,backgroundColor:'#006C67'}}>
    <Toolbar sx={{justifyContent:'space-between'}}>
      <div>
      <Typography variant="h6" noWrap component="div">
        Player: {session.user}
      </Typography>
      <Typography variant="h6" noWrap component="div">
        File: {session.fileName}
      </Typography>
      </div>
      <div>
      <Typography variant="h6" noWrap component="div">
        Game score: {session.currentGameScore}
      </Typography>
      <Typography variant="h6" noWrap component="div">
        General score: {session.generalScore}
      </Typography>
      </div>
     
    </Toolbar>
  </AppBar>
  </>
  );
}
