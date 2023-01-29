import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as p5 from 'p5';
import { ChatService } from 'src/app/shared/chat.service';
import { RoomService } from 'src/app/shared/room.service';
import { UserService } from 'src/app/shared/user.service';

import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  public feedback: any;
  output: any[]=[];
  userName:any;
  Message:any;
  strokeColor=0;
  c:any [] = [];
  canvas: any;
  sw=2;
  private socket:any;
  colorPicker: any;
  brushSize: any;
  brushX: any;
  brushY: any;
  payload:any;
  role: any;
  painter:any;
  guess:any;
  topic:any;
  public guessCount= 3;
  guessAllowed = true;
  gameNotOver = true;
  gameWinner:any;

  // @ViewChild('colorpick') colorpick!: ElementRef ;

  constructor(public roomService: RoomService, private chatService:ChatService,
     private userService:UserService, public radio:MatRadioModule,
      public divider:MatDividerModule, public input:MatInputModule) { }


  roleSetter(): void{
    if (this.payload.uname == "nata") {
      this.role = 'The Painter';
      this.painter = true;
      this.topic = this.topicSetter();
      this.chatService.emit('topic',this.topic);
    } else {
      this.role = 'A Guesser';
      this.chatService.listen('topic').subscribe((data) => this.topic = data);

    }
  }

  guessSend(){
    console.log(this.guess);
    // console.log(this.topic);
    if(this.guess.toLowerCase() === this.topic.toLowerCase()){
      console.log("You won");
      this.chatService.emit('game',this.payload.uname);
      console.log("You won",this.payload.uname);
      this.gameNotOver=false;
      this.gameWinner = 'You';
      setTimeout(function(){window.location.reload()},5000);

    }
    else{

      if( this.guessCount<=1){
        this.guessAllowed = false;
      }
      this.guessCount -= 1;
    }
  }

  topicSetter(){
    let topicArray = ['Car park','Tiger in a cage','Nail Polish','Postman','Night sky'];
    const randomTopic = topicArray[Math.floor(Math.random() * topicArray.length)];
    console.log(randomTopic);
    return randomTopic;

  }
  gameOver(datax: any){
    console.log(datax," Won The Game!");
    this.gameWinner = datax;
    this.gameNotOver=false;
    if (this.gameNotOver) {
      setTimeout(function(){window.location.reload()},5000);
    }
  }


  ngOnInit(): void {
    this.chatService.listen('chat').subscribe((data) => this.updateMessage(data));
    this.payload = this.userService.getPayload();
    this.roleSetter();
    this.chatService.listen('game').subscribe((datax) => this.gameOver(datax));







    const sketch = s => {
      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth - 200, s.windowHeight - 200);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('sketch-holder');
        s.background(51);
        // s.background(255);
        // s.strokeWeight(this.sw);

        // this.c[0] = s.color(148, 0, 211);
        // this.c[1] = s.color(75, 0, 130);
        // this.c[2] = s.color(0, 0, 255);
        // this.c[3] = s.color(0, 255, 0);
        // this.c[4] = s.color(255, 255, 0);
        // this.c[5] = s.color(255, 127, 0);
        // this.c[6] = s.color(255, 0, 0);

        // s.rect(0, 0, s.width, s.height);

        // s.stroke(this.c[this.strokeColor]);

        // this.socket =io.connect('http://localhost:3000');
        // this.socket.on('mouse',s.newDrawing);
        this.chatService.listen('mouse').subscribe((data) => s.newDrawing(data));

      };

      // s.draw = () => {
      //   if (s.mouseIsPressed) {
      //     if (s.mouseButton === s.LEFT) {
      //       s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
      //     } else if (s.mouseButton === s.CENTER) {
      //       s.background(255);
      //     }
      //   }
      // };

      s.newDrawing=(data: any) =>{
        // s.noStroke();
        // s.color(data.color);
        s.stroke(data.color);
        s.fill(data.color);
        s.ellipse(data.x,data.y,data.size,data.size);

      }


      s.mouseDragged= () => {
        console.log('Sending'+s.mouseX+','+s.mouseY);

        if (this.brushSize){
          this.brushX = this.brushSize;
          this.brushY = this.brushSize;
        }
        else{
          this.brushX = 10;
          this.brushY = 10;
        }

        var data = {
          x:s.mouseX,
          y:s.mouseY,
          color:this.colorPicker,
          size:this.brushX,

        }
        // this.socket.emit('mouse', data);
        this.chatService.emit('mouse',data);

        console.log(this.colorPicker);
        console.log(this.brushSize,this.brushY,this.brushX);
        // s.noStroke();
        s.stroke(this.colorPicker);
        s.fill(this.colorPicker);
        s.ellipse(s.mouseX,s.mouseY,this.brushX,this.brushY);
      };

      // s.mouseReleased = () => {
      //   // modulo math forces the color to swap through the array provided
      //   this.strokeColor = (this.strokeColor + 1) % this.c.length;
      //   s.stroke(this.c[this.strokeColor]);
      //   console.log(`color is now ${this.c[this.strokeColor]}`);
      // };

      s.keyPressed = () => {
        if (s.key === '`') {
          window.location.reload();
        }
      };
    };

    this.canvas = new p5(sketch);


  }

  onSubmit(form: NgForm){
    this.roomService.postRoom(form.value).subscribe((res)=>{
      console.log('Works Fine'+res);
    })
  }

  updateMessage(data: any):void{
    this.feedback = '';
    if(!!!data) return;
    this.output.push(data);

  }

  sendMessage():void {

    this.userName = this.payload.uname;
    console.log({
      message: this.Message,
      handle: this.payload.uname,
      paylad: this.payload
    }
    );
    this.chatService.emit('chat',{
      message: this.Message,
      handle: this.userName
      });
    this.updateMessage({
      message: this.Message,
      handle: this.userName
      });
    this.Message = "";

  }

}
