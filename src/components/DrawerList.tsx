import {useState,useContext} from 'react';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { SessionContext } from '../context';
import Wordle from './wordle/Wordle';
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
  const {session,setCurrentGame  } = useContext(SessionContext);
  const [open, setOpen] = useState(false);

  const handleGame = (name: string) => {
    setCurrentGame(name);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e.target);
    setOpen(false);
  };

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
          {['Super Mario Bros', 'Minecraft', 'Fortnite', 'Among Us','Dota 2','Valorant','Overwatch','FIFA 21'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton  onClick={() =>{
                handleGame(text);
                handleDrawerClose
              }
              }>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
    <Box component="main" sx={{ display:'flex',justifyContent:'center', marginTop:'78px'}}>

      <Wordle />
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
