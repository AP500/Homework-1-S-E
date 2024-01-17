# Application for digital vacation requests

## Server + Database 

- Run a MySql server in a Docker container 
- Install Docker and create a MySql server by using this command in the terminal: 
    - docker run --name HomeW1 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=word123 -d mysql
- After creating a MySql server use MySql workbench in order to set up a database 
- You can use the files in the folder "sql statements" in order to create the necessary tables within the database 

## Requirements

- Download Node.js (with npm included)
- Install mysql2, express, express-session, bcrypt and body-parser with command: npm istall [f. Example: mysql2]


## Start the application 
1. Make sure your server is running in a docker container correctly 
2. Use the following command in order to run the node.js server: "node server.js"
3. If the server is running correctly you can acces it on localhost:3030/index.html 
4. Navigate threw the application and make a leave request 



