// src/app/core/services/websocket.service.ts

import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  private socket: WebSocket | null = null;
   messageSubject = new Subject<any>();
  private reconnectInterval = 3000;
  private isManualClose = false;
  connectionUrl = 'ws://localhost:8000';

  get messages$(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  connect(url: string) {
    this.connectionUrl = url;
    this.isManualClose = false;

    this.socket = new WebSocket(url);

    this.socket.onopen = (ev) => {
      console.log('[WS] Connected →', url , this.messages$);
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log("[WS] Message received:", data);
        this.messageSubject.next(data);



      } catch (err) {
        console.error('[WS] Invalid JSON message', err);
      }


    };



    this.socket.onerror = (err) => {
      console.error('[WS] Error:', err);
    };

    this.socket.onclose = () => {
      console.warn('[WS] Disconnected');

      if (!this.isManualClose) {
        console.log('[WS] Reconnecting…');
        setTimeout(() => this.connect(url), this.reconnectInterval);
      }
    };
  }

  send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn('[WS] Cannot send, socket not open');
    }
  }

  close() {
    this.isManualClose = true;
    this.socket?.close();
  }

  ngOnDestroy() {
    this.close();
  }
}
