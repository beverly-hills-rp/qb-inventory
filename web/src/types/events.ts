import { VanillaDomEventMap } from "@lib";

type LoggerFunction = (...args: unknown[]) => void;

export interface EventProps {
    log: LoggerFunction;
};

export type EventKeys = keyof (WindowEventMap & DocumentEventMap & ElementEventMap & VanillaDomEventMap);
export type EventExec<T extends EventKeys> = (props: EventProps, ...args: (WindowEventMap & DocumentEventMap & ElementEventMap & VanillaDomEventMap)[T][]) => Promise<unknown>;

export interface Event<T extends EventKeys> {
    id: T;
    exec: EventExec<T>;
}
