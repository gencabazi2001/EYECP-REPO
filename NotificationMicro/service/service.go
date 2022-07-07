package service

import (
	"encoding/json"
	"fmt"
	"github.com/segmentio/kafka-go"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"os"
)

type Event struct {
	EventType  string `json:"eventType"`
	Username   string `json:"username"`
	Email      string `json:"email"`
	Validation string `json:"validationString"`
	Likes      string `json:"likes"`
	Amount     string `json:"amount"`
}

func GetEvent(msg kafka.Message) {
	fmt.Println(string(msg.Value), string(msg.Key))
	myEvent := Event{}
	json.Unmarshal(msg.Value, &myEvent)
	SendMail(myEvent)
}

func SendMail(event Event) {
	authRoute := os.Getenv("AUTHENTICATE_ROUTE")
	ownerRoute := os.Getenv("OWNER_ROUTE")
	switch event.EventType {
	case "register":
		subject := "Welcome to EyeC!"
		content := "Please Verify as a legitimate user by clicking below \n click here:" + authRoute + event.Validation
		send(event, subject, content)
	case "changeOwner":
		subject := "Confirm the Owner Changing!"
		content := "Please Verify that you want to give your wallet to somebody else \n click here:" + ownerRoute + event.Validation
		send(event, subject, content)
	case "transactionDetails":
		subject := "Daily Transactions"
		content := "Congratulations!\nYou got " + event.Likes + " likes yesterday!\nThat means you earned " + event.Amount + " coins!"
		send(event, subject, content)

	default:
		fmt.Println("not meant for me")
	}
}

func send(event Event, subject, content string) {

	apiKey := os.Getenv("SENDGRID_API_KEY")
	name := os.Getenv("SENDGRID_NAME")
	email := os.Getenv("SENDGRID_EMAIL")
	from := mail.NewEmail(name, email)
	to := mail.NewEmail(event.Username, event.Email)
	message := mail.NewSingleEmail(from, subject, to, content, "")
	client := sendgrid.NewSendClient(apiKey)
	response, err := client.Send(message)
	if err != nil {
		fmt.Println("error occurred")
	} else {
		fmt.Println(response.StatusCode)
	}

}
