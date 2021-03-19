# sdc-ratings-reviews
# basic commands in postgres

\c connect to database
\l list databases
\dt list tables for database
\d+ tablename describe table
\i load schema file

load schema from outside postgres
psql postgres -f '/Users/grahamkirsh/Desktop/SDC/RRserviceRepository/schema.sql';


SET session_replication_role = 'replica';

SET session_replication_role = 'origin';


load data from csv file
\copy [tablename] from '/Users/grahamkirsh/TERMINAL/Immersive/Sprints/SDC/Downloads/reviews-photos.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF-8'


log in to psql: psql -U  postgres -f'/Users/grahamkirsh/TERMINAL/Immersive/Sprints/SDC/sdc-ratings-reviews/database.sql'