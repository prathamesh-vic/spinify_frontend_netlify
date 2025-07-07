export default function calcDocumentSize() {
    const { scrollHeight: height, scrollWidth: width } = document.body;
    const { marginTop, marginRight, marginBottom, marginLeft, borderTop, borderRight, borderBottom, borderLeft, } = window.getComputedStyle(document.body);
    return {
        height: height +
            removeUnit(marginTop) +
            removeUnit(marginBottom) +
            removeUnit(borderTop) +
            removeUnit(borderBottom),
        width: width +
            removeUnit(marginLeft) +
            removeUnit(marginRight) +
            removeUnit(borderLeft) +
            removeUnit(borderRight),
    };
}
function removeUnit(cssSize) {
    return parseFloat(cssSize.replace(/D/g, ''));
}
