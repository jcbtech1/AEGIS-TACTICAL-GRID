
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

type Message struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}
	defer conn.Close()

	fmt.Println("Client connected to Aegis Go Core")

	// Simulación de flujo de datos (en un entorno real aquí iría el Sniffer)
	for {
		// Enviar datos de tráfico
		trafficMsg := Message{
			Type: "traffic",
			Payload: map[string]interface{}{
				"pps": 150 + rand.Intn(300),
			},
		}
		conn.WriteJSON(trafficMsg)

		// Enviar logs aleatorios
		if rand.Float32() > 0.7 {
			logMsg := Message{
				Type: "log",
				Payload: map[string]string{
					"message": fmt.Sprintf("[%s] INBOUND_PKT_INSPECT: 0x%X", time.Now().Format("15:04:05"), rand.Intn(0xFFFFFF)),
				},
			}
			conn.WriteJSON(logMsg)
		}

		// Enviar estadísticas
		statsMsg := Message{
			Type: "stats",
			Payload: map[string]string{
				"throughput": fmt.Sprintf("%.1f", 50.0+rand.Float64()*20.0),
				"peak":       "482.1",
				"avg":        "210.4",
			},
		}
		conn.WriteJSON(statsMsg)

		time.Sleep(1 * time.Second)
	}
}

func main() {
	http.HandleFunc("/ws", handleWebSocket)
	fmt.Println("Aegis Go Core starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
