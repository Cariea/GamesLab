export type BoxStatus = "absent" | "present" | "correct" | "empty" |"edit";

export const enum GameStatus {
  Playing,
  Won,
  Lost,
}

export interface GameConfig {
  name: string;
  active: boolean;
  words: string[];
  description: string;
}