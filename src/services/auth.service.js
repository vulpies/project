import axios from "axios"
import localStorageService from "./localStorage.service"

const url = "https://dip-project.herokuapp.com/api/auth/"

const authService = {
    registration: async (payload) => {
        try {
            const { data } = await axios.post(url + "registration/", payload)
            return data
        } catch (error) {
            return error
        }
    },
    login: async (payload) => {
        try {
            const { data } = await axios.post(url + "login/", payload)
            return data
        } catch (error) {
            return error
        }
    },
    refresh: async () => {
        const { data } = await axios.post(url + "token/", {
            grant_type: "refresh_token",
            refresh_token: localStorageService.getRefreshToken(),
        })
        return data
    },
}
export default authService
