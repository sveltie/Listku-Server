# Server
The main API for Listku app built with Express.

## Note
- Built a REST API which perform a basic To-Do **CRUD** functionality
- Used **Node. js based Object Data Modeling ODM** (mongoose) & MongoDB
- Tested **CRUD** API endpoints with Postman & OpenAPI
- Created Swagger documentation of the app & deployed to Heroku

## Setup
```bash
npm install && npm start
```

## Variable Setup
Create a dotenv file within the project folder and copy all the variables from the `.env-sample`, after this you need to fill it with your own token, url, etc.
```env
MONGO_URI = ENTER YOUR MONGO URI HERE
JWT_SECRET = ENTER YOUR JWT TOKEN HERE
JWT_LIFETIME = 30d
```
