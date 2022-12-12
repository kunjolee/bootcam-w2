
-- currencies
CREATE TABLE currencies(
    -- id INT NOT NULL AUTO_INCREMENT,
    "id" SERIAL PRIMARY KEY,
    "currencyType" VARCHAR(255) NOT NULL,
    "value" FLOAT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL
);

INSERT INTO currencies ("currencyType", value, "createdAt", "updatedAt") values (
    'quetzal',
    1,
    now(),
    now()
);
INSERT INTO currencies ("currencyType", value, "createdAt", "updatedAt") values (
    'dollar',
    7.88,
    now(),
    now()
);
INSERT INTO currencies ("currencyType", value, "createdAt", "updatedAt") values (
    'euro',
    8.73,
    now(),
    now()
);

-- categories

CREATE TABLE categories(
    "id" SERIAL PRIMARY KEY,
    "category" VARCHAR(255) NOT NULL,
    "state" INT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL
);

INSERT INTO categories ("category", state, "createdAt", "updatedAt") values (
    'variety',
    1,
    now(),
    now()
);
INSERT INTO categories ("category", state, "createdAt", "updatedAt") values (
    'food',
    1,
    now(),
    now()
);
INSERT INTO categories ("category", state, "createdAt", "updatedAt") values (
    'health',
    1,
    now(),
    now()
);
INSERT INTO categories ("category", state, "createdAt", "updatedAt") values (
    'salary',
    1,
    now(),
    now()
);
INSERT INTO categories ("category", state, "createdAt", "updatedAt") values (
    'car',
    1,
    now(),
    now()
);

INSERT INTO categories ("category", state, "createdAt", "updatedAt") values (
    'games',
    1,
    now(),
    now()
);

INSERT INTO categories ("category", state, "createdAt", "updatedAt") values (
    'hang out',
    1,
    now(),
    now()
);

INSERT INTO categories ("category", state, "createdAt", "updatedAt") values (
    'transfers',
    1,
    now(),
    now()
);
