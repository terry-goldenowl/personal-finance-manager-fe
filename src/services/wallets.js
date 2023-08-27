import instance from "../utils/axiosConfig";

export default class WalletsService {
  static async getWallets() {
    const responseData = await instance.get("/wallets");

    return responseData.data;
  }
}
