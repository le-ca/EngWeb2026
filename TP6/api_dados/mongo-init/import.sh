#!/bin/bash
mongoimport --host localhost --db cinema_db --collection filmes --type json --file /docker-entrypoint-initdb.d/filmes.json --jsonArray
mongoimport --host localhost --db cinema_db --collection atores --type json --file /docker-entrypoint-initdb.d/atores.json --jsonArray
mongoimport --host localhost --db cinema_db --collection generos --type json --file /docker-entrypoint-initdb.d/generos.json --jsonArray
