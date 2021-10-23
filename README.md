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
## Swagger Documentation Preview
This documentation is created by using APIMATIC which import the Postman API config, the export format from the APIMATIC is OpenAPI v3.0 (YAML).

<img src="https://cdn.discordapp.com/attachments/743403841487241217/901264192227651584/unknown.png" width="400px"> 
