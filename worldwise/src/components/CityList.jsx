import PropTypes from 'prop-types'; // Import PropTypes
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import styles from './CityList.module.css';

function CityList({ cities, loading }) {
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Empty Here, Try Adding A City By Clicking On The Map" />
    );

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
