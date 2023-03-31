import axios from "axios";

const baseUrl = "http://localhost:5000"


export const createRoomApi = (data) => axios.post(`${baseUrl}/create/room/`, data)
export const allRoomApi = () => axios.get(`${baseUrl}/all/room/`)
export const detailRoomApi = (id) => axios.get(`${baseUrl}/detail/room/${id}`)

export const createMessageApi = (data) => axios.post(`${baseUrl}/create/message/`, data)
export const detailMessageApi = (id) => axios.get(`${baseUrl}/detail/message/${id}`)

