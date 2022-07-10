const { Kafka } = require('kafkajs')


const kafka = new Kafka({
  brokers: ['0.0.0.0:9092'],
})

exports.Publish = async (msg) => {

  const producer = kafka.producer()
  let top = process.env.FILTER_TOPIC

  await producer.connect()
  await producer.send({
    topic: top,
    messages: [
      { value: msg },
    ],
  })
  
  await producer.disconnect()
}