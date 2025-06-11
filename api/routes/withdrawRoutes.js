const express = require("express");
const router = express.Router();
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const withdrawController = require("../controllers/withdrawController");

router.post(
  "/seller/request-withdraw",
  isSeller,
  withdrawController.requestWithdraw
);
router.get(
  "/admin/withdraw-requests",
  isAuthenticated,
  isAdmin("Admin"),
  withdrawController.getAllWithdrawRequestsByAdmin
);
router.put(
  "/admin/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  withdrawController.updateWithdrawRequestStatusByAdmin
);

module.exports = router;
