## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### Summary
* list the films
* list the films (with filters):
  * All the favorite films.
  * All the most rated films (i.e., those rated 5 out of 5).
  * All the films seen in the last month.
  * All the unseen films (i.e., the films without a specified watch Date).
* get a film given its \<id>.
* add new film
* update a film given its \<id>
* delete an existing film given its \<id>

### __List the films__

URL: `/api/films`

HTTP Method: GET

Description: Retrieve all the film.

Response: `200 OK` (success) or `500 Internal Server Error` (failure). In case of success, returns an array of questions in JSON format (see below); otherwise, an error message.

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "isFavorite": 1,
    "rating": 5,
    "watchDate": "2024-03-10",
    "userId": 1
  },
  ...
]
```

### __Get a single film__

URL: `/api/films/<id>`

HTTP Method: GET

Description: Retrieve the film identified by <id>.

Response: `200 OK` (success), `404 Not Found` (failure, if id doesn't exist) or `500 Internal Server Error` (failure). In case of success, returns a question in JSON format (see below); otherwise, an error message.

Response body:
```
{
  "id": 1,
  "title": "Pulp Fiction",
  "isFavorite": 1,
  "rating": 5,
  "watchDate": "2024-03-10",
  "userId": 1
}
```

### __Add a new film__
URL: `/api/films`

HTTP Method: POST

Description: Add a new film.

Request body:
```
{
  "title": "Portrait of a Lady on Fire",
  "isFavorite": 1,
  "rating": 5,
  "watchDate": "2026-03-17",
  "userId": 3
}
```

Response: `201 Created` (success), `422 Unprocessable Entity` (failure, if parameters are incorrect) or `500 Internal Server Error` (failure). In case of success, returns a question in JSON format (see below); otherwise, an error message.

### __Update a film__

URL: `/api/films/<id>`

HTTP Method: PUT

Description: Update the film identified by <id>.

Request body:
```
{
  "title": "Star Wars",
  "isFavorite": 1,
  "rating": 5,
  "watchDate": "2024-03-10",
  "userId": 1
}
```

Response: `200 OK` (success), `404 Not Found` (failure, if id doesn't exist) or `500 Internal Server Error` (failure). If the request body isn't valid, `422 Unprocessable Entity` (validation error).

### __Delete a film__

URL: `/api/films/<id>/delete`

HTTP Method: DELETE

Description: Delete the film identified by <id>.

Response: `200 OK` (success), `404 Not Found` (failure, if id doesn't exist) or `500 Internal Server Error` (failure).