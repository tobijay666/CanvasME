var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "IGHSasnj*&(*Y&58KJHGB8yusj89j";

describe("POST /register", () => {
    let user;
    beforeEach(() => {
      user = {
        Name: "John Doe",
        Email: "johndoe@example.com",
        Password: "password123",
      };
      jest.spyOn(User.prototype, "save").mockResolvedValue(user);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("should register a new user and return the saved user", async () => {
      const res = await request(router)
        .post("/register")
        .send(user);
  
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.body).toEqual(user);
    });
  
    it("should return a 422 status and error message when duplicate email is used", async () => {
      User.prototype.save.mockRejectedValue({ code: 11000 });
  
      const res = await request(router)
        .post("/register")
        .send(user);
  
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toBe(422);
      expect(res.body).toEqual(["Duplicate email address found."]);
    });
  
    it("should return a 400 status when required fields are missing", async () => {
      const res = await request(router).post("/register").send({});
  
      expect(res.status).toBe(400);
    });
  });