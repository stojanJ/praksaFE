import { ILike } from "../Types/ilike";
import { httpService } from "./HttpService";
class LikeDislikeService {
  postLike = async (newLike: ILike) => {
    try {
      const response = await httpService.axiosInstance.post("/like", {
        ...newLike,
        like: 1,
        dislike: 0,
      });

      return response.data;
    } catch {
      console.error("POST like error");
    }
  };

  postDislike = async (newDislike: ILike) => {
    try {
      const response = await httpService.axiosInstance.post("/like", {
        ...newDislike,
        like: 0,
        dislike: 1,
      });

      return response.data;
    } catch {
      console.error("POST like error");
    }
  };
}

export const likeDislikeService = new LikeDislikeService();
