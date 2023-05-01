export interface VanillaDomEventMap {
    "rendered": Event;
}

export namespace VanillaDom {
    const renderEvent = new CustomEvent('rendered', { detail: { key: 'value' } });
    const unmountEvent = new CustomEvent('unmount', { detail: { key: 'value' } });

    function _render(component: HTMLElement, rootElement: HTMLElement) {
        if (!rootElement) return;
        rootElement.innerHTML = '';
        rootElement.appendChild(component);
    }

    export function render(component: HTMLElement, rootElement: HTMLElement) {
        _render(component, rootElement);

        window.dispatchEvent(renderEvent);
    }

    export function init(component: HTMLElement, rootElement: HTMLElement) {
        window.addEventListener('DOMContentLoaded', () => {
            _render(component, rootElement);
        });
    }

    export function unmountComponentAtNode(rootElement: HTMLElement) {
        if (!rootElement) return;
        rootElement.innerHTML = '';

        window.dispatchEvent(unmountEvent);
    }
}
