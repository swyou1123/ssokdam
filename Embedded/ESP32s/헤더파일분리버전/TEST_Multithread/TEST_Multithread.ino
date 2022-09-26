TaskHandle_t Task1;
TaskHandle_t Task2;

void setup()
{
  Serial.begin(115200);

  xTaskCreatePinnedToCore(
    blink1000,         // 태스크 함수
    "Task1",           // 테스크 이름
    10000,             // 스택 크기(워드단위)
    NULL,              // 태스크 파라미터
    1,                 // 태스크 우선순위
    &Task1,            // 태스크 핸들
    0);                // 실행될 코어

  xTaskCreatePinnedToCore(
    blink700,          // 태스크 함수
    "Task2",           // 테스크 이름
    10000,             // 스택 크기(워드단위)
    NULL,              // 태스크 파라미터
    1,                 // 태스크 우선순위
    &Task2,            // 태스크 핸들
    1);                // 실행될 코어
}

void blink1000 ( void *param )
{
  Serial.print("# Task 1 running on core ");
  Serial.println(xPortGetCoreID());

  while (1) {
    Serial.print(xPortGetCoreID());
    Serial.println(" core is running per 1 second");
    delay(1000);

  }
}

void blink700 ( void *param )
{
  Serial.print("# Task 2 running on core ");
  Serial.println(xPortGetCoreID());

  while (1) {
    Serial.print(xPortGetCoreID());
    Serial.println(" core is running per 0.3 second");
    delay(300);
  }
}

void loop()
{
}
