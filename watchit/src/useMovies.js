import { useEffect, useState } from 'react';

const API = '584187b4';

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API}&s=${query}`,
            {
              signal: controller.signal,
            }
          );

          if (!res.ok) throw new Error('Something Went Wrong :(');

          const data = await res.json();

          console.log(data);
          console.log(data.Response === 'False');
          if (data.Response === 'False') {
            throw new Error('No Movies Found!');
          }

          setMovies(data.Search);
          setError('');
        } catch (error) {
          if (error.name !== 'AbortError') setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length > 3) {
        fetchMovies();
      } else {
        setMovies([]);
      }

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, error, isLoading };
}
