import { Event, EventExec, EventKeys, EventProps } from '../types';

export function event<T extends EventKeys>(id: T, exec: EventExec<T>): Event<T> {
    return { id, exec };
}

export function registerEvents(events: Event<any>[]): void {
    for (const event of events) {
        window.addEventListener(event.id, async (...args) => {
            // Create Props
            const props: EventProps = {
                log: (...args: unknown[]) => console.log(`[${event.id}]`, ...args),
            };

            // Catch uncaught errors
            try {
                await event.exec(props, ...args);
            } catch (error) {
                props.log('Uncaught Error:', error);
            }
        });
    }
}
