import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Empty Here, Try Adding A City By Clicking On The Map" />
    );

  const uniqueCountries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  console.log(uniqueCountries);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((city) => (
        <CountryItem key={city.id} country={city} />
      ))}
    </ul>
  );
}

export default CityList;
