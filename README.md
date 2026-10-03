# 坐标转颜色 / 数学工具

这是一个适用于 Mind+ V2 上传模式的功能扩展，提供 RGB 颜色和数学工具积木：

> 当前 V2 ZIP 为本地开发测试包，尚未正式收录。通过“加载测试扩展”导入后，Mind+ V2 禁止保存包含该扩展的项目。重新打包或修改版本号不能解决此限制；正式使用需按官方流程提交收录。请勿把测试包当作可保存项目的正式安装包。
> 官方说明：https://mindplus.dfrobot.com.cn/mp2/Extensions/ExtDevelopmentDocs/common-development-build-import-guide/

| 积木 | 作用 | 生成的 Arduino C++ |
| --- | --- | --- |
| 向下取整 | 对数字做 floor | `floor(x)` |
| 取模 | 对输入转为整数后取余；除数为 0 时返回 0 | `codexModulo(a, b)` |
| 数字转颜色 | 按 WS2812 的规则将 R/G/B（0～255）打包为 `uint32_t` 颜色值 | `codexRgbToColor(r, g, b)` |
| 颜色 | 使用 Mind+ 颜色选择框直接得到与 WS2812 相同的 `uint32_t` 颜色值 | 颜色值 |
| 颜色字符串 | 把颜色值转换为列表可保存的十进制字符串 | `String((uint32_t)color)` |
| 列表项转颜色 | 将列表中的字符串颜色值转换为 RGB 扩展可用的颜色值 | `codexColorFromText(value)` |

RGB 积木可以直接插入需要颜色值的灯带/颜色输入框。例如：

```text
数字转颜色 红 255 绿 165 蓝 0
```

生成的颜色值为橙色 `0xFFA500`。颜色通道会限制在 0～255；取模积木会先把小数截成整数。

## 构建

本扩展使用 Mind+ 官方 V2 扩展构建模板。把本目录中的 `extension/` 放到模板根目录，运行 `npm install` 和 `npm run build`，然后使用 `build/ext-Codex-colorMath@0.2.6/config.json` 在 Mind+ 开发者模式中加载测试扩展。

## 版本

V0.2.6：列表颜色转换积木更名为“颜色字符串”，内部标识和转换功能不变。

V0.2.5：颜色 reporter 输出类型改为 `uint32_t`，计算规则与 WS2812 RGB reporter 一致，可在兼容的颜色输入位置等价替换。
