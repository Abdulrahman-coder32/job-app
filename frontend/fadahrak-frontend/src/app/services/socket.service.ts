import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket | null = null;

  connect(token: string) {
    this.socket = io('http://localhost:5000', {
      auth: { token }
    });

    this.socket.on('connect', () => {
      console.log('متصل بالـ Socket.IO');
    });

    this.socket.on('disconnect', () => {
      console.log('انفصل عن الـ Socket.IO');
    });
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
