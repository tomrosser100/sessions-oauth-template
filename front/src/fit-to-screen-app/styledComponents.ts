import styled from "styled-components";
import { Form } from "react-router-dom";

export const DebugCSS = styled.div<{ $debugStyles: boolean }>`
  * {
    ${(props) =>
      props.$debugStyles &&
      `background-color: rgb(0, 0, 255, 0.2);box-sizing: border-box;
    border: solid black 1px;`}
  }
`;

export const Body = styled.div`
  padding: 50px;
  height: 99dvh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HeaderGrid = styled.div`
  border: 3px solid black;
  border-radius: 10px;
  padding: 5px;
  height: 75px;
  min-height: 42px;
  overflow: hidden;
`;

export const Chat = styled.div`
  border: black solid 3px;
  border-radius: 10px;
  height: 65dvh;
  padding: 10px;
`;

export const InputBar = styled.div`
  border: 3px solid black;
  border-radius: 10px;

  padding: 5px;
  place-self: end;
  height: 75px;
  width: 100%;
  align-self: end;
`;

export const ScrollingChatContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  word-break: break-all;
  width: 100%;
  height: 100%;
`;
export const InputSubmitContainer = styled(Form)`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 1fr;
`;

export const GPT = styled.div`
  border-radius: 10px;
  font-weight: bold;
  padding: 5px;
  white-space: wrap;
  background-color: rgba(0, 0, 255, 0.1);
`;

export const User = styled.div`
  text-indent: 1em;
  padding: 5px;
  white-space: wrap;
`;
