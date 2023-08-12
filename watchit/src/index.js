import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './App';
import StarRating from './StarRating';

function Test() {
  const [movieRating, setMovieRating] = React.useState(0);

  return (
    <>
      <StarRating maxRating={5} setMovieRating={setMovieRating} />
      <p>
        The movie has {movieRating} rating of {5}
      </p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Test />
    <StarRating
      maxRating={5}
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Wonderful']}
    />
    <StarRating maxRating={10} />
  </React.StrictMode>
);
