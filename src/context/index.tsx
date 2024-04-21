import { createContext, useState } from 'react';
import { GameConfig } from '../types/types';
export interface SessionContextInterface {
  user: string;
  fileName: string;
  generalScore: number;
  currentGame: string;
  currentGameScore: number;
  games: GameConfig[];
}

export const SessionContext = createContext({
  session: {
     
  }
} as {
  session: SessionContextInterface,
  addScore: (score: number) => void,
  resetScore: () => void
  setUserName: (name: string) => void
  setCurrentGame: (game: string) => void
  addGames: (games: GameConfig[]) => void
});

export function SessionProvider({children }: { children: React.ReactNode }) {
  const [session, setSession] = useState({
    user: "",
    fileName: "",
    generalScore: 0,
    currentGame: "",
    currentGameScore: 0,
    games: [{name:'',active:false,words:[''],description:''}]
  } as SessionContextInterface);

  
  function addScore(score: number)  {
    setSession((prev) => ({
      ...prev,
      currentGameScore: prev.currentGameScore + score,
      generalScore: prev.generalScore + score
    }));
  };

  function resetScore() {
    setSession((prev) => ({
      ...prev,
      currentGameScore: 0,
      generalScore: 0
    }));
  };

  function setUserName (name: string) {
    setSession((prev) => ({
      ...prev,
      user: name
    }));
  }

  function setCurrentGame(game: string) {
    setSession((prev) => ({
      ...prev,
      currentGame: game
    }));
  }
  function addGames(games: GameConfig[]) {
    setSession((prev) => ({
      ...prev,
      games: games
    }));
  }

  return (
    <SessionContext.Provider value={
      {
        session: session,
        addScore,
        resetScore,
        setUserName,
        setCurrentGame,
        addGames
      }
    }>
      {children}
    </SessionContext.Provider>
  );
}