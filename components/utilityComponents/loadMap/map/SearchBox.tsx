import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import styles from "./Map.module.css";

function SearchBox({ setPos }: any) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setPos({ lat, lng });
  };

  return (
    <div>
      <div>
        <form className={styles.formContainer}>
          <input
            className={styles.input}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            placeholder="Search a park"
          />
          {/* <button type="submit">search</button> */}
        </form>
      </div>
      <div>
        <ul className={styles.ul}>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <li
                className={styles.li}
                key={place_id}
                onClick={() => handleSelect(description)}
              >
                <p>{description}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBox;
