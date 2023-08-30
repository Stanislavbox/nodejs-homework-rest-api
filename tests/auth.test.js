// Написать unit-тесты для контроллера входа (signup)

//    - ответ должен иметь статус-код 200
//    - в ответе должен возвращаться токен
//    - в ответе должен возвращаться объект user с 2
// полями email и subscription, имеющие тип данных String

//? Тест работает если в другом терминале запустить сервер(npm run dev).

const request = require("supertest");
const baseURL = "http://localhost:3000/users";

describe("Test the signup", () => {
  it("'/login' return status 200", async () => {
    const result = await request(baseURL)
      .post("/login")
      .send({ email: "user@gmail.com", password: "654321" });

    expect(result.statusCode).toBe(200);
  });

  it("'/login' return token", async () => {
    const result = await request(baseURL)
      .post("/login")
      .send({ email: "user@gmail.com", password: "654321" });

    expect(result.body.token).toBeDefined();
  });

  it("'email' and 'subscription' must be a string", async () => {
    const loginResult = await request(baseURL)
      .post("/login")
      .send({ email: "user@gmail.com", password: "654321" });

    const result = await request(baseURL)
      .get("/current")
      .set("Authorization", `Bearer ${loginResult.body.token}`);

    const { email, subscription } = result.body;
    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
  });
});

