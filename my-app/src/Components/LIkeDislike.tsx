import { Button } from "react-bootstrap";
import useAuth from "../Hooks/useAuth";
import { likeDislikeService } from "../Services/LikeDIslikeService";
import { ILike } from "../Types/ilike";

const LikeDislike = ({ movie }: { movie: any }) => {
  const { user } = useAuth();
  const { like, ...rest } = movie;
  const user_id = user.id;
  const movie_id = movie.id;

  const usersId: Array<number> = like?.map(
    (obj: { user_id: number }) => obj.user_id
  );

  const sumLikes = like?.reduce(
    (accumulator: number, object: { like: number }) => {
      return accumulator + object.like;
    },
    0
  );
  const sumDislike = like?.reduce(
    (accumulator: number, object: { dislike: number }) => {
      return accumulator + object.dislike;
    },
    0
  );

  const handleLike = ({ movie_id, user_id }: ILike) => {
    likeDislikeService.postLike({ movie_id, user_id });
    window.location.reload();
  };

  const handleDislike = ({ movie_id, user_id }: ILike) => {
    likeDislikeService.postDislike({ movie_id, user_id });
    window.location.reload();
  };

  return (
    <div className="card" style={{ width: "80%" }}>
      <>
        <h5 key={movie.id}>Likes:{sumLikes}</h5>
        <Button
          type="submit"
          onClick={() => handleLike({ movie_id, user_id })}
          disabled={usersId?.includes(user_id)}
        >
          Like
        </Button>
      </>
      <>
        <h5 key={movie.id}>Dislikes:{sumDislike}</h5>

        <Button
          type="submit"
          onClick={() => handleDislike({ movie_id, user_id })}
          disabled={usersId?.includes(user_id)}
        >
          Dislike
        </Button>
      </>
    </div>
  );
};
export default LikeDislike;
