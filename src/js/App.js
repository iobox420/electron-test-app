import React, { useEffect, useState } from "react";
import config from "../config";
import Flag from "./components/img";

export default function App() {
  const [rates, setRates] = useState({});
  const [currencyArr, setCurrencyArr] = useState([]);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [currenciesAndCountries, setCurrenciesAndCountries] = useState({});
  const [flag, setFlag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [current, setCurrent] = useState("");
  const [abbr, setAbbr] = useState("");
  const [rateOut, setrateOut] = useState("");
  const [checker, setChecker] = useState(false);

  useEffect(() => {
    main().then(() => {
      setIsLoading(false);
    });
  }, []);

  const main = async () => {
    fetch(
      `http://data.fixer.io/api/latest?access_key=${config.ACCESS_KEY_FIXER_IO}`
    )
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        setRates(r.rates);
      });

    fetch(
      `http://data.fixer.io/api/symbols?access_key=${config.ACCESS_KEY_FIXER_IO}`
    )
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        setCurrencyArr(r.symbols);
        setCurrencyNames(Object.values(r.symbols));
      });

    fetch(`https://restcountries.com/v3.1/all`)
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        setCurrenciesAndCountries(r);
      });
  };

  const onClickOption = (e) => {
    if (checker) {
      setCurrent(e.target.value);
      for (let Abrev in currencyArr) {
        if (currencyArr[Abrev] === e.target.value) {
          setAbbr(Abrev);
          for (let rate in rates) {
            if (rate === Abrev) {
              setrateOut(rates[rate]);

              let temp = currenciesAndCountries;
              for (let i = 0; i < currenciesAndCountries.length; i++) {
                let keys = currenciesAndCountries[i].currencies;
                if (keys !== undefined) {
                  if (keys !== null) {
                    let name = Object.keys(keys);
                    if (Abrev === name[0]) {
                      setFlag(currenciesAndCountries[i].flags.png);
                      return 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    setChecker(true);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Test App from Andrey Frolov</h1>
      <h2>My telegram account @iobox420</h2>
      <h2>My email iobox420@gmail.com</h2>
      <h3>
        В техническом задании, про state management ничего сказано не было,
        поэтому я воспользовался хуком useState
      </h3>
      <div>{current}</div>
      <div>{abbr}</div>
      <div>{rateOut}</div>
      <Flag url={flag} />
      <div>
        <select onClick={onClickOption} name="1" id="1">
          <option disabled>Select country</option>
          {currencyNames.map((current, i) => {
            return <option value={current}>{current}</option>;
          })}
        </select>
      </div>
    </div>
  );
}
