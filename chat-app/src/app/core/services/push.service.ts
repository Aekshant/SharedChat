import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  VAPID_PUBLIC_KEY = "BFEH7J-sGs59lQXzv_5okHvcKxiJ6_Cg4SGKWpzRNYB3uFGCdUKAilXBMAvgQQhmztOLtBLDFZN0Ym-gE3pW3NI";
  constructor(private swPush: SwPush, private http: HttpClient) { }

  async subscribeToNotifications() {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.warn("Permission not granted.");
      return;
    }

    const reg = await navigator.serviceWorker.ready;

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.base64ToUint8Array(this.VAPID_PUBLIC_KEY),
    });


    // send to backend
    await fetch('http://localhost:4000/api/push/save-subscription', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  private base64ToUint8Array(base64String: string) {
    // const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    // const raw = atob(base64 + padding);
    // return new Uint8Array([...raw].map(char => char.charCodeAt(0)));

    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;


  }

   requestPermission(userId: string) {
    return this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log("Subscription created:", sub);
      return this.http.post("http://localhost:4000/api/push/subscribe", {
        userId,
        subscription: sub
      }).toPromise();
    })
    .catch(err => console.error("Could not subscribe:", err));
  }
}
