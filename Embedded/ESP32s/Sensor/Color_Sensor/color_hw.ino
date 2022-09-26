#include <MD_TCS230.h>
#include <FreqCount.h>

#define BLACK_CAL 0 
#define WHITE_CAL 1 
 
#define  S2_OUT  12 
#define  S3_OUT  11 
#define  LED     13  

MD_TCS230 CS(S2_OUT, S3_OUT, /* S0_OUT, S1_OUT, */ LED); 
 
sensorData sdBlack = { 1430, 690, 700 };
sensorData sdWhite = { 7890, 3620, 3770 };

colorData rgb; 
 
void setup() 
{ 
  Serial.begin(9600); 
  CS.begin(); 
  CS.setDarkCal(&sdBlack); 
  CS.setWhiteCal(&sdWhite); 
} 
 
void loop() 
{ 
 
  CS.read(); 

  while(!CS.available()) ; 

  CS.getRGB(&rgb); 

  Serial.print(rgb.value[TCS230_RGB_R]); 
  Serial.print(","); 
  Serial.print(rgb.value[TCS230_RGB_G]); 
  Serial.print(","); 
  Serial.println(rgb.value[TCS230_RGB_B]); 
  delay(30);
   
} 
