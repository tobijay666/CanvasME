import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

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

describe('Login form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('displays the login form', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('submits the form with valid input', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.get('.success-message').should('be.visible').and('contain', 'Logged In!');
  });

  it('displays error message with invalid input', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('pass');
    cy.get('button[type="submit"]').click();

    cy.get('.validation-message').should('be.visible').and('contain', 'at least 6 characters');
  });

  it('displays error message for incorrect email/password', () => {
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.validation-message').should('be.visible').and('contain', 'Incorrect E-mail/Password');
  });
});
