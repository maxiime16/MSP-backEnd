const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Récupérer tout les conseils
  router.get("/all", (_, res) => {
    db.all("SELECT * FROM advice", (err, rows) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "Erreur lors de la récupération des conseils." });
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
          .json({
            error: `Une erreur s'est produite lors de la récupération des annonces par id.`,
          });
      } else {
        if (row) {
          res.json(row);
        } else {
          res.status(404).send(`Plante avec l'ID ${adviceId} non trouvée.`);
        }
      }
    });
  });

  // Récupérer les conseils pour une annonce en fonction de l'annonce 
  router.get("/advertisements/:id", (req, res) => {
    const advertisementId = req.params.id;

    db.all(
      "SELECT * FROM Advice WHERE advertisement_id = ?",
      [advertisementId],
      (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).json("Erreur lors de la récupération des conseils.");
        } else {
          res.status(200).json(rows);
        }
      }
    );
  });
  return router;
};
