CREATE TABLE inventory (
    id SERIAL PRIMARY KEY NOT NULL,
    product_name VARCHAR(280) NOT NULL,
    price NUMERIC NOT NULL,
    img_url TEXT NOT NULL
);