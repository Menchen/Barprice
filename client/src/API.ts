import axios, { AxiosError, AxiosResponse } from "axios"

const baseUrl: string = `/api`

const getAllItems = async (): Promise<AxiosResponse<ApiDataType>> => {
    const items: AxiosResponse<ApiDataType> = await axios.get(baseUrl + "/")
    return items
}

const getItem = async (id: string): Promise<AxiosResponse<ApiDataType>> => {
    const items: AxiosResponse<ApiDataType> = await axios.get(baseUrl + `/${id}`)
    return items
}

const addItem = async (item: IItem): Promise<AxiosResponse<ApiDataType>> => {
    const items: AxiosResponse<ApiDataType> = await axios.post(baseUrl + `/`, item)
    return items
}

const updateItem = async (item: IItem): Promise<AxiosResponse<ApiDataType>> => {
    const items: AxiosResponse<ApiDataType> = await axios.put(baseUrl + `/${item._id}`, item)
    return items
}

const deleteItem = async (item: IItem): Promise<AxiosResponse<ApiDataType>> => {
    const items: AxiosResponse<ApiDataType> = await axios.delete(baseUrl + `/${item._id}`)
    return items
}

export { getAllItems, getItem, addItem, updateItem, deleteItem }
