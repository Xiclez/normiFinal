const {
    numChoice,
    _getPokemonInfo,
    teamChoice,
    createGame,
    getGameInfo,
    updateSequence,
  } = require('../../utils/gameLogic');
  
  const mongoose = require('mongoose');
  const Game = require('../../models/gameModel');
  const axios = require('axios');
  jest.mock('axios');
  
  // Test for numChoice
  describe('numChoice', () => {
    test('should return a number within the specified range', () => {
      const num = numChoice(1, 10);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(10);
    });
  
    test('should throw an error if the range is invalid', () => {
      expect(() => numChoice(10, 1)).toThrow('Invalid Range');
    });
  });
  
  // Test for _getPokemonInfo
  describe('_getPokemonInfo', () => {
    test('should return Pokémon information', async () => {
      axios.get.mockResolvedValue({
        data: {
          id: 1,
          name: 'bulbasaur',
          sprites: { front_default: 'bulbasaur.png' },
        },
      });
  
      const info = await _getPokemonInfo(1);
      expect(info).toHaveProperty('identificador', 1);
      expect(info).toHaveProperty('nombre', 'bulbasaur');
      expect(info).toHaveProperty('imagenUrl', 'bulbasaur.png');
    });
  
    test('should throw an error if the Pokémon does not exist', async () => {
      axios.get.mockRejectedValue(new Error('Pokémon not found'));
      await expect(_getPokemonInfo(99999)).rejects.toThrow('Pokémon not found');
    });
  });
  
  // Tests for teamChoice
  describe('teamChoice', () => {
    test('should return a valid Pokémon team', async () => {
      axios.get.mockResolvedValue({
        data: {
          id: 1,
          name: 'bulbasaur',
          sprites: { front_default: 'bulbasaur.png' },
        },
      });
  
      const team = await teamChoice([1, 2, 3, 4, 5, 6]);
      expect(team).toHaveLength(6);
      team.forEach(pokemon => {
        expect(pokemon).toHaveProperty('identificador');
        expect(pokemon).toHaveProperty('nombre');
        expect(pokemon).toHaveProperty('imagenUrl');
      });
    });
  });
  
  // Tests for createGame
  describe('createGame', () => {
    beforeAll(async () => {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });
  
    test('should create a game with an initial team', async () => {
      const game = await createGame([1, 2, 3, 4, 5, 6]);
      expect(game).toHaveProperty('_id');
      expect(game).toHaveProperty('initialTeam', [1, 2, 3, 4, 5, 6]);
    });
  });
  
  // Tests for getGameInfo
  describe('getGameInfo', () => {
    test('should get game information by ID', async () => {
      const newGame = new Game({ initialTeam: [1, 2, 3, 4, 5, 6], pokemonSequence: [] });
      await newGame.save();
      const game = await getGameInfo(newGame._id);
      expect(game).toHaveProperty('_id', newGame._id);
      expect(game).toHaveProperty('initialTeam', [1, 2, 3, 4, 5, 6]);
    }, 10000);  // Aumenta el tiempo de espera a 10 segundos
  
    test('should throw an error if the game is not found', async () => {
      await expect(getGameInfo('60c72b2f9b1d8c1a4c8e3b5f')).rejects.toThrow('Game not found');
    }, 10000);  // Aumenta el tiempo de espera a 10 segundos
  });
  
  // Tests for updateSequence
  describe('updateSequence', () => {
    test('should update the sequence with a new Pokémon ID', async () => {
      const newGame = new Game({ initialTeam: [1, 2, 3, 4, 5, 6], pokemonSequence: [] });
      await newGame.save();
  
      const updatedGame = await updateSequence(newGame._id, 7);
      expect(updatedGame).toHaveProperty('pokemonSequence');
      expect(updatedGame.pokemonSequence).toContain(7);
    }, 10000);  // Aumenta el tiempo de espera a 10 segundos
  
    test('should throw an error if the game is not found', async () => {
      await expect(updateSequence('60c72b2f9b1d8c1a4c8e3b5f', 7)).rejects.toThrow('Game not found');
    }, 10000);  // Aumenta el tiempo de espera a 10 segundos
  });
  