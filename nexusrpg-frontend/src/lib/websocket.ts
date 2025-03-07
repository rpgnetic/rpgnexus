import { Client } from '@stomp/stompjs';
import { SheetFormValues } from './schemas/sheetSchema';

interface WebSocketMessage {
    type: 'UPDATE' | 'JOIN' | 'LEAVE';
    sheetId: string;
    data: Partial<SheetFormValues>;
    userId: string;
    timestamp: number;
}

export class SheetWebSocket {
    private client: Client;
    private sheetId: string;
    private userId: string;

    constructor(sheetId: string, userId: string) {
        this.sheetId = sheetId;
        this.userId = userId;
        
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: {
                userId: this.userId,
            },
            debug: (str) => {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
    }

    connect(onUpdate: (update: Partial<SheetFormValues>) => void) {
        this.client.onConnect = () => {
            // Inscrever para atualizações da ficha
            this.client.subscribe(`/topic/sheet/${this.sheetId}`, (message) => {
                const update = JSON.parse(message.body);
                onUpdate(update.data);
            });

            // Anunciar entrada
            this.client.publish({
                destination: `/app/sheet/join`,
                body: JSON.stringify({
                    type: 'JOIN',
                    sheetId: this.sheetId,
                    userId: this.userId,
                    timestamp: Date.now(),
                }),
            });
        };

        this.client.activate();
    }

    sendUpdate(update: Partial<SheetFormValues>) {
        if (!this.client.connected) return;

        this.client.publish({
            destination: `/app/sheet/update`,
            body: JSON.stringify({
                type: 'UPDATE',
                sheetId: this.sheetId,
                userId: this.userId,
                data: update,
                timestamp: Date.now(),
            }),
        });
    }

    disconnect() {
        if (this.client.connected) {
            this.client.deactivate();
        }
    }
}