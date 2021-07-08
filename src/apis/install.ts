import { AxiosRequestConfig } from "axios"

const API_INSTALL : AxiosRequestConfig= {
  url:'/install',
  method:'post',
}

const API_IS_INSTALLED : AxiosRequestConfig = {
  url:'/is-installed',
  method:'get',
}

export { 
  API_INSTALL,
  API_IS_INSTALLED
}