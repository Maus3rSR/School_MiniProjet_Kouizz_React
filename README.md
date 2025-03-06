# Mini projet React - Kouizz

Kouizz est un jeu de questions-réponses sur le thème des jeux vidéo. Le projet se compose d'une application front-end React avec TypeScript, sous Vite.

## Note pour TypeScript

Si tu souhaites rendre TypeScript moins contraignant car tu n'es pas à l'aise, fais les changements suivants :

- Dans `tsconfig.json` change `strict`, `noUnusedLocals` et `noUnusedParameters` à `false`
- Dans `eslint.config.js` ajoute `"@typescript-eslint/no-unused-vars": ["off"],` au niveau de la clé `rules`

## Fonctionnalités à développer

### Page d'accueil

La page d'accueil doit contenir :

- L'historique des parties avec :
  - Le pseudo du joueur
  - Son score (nombre de réponses justes / nombre total de questions)
  - La date et l'heure de finalisation du quizz
- Un formulaire de démarrage avec :
  - Un champ pour saisir le pseudo
  - Un bouton "Jouer" redirigeant vers `/game`

### Page de jeu

La page de jeu (`/game`) doit afficher :

- La progression (ex: Question 1/10, 2/10, etc.)
- La question en cours
- Le niveau de difficulté (facile, moyen, difficile)
- 4 cartes représentant les réponses possibles
- Un état de chargement des questions

Comportement du jeu :

- Au clic sur une réponse :
  - La réponse choisie devient verte si correcte, rouge si incorrecte
  - La bonne réponse est toujours affichée en vert
  - Un bouton "Question suivante" apparaît
- À la fin du quizz :
  - Affichage du score final
  - Un bouton "Rejouer" pour lancer une nouvelle partie
  - Un bouton "Retour à l'accueil"

## Conseils techniques

### Composants

Vous devez créer différents composants REACT pour alléger vos fichiers et permettre une meilleure lisibilité, avoir une meilleure structure, permettre de réutiliser les composants et faciliter la maintenabilité.

Voici des suggestions possibles de composants :

- `QuestionCard` : Affichage d'une question et ses réponses
- `ScoreDisplay` : Affichage du score actuel
- `AnswerOption` : Card pour une réponse
- `GameHistory` : Tableau des parties précédentes
- `PlayForm` : Formulaire de démarrage de partie

Voir la documentation pour plus d'informations sur les contextes :
https://fr.react.dev/learn/passing-data-deeply-with-context

### API des questions

Vous pouvez récupérer les questions depuis une API externe à l'application qui retourne un quizz au format JSON

```
https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=10&category=jeux_videos
```
