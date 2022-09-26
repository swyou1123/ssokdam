#include <WiFi.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>

const char* PostserverName = "http://3.36.78.244:8080/embedded/send";       //http Post요청을 보낼 URL ex)http://3.23.34.234:3000/hi/there
const char* GetserverName = "http://3.36.78.244:8080/embedded/receive?embId=1";     //http Get요청을 보낼 URL ex)http://3.23.34.234:3000/hi/there
String information;
String informationsArr[2];

void Post(){
  WiFiClient client;
  HTTPClient http;
    
  http.begin(client, PostserverName);

  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST("{\"embId\":\"1\",\"embFullTra\":\"25\",\"embFullCig\":\"25\",\"embLat\":\"35.183803\",\"embLng\":\"126.793743\",\"embBat\":\"35\",\"embCnt\":\"255\",\"embSta\":\"Y\"}");
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);        
  http.end();       //Free resources
}

String httpGETRequest(const char* GetserverName) {
  HTTPClient http;
  http.begin(serverName);
  int httpResponseCode = http.GET();
  String payload = "{}"; 
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
  return payload;
}

void Get(){
  information = httpGETRequest(GetserverName);
  Serial.println(information);
  JSONVar myObject = JSON.parse(information);
  // JSON.typeof(jsonVar) can be used to get the type of the var
  if (JSON.typeof(myObject) == "undefined") {
    Serial.println("Parsing input failed!");
    return;
    }
  Serial.print("JSON object = ");
  Serial.println(myObject);
    
  // myObject.keys() can be used to get an array of all the keys in the object
  JSONVar keys = myObject.keys();
  for (int i = 0; i < keys.length(); i++) {
    JSONVar value = myObject[keys[i]];
    Serial.print(keys[i]);
    Serial.print(" = ");
    Serial.println(value);
  }
}
