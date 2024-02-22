-- Table Users
CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    password TEXT,
    address_city TEXT,
    address_postal_code TEXT,
    address_street TEXT
);

-- Table Category
CREATE TABLE Category (
    id INTEGER PRIMARY KEY,
    name TEXT
);

-- Table Sub_category
CREATE TABLE Sub_category (
    id INTEGER PRIMARY KEY,
    name TEXT,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

-- Table Plants
CREATE TABLE Plants (
    id INTEGER PRIMARY KEY,
    name TEXT,
    user_id INTEGER,
    category_id INTEGER,
    image TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

-- Table Advertisements
CREATE TABLE Advertisements (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    user_id INTEGER,
    plants_id INTEGER,
    location TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (plants_id) REFERENCES Plants(id)
);

-- Table Advice
CREATE TABLE Advice (
    id INTEGER PRIMARY KEY,
    plant_id INTEGER,
    user_id INTEGER,
    advice TEXT,
    FOREIGN KEY (plant_id) REFERENCES Plants(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Ajouter les catégories
INSERT INTO Category (name) VALUES ('Arbres');
INSERT INTO Category (name) VALUES ('Champignons');
INSERT INTO Category (name) VALUES ('Fleurs');
INSERT INTO Category (name) VALUES ('Arbustes');
INSERT INTO Category (name) VALUES ('Cactus');
INSERT INTO Category (name) VALUES ('Fougères');
INSERT INTO Category (name) VALUES ('Mousses');

-- Ajouter les sous-catégories pour la catégorie 'Arbres'
INSERT INTO Sub_category (name, category_id) VALUES ('le chêne', 1);
INSERT INTO Sub_category (name, category_id) VALUES ('le pin', 1);
INSERT INTO Sub_category (name, category_id) VALUES ('le bouleau', 1);
INSERT INTO Sub_category (name, category_id) VALUES ('autres', 1);

-- Ajouter les sous-catégories pour la catégorie 'Champignons'
INSERT INTO Sub_category (name, category_id) VALUES ('les amanites des césars', 2);
INSERT INTO Sub_category (name, category_id) VALUES ('les cèpes', 2);
INSERT INTO Sub_category (name, category_id) VALUES ('les bolets', 2);
INSERT INTO Sub_category (name, category_id) VALUES ('autres', 2);

-- Ajouter les sous-catégories pour la catégorie 'Fleurs'
INSERT INTO Sub_category (name, category_id) VALUES ('la tulipe', 3);
INSERT INTO Sub_category (name, category_id) VALUES ('le lilas', 3);
INSERT INTO Sub_category (name, category_id) VALUES ('la rose', 3);
INSERT INTO Sub_category (name, category_id) VALUES ('autres', 3);

-- Ajouter les sous-catégories pour la catégorie 'Arbustes'
INSERT INTO Sub_category (name, category_id) VALUES ('l’éléagnus', 4);
INSERT INTO Sub_category (name, category_id) VALUES ('le photinia', 4);
INSERT INTO Sub_category (name, category_id) VALUES ('le cyprès de leyland', 4);
INSERT INTO Sub_category (name, category_id) VALUES ('autres', 4);

-- Ajouter les sous-catégories pour la catégorie 'Cactus'
INSERT INTO Sub_category (name, category_id) VALUES ('Opuntia ficus indica', 5);
INSERT INTO Sub_category (name, category_id) VALUES ('Disocactus ackermannii', 5);
INSERT INTO Sub_category (name, category_id) VALUES ('Parodia scopa', 5);
INSERT INTO Sub_category (name, category_id) VALUES ('autres', 5);

-- Ajouter les sous-catégories pour la catégorie 'Fougères'
INSERT INTO Sub_category (name, category_id) VALUES ('Parodia scopa', 6);
INSERT INTO Sub_category (name, category_id) VALUES ('fougère d''Allemagne', 6);
INSERT INTO Sub_category (name, category_id) VALUES ('fougère royale', 6);
INSERT INTO Sub_category (name, category_id) VALUES ('autres', 6);

-- Ajouter les sous-catégories pour la catégorie 'Mousses'
INSERT INTO Sub_category (name, category_id) VALUES ('autres', 7);

-- Créer les utilisateurs Enzo, Matthieu, Maxime et Alister avec des numéros de rue
INSERT INTO Users (first_name, last_name, email, password, address_city, address_postal_code, address_street) 
VALUES 
('Enzo', 'Dupont', 'enzo.dupont@example.com', 'motdepasse_enzo', 'Paris', '75001', '1 Rue de la Paix'),
('Matthieu', 'Martin', 'matthieu.martin@example.com', 'motdepasse_matthieu', 'Lyon', '69001', '2 Avenue des Arts'),
('Maxime', 'Durand', 'maxime.durand@example.com', 'motdepasse_maxime', 'Marseille', '13001', '3 Boulevard des Sciences'),
('Alister', 'Lefevre', 'alister.lefevre@example.com', 'motdepasse_alister', 'Bordeaux', '33000', '4 Place de la Liberte');


-- Ajouter des plantes pour l'utilisateur Enzo (id = 1) dans la catégorie 'Fleurs' (id = 3)
INSERT INTO Plants (name, user_id, category_id, image) VALUES ('Rose rouge', 1, 3, 'rose_rouge.jpg');
INSERT INTO Plants (name, user_id, category_id, image) VALUES ('Lys blanc', 1, 3, 'lys_blanc.jpg');
INSERT INTO Plants (name, user_id, category_id, image) VALUES ('Tulipe jaune', 1, 3, 'tulipe_jaune.jpg');
-- Ajouter des plantes pour l'utilisateur Matthieu (id = 2) dans la catégorie 'Cactus' (id = 5)
INSERT INTO Plants (name, user_id, category_id, image) VALUES ('Cactus opuntia', 2, 5, 'cactus_opuntia.jpg');
INSERT INTO Plants (name, user_id, category_id, image) VALUES ('Disocactus ackermannii', 2, 5, 'disocactus_ackermannii.jpg');
-- Ajouter des plantes pour l'utilisateur Maxime (id = 3) dans la catégorie 'Arbustes' (id = 4)
INSERT INTO Plants (name, user_id, category_id, image) VALUES ('Eleagnus argenté', 3, 4, 'eleagnus_argente.jpg');
INSERT INTO Plants (name, user_id, category_id, image) VALUES ('Photinia rouge', 3, 4, 'photinia_rouge.jpg');
-- Ajouter des plantes pour l'utilisateur Alister (id = 4) dans la catégorie 'Champignons' (id = 2)
INSERT INTO Plants (name, user_id, category_id, image) VALUES ('Amanite tue-mouche', 4, 2, 'amanite_tue_mouche.jpg');
INSERT INTO Plants (name, user_id, category_id, image) VALUES ('Cèpe de Bordeaux', 4, 2, 'cepe_bordeaux.jpg');


-- Ajouter des conseils pour la plante 'Rose rouge' (id = 1) par l'utilisateur Enzo (id = 1)
INSERT INTO Advice (plant_id, user_id, advice) VALUES (1, 1, 'Arroser régulièrement et fertiliser chaque printemps.');
-- Ajouter des conseils pour la plante 'Cactus opuntia' (id = 4) par l'utilisateur Matthieu (id = 2)
INSERT INTO Advice (plant_id, user_id, advice) VALUES (4, 2, 'Éviter de trop arroser, les cactus préfèrent un sol sec.');
-- Ajouter des conseils pour la plante 'Eleagnus argenté' (id = 7) par l'utilisateur Maxime (id = 3)
INSERT INTO Advice (plant_id, user_id, advice) VALUES (7, 3, 'Tailler les branches mortes chaque automne.');
-- Ajouter des conseils pour la plante 'Amanite tue-mouche' (id = 10) par l'utilisateur Alister (id = 4)
INSERT INTO Advice (plant_id, user_id, advice) VALUES (10, 4, 'Ne pas consommer, cette amanite est toxique.');

-- Ajouter des publicités pour la plante 'Rose rouge' (id = 1) par l'utilisateur Enzo (id = 1)
INSERT INTO Advertisements (title, description, user_id, plants_id, location) VALUES ('Vente de roses', 'Belles roses rouges à vendre, idéales pour la décoration.', 1, 1, 'Paris');
-- Ajouter des publicités pour la plante 'Cactus opuntia' (id = 4) par l'utilisateur Matthieu (id = 2)
INSERT INTO Advertisements (title, description, user_id, plants_id, location) VALUES ('Cactus à vendre', 'Large sélection de cactus Opuntia à vendre, différents styles et tailles.', 2, 4, 'Lyon');
-- Ajouter des publicités pour la plante 'Eleagnus argenté' (id = 7) par l'utilisateur Maxime (id = 3)
INSERT INTO Advertisements (title, description, user_id, plants_id, location) VALUES ('Arbuste à adopter', 'Eleagnus argenté en bonne santé à adopter, venez le chercher à Marseille.', 3, 7, 'Marseille');
-- Ajouter des publicités pour la plante 'Amanite tue-mouche' (id = 10) par l'utilisateur Alister (id = 4)
INSERT INTO Advertisements (title, description, user_id, plants_id, location) VALUES ('Amanite rare', 'Amanite tue-mouche rare à collectionner, attention à ne pas la consommer !', 4, 10, 'Bordeaux');
