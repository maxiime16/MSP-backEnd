const request = require("supertest");
const app = require("../server");

describe("Test de la route pour récupérer tous les utilisateurs", () => {
  it("Devrait renvoyer tous les utilisateurs au format JSON avec un code d'état 200", async () => {
    const response = await request(app).get("/api/users");
    
    // Vérifie si le code d'état de la réponse est 200
    expect(response.status).toBe(200);

    // Vérifie si la réponse est au format JSON
    expect(response.type).toMatch(/json/);
  });
});

describe("Test de la route pour récupérer toutes les catégories", () => {
  it("Devrait renvoyer toutes les catégories au format JSON avec un code d'état 200", async () => {
    const response = await request(app).get("/api/category");
    
    // Vérifie si le code d'état de la réponse est 200
    expect(response.status).toBe(200);

    // Vérifie si la réponse est au format JSON
    expect(response.type).toMatch(/json/);
  });
});

describe("Test de la route pour récupérer toutes les sous-catégories", () => {
  it("Devrait renvoyer toutes les sous-catégories au format JSON avec un code d'état 200", async () => {
    const response = await request(app).get("/api/sub_category");
    
    // Vérifie si le code d'état de la réponse est 200
    expect(response.status).toBe(200);

    // Vérifie si la réponse est au format JSON
    expect(response.type).toMatch(/json/);
  });
});

describe("Test de la route pour récupérer toutes les annonces", () => {
  it("Devrait renvoyer toutes les annonces au format JSON avec un code d'état 200", async () => {
    const response = await request(app).get("/api/advertisements");
    
    // Vérifie si le code d'état de la réponse est 200
    expect(response.status).toBe(200);

    // Vérifie si la réponse est au format JSON
    expect(response.type).toMatch(/json/);
  });
});

describe("Test de la route pour récupérer tous les conseils", () => {
  it("Devrait renvoyer tous les conseils au format JSON avec un code d'état 200", async () => {
    const response = await request(app).get("/api/advices");
    
    // Vérifie si le code d'état de la réponse est 200
    expect(response.status).toBe(200);

    // Vérifie si la réponse est au format JSON
    expect(response.type).toMatch(/json/);
  });
});
