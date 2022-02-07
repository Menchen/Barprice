import { Response, Request } from "express"
import { IItem } from "../../types/item"
import Item from "../../models/item"

const getAllItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items: IItem[] = await Item.find()
    res.status(200).json({ items })
  } catch (error) {
    console.error(error);
    res.status(501)
  }
}

const getItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await Item.findById(req.params.id)
    if (item === null) {
      res.status(404).json({})
    } else {
      res.status(200).json({ item: item })
    }

  } catch (error) {
    console.error(error)
    res.status(501)
  }
}

const addItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IItem, "description" | "price">

    const item: IItem = new Item({
      _id: req.params.id,
      description: body.description,
      price: body.price
    })
    try {
      const newItem: IItem = await item.save()
      res.status(200).json({ newItem })
    } catch (mongoError) {
      console.error(mongoError)
      res.status(501)
    }
  } catch (error) {
    console.error(error)
    res.status(401)

  }
}

const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id

    const item = {
      price: req.body.price,
      description: req.body.description,
      _id: id
    } as Pick<IItem, "_id" | "description" | "price">

    let updateItem: IItem | null = await Item.findByIdAndUpdate(
      { _id: id },
      item,
      { new: true }

    )
    if (updateItem === null) {
      const itemDocument: IItem = new Item(item)
      updateItem = await itemDocument.save()
    }

    res.status(200).json({
      item: updateItem
    })


  } catch (error) {
    console.error(error)
    res.status(401)
  }
}

const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {

    const deletedItem: IItem | null = await Item.findByIdAndRemove(req.params.id)
    if (deletedItem) {
      res.status(200).json({
        item: deletedItem
      })
    } else {
      res.status(404)
    }
  } catch (error) {
    console.error(error)
    res.status(501)
  }
}

export { getItem, getAllItems, addItem, updateItem, deleteItem }
