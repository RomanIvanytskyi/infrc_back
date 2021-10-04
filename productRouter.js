const Router = require("express");
const router = new Router();
const controller = require("./productController");


router.get("/getProducts", controller.getProducts);
router.post("/newProduct", controller.newProduct);
router.post("/deleteProduct", controller.deleteProduct);
router.post("/editProduct", controller.editProduct)
router.post("/getProduct", controller.getProduct)
router.post("/newComment", controller.newComment)
router.post("/getComments", controller.getComments)
router.post("/deleteComments", controller.deleteComments)
router.post("/deleteComment", controller.deleteComment)
module.exports = router;
