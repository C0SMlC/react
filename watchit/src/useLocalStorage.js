import { useState, useEffect } from 'react';

export function useLocalStorage(intials) {
  const [value, setValue] = useState(function () {
    const res = localStorage.getItem('value');
    return JSON.parse(res);
  });

  useEffect(
    function () {
      localStorage.setItem('value', JSON.stringify(value));
    },
    [value]
  );
  return [value, setValue];
}
