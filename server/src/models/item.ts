import { IItem } from "../types/item"
import { model, Schema } from "mongoose"

const itemSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    description: {
      type: String,
      required: true,
      default: "",
    }
  }
)

export default model<IItem>("Item", itemSchema)
