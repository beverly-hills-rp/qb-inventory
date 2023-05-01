import { createElement } from "@lib";

let idCounter = 0;

export const Icon = (props) => {
    const {
        path,
        id = ++idCounter,
        title = null,
        description = null,
        size = null,
        color = 'currentColor',
        horizontal = false,
        vertical = false,
        rotate = 0,
        spin = false,
        style = {},
        inStack = false,
        ...rest
    } = props;

    const pathStyle: any = {};
    const transform: string[] = [];

    if (size !== null) {
        if (inStack) {
            transform.push(`scale(${size})`);
        } else {
            style.width = typeof size === "string" ? size : `${size * 1.25}rem`;
            style.height = typeof size === "string" ? size : `${size * 1.25}rem`;
        }
    }

    if (horizontal) {
        transform.push("rotate(90deg)");
    }

    if (vertical) {
        transform.push("rotate(180deg)");
    }

    if (rotate !== 0) {
        transform.push(`rotate(${rotate}deg)`);
    }

    if (spin) {
        const spinSpeed = typeof spin === "number" ? spin : 1;
        pathStyle.animation = `${spinSpeed}s linear infinite svg-icons-spin`;
    }

    pathStyle.fill = color;

    const svgProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        style: { ...style, ...{ transform: transform.join(" ") } },
        ...rest,
    };

    const titleElement = title ? (
        <title id={`svg-${id}-title`}>{title}</title>
    ) : null;

    const descriptionElement = description ? (
        <desc id={`svg-${id}-desc`}>{description}</desc>
    ) : null;

    return (
        <svg {...svgProps}>
            {titleElement}
            {descriptionElement}
            <path
                d={path}
                style={pathStyle}
                transform={`translate(2 2)`}
            />
        </svg>
    );
}
