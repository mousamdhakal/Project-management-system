# Project Management API

All the Responses and request are sent as JSON data.

Considering BASEURL as : `http://localhost:5022/api`


## Open Endpoints

These endpoints do not need Authorization.

* Login : `POST /users/login`

**Data example** 

```json
{
  "username": "someone",
  "password": "something123" 
}
```


## Endpoints that require Authentication

These enpoints require token of authenticated user to be sent in Header in either `authorization`,`x-access-token` or `token`. A Token can be acquired from the login endpoint above.

### Current User related

Endpoint related to user:

* Create a user : `POST /users` (Only permission to user of role admin)

**Data example** 

```json
{
  "username": "neww",
  "password": "something123",
  "first_name": "new",
  "last_name": "new",
  "role": "engineer"
}
```

* Get all users : `GET /users/all` (only permitted to role admin)

* Get all data related to this user : `GET /users/this` (sends all data recognizing the user from the authentication token)

* Get data of specific user by `id` : `GET /users/:id` (only permitted to role admin)

* Update a user: `PUT /users/:id` (only permitted to role admin)

**Data example** 

`Same as creating user`

* Delete a user: `DELETE /users/:id` (only permitted to role admin)

There are similar routes and method for operations for projects,tasks and comments and all of them require user to be authenticated. Look into `/src/routes/` for all of the routes.