import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './App';
import StarRating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StarRating
      maxRating={5}
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Wonderful']}
    />
    <StarRating maxRating={10} />
  </React.StrictMode>
);
