import { EventEmitter } from "events";
import type TypedEmitter from "typed-emitter";
import type { Msg } from "../../../shared/types";

type MessageEvents = {
    actionSubmit: (msg: Msg) => void;
    actionComplete: (msg: Msg) => void
};

export const eventEmitter = new EventEmitter() as TypedEmitter<MessageEvents>;
