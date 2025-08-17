# MyContacts Backend API

This project is a backend API for managing a list of contacts with user authentication. It is built using Node.js, Express.js, and MongoDB, and it provides a secure and RESTful way to handle contact data.


## Features
- **User Authentication**: Users can register and log in securely.
- **JWT-Based Authorization**: All contact management routes are protected and require a JSON Web Token for access.
- **CRUD Operations**: Full functionality to create, read, update, and delete contacts.
- **Database Integration**: Uses Mongoose to interact with a MongoDB database.
- **Centralized Error Handling**: A custom error handler middleware is used to provide consistent error responses.

## API Endpoints
All endpoints are prefixed with ```/api```.

### Users
| Endpoint              | Method | Description                                   | Access   |
|-----------------------|--------|-----------------------------------------------|----------|
| ```/api/users/register```  | POST   | Register a new user                           | Public   |
| ```/api/users/login```      | POST   | Log in a user and get a JWT token             | Public   |
| ```/api/users/current```    | GET    | Get the current authenticated user's info     | Private  |



### Contacts
All contact endpoints are private and require a valid JWT in the Authorization header (Bearer <token>).

| Endpoint             | Method | Description | Access  |
|----------------------|--------|-------------------------------------|---------|
| ```/api/contacts```        | GET    | Get all contacts for the authenticated user | Private |
| ```/api/contacts```        | POST   | Create a new contact                | Private |
| ```/api/contacts/:id```    | GET    | Get a specific contact by ID        | Private |
| ```/api/contacts/:id```    | PUT    | Update a contact by ID              | Private |
| ```/api/contacts/:id```    | DELETE | Delete a contact by ID              | Private |




## Dependencies
- ```express```: Web framework for Node.js.
- ```mongoose```: MongoDB object modeling for Node.js.
- ```jsonwebtoken```: Used for creating and verifying JWTs.
- ```bcrypt```: For hashing passwords.
- ```dotenv```: Loads environment variables from a .env file.
- ```express-async-handler```: A simple middleware for handling exceptions inside of async express routes.