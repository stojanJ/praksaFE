const ViewCounter = ({ movie }: { movie: any }) => {
  const { view, ...rest } = movie;

  const sumView = view?.reduce(
    (accumulator: number, object: { view: number }) => {
      return accumulator + object.view;
    },
    0
  );
  return (
    <div className="card" style={{ width: "80%" }}>
      <h5 key={movie.id}>View:{sumView}</h5>
    </div>
  );
};
export default ViewCounter;
