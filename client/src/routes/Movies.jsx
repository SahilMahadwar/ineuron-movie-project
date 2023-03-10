import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Poster from "../components/Cards/Poster";
import useAuth from "../hooks/useAuth";
import { axiosApiInstance } from "../lib/axiosApiInstance";

const getMovies = async (params) => {
  const { data, status } = await axiosApiInstance.get(`/movies`);

  return data.data;
};

export async function loader({ params }) {
  return getMovies(params.tmdbId);
}

export function Movies() {
  const movies = useLoaderData();

  return (
    <div>
      <div>
        {movies?.length === 0 ? (
          <div>no movies found</div>
        ) : (
          <div className="grid grid-cols-6 gap-x-7 gap-y-10">
            {movies?.map((movie) => (
              <Link to={`/movies/${movie._id}`} key={movie.tmdbId}>
                <Poster posterPath={movie.poster} title={movie.name} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Movies;
