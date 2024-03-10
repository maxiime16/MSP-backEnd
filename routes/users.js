const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Récupération de tout les users
  router.get("/all", (_, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({
            error:
              "Une erreur s'est produite lors de la récupération des utilisateurs.",
          });
      }
      res.json(rows);
    });
  });

  // Récupérer un utilisateur par ID
  router.get("/:id", (req, res) => {
    const userId = req.params.id;

    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
      if (err) {
        return res
          .status(500)
          .json({
            error:
              "Une erreur s'est produite lors de la récupération de l'utilisateur.",
          });
      }
      if (!row) {
        return res
          .status(404)
          .json({ error: `Utilisateur avec l'ID ${userId} non trouvé.` });
      }
      res.json(row);
    });
  });
  
  // Ajout d'un utilisateur
  router.post("/", (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      address_city,
      address_postal_code,
      address_street,
    } = req.body;

    db.run(
      "INSERT INTO Users (first_name, last_name, email, password, address_city, address_postal_code, address_street) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        first_name,
        last_name,
        email,
        password,
        address_city,
        address_postal_code,
        address_street,
      ],
      function (err) {
        if (err) {
          return res
            .status(500)
            .json({
              error:
                "Une erreur s'est produite lors de l'ajout de l'utilisateur.",
            });
        }
        res
          .status(201)
          .json({
            id: this.lastID,
            first_name,
            last_name,
            email,
            address_city,
            address_postal_code,
            address_street,
          });
      }
    );
  });

  // Suppression d'un utilisateur par ID
  router.delete("/:id", (req, res) => {
    const userId = req.params.id;

    db.run("DELETE FROM Users WHERE id = ?", [userId], function (err) {
      if (err) {
        return res
          .status(500)
          .json({
            error:
              "Une erreur s'est produite lors de la suppression de l'utilisateur.",
          });
      }
      if (this.changes === 0) {
        return res
          .status(404)
          .json({ error: `Utilisateur avec l'ID ${userId} non trouvé.` });
      }
      res.json({
        message: `Utilisateur avec l'ID ${userId} supprimé avec succès.`,
      });
    });
  });

  return router;
};
