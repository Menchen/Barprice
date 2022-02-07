import { Router } from "express"
import { getItem, getAllItems, updateItem, deleteItem, addItem } from "../controllers/items"

const router: Router = Router()

router.get("/", getAllItems)

router.get("/:id", getItem)

router.post("/", addItem)

router.put("/:id", updateItem)

router.delete("/:id", deleteItem)

export default router
