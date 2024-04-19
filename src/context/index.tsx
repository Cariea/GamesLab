import { createContext, useState } from 'react';

export interface SessionContextInterface {
  user: string;
  fileName: string;
  generalScore: number;
  currentGame: string;
  currentGameScore: number;
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
});

export function SessionProvider({children }: { children: React.ReactNode }) {
  const [session, setSession] = useState({
    user: "",
    fileName: "",
    generalScore: 0,
    currentGame: "",
    currentGameScore: 0
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

  return (
    <SessionContext.Provider value={
      {
        session: session,
        addScore,
        resetScore,
        setUserName,
        setCurrentGame
      }
    }>
      {children}
    </SessionContext.Provider>
  );
}