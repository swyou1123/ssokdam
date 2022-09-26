#include "BluetoothSerial.h"
#include <TinyGPS++.h>

BluetoothSerial SerialBT;
TinyGPSPlus gps;

void setup()
{
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, 2, 23); // RX, TX
  SerialBT.begin("ESP32_GPS");
}

void loop()
{
  if ( Serial2.available() )
  {
    if (gps.encode(Serial2.read()))
    {
      displayInfo(SerialBT);
      displayInfo(Serial);
    }
  }
}

void displayInfo(Stream &serial)
{
  serial.print(F("Location: ")); 
  if (gps.location.isValid())
  {
    serial.print(gps.location.lat(), 6);
    serial.print(F(","));
    serial.print(gps.location.lng(), 6);
  }
  else
  {
    serial.print(F("INVALID"));
  }

  serial.print(F("  Date/Time: "));
  if (gps.date.isValid())
  {
    serial.print(gps.date.month());
    serial.print(F("/"));
    serial.print(gps.date.day());
    serial.print(F("/"));
    serial.print(gps.date.year());
  }
  else
  {
    serial.print(F("INVALID"));
  }

  serial.print(F(" "));
  if (gps.time.isValid())
  {
    if (gps.time.hour() < 10) serial.print(F("0"));
    serial.print(gps.time.hour());
    serial.print(F(":"));
    if (gps.time.minute() < 10) serial.print(F("0"));
    serial.print(gps.time.minute());
    serial.print(F(":"));
    if (gps.time.second() < 10) serial.print(F("0"));
    serial.print(gps.time.second());
    serial.print(F("."));
    if (gps.time.centisecond() < 10) serial.print(F("0"));
    serial.print(gps.time.centisecond());
  }
  else
  {
    serial.print(F("INVALID"));
  }

  serial.println();
}
