package main

import (
	"NotificationMicro/service"
	"context"
	"github.com/joho/godotenv"
	"github.com/segmentio/kafka-go"
	"log"
)

const (
	TOPIC = "email"
)

func getKafkaReader(kafkaURL, topic, groupID string) *kafka.Reader {
	return kafka.NewReader(kafka.ReaderConfig{
		Brokers:   []string{kafkaURL},
		GroupID:   groupID,
		Topic:     topic,
		Partition: 0,
		MaxBytes:  10e6, // 10MB

	})
}

func consume() {
	reader := getKafkaReader("localhost:9092", TOPIC, "go-group")
	defer reader.Close()

	for {
		msg, err := reader.ReadMessage(context.Background())
		if err != nil {
			log.Fatal(err)
		}

		service.GetEvent(msg)
	}
}

func main() {
	godotenv.Load()
	consume()
}
