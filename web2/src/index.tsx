import { h, render } from 'preact';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import App from './components/app';

import './styles/global.scss';

const root = document.getElementById('root');

if (root) {
    render(
        <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
            <App />
        </DndProvider>,
        root
    );
}
