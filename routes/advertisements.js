const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (_, res) => {
    db.all("SELECT * FROM advertisements", (err, rows) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send("Erreur lors de la récupération des utilisateurs.");
      } else {
        res.json(rows);
      }
    });
  });
  router.post("/create", (req, res) => {
    const { title, description, user_id, plants_id, location } = req.body;
    db.run(
      "INSERT INTO advertisements (title, description, user_id, plants_id, location) VALUES (?, ?, ?, ?, ?)",
      [title, description, user_id, plants_id, location],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("Erreur lors de l'insertion de l'annonce.");
        } else {
          // Renvoyer l'ID de la nouvelle annonce insérée
          res.json({
            id: this.lastID,
            message: "Annonce insérée avec succès.",
          });
        }
      }
    );
  });

  // Mettre à jour une l'annonce par ID
  router.put("/:id/update", (req, res) => {
    const advertisementsId = req.params.id;
    const { title, description, user_id, plants_id, location } = req.body;

    db.run(
      "UPDATE advertisements SET title = ?, description = ?, user_id = ?, plants_id = ?, location = ? WHERE id = ?",
      [title, description, user_id, plants_id, location, advertisementsId],
      (err) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send(
              `Erreur lors de la mise à jour de la plante avec l'ID ${advertisementsId}.`
            );
        } else {
          res
            .status(200)
            .send(
              `Plante avec l'ID ${advertisementsId} mise à jour avec succès.`
            );
        }
      }
    );
  });

  // Route pour récupérer les annonces en fonction de la catégorie principale de la plante
  router.get("/category/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;
    db.all(
      `SELECT Advertisements.id, Advertisements.title, Advertisements.description
       FROM Advertisements
       JOIN Plants ON Advertisements.plants_id = Plants.id
       JOIN Category ON Plants.category_id = Category.id
       WHERE Category.id = ?`,
      [categoryName],
      (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).send("Erreur lors de la récupération des annonces.");
        } else {
          res.json(rows);
        }
      }
    );
  });

  return router;
};
