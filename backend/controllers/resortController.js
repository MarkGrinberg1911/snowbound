const db = require("../models/dbModel");
const format = require('pg-format');

const getResortByBame = async (req, res) => {
  const { name } = req.params;

  if (!name) return res.status(400).json({ message: "name not provided" });

  try {
    const { rows } = await db.query("SELECT * FROM resort WHERE name = $1", [
      name,
    ]);

    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

const getMultipleResortByBame = async (req, res) => {
  const { names } = req.body;


  if (!names) return res.status(400).json({ message: "names not provided" });

  try {
    const { rows } = await db.query(format(`SELECT * FROM resort WHERE name in %L`, [names]));
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

const getResortByCountry = async (req, res) => {
  const country = req.params.country;
  console.log(country);


  if (!country) return res.status(400).json({ message: "name not provided" });

  try {


    const { rows } = await db.query("SELECT * FROM resort WHERE country_id = $1", [
      country,
    ]);

    console.log("Rows:", rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
const deleteResortByBame = async (req, res) => {
  const { name } = req.params;

  if (!name) return res.status(400).json({ message: "name not provided" });

  try {
    const { rows } = await db.query("DELETE FROM resort WHERE name = $1", [
      name,
    ]);

    console.log(rows);
    res.status(200).json("DELETED", rows);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
const createResort = (req, res) => {
  const resort = req.body;
  if (!resort) return res.status(400).json({ message: "names not provided" });
  try {
    // console.log(format("INSERT INTO resort (%I) VALUES (%L)", Object.keys(resort), Object.values(resort)))
    const { rows } = db.query(format("INSERT INTO resort (%I) VALUES (%L)", Object.keys(resort), Object.values(resort)));
    console.log(rows);
    res.status(200).json(rows);

  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
}

module.exports = {
  getResortByCountry,
  getMultipleResortByBame,
  getResortByBame,
  deleteResortByBame,
  createResort
};