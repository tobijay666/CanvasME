import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket:any;
  constructor() {
    this.socket = io.connect('http://localhost:3000');
    // this.socket = io('ws://localhost:3000');
  }
  listen(eventname: string) : Observable<any>{
    return new Observable((subscribe)=>{
      this.socket.on(eventname, (data: any)=>{
        subscribe.next(data);
      })

    });
  }
  emit(eventname: string, data:any){
    this.socket.emit(eventname,data);
  }
}
