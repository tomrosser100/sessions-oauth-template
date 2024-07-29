import type { Msg } from "./types";

export default interface SocketEvents {
  userPrompt: (userInput: Msg, callback: (response: Msg) => void) => void;
}
