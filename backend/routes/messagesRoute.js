
const Router = require("express");

const { addMessage } = require("../controllers/messagesController");
const { getAllMessage } = require("../controllers/messagesController");

const router = Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getAllMessage);

module.exports = router;