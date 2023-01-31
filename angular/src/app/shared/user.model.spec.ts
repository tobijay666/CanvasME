import { User } from './user.model';

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User();
  });

  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });


  it("should initialize uname, email, and password properties to empty strings", () => {
    expect(user.uname).toBe("");
    expect(user.email).toBe("");
    expect(user.password).toBe("");
  });

  it("should allow setting and getting of uname, email, and password properties", () => {
    user.uname = "John Doe";
    user.email = "johndoe@example.com";
    user.password = "password123";

    expect(user.uname).toBe("John Doe");
    expect(user.email).toBe("johndoe@example.com");
    expect(user.password).toBe("password123");
  });
});
