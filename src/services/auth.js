import axios from "axios";

export default class AuthService {
  static async register(data) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/register",
      data
    );

    return response.data;
  }

  static async verifyEmail(data) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/verify",
      data
    );

    return response.data;
  }

  static async login(data) {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/login",
      data
    );

    return response.data;
  }
}
