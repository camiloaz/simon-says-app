import mqtt from "mqtt";

let client = mqtt.connect("wss://try:try@broker.shiftr.io", {
  clientId: "mambochili",
});

class MQTTClient {
  constructor(subscribeTo, onMessageReceived) {
    client.on("connect", function() {
      client.subscribe(subscribeTo);
      console.log("Connected");
    });
    client.on("message", onMessageReceived);
  }

  publish(topic, message) {
    client.publish(topic, message);
  }
}

export default MQTTClient;
