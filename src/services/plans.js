import instance from "../utils/axiosConfig";

export default class PlansService {
  static async createMonthPlan(data) {
    const response = await instance.post("/plans/month", data);

    return response.data;
  }

  static async createCategoryPlan(data) {
    const response = await instance.post("/plans/category", data);

    return response.data;
  }

  static async getPlans(params) {
    const response = await instance.get("/plans", {
      params,
    });

    return response.data;
  }

  static async deleteMonthPlan(id) {
    const response = await instance.delete("/plans/month/" + id);

    return response.data;
  }

  static async deleteCategoryPlan(id) {
    const response = await instance.delete("/plans/category/" + id);

    return response.data;
  }

  static async updateMonthPlan(data, id) {
    const response = await instance.patch("/plans/month/" + id, data);

    return response.data;
  }

  static async updateCategoryPlan(data, id) {
    const response = await instance.patch("/plans/category/" + id, data);

    return response.data;
  }
}
