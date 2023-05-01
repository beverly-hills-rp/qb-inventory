import { Event } from '../types';
import message from './message';
import rendered from './rendered';
import drop from './drop';
import keydown from './keydown';

const events: Event<any>[] = [
    ...message,
    ...rendered,
    ...drop,
    ...keydown
];

export default events;
