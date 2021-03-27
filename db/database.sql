-- Database: ratings&reviews

DROP DATABASE IF EXISTS ratingsreviewstest2;

CREATE DATABASE ratingsreviewstest2;

\c ratingsreviewstest2;

--===============================
CREATE TABLE reviews (
    id serial NOT NULL,
    product_id integer,
    rating integer,
    date timestamptz,
    summary varchar(150),
    body varchar(2000),
    recommend boolean,
    reported boolean,
    reviewer_name varchar(100),
    reviewer_email varchar(100),
    response varchar(2000),
    helpfulness integer,
    PRIMARY KEY (id)
);

create index reviews_index_id on reviews (id);
create index reviews_index_product on reviews (product_id);

--===============================
CREATE TABLE "reviews-photos" (
    id serial NOT NULL,
    review_id integer,
    url varchar(500),
    PRIMARY KEY (id),
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

create index photos on "reviews-photos" (review_id);

--===============================
CREATE TABLE characteristics (
    id serial NOT NULL,
    product_id integer,
    name varchar(50),
    PRIMARY KEY (id)
);

--===============================
CREATE TABLE characteristic_reviews (
    id serial NOT NULL,
    characteristic_id integer,
	review_id integer,
    value varchar(50),
    PRIMARY KEY (id),
    FOREIGN KEY (review_id) REFERENCES reviews(id),
    FOREIGN KEY (characteristic_id) REFERENCES characteristics(id)
);