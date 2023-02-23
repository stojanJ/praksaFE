const CommentList = ({ movie }: { movie: any }) => {
  const { comment, ...rest } = movie;
  console.log(comment);

  return (
    <div>
      <div>
        {comment
          ? comment.map((singleComment: any) => (
              <>
                {/* <h5> {singleComment.}</h5> */}
                <p key={singleComment.id}>{singleComment.text}</p>
              </>
            ))
          : ""}
      </div>
    </div>
  );
};
export default CommentList;
