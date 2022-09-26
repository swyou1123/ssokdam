#include "ContactFree_Temp_Test_header_v.h"


//float temp;
//int temp_cnt = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Adafruit MLX90614 test");  
  mlx.begin();  
}

void loop() {
  temp += mlx.readObjectTempC();    //데이터 누적..
  temp_cnt++;

  if(temp_cnt >= 5){                    ////0 1 2 3 4 (5) 결과출력
    temp = temp/5;
    Serial.println(temp);
    temp = 0;
    temp_cnt =0;
  }

  delay(500);
}
