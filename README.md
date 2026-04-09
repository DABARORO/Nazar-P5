# 🚀 Jetpack Barry - p5.js Edition

## 📝 Présentation du Projet

Ce projet est une adaptation interactive et générative du célèbre jeu "Jetpack Joyride". L'objectif est de survivre le plus longtemps possible dans un laboratoire truffé d'obstacles électriques et de mines, tout en collectant des pièces d'or. Le personnage principal est incarné par l'image `DialogueBarry0.png`.

## 🛠️ Spécifications Techniques

### 1. Intention Visuelle et Ambiance

- **Objectif :** Provoquer l'adrénaline et tester les réflexes du joueur.
- **Ambiance :** Frénétique, Électrique et Rétro.
- **Canvas :** Dimensions fixes de **800x400** pixels avec un fond bleu marine profond.

### 2. Architecture du Code (POO)

Le code repose sur la **Programmation Orientée Objet**, ce qui permet une gestion fluide des multiples éléments à l'écran :

- **Classe `Player` :** Gère la physique de Barry (gravité de 0.25 et propulsion de -0.6).
- **Classe `Laser` :** Obstacles rectangulaires apparaissant principalement au centre pour forcer le mouvement.
- **Classe `Mine` :** Obstacles circulaires fixes au sol pour empêcher le joueur de rester immobile.
- **Classe `Coin` :** Éléments de score collectables.

### 3. Logique de Difficulté Progressive

Le jeu intègre un système de difficulté dynamique via un facteur multiplicateur :

- **Vitesse :** La vitesse de défilement des obstacles augmente de manière continue.
- **Densité :** La fréquence d'apparition des dangers s'intensifie au fil du temps.

## 🕹️ Commandes et Interaction

- **Cliquer (Maintenir) :** Active le jetpack de Barry et génère un effet de particules (flammes).
- **Relâcher :** Laisse Barry retomber sous l'effet de la gravité.
- **Objectif :** Atteindre la plus grande distance et collecter le plus de butin possible.

## 📋 Pseudo-Code du Programme

- **Au démarrage :** Chargement de l'image de Barry, initialisation du canvas et création de l'objet joueur.
- **À chaque dessin :** Mise à jour de la physique, calcul des collisions, et génération des nouveaux obstacles selon le facteur de difficulté.
- **Interaction :** En cas de collision, arrêt de la boucle de jeu et affichage de l'écran de fin de mission.

## 🎯 Instruction de Conception (Prompt IA)

> "Voici mes spécifications. Ne génère pas le code final. Aide-moi à coder étape par étape en m'expliquant chaque fonction p5.js dont j'ai besoin. Commence par la section Canvas."

---

### 💡 Note pour le rendu

Le projet utilise le fichier image `DialogueBarry0.png` qui doit impérativement être présent dans le dossier racine pour que le jeu fonctionne correctement.
