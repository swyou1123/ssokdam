
 int airQuality;     
 
// void setup() {
//   Serial.begin(9600);
// }
// 
// void loop() {
//     airQuality = ZP07_MP503(2);
//     Serial.print("  Current air quality rating：");
//     Serial.println(airQuality);
// }
// 
// 
 int ZP07_MP503(int pinA) {
     
     /* 初始化 */
     pinMode(pinA, INPUT);
     unsigned long millisTimes = millis();
     unsigned long startMillisTimes = millisTimes;
     unsigned long stopMillisTimes;
     signed long deltaMillisTimes =  millisTimes - startMillisTimes;
     bool turnState = false;
     bool pinAstate = digitalRead(pinA);;
     bool pinAstateLast = pinAstate;
     int result;
 
     /* 测试读取状态 */
     while (true) {
         pinAstate = digitalRead(pinA);    
 
         if (pinAstate != pinAstateLast) {
             if (turnState == true) {
                 stopMillisTimes = millis();
                 if (pinAstate == false) {
                 deltaMillisTimes = stopMillisTimes - startMillisTimes;
                 }
                 else {
                     deltaMillisTimes = 98 - stopMillisTimes + startMillisTimes;
                 }
             result = (deltaMillisTimes + 5) / 10;    
             break;                  
             }
         if (turnState == false) {
             startMillisTimes = millis();    
             turnState = true;            
             }
             pinAstateLast = pinAstate;
         }
 
         millisTimes = millis();
         deltaMillisTimes = millisTimes - startMillisTimes;
         if ( deltaMillisTimes > 100 ) { 
         if (pinAstate == true) {     
             result = 1;
         }
         if (pinAstate == false) {   
             result = 0;
         }
         break;
         }
     }

 
     return result;     
 }
