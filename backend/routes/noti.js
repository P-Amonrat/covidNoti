var express = require("express");
var router = express.Router();
const pool = require("../pool");
const axios = require("axios");
var qs = require("qs");

/* GET home page. */
router.put("/updateToken", function (req, res, next) {
  console.log("-----");
  console.log(req.body);
  const { code, state, id } = req.body;

  try {
    const formdata = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://14f0-27-55-72-235.ap.ngrok.io",
      client_id: "9uUC0gIhSYXtcYeDXHcG6X",
      client_secret: "GFLiykaRFw2dWLo1odJskAIi8XnDDl4fzoRnFVGlZn9",
    };

    var config = {
      method: "post",
      url: "https://notify-bot.line.me/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(formdata),
    };

    axios(config)
      .then(async (data) => {
        if (data.status === 200) {
          console.log("=======", data);

          let [rows, fields] = await pool.query(
            `UPDATE login SET token = "${data.data.access_token}" WHERE userId = "${id}"`
          );
          if (rows) {
            console.log(rows);
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (e) {
    console.log("error", e);
  }
});

router.post("/notify", async function (req, res, next) {
  console.log("-----");
  console.log(req.body);

  let [rows, fields] = await pool.query(
    `SELECT * FROM login WHERE userId = "${req.body.id}";`
  );
  console.log(rows);

  var data = qs.stringify({
    message:
      "❗️❗️ข้อควรปฏิบัติเมื่อเป็นโควิด❗️❗️ 1. รับประทานอาหารและดื่มน้ำให้เพียงพอโดยการจิบน้ำเรื่อย ๆ ทั้งวัน ยกเว้นช่วงก่อนนอน 2-3 ชั่วโมง 💧 2. นอนหลับพักผ่อนอย่างน้อยวันละ 6-8 ชั่วโมง 🥱🛌 3. ฝึกหายใจช้า ๆ ลึก ๆ โดยหายใจเข้าทางจมูกและออกทางปาก ทั้งในท่านั่งตัวตรง นอนหงาย นอนตะแคง หรือนอนคว่ำ 😮‍💨🧘🏻‍♂️ 4. ออกกำลังเบา ๆ โดยการเดิน 3 นาที หรือลุกนั่งบนเก้าอี้ 1 นาที หรือนานกว่านั้น แต่ไม่ควรออกกำลังกายหักโหมจนเกินไป 🏃🏻🏃‍♂️🏃🏽‍♀️ 5. หากมีอาการรุนแรง ให้โทร. 1669  เพื่อขอรับบริการการแพทย์ฉุกเฉินทันที ☎️ 6. งดออกจากที่พักหรือเดินทางข้ามจังหวัด หากฝ่าฝืนถือว่าผิด พ.ร.บ. โรคติดต่อ พ.ศ. 2558 มาตรา 34 ❌❌",
  });

  var config = {
    method: "post",
    url: "https://notify-api.line.me/api/notify",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${rows[0].token}`,
    },
    data: data,
  };

  let res1 = "";
  axios(config)
    .then(function (response) {
      res1 = response.data;
      res.status(200).send(res1);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500);
    });
});

module.exports = router;
