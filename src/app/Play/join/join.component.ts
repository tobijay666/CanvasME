import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomService } from "../../shared/room.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],
  providers: [RoomService]

})
export class JoinComponent implements OnInit {
  errorMsg!: string;

  constructor(public roomService: RoomService, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  onSubmit(form: NgForm){
    this.roomService.joinRoom(form.value).subscribe((res)=>{
      console.log('Works Fine'+JSON.stringify(res));
      // var rest = JSON.stringify(res)
      if (res['status'] == "Ok") {
        this.router.navigateByUrl('/play/play');
        this.dialog.closeAll();
      } else {
        form.resetForm();
        this.errorMsg = "Room Not Found!"
      }


    })
  }

}
