/// <reference types="jest" />
import request from "supertest";
import express from "express";
import { sequelize } from "../config/database";
import { Item } from "../models/item";
import itemRoutes from "../routes/itemRoutes";

const app = express();
app.use(express.json());
app.use("/items", itemRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Item API", () => {
  let itemId: number;

  it("should create an item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "Test Item", description: "A test item." });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test Item");
    itemId = res.body.id;
  });

  it("should list items", async () => {
    const res = await request(app).get("/items");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get item details", async () => {
    const res = await request(app).get(`/items/${itemId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(itemId);
  });

  it("should update an item", async () => {
    const res = await request(app)
      .put(`/items/${itemId}`)
      .send({ name: "Updated Item" });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated Item");
  });

  it("should delete an item", async () => {
    const res = await request(app).delete(`/items/${itemId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Item deleted");
  });
});
