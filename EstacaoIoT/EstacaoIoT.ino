#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_GFX.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define BME_SCK  5//D1 //SCL
#define BME_MOSI 4//D2 //SDA
#define BME_CS   0//D3 //CSB
#define BME_MISO 2//D4 //SDO

#define REDE                "*****"
#define PASSWORD            "*****"

#define ID_MQTT       "cli_mqtt"
#define PASSWORD_MQTT "*******"
#define BROKER_MQTT   "192.168.10.250"
#define BROKER_PORT   1883

#define TOPIC_SUBSCRIBE "client/estacao/#" //tópico que o dispositovo estará "escutando"
#define TOPIC_PUBLISH   "server/estacao"   //tópico que o dispositovo estará "enviando"

#define SECONDS_TIMEOUT 300 //5 minutos
//#define SECONDS_TIMEOUT 1

WiFiClient espClient;
PubSubClient MQTT(espClient);

Adafruit_BME280 bme(BME_CS, BME_MOSI, BME_MISO, BME_SCK);

unsigned long timeout;
const int pinoLDR = A0;
int count = 0;
float temperatura = 0.0, umidade = 0.0, pressao = 0.0, altitude = 0.0, LDR = 0.0;

void receiveData(char *topic, byte *payload, unsigned int length);

void setup()
{
  Serial.begin(115200);

  for (uint8_t t = 4; t > 0; t--)
  {
    Serial.printf("[SETUP] AGUARDANDO BOOT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  pinMode(pinoLDR, INPUT);

  if (!bme.begin())
  {
    while (true);
  }

  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  MQTT.setCallback(receiveData);

  verificaConexaoWiFiMQTT();
}

void loop()
{
  lerSensores();
}

void lerSensores()
{
  LDR = 0.0;
  umidade = 0.0;
  temperatura = 0.0;
  pressao = 0.0;
  count = 0;

  timeout = millis();
  while (millis() - timeout <= SECONDS_TIMEOUT * 1000)
  {
    MQTT.loop();

    verificaConexaoWiFiMQTT();

    LDR += analogRead(pinoLDR);
    umidade += bme.readHumidity();
    temperatura += bme.readTemperature();
    pressao += bme.readPressure() / 100.0F;

    count++;
    delay(500);
  }

  // LDR = LDR / count;
  LDR = 0;
  umidade = umidade / count;
  temperatura = temperatura / count;
  pressao = pressao / count;

  sendDados(temperatura, umidade, pressao, LDR);
  //sendDados(18, 87, 980, 100);
}
/*
Função para enviar os dados climáticos para o servidor por MQTT
*/
void sendDados(float temperatura, float umidade, float pressao, float LDR)
{
  String postData = String("{") +
                    "\"TEMPERATURA\": " + temperatura + "," +
                    "\"UMIDADE\": " + umidade + "," +
                    "\"PRESSAO\": " + pressao + "," +
                    "\"LDR\": " + LDR +
                    "}";
  Serial.println(postData);

  char strBuffer[postData.length() + 1];
  postData.toCharArray(strBuffer, postData.length() + 1);
  MQTT.publish(TOPIC_PUBLISH, strBuffer);
}

void receiveData(char *topic, byte *payload, unsigned int length)
{
  String dados;
  for (int i = 0; i < length; i++)
  {
    char c = (char)payload[i];
    dados += c;
  }

  Serial.println(dados);
}

void verificaConexaoWiFiMQTT()
{
  if (WiFi.status() != WL_CONNECTED)
    conectWiFi();

  if (!MQTT.connected())
    connectMQTT();
}

void connectMQTT()
{
  while (!MQTT.connected())
  {
    Serial.println("* Tentando se conectar ao Broker MQTT: ");
    Serial.println(BROKER_MQTT);

    if (MQTT.connect(ID_MQTT, ID_MQTT, PASSWORD_MQTT))
    {
      Serial.println("Conectado com sucesso ao broker MQTT!");
      MQTT.subscribe(TOPIC_SUBSCRIBE);
    } else
    {
      Serial.println("Falha ao reconectar no broker.");
      delay(2000);
    }
  }
}

void conectWiFi()
{
  if (WiFi.status() == WL_CONNECTED)
    return;

  WiFi.begin(REDE, PASSWORD);

  timeout = millis();
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
  }
}
