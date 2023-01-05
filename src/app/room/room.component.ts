import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RoomService } from "../shared/room.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [RoomService]
})
export class RoomComponent implements OnInit {

  constructor(public roomService: RoomService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.roomService.postRoom(form.value).subscribe((res)=>{
      console.log('Works Fine'+res);
    })
  }



}
