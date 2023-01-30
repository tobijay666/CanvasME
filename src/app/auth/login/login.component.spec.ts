import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserService } from '../../shared/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ LoginComponent ],
      providers: [ UserService ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.form-control'));
    el = de.nativeElement;
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSubmit method', () => {
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('form should be invalid', () => {
    component.logInForm.controls['email'].setValue('');
    component.logInForm.controls['password'].setValue('');
    expect(component.logInForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.logInForm.controls['email'].setValue('johnDoe@test.com');
    component.logInForm.controls['password'].setValue('password');
    expect(component.logInForm.valid).toBeTruthy();
  });
});
