#include <MD_TCS230.h>
#include <FreqCount.h>

#define BLACK_CAL 0 
#define WHITE_CAL 1 
 
// 연결된 핀 번호들: S0_OUT <-> 8, S1_OUT <-> 9 
#define  S2_OUT  12 
#define  S3_OUT  11 
#define  LED     13  // HIGH = ENABLED 
 
MD_TCS230 CS(S2_OUT, S3_OUT, /* S0_OUT, S1_OUT, */ LED); 
 
sensorData sdBlack; 
sensorData sdWhite; 
 
void setup() 
{ 
  Serial.begin(9600); 
  Serial.print(F("\n[TCS230 영점 조정 예제]")); 
 
  // 컬러 센서 초기화 
  CS.begin(); 
} 
 
char getChar() 
// 시리얼 포트에서 문자를 받아 이를 대문자로 바꿔 리턴합니다: 
{ 
  while (Serial.available() == 0) 
    ; 
  return (toupper(Serial.read())); 
} 
 
void clearInput() 
// 시리얼 포트에 들어온 데이터들을 모두 읽어 없앱니다: 
{ 
  while (Serial.read() != -1) 
    ; 
} 
 
void outputHeader(void) 
// 영점 조정한 값들과 컬러를 RGB로 감지한 값들을 헤더 파일에 사용할 수 
// 있게 시리얼 모니터로 출력합니다: 
{ 
 
  Serial.print(F("\n\n// 영점 조정 데이터")); 
  Serial.print(F("\nsensorData sdBlack = { ")); 
  Serial.print(sdBlack.value[0]); Serial.print(F(", ")); 
  Serial.print(sdBlack.value[1]); Serial.print(F(", ")); 
  Serial.print(sdBlack.value[2]); Serial.print(F(" };")); 
 
  Serial.print(F("\nsensorData sdWhite = { ")); 
  Serial.print(sdWhite.value[0]); Serial.print(F(", ")); 
  Serial.print(sdWhite.value[1]); Serial.print(F(", ")); 
  Serial.print(sdWhite.value[2]); Serial.print(F(" };")); 
 
} 
 
uint8_t fsmReadValue(uint8_t state, uint8_t valType) 
{ 
  static uint8_t selChannel; 
  static uint8_t readCount; 
 
  switch (state) { 
    case 0: // Prompt for the user to start 
      Serial.print(F("\n\n값을 읽는 중: ")); 
      switch (valType) { 
        case BLACK_CAL: Serial.print(F("검정색 영점 조정")); break; 
        case WHITE_CAL: Serial.print(F("하얀색 영점 조정")); break; 
        default: Serial.print(F("??")); break; 
      } 
       
      clearInput(); 
 
      Serial.print(F("\n시작하려면 어떤 키든 눌러주세요 ...")); 
      getChar(); 
      clearInput(); 
       
      state++; 
      break; 
 
    case 1: // 센서 값을 읽기 시작합니다 
      CS.read(); 
      state++; 
      break; 
 
    case 2: // 값을 읽어 들일 때까지 기다립니다 
      if (CS.available()) { 
        switch (valType) { 
          case BLACK_CAL: 
            CS.getRaw(&sdBlack); 
            CS.setDarkCal(&sdBlack); 
            break; 
 
          case WHITE_CAL: 
            CS.getRaw(&sdWhite); 
            CS.setWhiteCal(&sdWhite); 
            break; 
        } 
        state++; 
      } 
      break; 
 
    default: // reset fsm 
      state = 0; 
      break; 
  } 
  return (state); 
} 
 
void loop() 
{ 
  static uint8_t runState = 0; 
  static uint8_t readState = 0; 
 
  switch (runState) { 
    case 0: // 검정색 영점 조정 
      readState = fsmReadValue(readState, BLACK_CAL); 
      if (readState == 0) runState++; 
      break; 
 
    case 1: // 하얀색 영점 조정 
      readState = fsmReadValue(readState, WHITE_CAL); 
      if (readState == 0) runState++; 
      break; 
       
    case 2: // 헤더 파일로 사용키 위하여 시리얼 모니터로 출력합니다 
      outputHeader(); 
      runState++; 
      break; 
 
    default:    // 잘못되었다면 다시 시작합니다 
      runState = 0;  
  } 
} 
