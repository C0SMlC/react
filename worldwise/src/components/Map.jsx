import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

function Map() {
  const [searchParams] = useSearchParams();
  const navigator = useNavigate();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer} onClick={() => navigator('form')}>
      <h1>
        {lng} And {lat}
      </h1>{' '}
    </div>
  );
}

export default Map;
