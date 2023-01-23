import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomService } from "../../shared/room.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [RoomService]
})
export class CreateComponent implements OnInit {
  // #generatedNumber: any ;

  constructor(public roomService: RoomService,  private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    // var flag = false;
    // while (flag) {
    //   this.#generatedNumber = Math.floor(Math.random() * 10000);
    //   if (this.#generatedNumber > 1000) {
    //     flag = true;
    //   }
    // }
    // console.log(this.#generatedNumber);
    // this.roomService.selectedRoom.roomId = this.#generatedNumber;

    this.roomService.postRoom(form.value).subscribe((res)=>{
      console.log('Works Fine'+res);
      this.router.navigateByUrl('/play/play');
      this.dialog.closeAll();

    })
  }


}
