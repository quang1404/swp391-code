const request = require('supertest');
const app = require('../../app.js'); 
const db = require('../../config/db'); 

describe('Koi API Integration Tests', () => {

    describe('GET /koi/:id/food', () => {
      it('should get a koi by ID with food calculation', async () => {
        const res = await request(app).get('/koi/1/food'); 
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('food_required_kg_per_day'); 
        
      });
    });
  });