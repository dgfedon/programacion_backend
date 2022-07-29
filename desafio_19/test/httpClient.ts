import axios, { AxiosRequestConfig } from 'axios';

export class HttpClient {
  static async get(url: string, config?: AxiosRequestConfig) {
    return axios.get(url, config);
  }

  static post(url: string, body?: any, config?: AxiosRequestConfig) {
    return axios.post(url, body, config);
  }

  static put(url: string, body?, config?: AxiosRequestConfig) {
    return axios.put(url, body, config);
  }
  static delete(url: string, config?: AxiosRequestConfig) {
    return axios.delete(url, config);
  }
}
