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
    var like = 1;
    var dislike = 0;
    likeDislikeService.postLike({ movie_id, user_id, like, dislike });
    window.location.reload();
  };

  const handleDislike = ({ movie_id, user_id }: ILike) => {
    var like = 0;
    var dislike = 1;
    likeDislikeService.postLike({ movie_id, user_id, like, dislike });
    window.location.reload();
  };

  return (
    <div className="card" style={{ width: "80%" }}>
      <>
        <h5 key={movie.id}>Likes:{sumLikes}</h5>
        {usersId?.includes(user_id) ? (
          <Button
            type="submit"
            onClick={() => handleLike({ movie_id, user_id })}
            disabled={true}
          >
            Like
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={() => handleLike({ movie_id, user_id })}
            disabled={false}
          >
            Like
          </Button>
        )}
      </>
      <>
        <h5 key={movie.id}>Dislikes:{sumDislike}</h5>
        {usersId?.includes(user_id) ? (
          <Button
            type="submit"
            onClick={() => handleDislike({ movie_id, user_id })}
            disabled={true}
          >
            Dislike
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={() => handleDislike({ movie_id, user_id })}
            disabled={false}
          >
            Dislike
          </Button>
        )}
      </>
    </div>
  );
};
export default LikeDislike;
