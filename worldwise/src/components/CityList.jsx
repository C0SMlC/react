import PropTypes from 'prop-types'; // Import PropTypes
import Spinner from './Spinner';
import CityItem from './CityItem';
import styles from './CityList.module.css';

function CityList({ cities, loading }) {
  if (loading) return <Spinner />;
  console.log(cities);
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CityList;
