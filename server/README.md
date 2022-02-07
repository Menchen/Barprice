# Usage

`yarn start`

or 

`npm start`

To run the server, a MongoDB server credential is needed as enviroment variable,
you can also create an `nodemon.json` file to automatically set it.

Example file for `nodemon.json`
```json
{
  "env":{
    "MONGO_USER": "xx",
    "MONGO_PASSWORD": "xxxxxxxxxxxx",
    "MONGO_DB": "item",
    "MONGO_HOST": "myserver.xxx.mongodb.net"
  }
}
```
