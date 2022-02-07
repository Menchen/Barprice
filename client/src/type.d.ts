interface IItem {
  _id: string
  price: number
  description: string
}

interface ItemProps {
  item: IItem
}

type ApiDataType = {
  status: string
  items?: IItem[]
  item?: IItem
}
