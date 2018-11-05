#include <WiFi.h>
#include <HTTPClient.h>

// ERROR: "Brownout detector was triggered"
// Try another usb cable.

// Add your WIFI credentials below:
// (The intention of this project is to run this program via your localhost, posting data to
// the middleware node api)
const char* ssid = "DODO-681A";
const char* password = "LESTR7P5R6";

WiFiServer server(80);

// Local dev post url
 String apiPostUrl = "http://192.168.1.8:3000/";

// Use Analogue Pin A0
int ReadUVintensityPin = A0; 

// Handle api post errors
void handleApiErrors(int httpResponseCode) {
  String message = "API Error: ";
  message += httpResponseCode;
}

// Handle connection errors
void handleConnectionError() {
  String message = "Error in WiFi connection";
}

void setup(void) {

  // serial 
  Serial.begin(115200);

  // uv
  pinMode(ReadUVintensityPin, INPUT);
  Serial.println("Starting up.");

  // wifi
  WiFi.begin(ssid, password);

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("HTTP server started");
}

void postData (int uvLevel) {
  Serial.println("attepmpt to post");
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("has status");
    HTTPClient http;
    http.begin(apiPostUrl + "?reading=" + uvLevel);
    http.addHeader("Content-Type", "text/plain"); 
    int httpResponseCode = http.POST("");
    if (httpResponseCode > 0) {
      String response = http.getString(); 
      Serial.println(httpResponseCode);   
      Serial.println(response);          
    } else {
      handleApiErrors(httpResponseCode);
    }
      http.end();
    } else {
      handleConnectionError();
    }
}

void loop(void) {
  
  int uvLevel = averageAnalogRead(ReadUVintensityPin);

  float outputVoltage = 5.0 * uvLevel/1024;
  float uvIntensity = mapfloat(outputVoltage, 0.99, 2.9, 0.0, 15.0);

  Serial.print("UVAnalogOutput: ");
  Serial.print(uvLevel);

  Serial.print(" OutputVoltage: ");
  Serial.print(outputVoltage);

  Serial.print(" UV Intensity: ");
  Serial.print(uvIntensity);
  Serial.print(" mW/cm^2");

  Serial.println(); 

  postData(uvLevel);

  delay(3000);

}

// Takes an average of readings on a given pin
// Returns Number
int averageAnalogRead(int pinToRead)
{
  byte numberOfReadings = 8;
  unsigned int runningValue = 0; 

  for(int x = 0 ; x < numberOfReadings ; x++)
    runningValue += analogRead(pinToRead);
  runningValue /= numberOfReadings;

  return(runningValue);  

}

// The Arduino Map function but for floats
// From: http://forum.arduino.cc/index.php?topic=3922.0
// returns Number
float mapfloat(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
