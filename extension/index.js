import ArgumentType from '../utils/argument-type';
import BlockType from '../utils/block-type';
import DataType from '../utils/data-type';
import blockIconURI from './icon/blockIcon.svg';
import menuIconURI from './icon/menuIcon.svg';
import Func from './func';
import { setLocaleData, formatMessage, setLocale } from '../utils/translation';
import LocaleData from './locales';

setLocaleData(LocaleData);

class ExtensionCodexColorMath {
    constructor(runtime, extensionId) {
        this.runtime = runtime;
        this.funcs = new Func(runtime, extensionId);
    }

    setLocale(locale) {
        setLocale(locale);
    }

    getCodePrimitives() {
        return this.funcs;
    }

    getInfo() {
        return {
            name: formatMessage({
                id: 'ext.codexColorMath.name',
                default: '坐标转颜色 / Color Math'
            }),
            blockIconURI,
            menuIconURI,
            blockIconWidth: 36,
            blockIconHeight: 36,
            color1: '#7A5AF8',
            color2: '#6045D8',
            color3: '#4B35B3',
            blocks: [
                {
                    opcode: 'floorValue',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'gui.blocklyText.codexColorMath.floorValue',
                        description: 'Round a number down',
                        default: '向下取整 [NUM]'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '3.14'
                        }
                    },
                    outputTypes: [DataType.FLOAT]
                },
                {
                    opcode: 'modulo',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'gui.blocklyText.codexColorMath.modulo',
                        description: 'Integer remainder',
                        default: '[A] 取模 [B]'
                    }),
                    arguments: {
                        A: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        B: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '3'
                        }
                    },
                    outputTypes: [DataType.INT32_T]
                },
                {
                    opcode: 'rgbColor',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'gui.blocklyText.codexColorMath.rgbColor',
                        description: 'Pack red, green and blue channels into a color value',
                        default: '数字转颜色 红 [R] 绿 [G] 蓝 [B]'
                    }),
                    arguments: {
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '255'
                        },
                        G: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '165'
                        },
                        B: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    },
                    // WS2812 的 rgbColor reporter 输出类型是 uint32_t
                    outputTypes: [DataType.UINT32_T]
                },
                {
                    opcode: 'pickColor',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'gui.blocklyText.codexColorMath.pickColor',
                        description: 'Choose a color directly',
                        default: '颜色 [COLOR]'
                    }),
                    arguments: {
                        COLOR: {
                            type: ArgumentType.COLOR,
                            defaultValue: '#0000FF'
                        }
                    },
                    // 与 WS2812 颜色输入使用相同的 uint32_t 类型
                    outputTypes: [DataType.UINT32_T]
                },
                {
                    opcode: 'colorToList',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'gui.blocklyText.codexColorMath.colorToList',
                        description: 'Convert a color value to text for a list',
                        default: '颜色字符串 [COLOR]'
                    }),
                    arguments: {
                        COLOR: {
                            type: ArgumentType.COLOR,
                            defaultValue: '#0000FF',
                            inputTypes: [DataType.UINT32_T]
                        }
                    },
                    outputTypes: [DataType.STRING]
                },
                {
                    opcode: 'colorFromList',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'gui.blocklyText.codexColorMath.colorFromList',
                        description: 'Convert a list item string back to a color value',
                        default: '列表项转颜色 [VALUE]'
                    }),
                    arguments: {
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: '16753920'
                        }
                    },
                    // 取出后的颜色值也必须能直接接入 WS2812 的颜色输入
                    outputTypes: [DataType.UINT32_T]
                }
            ],
            menus: {}
        };
    }
}

export default ExtensionCodexColorMath;
