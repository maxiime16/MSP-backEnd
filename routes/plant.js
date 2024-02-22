const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Récupérer toutes les plantes
  router.get("/", (_, res) => {
    db.all("SELECT * FROM Plants", (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des plantes.");
      } else {
        res.json(rows);
      }
    });
  });

  // Récupérer une plante par ID
  router.get("/:id", (req, res) => {
    const plantId = req.params.id;

    db.get("SELECT * FROM Plants WHERE id = ?", [plantId], (err, row) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            `Erreur lors de la récupération de la plante avec l'ID ${plantId}.`
          );
      } else {
        if (row) {
          res.json(row);
        } else {
          res.status(404).send(`Plante avec l'ID ${plantId} non trouvée.`);
        }
      }
    });
  });

  // Créer une nouvelle plante
  router.post("/create", (req, res) => {
    const { name, user_id, category_id, image } = req.body;

    db.run(
      "INSERT INTO Plants (name, user_id, category_id, image) VALUES (?, ?, ?, ?)",
      [name, user_id, category_id, image],
      function (err) {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send("Erreur lors de la création de la nouvelle plante.");
        } else {
          res
            .status(201)
            .json({ id: this.lastID, message: "Plante créée avec succès." });
        }
      }
    );
  });

  // Mettre à jour une plante par ID
  router.put("/:id/update", (req, res) => {
    const plantId = req.params.id;
    const { name, user_id, category_id, image } = req.body;

    db.run(
      "UPDATE Plants SET name = ?, user_id = ?, category_id = ?, image = ? WHERE id = ?",
      [name, user_id, category_id, image, plantId],
      (err) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send(
              `Erreur lors de la mise à jour de la plante avec l'ID ${plantId}.`
            );
        } else {
          res
            .status(200)
            .send(`Plante avec l'ID ${plantId} mise à jour avec succès.`);
        }
      }
    );
  });

  // Supprimer une plante par ID
  router.delete("/:id/delete", (req, res) => {
    const plantId = req.params.id;

    db.run("DELETE FROM Plants WHERE id = ?", [plantId], (err) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            `Erreur lors de la suppression de la plante avec l'ID ${plantId}.`
          );
      } else {
        res
          .status(200)
          .send(`Plante avec l'ID ${plantId} supprimée avec succès.`);
      }
    });
  });

  // Récupérer les conseils pour une plante spécifique
  router.get("/:id/advice", (req, res) => {
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
  router.get("/:idPlant/advice/:id", (req, res) => {
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
