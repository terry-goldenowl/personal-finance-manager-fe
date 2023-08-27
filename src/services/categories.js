import instance from "../utils/axiosConfig";

export default class CategoriesService {
  static async getCategories(params) {
    const responseData = await instance.get("/categories", { params });

    return responseData.data;
  }
}
