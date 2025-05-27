CREATE TABLE rangers (
    ranger_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL
);

CREATE TABLE species (
    species_id SERIAL PRIMARY KEY,
    common_name VARCHAR(50),
    scientific_name VARCHAR(50),
    discovery_date DATE,
    conservation_status VARCHAR(50)
);

CREATE TABLE sightings (
    sighting_id SERIAL PRIMARY KEY,
    ranger_id INTEGER REFERENCES rangers (ranger_id),
    species_id INTEGER REFERENCES species (species_id),
    sighting_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(50),
    notes VARCHAR(100)
);
-- Insert values
INSERT INTO
    rangers (name, region)
VALUES (
        'Alice Green',
        'Northern Hills'
    ),
    ('Bob White', 'River Delta'),
    (
        'Carol King',
        'Mountain Range'
    );

INSERT INTO
    species (
        common_name,
        scientific_name,
        discovery_date,
        conservation_status
    )
VALUES (
        'Snow Leopard',
        'Panthera uncia',
        '1775-01-01',
        'Endangered'
    ),
    (
        'Bengal Tiger',
        'Panthera tigris tigris',
        '1758-01-01',
        'Endangered'
    ),
    (
        'Red Panda',
        'Ailurus fulgens',
        '1825-01-01',
        'Vulnerable'
    ),
    (
        'Asiatic Elephant',
        'Elephas maximus indicus',
        '1758-01-01',
        'Endangered'
    );

INSERT INTO
    sightings (
        ranger_id,
        species_id,
        location,
        sighting_time,
        notes
    )
VALUES (
        1,
        1,
        'Peak Ridge',
        '2024-05-10 07:45:00',
        'Camera trap image captured'
    ),
    (
        2,
        2,
        'Bankwood Area',
        '2024-05-12 16:20:00',
        'Juvenile seen'
    ),
    (
        3,
        3,
        'Bamboo Grove East',
        '2024-05-15 09:10:00',
        'Feeding observed'
    ),
    (
        1,
        2,
        'Snowfall Pass',
        '2024-05-18 18:30:00',
        NULL
    );

-- PostgreSQL Problems & Sample Outputs

-- 1️⃣ Register a new ranger with provided data with name = 'Derek Fox' and region = 'Coastal Plains'
INSERT INTO
    rangers (name, region)
VALUES ('Derek Fox', 'Coastal Plains');
-- 2️⃣ Count unique species ever sighted.
SELECT count(DISTINCT species_id) as unique_species_count
FROM sightings;
-- 3️⃣ Find all sightings where the location includes "Pass".
SELECT * FROM sightings WHERE location ILIKE '%pass';

--  4️⃣ List each ranger's name and their total number of sightings.
SELECT rangers.name, count(species_id) as total_sightings
FROM sightings
    JOIN rangers ON sightings.ranger_id = rangers.ranger_id
GROUP BY
    rangers.name;

-- 5️⃣ List species that have never been sighted.
SELECT common_name FROM species
  WHERE species_id NOT IN (
    SELECT DISTINCT species_id FROM sightings
  );
-- 6️⃣ Show the most recent 2 sightings.
SELECT s.common_name, g.sighting_time, r.name
FROM sightings g
JOIN species s ON g.species_id = s.species_id
JOIN rangers r ON g.ranger_id = r.ranger_id
ORDER BY g.sighting_time DESC
LIMIT 2;

-- 7️⃣ Update all species discovered before year 1800 to have status 'Historic'.
UPDATE species
SET conservation_status = 'Historic'
WHERE discovery_date < '1800-01-01';

SELECT * FROM ranger;
-- 8️⃣ Label each sighting's time of day as 'Morning', 'Afternoon', or 'Evening'.
SELECT sighting_id,
    CASE
        WHEN EXTRACT(HOUR FROM sighting_time) < 12 THEN 'Morning'
        WHEN EXTRACT(HOUR FROM sighting_time) BETWEEN 12 AND 17 THEN 'Afternoon'
        ELSE 'Evening'
    END AS time_of_day
FROM sightings;

-- 9️⃣ Delete rangers who have never sighted any species
DELETE FROM rangers
WHERE ranger_id NOT IN (
    SELECT DISTINCT ranger_id FROM sightings
);


-- Table Select commands

SELECT * FROM rangers;

SELECT * FROM species;

SELECT * FROM sightings;

-- DELETE
DROP TABLE IF EXISTS rangers;

DROP TABLE IF EXISTS species;

DROP TABLE IF EXISTS sightings;