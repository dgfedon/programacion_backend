Listar todos los procesos de node:
tasklist /fi "imagename eq node.exe"

Ejecutar el servidor con nodemon:
nodemon ./src/server --port 3000 --mode CLUSTER

Ejecutar con forever:
forever ./src/server.js --port 3000 --mode CLUSTER

Listar procesos con forever:
forever list


comenzar procesos con PM2:
(CLUSTER)
pm2 start ./src/server.js -i 0

(FORK)
pm2 start ./src/server.js

Listar procesos pm2:
pm2 list / pm2 status