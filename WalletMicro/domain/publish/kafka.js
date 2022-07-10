const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: ["0.0.0.0:9092"],
});

exports.Publish = async (msg, t) => {
  const producer = kafka.producer();
  let top = t;
  if (t === "") {
    top = process.env.TOPIC;
  } else {
    top = process.env.MAIL_TOPIC;
  }

  await producer.connect();
  await producer.send({
    topic: top,
    messages: [{ value: msg }],
  });

  await producer.disconnect();
};
