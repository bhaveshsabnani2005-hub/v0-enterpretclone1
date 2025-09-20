"use client"

export type WSMessage = {
  type: "bus_update" | "route_update" | "alert" | "system_status"
  data: any
  timestamp: number
}

export class WebSocketClient {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private heartbeatInterval: NodeJS.Timeout | null = null
  private subscribers: Map<string, Set<(data: any) => void>> = new Map()
  private useMockClient = false

  constructor(private url: string) {
    this.connect()
  }

  private connect() {
    if (this.useMockClient) {
      return
    }

    try {
      this.ws = new WebSocket(this.url)

      this.ws.onopen = () => {
        console.log("[v0] WebSocket connected")
        this.reconnectAttempts = 0
        this.startHeartbeat()
      }

      this.ws.onmessage = (event) => {
        try {
          const message: WSMessage = JSON.parse(event.data)
          this.handleMessage(message)
        } catch (error) {
          console.error("[v0] Failed to parse WebSocket message:", error)
        }
      }

      this.ws.onclose = () => {
        console.log("[v0] WebSocket disconnected")
        this.stopHeartbeat()
        this.attemptReconnect()
      }

      this.ws.onerror = (error) => {
        this.handleConnectionError()
      }
    } catch (error) {
      console.error("[v0] Failed to create WebSocket connection:", error)
      this.handleConnectionError()
    }
  }

  private handleConnectionError() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log("[v0] WebSocket server unavailable, switching to mock mode")
      this.useMockClient = true
      this.startMockUpdates()
    } else {
      this.attemptReconnect()
    }
  }

  private startMockUpdates() {
    // Simulate system status updates
    const mockInterval = setInterval(() => {
      const mockSystemStatus = {
        lastUpdateMs: Date.now(),
        latencyMs: 45 + Math.random() * 20,
        gpsCoveragePct: 85 + Math.random() * 10,
        refreshRateSec: 5,
      }

      this.handleMessage({
        type: "system_status",
        data: mockSystemStatus,
        timestamp: Date.now(),
      })
    }, 10000) // Update every 10 seconds

    // Clean up interval when disconnecting
    this.heartbeatInterval = mockInterval
  }

  private handleMessage(message: WSMessage) {
    const subscribers = this.subscribers.get(message.type)
    if (subscribers) {
      subscribers.forEach((callback) => callback(message.data))
    }

    // Handle global subscribers
    const globalSubscribers = this.subscribers.get("*")
    if (globalSubscribers) {
      globalSubscribers.forEach((callback) => callback(message))
    }
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "ping" }))
      }
    }, 30000) // 30 seconds
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)

      setTimeout(() => {
        this.connect()
      }, delay)
    } else {
      this.handleConnectionError()
    }
  }

  subscribe(messageType: string, callback: (data: any) => void) {
    if (!this.subscribers.has(messageType)) {
      this.subscribers.set(messageType, new Set())
    }
    this.subscribers.get(messageType)!.add(callback)

    // Return unsubscribe function
    return () => {
      const subscribers = this.subscribers.get(messageType)
      if (subscribers) {
        subscribers.delete(callback)
        if (subscribers.size === 0) {
          this.subscribers.delete(messageType)
        }
      }
    }
  }

  send(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else if (this.useMockClient) {
      console.log("[v0] Mock WebSocket send:", message)
    }
  }

  disconnect() {
    this.stopHeartbeat()
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.useMockClient = false
  }

  get isConnected() {
    return this.ws?.readyState === WebSocket.OPEN || this.useMockClient
  }
}

// Singleton instance
let wsClient: WebSocketClient | null = null

export function getWebSocketClient(): WebSocketClient {
  if (!wsClient) {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000/ws"
    wsClient = new WebSocketClient(wsUrl)
  }
  return wsClient
}

// Mock WebSocket for development
export class MockWebSocketClient {
  private subscribers: Map<string, Set<(data: any) => void>> = new Map()
  private interval: NodeJS.Timeout | null = null

  constructor() {
    this.startMockUpdates()
  }

  private startMockUpdates() {
    this.interval = setInterval(() => {
      // Simulate bus updates
      const mockBusUpdate = {
        id: "CHD-001",
        location: {
          lat: 30.755 + (Math.random() - 0.5) * 0.01,
          lng: 76.77 + (Math.random() - 0.5) * 0.01,
        },
        speed: 20 + Math.random() * 20,
        delay: Math.floor(Math.random() * 10),
        occupancy: Math.random(),
      }

      this.handleMessage({
        type: "bus_update",
        data: mockBusUpdate,
        timestamp: Date.now(),
      })
    }, 5000) // Update every 5 seconds
  }

  private handleMessage(message: WSMessage) {
    const subscribers = this.subscribers.get(message.type)
    if (subscribers) {
      subscribers.forEach((callback) => callback(message.data))
    }
  }

  subscribe(messageType: string, callback: (data: any) => void) {
    if (!this.subscribers.has(messageType)) {
      this.subscribers.set(messageType, new Set())
    }
    this.subscribers.get(messageType)!.add(callback)

    return () => {
      const subscribers = this.subscribers.get(messageType)
      if (subscribers) {
        subscribers.delete(callback)
      }
    }
  }

  send(message: any) {
    console.log("[v0] Mock WebSocket send:", message)
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  get isConnected() {
    return true
  }
}
