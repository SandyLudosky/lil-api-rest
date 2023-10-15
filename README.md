
## REST API

- **express**: framework web pour créer des application web et des serveurs Node.js
- **nodemon**: utilitaire qui permet de redémarrer automatiquement le serveur à chaque modification des fichiers javascript
- **mongoose**: bibliothèque JavaScript très populaire utilisée avec Node.js pour la gestion des bases de données MongoDB
- **dotenv**: module qui charge les variables d'environnement à partir d'un fichier .env dans process.envs

## Installation :
`npm install`

## Lancer le projet :
`npm start`

## Tester le projet  :

### Envoi d'une requête GET à l'URL http://localhost:5000/api/posts

`curl http://localhost:5000/api/posts`

### Envoi de requêtes POST pour créer un utilisateur http://localhost:5000/api/posts/auth/register

```
curl -X POST \
  http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "firstName": "Diana",
    "lastName": "L",
    "username": "diana2023",
    "email": "diana2023.com",
    "password": "0./<>@5/#89"
  }'
```

```
curl -X POST \
  http://localhost:5000/api/auth/register  \
  -H 'Content-Type: application/json' \
  -d '{
    "firstName": "Diana",
    "lastName": "Linares",
    "username": "diana2023",
    "email": "diana2023@gmail.com",
    "password": "0./<>@5/#89"
  }'
```

### Envoi de requêtes POST pour connecter un utilisateur http://localhost:5000/api/posts/auth/login


```
curl -X POST \
  http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "diana@gmail.com",
    "password": "0./<>@5/#89"
  }'
```

```
curl -X POST \
  http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "diana2023@gmail.com",
    "password": "test123"
  }'
```

```
curl -X POST \
  http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "diana2023@gmail.com",
    "password": "0./<>@5/#89"
  }'
```