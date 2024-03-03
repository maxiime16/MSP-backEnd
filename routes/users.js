const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // Récupération de tout les users
  router.get("/", (_, res) => {
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
    } = req.body;
  
    // Vérification si l'e-mail existe déjà dans la base de données
    db.get(
      "SELECT * FROM Users WHERE email = ?",
      [email],
      (err, existingUser) => {
        if (err) {
          return res.status(500).json({
            error:
              "Une erreur s'est produite lors de la vérification de l'e-mail.",
          });
        }
  
        if (existingUser) {
          return res
            .status(400)
            .json({ error: "Un compte avec cet e-mail existe déjà." });
        }
  
        // Si l'e-mail n'existe pas déjà, procéder à l'ajout de l'utilisateur
        db.run(
          "INSERT INTO Users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
          [
            first_name,
            last_name,
            email,
            password,
          ],
          function (err) {
            if (err) {
              return res.status(500).json({
                error:
                  "Une erreur s'est produite lors de l'ajout de l'utilisateur.",
              });
            }
            res.status(201).json({
              id: this.lastID,
              first_name,
              last_name,
              email,
            });
          }
        );
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


  //verification couple email/mot de passe
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(test)
    console.log("Email et mot de passe reçus :", email, password);

    // Vérification si l'e-mail existe dans la base de données
    db.get(
      "SELECT * FROM Users WHERE email = ?",
      [email],
      (err, user) => {
        if (err) {
          return res.status(500).json({
            error:
              "Une erreur s'est produite lors de la vérification de l'e-mail.",
          });
        }
  
        if (!user) {
          // L'utilisateur avec cet e-mail n'existe pas
          return res.status(404).json({
            error: "Utilisateur non trouvé. Veuillez vérifier vos informations d'identification.",
          });
        }
  
        // Vérification du mot de passe en utilisant une fonction de hachage sécurisée (bcrypt)
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({
              error: "Une erreur s'est produite lors de la vérification du mot de passe.",
            });
          }
  
          if (!result) {
            // Le mot de passe est incorrect
            return res.status(401).json({
              error: "Mot de passe incorrect. Veuillez vérifier vos informations d'identification.",
            });
          }
  
          // Le couple email/mot de passe est correct, renvoie les informations de l'utilisateur
          res.status(200).json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            // Ajoutez d'autres informations utilisateur que vous souhaitez renvoyer
          });
        });
      }
    );
  });

  return router;
};
