const express = require("express");
const router = express.Router();
const { isSeller, isAuthenticated } = require("../middleware/auth");
const conversationController = require("../controllers/conversationController");

router.post("/new-conversation", conversationController.newConversation);
router.get(
  "/seller/:id",
  isSeller,
  conversationController.getSellerConversations
);
router.get(
  "/user/:id",
  isAuthenticated,
  conversationController.getUserConversations
);
router.put(
  "/update-last-message/:id",
  conversationController.updateLastMessage
);

module.exports = router;
