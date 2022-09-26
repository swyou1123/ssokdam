#include "airquality_header_v.h"
// int airQuality;     
 
 void setup() {
   Serial.begin(9600);
 }
 
 void loop() {
     airQuality = ZP07_MP503(2);
     Serial.print("  Current air quality rating：");
     Serial.println(airQuality);
 }

 // 220803 test 완료.
 // 사용법 : airQuality = ZP07_MP503(사용포트를 여기 기입);
