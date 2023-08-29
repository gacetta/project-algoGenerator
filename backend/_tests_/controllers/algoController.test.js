const request = require("supertest");
const app = require("../../app");
const { algos: allAlgos } = require("../../controllers/algoController");

test("should return 404 for unfound page", async () => {
  await request(app).get("/fakePath").expect(404);
});

test("should retrieve an array all algos", async () => {
  const response = await request(app).get("/algos");

  expect(response.status).toBe(200);
  expect(response.header["content-type"]).toMatch(/^application\/json/);
  expect(response.body.length).toBe(allAlgos.length);
  expect(response.body[0].name).toBe(allAlgos[0].name);
});

test("should retrieve a single algo by id", async () => {
  const algoID = "1";
  const response = await request(app).get(`/algos/${algoID}`);

  expect(response.status).toBe(200);
  expect(response.header["content-type"]).toMatch(/^application\/json/);
  expect(response.body.id).toBe(algoID);
});

test("should throw error when retrieving algo that does not exist", async () => {
  await request(app).get("/algos/99").expect(500);
});

test("should invoke an algo with the given arguments", async () => {
  const algoID = "1";
  const response = await request(app)
    .post(`/algos/${algoID}/run`)
    .set("Content-Type", "application/json")
    .send({
      args: JSON.stringify({ args: ["g"] }),
    });

  expect(response.status).toBe(200);
  console.log(response.body);
});
