// Написать unit-тесты для контроллера входа (signup)

//    - ответ должен иметь статус-код 200
//    - в ответе должен возвращаться токен
//    - в ответе должен возвращаться объект user с 2
// полями email и subscription, имеющие тип данных String

//? Тест работает если в другом терминале запустить сервер(npm run dev).

const request = require("supertest");
require("dotenv").config();
const app = require("../app");
const mongoose = require("mongoose");

const { User } = require("../models/user");

const { DB_HOST, PORT } = process.env;

describe("Test the signup", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(() => {});

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test signup with correct data", async () => {
    const signupData = {
      email: "user@gmail.com",
      password: "654321",
    };

    const { statusCode, body } = await request(app)
      .post("/users/register")
      .send(signupData);

    expect(statusCode).toBe(201);

    expect(body.user.email).toBe(signupData.email);

    expect(typeof body.user.subscription).toBe("string");
  });
});