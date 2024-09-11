let request = require("supertest");
let http = require("http");
let { app } = require("../index");
let { getAllGames, getGameById } = require("../controllers");



jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
  getGameById: jest.fn()
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Exercise 3: Test Retrieve All Games
  it("GET API /games should retrieve all games and return a status code as 200", async () => {
    let mockedGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch'
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4'
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC'
      }
    ];
    getAllGames.mockResolvedValue(mockedGames);
    let result = await request(server).get("/games");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockedGames);
  });
  // Exercise 4: Test Retrieve Game by ID
  it("GET API /games/details/:id should retrieve the game by id and return a status code as 200", async () => {
    let mockedGame = {
      gameId: 2,
      title: 'Red Dead Redemption 2',
      genre: 'Action',
      platform: 'PlayStation 4'
    };
    getGameById.mockResolvedValue(mockedGame);
    let result = await request(server).get("/games/details/2");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockedGame);
  });
});
describe("Controller Functions Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Exercise 5: Mock the Get All Games Function
  it("getAllGames function should return all games", () => {
    let mockedGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch'
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4'
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC'
      }
    ];
    getAllGames.mockReturnValue(mockedGames);
    let result = getAllGames();
    expect(result).toEqual(mockedGames);
    expect(result.length).toBe(3);
  });
});