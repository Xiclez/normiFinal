const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app'); 

describe('Integration tests for services', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /game/start', () => {
    test('should start a game and return the initial team', async () => {
      const response = await request(app).post('/game/start');
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('idJuego');
      expect(response.body).toHaveProperty('equipoInicial');
      expect(response.body.equipoInicial).toHaveLength(6);
    });
  });

  describe('POST /game/compare', () => {
    test('should compare the sequence correctly', async () => {
      const startResponse = await request(app).post('/game/start');
      const { idJuego, equipoInicial } = startResponse.body;

      const compareResponse = await request(app)
        .post('/game/compare')
        .send({ idJuego, pokemons: equipoInicial });

      expect(compareResponse.statusCode).toBe(200);
      expect(compareResponse.body).toHaveProperty('resultado');
    });

    test('should return an error if the game ID is invalid', async () => {
      const response = await request(app)
        .post('/game/compare')
        .send({ idJuego: 'invalidID', pokemons: [1, 2, 3, 4, 5, 6] });

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });
});
