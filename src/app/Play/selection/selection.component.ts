import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import {FormControl} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { CreateComponent } from '../create/create.component';
import { JoinComponent } from '../join/join.component';


@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css'],
  // exports: 'matExpansionPanel'
})
export class SelectionComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openRoomCreate(){
    console.log("Works!");
    this.dialog.open(CreateComponent);
  }
  openRoomJoin(){
    console.log("Works!");
    this.dialog.open(JoinComponent);
  }
}


