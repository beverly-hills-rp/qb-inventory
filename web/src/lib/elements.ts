export type Attributes = {
    [key: string]: string | number | boolean;
};

export type EventHandler<T extends Event = Event> = (event: T) => void;

type StyleObject = Partial<CSSStyleDeclaration>;

interface SVGElementTagNameMap {
    "animate": SVGAnimateElement;
    "animateMotion": SVGAnimateMotionElement;
    "animateTransform": SVGAnimateTransformElement;
    "circle": SVGCircleElement;
    "clipPath": SVGClipPathElement;
    "defs": SVGDefsElement;
    "desc": SVGDescElement;
    "ellipse": SVGEllipseElement;
    "feBlend": SVGFEBlendElement;
    "feColorMatrix": SVGFEColorMatrixElement;
    "feComponentTransfer": SVGFEComponentTransferElement;
    "feComposite": SVGFECompositeElement;
    "feConvolveMatrix": SVGFEConvolveMatrixElement;
    "feDiffuseLighting": SVGFEDiffuseLightingElement;
    "feDisplacementMap": SVGFEDisplacementMapElement;
    "feDistantLight": SVGFEDistantLightElement;
    "feDropShadow": SVGFEDropShadowElement;
    "feFlood": SVGFEFloodElement;
    "feFuncA": SVGFEFuncAElement;
    "feFuncB": SVGFEFuncBElement;
    "feFuncG": SVGFEFuncGElement;
    "feFuncR": SVGFEFuncRElement;
    "feGaussianBlur": SVGFEGaussianBlurElement;
    "feImage": SVGFEImageElement;
    "feMerge": SVGFEMergeElement;
    "feMergeNode": SVGFEMergeNodeElement;
    "feMorphology": SVGFEMorphologyElement;
    "feOffset": SVGFEOffsetElement;
    "fePointLight": SVGFEPointLightElement;
    "feSpecularLighting": SVGFESpecularLightingElement;
    "feSpotLight": SVGFESpotLightElement;
    "feTile": SVGFETileElement;
    "feTurbulence": SVGFETurbulenceElement;
    "filter": SVGFilterElement;
    "foreignObject": SVGForeignObjectElement;
    "g": SVGGElement;
    "line": SVGLineElement;
    "linearGradient": SVGLinearGradientElement;
    "marker": SVGMarkerElement;
    "mask": SVGMaskElement;
    "metadata": SVGMetadataElement;
    "mpath": SVGMPathElement;
    "path": SVGPathElement;
    "pattern": SVGPatternElement;
    "polygon": SVGPolygonElement;
    "polyline": SVGPolylineElement;
    "radialGradient": SVGRadialGradientElement;
    "rect": SVGRectElement;
    "script": SVGScriptElement;
    "set": SVGSetElement;
    "stop": SVGStopElement;
    "svg": SVGSVGElement;
}

const SVGElementTags = [
    "animate",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "foreignObject",
    "g",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "script",
    "set",
    "stop",
    "svg",
];

export type Props<E extends keyof (HTMLElementTagNameMap & SVGElementTagNameMap)> = {
    [key: string]: unknown; // allow any other props
} & {
        [key in keyof (HTMLElementTagNameMap & SVGElementTagNameMap)[E]]?: (HTMLElementTagNameMap & SVGElementTagNameMap)[E][key] extends EventHandler
        ? EventHandler<Parameters<(HTMLElementTagNameMap & SVGElementTagNameMap)[E][key]>[0]>
        : (HTMLElementTagNameMap & SVGElementTagNameMap)[E][key] extends infer K
        ? K extends keyof (HTMLElementTagNameMap & SVGElementTagNameMap)[E]
        ? (HTMLElementTagNameMap & SVGElementTagNameMap)[E][K]
        : never
        : never;
    } & {
        [key: string]: unknown;
        style?: StyleObject;
        children?: Node;
        key?: string; // add a key property for list rendering
    };

export function createElement<E extends keyof (HTMLElementTagNameMap & SVGElementTagNameMap)>(
    tag: E | ((props: Props<E>) => (HTMLElementTagNameMap & SVGElementTagNameMap)[E]),
    props: Props<E>,
    ...children: Node[]
): (HTMLElementTagNameMap & SVGElementTagNameMap)[E] {
    if (typeof tag === "function") {
        const element = tag(props);
        if (children.length !== 0) {
            children.forEach((child) => {
                if (typeof child === "string") {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });
        }
        return element as (HTMLElementTagNameMap & SVGElementTagNameMap)[E];
    }

    const isSvg = SVGElementTags.includes(tag);
    const element = isSvg
        ? document.createElementNS("http://www.w3.org/2000/svg", tag as string)
        : document.createElement(tag as string);

    const propKeys = props != null ? Object.keys(props) : [];

    if (propKeys.length !== 0) {
        Object.keys(props).forEach((name) => {
            if (name === "style") {
                const styleObject = props[name] as StyleObject;
                Object.keys(styleObject).forEach((prop) => {
                    (element.style as any)[prop] = styleObject[prop];
                });
            } else if (name.startsWith("on") && props[name] instanceof Function) {
                const eventName = name.slice(2).toLowerCase();
                element.addEventListener(eventName, props[name] as EventHandler);
            } else {
                if (typeof (element as any)[name] !== "undefined") {
                    if (typeof props[name] === "boolean") {
                        if (props[name]) {
                            (element as any)[name] = "";
                        }
                    } else if (isSvg && (element as any)[name] instanceof SVGAnimatedRect) {
                        (element as SVGSVGElement).setAttribute("viewBox", props[name] as string);
                    } else {
                        try { //avoid error with transform in svg
                            (element as any)[name] = props[name];
                        } catch (_) { }
                    }
                } else {

                    if (isSvg) {
                        element.setAttribute(
                            name,
                            props[name] as string
                        );
                    } else {
                        element.setAttribute(
                            name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), // to kebab-case
                            props[name] as string
                        );
                    }
                }
            }
        });
    }

    if (children.length === 0) {
        return element as (HTMLElementTagNameMap & SVGElementTagNameMap)[E];
    }

    children.forEach((child) => {
        if (child == null) return;

        if (typeof child === "string" || typeof child === "number" || typeof child === "boolean") {
            element.appendChild(document.createTextNode(child as string));
        } else if (child instanceof Array) {
            child.forEach((c) => {
                if (typeof c === "string" || typeof c === "number") {
                    element.appendChild(document.createTextNode(c.toString()));
                } else {
                    element.appendChild(c);
                }
            });
        } else {
            element.appendChild(child);
        }
    });

    return element as (HTMLElementTagNameMap & SVGElementTagNameMap)[E];
}

export function createFragment(...children: Node[]): DocumentFragment {
    const fragment = document.createDocumentFragment();
    children.forEach((child) => {
        if (typeof child === "string" || typeof child === "number") {
            fragment.appendChild(document.createTextNode(child as string));
        } else if (child instanceof Array) {
            child.forEach((c) => {
                if (typeof c === "string" || typeof c === "number") {
                    fragment.appendChild(document.createTextNode(c as string));
                } else {
                    fragment.appendChild(c);
                }
            });
        } else {
            if (child != null)
                fragment.appendChild(child);
        }
    });
    return fragment;
}
