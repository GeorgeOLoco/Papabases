
const db = require("./dbconnector.js");

async function handleRequest(expectsData, req, res, successMsg, funcBody) {
  let errorReason = "Failed to connect to the database";

  try {
    const connection = await db.getConnection();

    try {
      let data;
      if (expectsData) {
        data = await funcBody(connection);

        if (req.query.format === "csv") {
          res.set("Content-Type", "text/csv");
          res.status(200).send(data);
        } else {
          res.status(200).json(data);
        }
      } else {
        await funcBody(connection);
        res.status(204).json({ status: "OK" });
      }

      console.log(successMsg);
    } finally {
      connection.release();
      errorReason = "Failed to execute the database query";
    }
  } catch (error) {
    res.status(500).json({ status: "failed", reason: errorReason });
    console.log(error);
  }
}

module.exports.handleRequest = handleRequest; 