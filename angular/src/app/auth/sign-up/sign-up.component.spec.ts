import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserService } from '../../shared/user.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [SignUpComponent],
      providers: [UserService]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    component.signUpForm.controls.uname.setValue('');
    component.signUpForm.controls.email.setValue('');
    component.signUpForm.controls.password.setValue('');
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('form should be valid when filled with correct data', () => {
    component.signUpForm.controls.uname.setValue('johnDoe');
    component.signUpForm.controls.email.setValue('johnDoe@test.com');
    component.signUpForm.controls.password.setValue('johnDoepass');
    expect(component.signUpForm.valid).toBeTruthy();
  });

});
