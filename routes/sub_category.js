const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Récupérer toutes les sous-catégories
  router.get("/sub_category", (_, res) => {
    db.all("SELECT * FROM sub_category", (err, rows) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send("Erreur lors de la récupération des sous-catégories.");
      } else {
        res.json(rows);
      }
    });
  });

  // Récupérer une sous-catégorie par id
  router.get("/sub_category/:id", (req, res) => {
    const sub_categId = req.params.id;

    db.get(
      "SELECT * FROM sub_category WHERE id = ?",
      [sub_categId],
      (err, row) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send(
              `Erreur lors de la récupération de l'utilisateur avec l'ID ${sub_categId}.`
            );
        } else {
          if (row) {
            res.json(row);
          } else {
            res
              .status(404)
              .send(`Utilisateur avec l'ID ${sub_categId} non trouvé.`);
          }
        }
      }
    );
  });

  // Récupérer toutes les sous-catégories d'une catégorie spécifique
  router.get("/category/:idCateg/sub_category", (req, res) => {
    const categoryId = req.params.idCateg;

    db.all(
      "SELECT * FROM sub_category WHERE category_id = ?",
      [categoryId],
      (err, rows) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send(
              `Erreur lors de la récupération des sous-catégories de la catégorie avec l'ID ${categoryId}.`
            );
        } else {
          res.json(rows);
        }
      }
    );
  });

  // Récupérer une sous-catégorie par ID dans une catégorie spécifique
  router.get("/category/:idCateg/sub_category/:id", (req, res) => {
    const categoryId = req.params.idCateg;
    const subCategoryId = req.params.id;

    db.get(
      "SELECT * FROM sub_category WHERE category_id = ? AND id = ?",
      [categoryId, subCategoryId],
      (err, row) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send(
              `Erreur lors de la récupération de la sous-catégorie avec l'ID ${subCategoryId} dans la catégorie avec l'ID ${categoryId}.`
            );
        } else {
          if (row) {
            res.json(row);
          } else {
            res
              .status(404)
              .send(
                `Sous-catégorie avec l'ID ${subCategoryId} dans la catégorie avec l'ID ${categoryId} non trouvée.`
              );
          }
        }
      }
    );
  });

  return router;
};