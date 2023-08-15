import axios from "axios";

export default class AuthService {
  static async register(data) {
    await axios
      .post(process.env.REACT_APP_API_URL + "/register", data)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
