const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Récupérer tout les conseils
  router.get("/advices", (_, res) => {
    db.all("SELECT * FROM advice", (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des conseils.");
      } else {
        res.json(rows);
      }
    });
  });

  // Récupérer un conseil par ID
  router.get("/:id", (req, res) => {
    const adviceId = req.params.id;

    db.get("SELECT * FROM advice WHERE id = ?", [adviceId], (err, row) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            `Erreur lors de la récupération de la plante avec l'ID ${adviceId}.`
          );
      } else {
        if (row) {
          res.json(row);
        } else {
          res.status(404).send(`Plante avec l'ID ${adviceId} non trouvée.`);
        }
      }
    });
  });

  // Récupérer les conseils pour une plante spécifique
  router.get("plants/:id/advice", (req, res) => {
    const plantId = req.params.id;

    db.all(
      "SELECT * FROM Advice WHERE plant_id = ?",
      [plantId],
      (err, rows) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send(
              `Erreur lors de la récupération des conseils pour la plante avec l'ID ${plantId}.`
            );
        } else {
          res.json(rows);
        }
      }
    );
  });

  // Récupérer un conseil spécifique pour une plante spécifique
  router.get("plants/:idPlant/advice/:id", (req, res) => {
    const plantId = req.params.idPlant;
    const adviceId = req.params.id;

    db.get(
      "SELECT * FROM Advice WHERE plant_id = ? AND id = ?",
      [plantId, adviceId],
      (err, row) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send(
              `Erreur lors de la récupération du conseil pour la plante avec l'ID ${plantId} et l'ID du conseil ${adviceId}.`
            );
        } else {
          if (row) {
            res.json(row);
          } else {
            res
              .status(404)
              .send(
                `Conseil avec l'ID ${adviceId} pour la plante avec l'ID ${plantId} non trouvé.`
              );
          }
        }
      }
    );
  });

  return router;
};
