import axios, { AxiosResponse } from "axios"

const baseUrl: string = `/api`

const getAllItems = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const items: AxiosResponse<ApiDataType> = await axios.get(baseUrl + "/")
    return items
  } catch (error) {
    throw new Error(error)
  }
}

const getItem = async (id: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const items: AxiosResponse<ApiDataType> = await axios.get(baseUrl + `/${id}`)
    return items
  } catch (error) {
    throw new Error(error)
  }
}

const addItem = async (item: IItem): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const items: AxiosResponse<ApiDataType> = await axios.post(baseUrl + `/`, item)
    return items
  } catch (error) {
    throw new Error(error)
  }
}

const updateItem = async (item: IItem): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const items: AxiosResponse<ApiDataType> = await axios.put(baseUrl + `/${item._id}`, item)
    return items
  } catch (error) {
    throw new Error(error)
  }
}

const deleteItem = async (item: IItem): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const items: AxiosResponse<ApiDataType> = await axios.delete(baseUrl + `/${item._id}`)
    return items
  } catch (error) {
    throw new Error(error)
  }
}

export { getAllItems, getItem, addItem, updateItem, deleteItem }
