var express = require("express");
var router = express.Router();
const pool = require("../pool");

/* GET home page. */
router.post("/register", async function (req, res, next) {
  //   console.log(req.body);
  const { displayName, userId, pictureUrl } = req.body;

  const [rows, fields] = await pool.query(
    `SELECT * FROM login WHERE userId = ("${userId}") `
  );
  //   console.log(rows);

  if (rows.length === 0) {
    const [rows2, fields2] = await pool.query(
      `INSERT INTO login (displayName, userId, pictureUrl) VALUES ("${displayName}", "${userId}" ,"${pictureUrl}") `
    );
    res.status(200).send(rows2);
  } else {
    res.status(200).send("userId is available and already login");
  }
});
module.exports = router;
