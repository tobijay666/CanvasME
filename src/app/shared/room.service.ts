import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {Observable,of, from } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Room } from "./room.model";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  selectedRoom: Room = new Room;
  rooms: Room[] = [];
  readonly bURL = 'http://localhost:3000/rooms'

  constructor(private http:HttpClient) { }

  postRoom(room:Room){
    return this.http.post(this.bURL,room);
  }
}
