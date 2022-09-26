/*예제138-1
비접촉적외선 온도센서로 이마의 온도를 측정해보자!
한번만 측정하면 정확도가 떨어지니까 5회 측정을해서 평균을 내보자!
*/ 

#include Wire.h
#include Adafruit_MLX90614.h

Adafruit_MLX90614 mlx = Adafruit_MLX90614();
float temp;
int index = 0;

void setup() {
  Serial.begin(9600);
  Serial.println(Adafruit MLX90614 test);  
  mlx.begin();  
}

void loop() {
  temp += mlx.readObjectTempC();    //데이터 누적..
  index++;

  if(index = 5){                    ////0 1 2 3 4 (5) 결과출력
    temp = temp5;
    Serial.println(temp);
    temp = 0;
    index =0;
  }
  
  Serial.print(Ambient = ); Serial.print(mlx.readAmbientTempC()); 
  Serial.print(CtObject = ); Serial.print(mlx.readObjectTempC()); Serial.println(C);
  Serial.print(Ambient = ); Serial.print(mlx.readAmbientTempF()); 
  Serial.print(FtObject = ); Serial.print(mlx.readObjectTempF()); Serial.println(F);

  delay(500);
}
