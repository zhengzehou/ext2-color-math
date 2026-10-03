/*!
 * MindPlus
 * DFRobot, 行空板 K10
 * p0声控
 * p1接灯带
 * 注意引脚
 */
#include <stdlib.h>
#include <stdint.h>
#include <SimpleList.h>
#include "unihiker_k10.h"
#include <DFRobot_NeoPixel.h>

// 动态变量
volatile float     mind_n_noise, mind_n_number;
SimpleList<String> mind_l_tst;

// 创建对象
UNIHIKER_K10 k10;
uint8_t screen_dir=2;
DFRobot_NeoPixel neoPixel_P1;

void DF_ChuShiHuaDengGuang();
uint32_t codexColorFromText(String value);

// 主程序开始
void setup() {
	k10.begin();
	Serial.begin(9600);
	k10.initScreen(screen_dir);
	k10.creatCanvas();
	k10.setScreenBackground(0xFFFFFF);
	DF_ChuShiHuaDengGuang();
	neoPixel_P1.begin(P1, 8);
	neoPixel_P1.setRangeColor(0, 7, codexColorFromText(String(mind_l_tst[1-1])));
	delay(2000);
}
void loop() {
	Serial.println((analogRead(P0)));
	mind_n_noise = (map((analogRead(P0)), 0, 4095, 0, 255));
	mind_n_number = ((mind_n_noise - ((int32_t(mind_n_noise)) % (int32_t((255 / 8))))) / (255 / 8));
	k10.canvas->canvasText(mind_n_noise, 1, 0x000000);
	k10.canvas->canvasText(mind_n_number, 3, 0x0000FF);
	k10.canvas->canvasText(mind_l_tst[(mind_n_number + 1)-1], 4, 0x0000FF);
	k10.canvas->updateCanvas();
	neoPixel_P1.setRangeColor((mind_n_number + 1), 7, 0x000000);
	neoPixel_P1.setRangeColor(0, mind_n_number, codexColorFromText(String(mind_l_tst[(mind_n_number + 1)-1])));
}


// 自定义函数
void DF_ChuShiHuaDengGuang() {
	mind_l_tst.clear();
	mind_l_tst.insert(1-1, String((uint32_t)(0xFFE900)));
	mind_l_tst.insert(2-1, String((uint32_t)(0xEEFF00)));
	mind_l_tst.insert(3-1, String((uint32_t)(0xFFBB00)));
	mind_l_tst.insert(4-1, String((uint32_t)(0xFF7B00)));
	mind_l_tst.insert(5-1, String((uint32_t)(0xFF0000)));
	mind_l_tst.insert(6-1, String((uint32_t)(0xFA00FF)));
	mind_l_tst.insert(7-1, String((uint32_t)(0xFF4800)));
	mind_l_tst.insert(8-1, String((uint32_t)(0xAF0000)));
}


// 静态函数
uint32_t codexColorFromText(String value) {
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
}
