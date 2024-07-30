import type { Msg } from "./types";

export default interface SocketEvents {
  userPrompt: (userInput: Msg, callback: (response: Msg) => void) => void;
  isAuth: (callback: (response: boolean) => void) => void
  getAuthURL: (callback: (response: string) => void) => void;
  postAuthCode: (code: string, callback: (response: string) => void) => void;
}
