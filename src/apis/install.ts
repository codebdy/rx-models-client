import { AxiosRequestConfig } from "axios"

const API_INSTALL : AxiosRequestConfig= {
  url:'/install',
  method:'post',
}

const API_IS_INSTALLED : AxiosRequestConfig = {
  url:'/is-installed',
  method:'get',
}

const API_PUBLISH_PACKAGE: AxiosRequestConfig = {
  url:'/publish-package',
  method:'post',
}

export { 
  API_INSTALL,
  API_IS_INSTALLED,
  API_PUBLISH_PACKAGE
}