const request = require('supertest');
const app = require('../../app.js'); 
const db = require('../../config/db'); 

describe('Pond API Integration Tests', () => {

    describe('GET /pond/:id/details', () => {
      it('should get pond details with salt calculation', async () => {
        const res = await request(app).get('/pond/1/details'); 
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('pond_id', 1);
        expect(res.body).toHaveProperty('salt_kg_required');

      });
    });
  });