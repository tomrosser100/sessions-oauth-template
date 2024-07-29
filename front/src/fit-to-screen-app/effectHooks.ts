import type { SetStateAction } from "react";
import type { Msg } from "../../../shared/types";

export const actionSubmit = (msg: Msg, setChat: SetStateAction<any>) => {
    const input = document.getElementById("input") as HTMLInputElement;
    const submit = document.getElementById("submit") as HTMLInputElement;

    setChat((prev: Msg[]) => [msg, ...prev]);

    input.value = "awaiting response...";
    input.style.color = "lightblue";
    input.disabled = true;
    submit.disabled = true;
}

export const actionComplete = (msg: Msg, setChat: SetStateAction<any>) => {
    const input = document.getElementById("input") as HTMLInputElement;
    const submit = document.getElementById("submit") as HTMLInputElement;

    setChat((prev: Msg[]) => [msg, ...prev]);

    input.disabled = false;
    input.value = "";
    input.style.color = "black";
    submit.disabled = false;
  };
