const db = require("../models/dbModel");
const format = require("pg-format");

const createReview = async (req, res) => {
    const review = req.body.review;
    const imgs = req.body.img;
    if (!review) return res.status(400).json({ message: "names not provided" });
    try {
        const { rows } = await db.query(
            format(
                "INSERT INTO review (%I) VALUES (%L) RETURNING *",
                Object.keys(review),
                Object.values(review)
            )
        );
        console.log(rows[0]);
        const promises = imgs.map((link) => {
            return db.query(
                format(
                    "INSERT INTO reviewimg (link, owner, review) VALUES (%L, %L, %L)",
                    link,
                    review.resort_id,
                    rows[0].id
                )
            );
        });
        await Promise.all(promises);
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
};
const deleteReviewById = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: "id not provided" });

    try {
        const { rows } = await db.query("DELETE FROM review WHERE id = $1", [
            id,
        ]);
        const { rows: rows2 } = await db.query("DELETE FROM reviewimg WHERE review = $1", [
            id,
        ]);

        console.log(rows);
        console.log(rows2);
        res.status(200).json({ message: "DELETED" });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
        alert("Error deleting");
    }
};


module.exports = {
    createReview,
    deleteReviewById
};