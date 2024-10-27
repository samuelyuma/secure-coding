import type { APIError } from "@/types/api"
import axios, { type AxiosError } from "axios"
import Cookies from "universal-cookie"

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL || ""

const cookies = new Cookies()

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  async (config) => {
    let token: string | undefined

    token = cookies.get("secure-coding-token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<APIError>) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject({
      status: false,
      code: error.response?.status || 500,
      message: error.message,
      error: "Unknown Error",
    })
  },
)

export default api
