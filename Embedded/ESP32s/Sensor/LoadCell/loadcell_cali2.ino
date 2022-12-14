#include <HX711.h>
#define DOUT 3
#define CLK 2


HX711 scale(DOUT, CLK);


float calibration_factor = -125500.0; 

void setup() {
  Serial.begin(9600);
  Serial.println("HX711 calibration sketch");
  Serial.println("Remove all weight from scale");
  Serial.println("After readings begin, place known weight on scale");
  Serial.println("Press + or a to increase calibration factor");
  Serial.println("Press - or z to decrease calibration factor");

  scale.set_scale();
  scale.tare();

  long zero_factor = scale.read_average();
  Serial.print("Zero factor : ");
  Serial.println(zero_factor);
}

void loop() {
  scale.set_scale(calibration_factor);

  Serial.print("Reading : ");
  Serial.print(scale.get_units()* 100, 5);
  Serial.print(" g");

  Serial.print(" calibraiton_factor: ");
  Serial.println(calibration_factor);

  if(Serial.available()) {
    char temp = Serial.read();
    if(temp == '+' || temp == 'a')
      calibration_factor += 10;
     else if(temp == '-' || temp == 'z')
      calibration_factor -= 10;
  }

}
