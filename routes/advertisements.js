const express = require("express");
const category = require("./category");
const sub_category = require("./sub_category");
const router = express.Router();

module.exports = (db) => {
  router.get("/all", (_, res) => {
    db.all("SELECT * FROM advertisements", (err, rows) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json(
            "Une erreur s'est produite lors de la récupération des annonces."
          );
      } else {
        res.json(rows);
      }
    });
  });

  // Récupérer un utilisateur par ID
  router.get("/:id", (req, res) => {
    const advertisementsId = req.params.id;

    db.get(
      "SELECT * FROM Advertisements WHERE id = ?",
      [advertisementsId],
      (err, row) => {
        if (err) {
          return res
            .status(500)
            .json(
              "Une erreur s'est produite lors de la récupération des annonces par id."
            );
        }
        if (!row) {
          console.error(err);
          return res.status(404).json({
            error: `Utilisateur avec l'ID ${advertisementsId} non trouvé.`,
          });
        }
        res.json(row);
      }
    );
  });

  router.post("/create", (req, res) => {
    const { title, description, user_id, longitude, latitude, category_id, sub_category_id } = req.body;
    db.run(
      "INSERT INTO advertisements (title, description, user_id, longitude, latitude, category_id, sub_category_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, user_id, longitude, latitude, category_id, sub_category_id],
      function (err) {
        if (err) {
          console.error("Erreur lors de l'insertion de l'annonce :", err.message);
        res.status(500).json({
          error: "Erreur lors de l'insertion de l'annonce.",
          details: err.message
        });
        } else {
          // Renvoyer l'ID de la nouvelle annonce insérée
          res.json({
            id: this.lastID,
            message:"Annonce insérée avec succès.",
          });
        }
      }
    );
  });

  // Mettre à jour une l'annonce par ID
  router.put("/:id/update", (req, res) => {
    const advertisementsId = req.params.id;
    const { title, description, user_id, plants_id, longitude, latitude } = req.body;

    db.run(
      "UPDATE advertisements SET title = ?, description = ?, user_id = ?, plants_id = ?, longitude = ?, latitude= ? WHERE id = ?",
      [title, description, user_id, plants_id, longitude,latitude, advertisementsId],
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
// Récupérer un utilisateur par ID
router.get("/category/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;

  db.all(
      "SELECT * FROM Advertisements WHERE category_id = ?;",
      [categoryId],
      (err, rows) => {
          if (err) {
              res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des annonces par id." });
          } else {
              res.status(200).json(rows);
          }
      }
  );
});
  return router;
};
