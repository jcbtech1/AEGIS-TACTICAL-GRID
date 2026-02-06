
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

// Upgrader para WebSockets
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// Estructuras de Datos de Grado Militar
type VPNStatus struct {
	ID        string  `json:"id"`
	Protocol  string  `json:"protocol"`
	Status    string  `json:"status"`
	Bandwidth float64 `json:"bandwidth"`
	Latency   float64 `json:"latency"`
}

type Message struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

// AegisCore gestiona el estado del sistema
type AegisCore struct {
	mu           sync.Mutex
	VPNs         []VPNStatus
	ThreatLevel  string
	Encryption   string
	Clients      map[*websocket.Conn]bool
}

func NewAegisCore() *AegisCore {
	return &AegisCore{
		Encryption:  "AES-256-GCM (MIL-SPEC)",
		ThreatLevel: "LEVEL_1_SAFE",
		Clients:     make(map[*websocket.Conn]bool),
		VPNs: []VPNStatus{
			{ID: "TNL-ALPHA-01", Protocol: "WireGuard-X", Status: "ENCRYPTED", Bandwidth: 0, Latency: 2.1},
			{ID: "TNL-BRAVO-02", Protocol: "OpenVPN-MIL", Status: "ENCRYPTED", Bandwidth: 0, Latency: 4.5},
			{ID: "TNL-GHOST-09", Protocol: "Shadow-Tunnel", Status: "STEALTH", Bandwidth: 0, Latency: 1.2},
		},
	}
}

func (c *AegisCore) handleConnections(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	c.mu.Lock()
	c.Clients[conn] = true
	c.mu.Unlock()

	fmt.Printf("[SYSTEM] Aegis Terminal Connected: %s\n", conn.RemoteAddr())

	// Mantener la conexión abierta
	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			c.mu.Lock()
			delete(c.Clients, conn)
			c.mu.Unlock()
			break
		}
	}
}

func (c *AegisCore) broadcast(msg Message) {
	c.mu.Lock()
	defer c.mu.Unlock()
	for client := range c.Clients {
		err := client.WriteJSON(msg)
		if err != nil {
			client.Close()
			delete(c.Clients, client)
		}
	}
}

// Simulación de Sniffer y Encriptación
func (c *AegisCore) runSimulation() {
	ticker := time.NewTicker(800 * time.Millisecond)
	for range ticker.C {
		// 1. Actualizar Tráfico VPN
		for i := range c.VPNs {
			c.VPNs[i].Bandwidth = 50.0 + rand.Float64()*450.0
			c.VPNs[i].Latency = 1.0 + rand.Float64()*5.0
		}

		// 2. Broadcast de Stats
		c.broadcast(Message{
			Type: "stats",
			Payload: map[string]interface{}{
				"throughput": fmt.Sprintf("%.2f", 400.0+rand.Float64()*100.0),
				"encryption": c.Encryption,
				"vpns":       c.VPNs,
				"peak":       "842.1 GB/s",
				"avg":        "512.4 GB/s",
			},
		})

		// 3. Broadcast de Logs de Inspección (Deep Packet Inspection)
		if rand.Float32() > 0.6 {
			c.broadcast(Message{
				Type: "log",
				Payload: map[string]string{
					"message": fmt.Sprintf("[DPI_SEC] PKT_INSPECTED: SOURCE_IP: 192.168.1.%d -> HEX: 0x%X (VERIFIED)", rand.Intn(254), rand.Intn(0xFFFFFF)),
				},
			})
		}

		// 4. Simulación de Amenaza detectada por IA (Python)
		if rand.Float32() > 0.95 {
			c.ThreatLevel = "LEVEL_4_CRITICAL"
			c.broadcast(Message{
				Type: "threat",
				Payload: map[string]string{
					"level":   c.ThreatLevel,
					"vector":  "BRUTE_FORCE_DETECTED",
					"origin":  "EXTERNAL_GATEWAY_NODE",
				},
			})
			// Reset después de 5 segundos
			go func() {
				time.Sleep(5 * time.Second)
				c.ThreatLevel = "LEVEL_1_SAFE"
				c.broadcast(Message{
					Type: "threat",
					Payload: map[string]string{"level": c.ThreatLevel},
				})
			}()
		}
	}
}

func main() {
	core := NewAegisCore()
	go core.runSimulation()

	http.HandleFunc("/ws", core.handleConnections)
	
	port := ":8080"
	fmt.Printf("[CORE] Aegis Tactical Grid Backend running on %s\n", port)
	fmt.Printf("[CORE] Encryption Layer: %s ACTIVE\n", core.Encryption)
	log.Fatal(http.ListenAndServe(port, nil))
}
