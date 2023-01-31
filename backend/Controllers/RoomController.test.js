const express = require('express');
var router = express.Router();

const Room = require('../models/room.js');

describe('POST /join', () => {
    let room;
    beforeEach(() => {
      room = { Title: 'room 1' };
      jest.spyOn(Room, 'findOne').mockResolvedValue(room);
    });
  
    it('should return status "Ok" and room ID when room is found', async () => {
      const res = await request(router)
        .post('/join')
        .send({ title: 'room 1' });
  
      expect(Room.findOne).toHaveBeenCalledWith({ Title: 'room 1' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'Ok', error: '', data: 'room 1' });
    });
  
    it('should return status "Error" and error message when room is not found', async () => {
      Room.findOne.mockResolvedValue(null);
  
      const res = await request(router)
        .post('/join')
        .send({ title: 'room 2' });
  
      expect(Room.findOne).toHaveBeenCalledWith({ Title: 'room 2' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'Error', error: 'Invalid Room ID' });
    });
  
    it('should return status 400 when title is not passed in body', async () => {
      const res = await request(router)
        .post('/join')
        .send({});
  
      expect(res.status).toBe(400);
    });
  });