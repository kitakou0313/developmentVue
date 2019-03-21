import axios from "axios";

const instance = axios.create({
    baseURL:"http://placeholder.makinami.im",
})

export default instance;