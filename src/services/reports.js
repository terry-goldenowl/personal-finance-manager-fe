import instance from "../utils/axiosConfig";

export default class ReportsService {
  static async getReports(params) {
    const response = await instance.get("/reports",
      {
        params,
      }
    );

    return response.data;
  }
}
