# Install

```
Clone repo: git clone https://github.com/ollebergkvist/api-movie

Install dependencies: npm install

Create .env file: touch .env

```

# Environment variables

```
Set the required env variables in the .env file

SECRET={jwtSecret}
MONGDODB_URI={URI}
PORT={PORT}

```

# Database

```
Backup
mongodump --db movies --archive=movies.archive --gzip

Restore
mongorestore --gzip --archive=movies.archive
```

# Precreated users

```
User
username: user
password: Password#1

Admin
username: admin
password: Password#1
```

# Postman collection

```
Development (Localhost):
https://www.getpostman.com/collections/7a71e416d915d809cea9

Deployed (Heroku):
https://www.getpostman.com/collections/e053a56d92616fc3bab9
```

# Movie API documentation

```
Routes open to the public:
GET /movies
GET /movies/:id
GET /search
```

```
Routes secured by JWT:
POST /movies/rent
POST /movies/purchase
PUT /favorite/:id

The mentioned routes need a valid JSON Web Token (JWT) set in the HTTP-header.
The 'x-access-token' header should contain the JWT. In order to retrieve a token, a user
need to register and login successfully via the routes stated below:
POST /register
POST /login
```

```
Routes secured with JWT plus admin rights:
POST /api/movies
PUT /api/movies/:id
DELETE /movies/:id
POST /remove/:id
PUT /movies/availability/:id
POST /movies/return/:id
GET /users
PUT /user/:id

```

All other routes are open to the general public.

## Movies

### A movie has the following attributes:

```
id
title
description
image
stock
deleted
rental_price
sales_price
availability
likes
createdAt
updatedAt
```

# Get all movies:

### Resource URL

```
GET /api/movies
```

### Result:

```
{
    "status": 200,
    "message": "Movies retrieved successfully",
    "document": [
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18e6",
            "title": "The Shawshank Redemption",
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            "image": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.415Z",
            "updatedAt": "2021-03-04T20:52:08.415Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18e7",
            "title": "The Godfather",
            "description": "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
            "image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.417Z",
            "updatedAt": "2021-03-04T20:52:08.417Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18e8",
            "title": "The Godfather: Part II",
            "description": "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
            "image": "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.417Z",
            "updatedAt": "2021-03-04T20:52:08.417Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18e9",
            "title": "The Dark Knight",
            "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            "image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.417Z",
            "updatedAt": "2021-03-04T20:52:08.417Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18ea",
            "title": "12 Angry Men",
            "description": "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
            "image": "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.418Z",
            "updatedAt": "2021-03-04T20:52:08.418Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18eb",
            "title": "Schindler's List",
            "description": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
            "image": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.418Z",
            "updatedAt": "2021-03-04T20:52:08.418Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18ec",
            "title": "The Lord of the Rings: The Return of the King",
            "description": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
            "image": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.418Z",
            "updatedAt": "2021-03-04T20:52:08.418Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18ed",
            "title": "Pulp Fiction",
            "description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            "image": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR1,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.418Z",
            "updatedAt": "2021-03-04T20:52:08.418Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18ee",
            "title": "The Good, the Bad and the Ugly",
            "description": "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
            "image": "https://m.media-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.418Z",
            "updatedAt": "2021-03-04T20:52:08.418Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18ef",
            "title": "The Lord of the Rings: The Fellowship of the Ring",
            "description": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
            "image": "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.418Z",
            "updatedAt": "2021-03-04T20:52:08.418Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18f0",
            "title": "Fight Club ",
            "description": "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
            "image": "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.418Z",
            "updatedAt": "2021-03-04T20:52:08.418Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18f1",
            "title": "Forrest Gump",
            "description": "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
            "image": "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY268_CR1,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.418Z",
            "updatedAt": "2021-03-04T20:52:08.418Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18f2",
            "title": "Inception",
            "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            "image": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.419Z",
            "updatedAt": "2021-03-04T20:52:08.419Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18f3",
            "title": "The Lord of the Rings: The Two Towers",
            "description": "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
            "image": "https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.419Z",
            "updatedAt": "2021-03-04T20:52:08.419Z"
        },
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18f4",
            "title": "Star Wars: Episode V - The Empire Strikes Back",
            "description": "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.",
            "image": "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.419Z",
            "updatedAt": "2021-03-04T20:52:08.419Z"
        },
    ]
}

```

# Get specific movie:

### Resource URL

```
GET /api/movies/:id
```

### Result

```
"document": [
        {
            "stock": 0,
            "rental_price": 10,
            "sales_price": 20,
            "availability": true,
            "deleted": false,
            "_id": "604148784c13630128ad18e6",
            "title": "The Shawshank Redemption",
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of     common decency.",
            "image": "https://m.media-amazon.com/images/M/              MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.415Z",
            "updatedAt": "2021-03-04T20:52:08.415Z"
        },
]

```

# Search movies:

```
POST /api/movies/search/title?
```

### Example response

```

```

# Add movie

```
POST /api/movies
```

### Required parameters:

```

```

### Optional parameters:

```

```

### Result

```
HTTP Status Code 201 Created

```

### Possible error, besides errors returned from db:

```

```

# Delete movie

```
DELETE /api/movies
```

### Required parameters:

```

```

### Optional parameters:

```

```

### Response

```
HTTP Status Code 204 No Content
```

### Possible error, besides errors returned from db:

```

```

# Update movie

```
PUT /api/movies
```

### Required parameters:

```

```

### Optional parameters:

```

```

### Result

```
HTTP Status Code 204 No Content
```

### Possible error, besides errors returned from db:

```

```

# Register

### Resource URL

```
POST /api/register
```

### Required parameters:

```

```

### Result:

```
{
    "message": "User successfully registered."
}
```

# Login

### Resource URL

```
POST /api/login
```

### Required parameters:

```
email
password
```

### Result:

```
{
    "data": {
        "type": "success",
        "message": "User logged in",
        "user": {
        "api_key": "...",
        "email": "unknown@example.com"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey..."
    }
}
```

N.B. The access token expires after 24 hours.

# Rentals

### A rental has the following attributes:

```
movie_id
customer_id
amount
cost
return_date
returned
rental_price
penalty
returnedAt
createdAt
updatedAt
```

# Purchases

### A purchase has the following attributes:

```
movie_id
customer_id
amount
cost
createdAt
updatedAt
```
