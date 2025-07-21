import { Router } from "express";
import * as itemController from "../controllers/itemController";

const router = Router();

router.post("/", itemController.createItem);
router.get("/", itemController.listItems);
router.get("/:id", itemController.getItem);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

export default router;
