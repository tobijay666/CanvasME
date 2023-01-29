import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ChatService } from 'src/app/shared/chat.service';
import { RoomService } from 'src/app/shared/room.service';
import { UserService } from 'src/app/shared/user.service';

import { PlayComponent } from './play.component';

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;
  let gameNotOver = true;

  beforeEach(async () => {
    gameNotOver = true;
    await TestBed.configureTestingModule({
      declarations: [ PlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a random topic from the topicArray', () => {
    const topic = component.topicSetter();
    expect(['Car park','Tiger in a cage','Nail Polish','Postman','Night sky']).toContain(topic);
  });



  it('should return different topics each time it is called', () => {
    const firstTopic = component.topicSetter();
    const secondTopic = component.topicSetter();
    expect(firstTopic).not.toEqual(secondTopic);
  });

  it('should not return an undefined topic', () => {
    const topic = component.topicSetter();
    expect(topic).not.toBeUndefined();
  });

  it('should set gameNotOver to false', () => {
    component.gameOver('player 1');
    expect(gameNotOver).toBe(false);
  });

  it('should set gameWinner to the passed in value', () => {
    component.gameOver('player 2');
    expect(component.gameWinner).toEqual('player 2');
  });


});

