import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';

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

describe('Sign Up Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/signup');
  });

  it('displays the sign up form', () => {
    cy.get('form').should('exist');
    cy.get('input[name="uname"]').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('submits the form and displays success message', () => {
    cy.get('input[name="uname"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('.success-message').should('exist');
    cy.get('.success-message').should('contain', 'Account Created!');
  });

  it('displays an error message when the form is submitted without a username', () => {
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('.validation-message').should('exist');
    cy.get('.validation-message').should('contain', 'This field is required');
  });

  it('displays an error message when the form is submitted without a valid email', () => {
    cy.get('input[name="uname"]').type('testuser');
    cy.get('input[name="email"]').type('invalidemail');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('.validation-message').should('exist');
    cy.get('.validation-message').should('contain', 'Incorrect E-mail address');
  });

  it('displays an error message when the form is submitted without a password', () => {
    cy.get('input[name="uname"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('button[type="submit"]').click();
    cy.get('.validation-message').should('exist');
    cy.get('.validation-message').should('contain', 'This field is required');
  });
});
