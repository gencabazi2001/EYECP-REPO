const { Kafka } = require("kafkajs");
const dto = require("../DTO/index");
const orm = require("../orm/orm")

const kafka = new Kafka({
  brokers: ["0.0.0.0:9092"],
});
const consumer = kafka.consumer({ groupId: "no-group"});

exports.Kaf = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        {
          value: message.value.toString(),
        }
      );
      let msg = JSON.parse(message.value)
      switch (msg.eventType){
        case 'register':
          orm.RegisterUser(msg)
          break;
        default:
          console.log("Message was not for wallet subscriber")
      }
     
    },
  });
};