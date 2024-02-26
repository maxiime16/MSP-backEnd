const express = require("express");
const advertisementsRoute = require("../routes/advertisements");
const request = require('supertest'); 

// Créer un mock pour la base de données
const mockDB = {
  all: jest.fn(),
  get: jest.fn(),
};

//Création des mocks
const mockAdvertissements =[
    {id: 1, title:'Rose', descriptions:'Rose rouge', user_id:1, plant_id:1, location:'Paris'},
    {id: 2, title:'Tulipe', descriptions:'Tulipe Blanche', user_id:2, plant_id:2, location:'Londre'},
];

//Création de l'app
const app = express();
app.use(express.json());
app.use("/api/advertisements", advertisementsRoute(mockDB));

describe("Test de la route pour récupérer une annonce", () => {
    it("Devrait renvoyer un utilisateur existant au format JSON avec un code d'état 200", async () => {
      // Mock de la réponse de la base de données pour cet ensemble de tests
      mockDB.all.mockImplementation((query,callback) => {
        callback(null, mockAdvertissements);
      });

      const response = await request(app).get("/api/advertisements");

      console.log(response.text); // Affiche le texte de la réponse
      console.log(response.error); // Affiche les détails de l'erreur

      expect(response.status).toBe(200);
      expect(response.type).toMatch(/json/);
      expect(response.body).toEqual(mockAdvertissements);
    });
    it("Devrait renvoyer une erreur 500 si une erreur survient lors de la récupération des utilisateurs", async () => {
        // Mock de la réponse de la base de données pour cet ensemble de tests
        mockDB.all.mockImplementation((query, callback) => {
            callback( "Une erreur s'est produite lors de la récupération des annonces.");
        });
    
        const response = await request(app).get("/api/advertisements");

        console.log(response.body);
    
        expect(response.status).toBe(500);
        expect(response.type).toMatch(/json/);
        expect(response.body).toEqual("Une erreur s'est produite lors de la récupération des annonces.");
    });
});
describe("Test de la route pour récupérer une annonce ID", () => {
    it("Devrait renvoyer un utilisateur existant au format JSON avec un code d'état 200", async () => {
      // Mock de la réponse de la base de données pour cet ensemble de tests
      mockDB.get.mockImplementation((query, params,callback) => {
        callback(null, mockAdvertissements[1]);
      });

      const response = await request(app).get("/api/advertisements/1");

      console.log(response.text); // Affiche le texte de la réponse
      console.log(response.error); // Affiche les détails de l'erreur

      expect(response.status).toBe(200);
      expect(response.type).toMatch(/json/);
      expect(response.body).toEqual(mockAdvertissements[1]);
    });
    it("Devrait renvoyer une erreur 500 si une erreur survient lors de la récupération des utilisateurs", async () => {
        // Mock de la réponse de la base de données pour cet ensemble de tests
        mockDB.get.mockImplementation((query,params, callback) => {
            callback( "Une erreur s'est produite lors de la récupération des annonces.");
        });
    
        const response = await request(app).get("/api/advertisements/1");

        console.log(response.body);
    
        expect(response.status).toBe(500);
        expect(response.type).toMatch(/json/);
        expect(response.body).toEqual("Une erreur s'est produite lors de la récupération des annonces par id.");
    });
});