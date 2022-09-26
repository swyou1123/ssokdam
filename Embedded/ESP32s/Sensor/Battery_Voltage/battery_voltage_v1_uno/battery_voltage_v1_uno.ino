void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);
}

float voltage = 0;
int data = 0;

void loop() {
  data = analogRead(A0)+ 100;
  Serial.print("data : ");
  Serial.println(data);
  voltage = (12.56*data)/557 - 0.1;
  Serial.print("voltage : ");
  Serial.println(voltage);
  delay(200);
}
//Arduino ADC : 0~5V
