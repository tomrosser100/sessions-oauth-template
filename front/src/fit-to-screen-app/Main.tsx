import React, { useEffect, useState } from "react";
import {
  ScrollingChatContainer,
  InputSubmitContainer,
  DebugCSS,
  Body,
  HeaderGrid,
  Chat,
  InputBar,
  GPT,
  User,
} from "./styledComponents";
import testChat from "./testChat";
import { eventEmitter } from "./eventEmitter";
import { actionComplete, actionSubmit } from "./effectHooks";
import type { Msg } from "../../../shared/types";
import config from "../../../config";

const ScrollingChat = ({ chat }: { chat: Msg[] }) => {
  return (
    <ScrollingChatContainer>
      {chat.map((entry, i) => {
        if (entry.type === "user") {
          return <User key={i}>{entry.msg}</User>;
        } else if (entry.type === "gpt") {
          return <GPT key={i}>{entry.msg}</GPT>;
        } else {
          throw new Error();
        }
      })}
    </ScrollingChatContainer>
  );
};

const InputSubmit = () => {
  return (
    <InputSubmitContainer method="POST">
      <input
        id="input"
        className="p-3"
        type="textbox"
        name="userInput"
        placeholder="type here"
      ></input>
      <button
        id="submit"
        className="cursor-pointer hover:bg-blue-100 transition-colors duration-100"
        type="submit"
      >
        enter
      </button>
    </InputSubmitContainer>
  );
};

export default () => {
  const [chat, setChat] = useState(testChat);

  useEffect(() => {
    const handleActionSubmit = (msg: Msg) => actionSubmit(msg, setChat);
    const handleActionComplete = (msg: Msg) => actionComplete(msg, setChat);

    eventEmitter.on("actionSubmit", handleActionSubmit);
    eventEmitter.on("actionComplete", handleActionComplete);
    return () => {
      eventEmitter.off("actionSubmit", handleActionSubmit);
      eventEmitter.off("actionComplete", handleActionComplete);
    };
  });

  return (
    <DebugCSS $debugStyles={config.front.debugStyles}>
      <Body>
        <HeaderGrid></HeaderGrid>
        <Chat>
          <ScrollingChat chat={chat}></ScrollingChat>
        </Chat>
        <InputBar>
          <InputSubmit></InputSubmit>
        </InputBar>
      </Body>
    </DebugCSS>
  );
};
