import { httpService } from "./HttpService";
import { IComment } from "../Types/icomment";
class CommentService {
  fetchAllComments = async () => {
    try {
      const response = await httpService.axiosInstance.get("/comment");
      const comment = response.data.movie.data.map((comment: IComment) => ({
        text: comment.text,
        movie_id: comment.movie_id,
        user_id: comment.user_id,
      }));
      return comment;
    } catch {}
  };
  postComment = async (newComment: IComment) => {
    try {
      const response = await httpService.axiosInstance.post(
        "/comment",
        newComment
      );

      return response.data;
    } catch {
      console.error("POST comment error");
    }
  };
}

export const commentService = new CommentService();
