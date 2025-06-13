const express = require("express");
const router = express.Router();
const withdrawController = require("../controllers/withdrawController");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");

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
