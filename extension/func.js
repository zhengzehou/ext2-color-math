class Func {
    constructor(runtime) {
        this.runtime = runtime;
    }

    floorValue(generator, block, parameter) {
        const num = parameter.NUM.code;
        generator.addInclude('math.h');
        return [`floor((double)(${num}))`, generator.ORDER_ATOMIC];
    }

    modulo(generator, block, parameter) {
        const a = parameter.A.code;
        const b = parameter.B.code;
        generator.addFunction(`long codexModulo(long a, long b) {
    if (b == 0) {
        return 0;
    }
    return a % b;
}`);
        return [`codexModulo((long)(${a}), (long)(${b}))`, generator.ORDER_ATOMIC];
    }

    rgbColor(generator, block, parameter) {
        const r = parameter.R.code;
        const g = parameter.G.code;
        const b = parameter.B.code;
        generator.addInclude('math.h');
        generator.addInclude('stdint.h');
        generator.addFunction(`uint32_t codexRgbToColor(double r, double g, double b) {
    long ri = (long)round(r);
    long gi = (long)round(g);
    long bi = (long)round(b);
    if (ri < 0) ri = 0;
    if (ri > 255) ri = 255;
    if (gi < 0) gi = 0;
    if (gi > 255) gi = 255;
    if (bi < 0) bi = 0;
    if (bi > 255) bi = 255;
    return ((uint32_t)ri << 16) | ((uint32_t)gi << 8) | (uint32_t)bi;
}`);
        return [
            `codexRgbToColor((double)(${r}), (double)(${g}), (double)(${b}))`,
            generator.ORDER_ATOMIC
        ];
    }

    pickColor(generator, block, parameter) {
        generator.addInclude('stdint.h');
        return [`(uint32_t)(${parameter.COLOR.code})`, generator.ORDER_ATOMIC];
    }

    colorToList(generator, block, parameter) {
        const color = parameter.COLOR.code;
        generator.addInclude('stdint.h');
        return [`String((uint32_t)(${color}))`, generator.ORDER_ATOMIC];
    }

    colorFromList(generator, block, parameter) {
        const value = parameter.VALUE.code;
        generator.addInclude('stdlib.h');
        generator.addFunction(`uint32_t codexColorFromText(String value) {
    value.trim();
    if (value.startsWith("#")) {
        value = value.substring(1);
        return (uint32_t)strtoul(value.c_str(), NULL, 16);
    }
    if (value.startsWith("0x") || value.startsWith("0X")) {
        value = value.substring(2);
        return (uint32_t)strtoul(value.c_str(), NULL, 16);
    }
    return (uint32_t)value.toInt();
}`);
        return [`codexColorFromText(String(${value}))`, generator.ORDER_ATOMIC];
    }
}

export default Func;
