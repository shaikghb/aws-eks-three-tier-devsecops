const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createApp } = require("../src/app");
test("health endpoint returns service status", async () => {
  const response = await request(createApp()).get("/health").expect(200);
  assert.deepEqual(response.body, { status: "ok" });
});
test("info endpoint returns service metadata", async () => {
  const response = await request(createApp()).get("/api/v1/info").expect(200);
  assert.equal(response.body.service, "three-tier-api");
});
test("items endpoint reports missing database", async () => {
  const response = await request(createApp()).get("/api/v1/items").expect(503);
  assert.equal(response.body.error, "database_unavailable");
});
test("unknown routes return JSON 404", async () => {
  const response = await request(createApp()).get("/missing").expect(404);
  assert.equal(response.body.error, "not_found");
});
