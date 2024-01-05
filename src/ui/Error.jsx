import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="/error.svg"
          alt={error.data}
          className="max-w-sm"
        />
        <div>
          <h1 className="text-5xl font-bold">Something Went Wrong!</h1>
          <p className="py-6">{error.data}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
