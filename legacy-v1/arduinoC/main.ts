//% color="#7A5AF8" iconWidth=36 iconHeight=36
namespace CodexColorMath {
    //% block="向下取整 [NUM]" blockType="reporter"
    //% NUM.shadow="number" NUM.defl="3.14"
    export function floorValue(parameter: any, block: any) {
        let num = parameter.NUM.code;
        Generator.addInclude('math.h', '#include <math.h>');
        Generator.addCode([`floor((double)(${num}))`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="[A] 取模 [B]" blockType="reporter"
    //% A.shadow="number" A.defl="10"
    //% B.shadow="number" B.defl="3"
    export function modulo(parameter: any, block: any) {
        let a = parameter.A.code;
        let b = parameter.B.code;
        Generator.addCode([`(((long)(${a})) % ((long)(${b})))`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="数字转颜色 红 [R] 绿 [G] 蓝 [B]" blockType="reporter"
    //% R.shadow="number" R.defl="255"
    //% G.shadow="number" G.defl="165"
    //% B.shadow="number" B.defl="0"
    export function rgbColor(parameter: any, block: any) {
        let r = parameter.R.code;
        let g = parameter.G.code;
        let b = parameter.B.code;
        let code = `(((uint32_t)constrain((long)(${r}), 0, 255) << 16) | ((uint32_t)constrain((long)(${g}), 0, 255) << 8) | (uint32_t)constrain((long)(${b}), 0, 255))`;
        Generator.addCode([code, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="颜色 [COLOR]" blockType="reporter"
    //% COLOR.shadow="colorPalette"
    export function pickColor(parameter: any, block: any) {
        let color = parameter.COLOR.code;
        Generator.addCode([color, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="颜色字符串 [COLOR]" blockType="reporter"
    //% COLOR.shadow="colorPalette"
    export function colorToList(parameter: any, block: any) {
        let color = parameter.COLOR.code;
        Generator.addCode([`String((uint32_t)(${color}))`, Generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="列表项转颜色 [VALUE]" blockType="reporter"
    //% VALUE.shadow="string" VALUE.defl="16753920"
    export function colorFromList(parameter: any, block: any) {
        let value = parameter.VALUE.code;
        Generator.addCode([`((uint32_t)String(${value}).toInt())`, Generator.ORDER_UNARY_POSTFIX]);
    }
}
