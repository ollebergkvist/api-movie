[![Build Status](https://travis-ci.com/ollebergkvist/api-movie.svg?branch=main)](https://travis-ci.com/ollebergkvist/api-movie)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/ollebergkvist/api-movie/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/ollebergkvist/api-movie/?branch=main)
[![Code Coverage](https://scrutinizer-ci.com/g/ollebergkvist/api-movie/badges/coverage.png?b=main)](https://scrutinizer-ci.com/g/ollebergkvist/api-movie/?branch=main)
[![Build Status](https://scrutinizer-ci.com/g/ollebergkvist/api-movie/badges/build.png?b=main)](https://scrutinizer-ci.com/g/ollebergkvist/api-movie/build-status/main)

# Install

```
Clone repo: git clone https://github.com/ollebergkvist/api-movie

Install dependencies: npm install

Create .env file: touch .env

Start: run npm dev

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
username: user@user.com
password: Password#1

Admin
username: admin@admin.com
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
            "stock": 1,
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
            "stock": 1,
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
            "availability": false,
            "deleted": false,
            "_id": "604148784c13630128ad18e8",
            "title": "The Godfather: Part II",
            "description": "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
            "image": "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY268_CR3,0,182,268_AL_.jpg",
            "__v": 0,
            "createdAt": "2021-03-04T20:52:08.417Z",
            "updatedAt": "2021-03-04T20:52:08.417Z"
        },
        ...
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
title
description
image
```

### Optional parameters:

```
stock
rental_price
sales_price
availability
likes
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
id
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
id
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
email
password

```

### Result:

```
{
    "message": "User successfully registered."
}
```

### Possible error, besides errors returned from db:

```

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

    "type": "success",
    "message": "User logged in",
    "user": {
    "api_key": "...",
    "email": "unknown@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey..."

}
```

N.B. The access token expires after 24 hours.

### Possible error, besides errors returned from db:

```

```

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

# Add rental

```
POST /api/movies
```

### Required parameters:

```
movie_id
customer_id
amount
cost

```

### Optional parameters:

```
return_date
returned
penalty
```

### Result

```
HTTP Status Code 201 Created
```

### Possible error, besides errors returned from db:

```

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

# Add purchase

```
POST /api/movies/re
```

### Required parameters:

```
movie_id
customer_id
amount
cost
```

### Result

```
HTTP Status Code 201 Created
```

### Possible error, besides errors returned from db:

```

```
