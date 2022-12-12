const express = require("express");
const router = express.Router();
const User = require("../Model/usermodel");
const Batch = require("../Model/batchmodel");
var cron = require("node-cron");

router.post("/storeData", (req, res) => {
  let { firstName, lastName, age, email, batch } = req.body;
  email = email.toLowerCase();

  // check if a user already exist
  const d = new Date();
  let month = d.getMonth();
  let year = d.getFullYear();
  var p = [];

  Batch.findOne({ email: email }).then(savedUser => {
    if (savedUser) {
      let m = savedUser.history
        ? savedUser.history[savedUser.history.length - 1].month
        : 0;
      let y = savedUser.history
        ? savedUser.history[savedUser.history.length - 1].year
        : 1000;

      if (savedUser.history) {
        p = [...savedUser.history];
      }

      if (m == month && y == year) {
        return res.status(200).json({
          error:
            "You have already paid for this month, you cannot chnage batch now",
        });
      }
    } else {
      p.push({ month: month, year: year });
      // update the data of the user
      const userData = new User({
        firstname: firstName,
        lastname: lastName,
        email: email,
        age: age,
      });

      const batchData = new Batch({
        email: email,
        status: "true",
        batch: batch,
        history: p, //current date
      });
      //console.log(batchData);
      //console.log(p);

      userData
        .save()
        .then(item => {
          // send successfull message
          //console.log("User Data saved successfully");
          batchData
            .save()
            .then(item => {
              //console.log("Batch Data saved successfully");
              const resp = completePayment();
              res.status(200).json({
                message: "Payment Done Successfully ",
              });
            })
            .catch(err => {
              // send corresponding error
              res.json({
                message: err, // Future scope for printing the actual error message
              });
            });
        })
        .catch(err => {
          // send corresponding error
          res.json({
            message: err, // Future scope for printing the actual error message
          });
        });
    }
  });
});

function completePayment() {
  //payment gateway code here
  return "Payment done successfully";
}

cron.schedule(
  "0 0 1 * *",
  () => {
    const filter = { status: "true" };
    const updatedoc = { $set: { status: "false", batch: "" } };

    Batch.updateMany({ filter, updatedoc });
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

module.exports = router;
