import { Client } from '@stomp/stompjs';
import { ChatMessage } from '../types/chat';
import SockJS from 'sockjs-client';

export class ChatService {
    private client: Client;
    private messageCallback: (message: ChatMessage) => void;
    private connectionCallback: (connected: boolean) => void;

    constructor(
        onMessageReceived: (message: ChatMessage) => void,
        onConnectionChange: (connected: boolean) => void
    ) {
        this.messageCallback = onMessageReceived;
        this.connectionCallback = onConnectionChange;
        this.client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            onConnect: () => {
                console.log('Connected to WebSocket');
                this.connectionCallback(true);
                this.subscribeToMessages();
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                this.connectionCallback(false);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
                this.connectionCallback(false);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
    }

    connect() {
        if (!this.client.connected && !this.client.active) {
            console.log('Activating WebSocket connection...');
            this.client.activate();
        }
    }

    disconnect() {
        if (this.client.active) {
            console.log('Deactivating WebSocket connection...');
            this.client.deactivate();
        }
    }

    private subscribeToMessages() {
        this.client.subscribe('/topic/messages', (message) => {
            try {
                const response = JSON.parse(message.body);
                const chatMessage: ChatMessage = {
                    id: response.id,
                    content: response.content,
                    role: response.role,
                    timestamp: new Date(response.timestamp)
                };
                console.log('Received message:', chatMessage);
                this.messageCallback(chatMessage);
            } catch (error) {
                console.error('Error processing received message:', error);
            }
        });
    }

    async sendMessage(content: string): Promise<void> {
        if (!this.client.connected) {
            throw new Error('WebSocket is not connected');
        }

        const message = {
            message: content,
            role: 'user'
        };

        try {
            console.log('Sending message:', message);
            await this.client.publish({
                destination: '/app/chat',
                body: JSON.stringify(message)
            });
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
} 