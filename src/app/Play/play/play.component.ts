import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as p5 from 'p5';
import { ChatService } from 'src/app/shared/chat.service';
import { RoomService } from 'src/app/shared/room.service';
import { UserService } from 'src/app/shared/user.service';

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

  constructor(public roomService: RoomService, private chatService:ChatService, private userService:UserService) { }

  ngOnInit(): void {
    this.chatService.listen('chat').subscribe((data) => this.updateMessage(data));




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
        s.noStroke();
        s.fill(255,0,100);
        s.ellipse(data.x,data.y,60,60);
      }


      s.mouseDragged= () => {
        console.log('Sending'+s.mouseX+','+s.mouseY);

        var data = {
          x:s.mouseX,
          y:s.mouseY
        }
        // this.socket.emit('mouse', data);
        this.chatService.emit('mouse',data);


        s.noStroke();
        s.fill(255);
        s.ellipse(s.mouseX,s.mouseY,60,60);
      };

      // s.mouseReleased = () => {
      //   // modulo math forces the color to swap through the array provided
      //   this.strokeColor = (this.strokeColor + 1) % this.c.length;
      //   s.stroke(this.c[this.strokeColor]);
      //   console.log(`color is now ${this.c[this.strokeColor]}`);
      // };

      // s.keyPressed = () => {
      //   if (s.key === 'c') {
      //     window.location.reload();
      //   }
      // };
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
    let payload = this.userService.getPayload();
    this.userName = payload.uname;
    console.log({
      message: this.Message,
      handle: payload.uName,
      paylad: payload
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
