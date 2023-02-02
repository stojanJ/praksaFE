import { IView } from "../Types/iview";
import { httpService } from "./HttpService";
class ViewService {
  postView = async (newView: IView) => {
    try {
      const response = await httpService.axiosInstance.post("/view", {
        movie_id: newView,
        view: 1,
      });
      return response.data;
    } catch {
      console.error("POST views error");
    }
  };
}

export const viewService = new ViewService();
