import { ILike } from "../Types/ilike";
import { httpService } from "./HttpService";
class LikeDislikeService {
  postLike = async (newLike: ILike) => {
    try {
      const response = await httpService.axiosInstance.post("/like", newLike);

      return response.data;
    } catch {
      console.error("POST like error");
    }
  };
}

export const likeDislikeService = new LikeDislikeService();
