import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useEffect, useState} from "react";

export default function Home() {

  const [country, setCountry] = useState({});
  const [activeRegion, setActiveRegion] = useState();
  const [activeCountry, setActiveCountry] = useState([]);

  useEffect(() => {
    fetch("https://api.countries.code-test.utopiamusic.com/all")
      .then(response => {
        return response.json()
      }).then(data => {
        let result = {}
        data.forEach(item => {
          if (result[item.region]) {
            result[item.region].push(item);
          } else {
            result[item.region] = [item];
          }
        })
        setCountry(result);
    })
  },[])

  const handleOnClickRegion = (e) => {
    const name = e.target.getAttribute("name");
    if (activeRegion === name) {
      setActiveRegion(undefined)
      setActiveCountry([])
    } else {
      setActiveRegion(name)
      setActiveCountry([])
    }
  }

  const handleOnClickCountry = (e) => {
    const name = e.target.getAttribute("name");
    let idx = activeCountry.indexOf(name)
    if (idx > -1) {
      const newActiveCountry = [...activeCountry.slice(0, idx), ...activeCountry.slice(idx+1)]
      setActiveCountry(newActiveCountry)
    } else {
      setActiveCountry([...activeCountry, name])
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.text}>Select region and click on the countries you want to highlight</div>
      <div className={styles.region}>
        {Object.keys(country).map((region)=>{
          return (
            <div
              key={region}
              className={`${styles.regionButton} ${activeRegion === region ? styles.active : ''}`}
              name={region}
              onClick={handleOnClickRegion}
            >
              {region}
            </div>
          )
        })}
      </div>
      <div className={styles.country}>
        {activeRegion && country[activeRegion].map((item)=>{
          return (
            <div
              key={item.name}
              name={item.name}
              className={`${styles.countryText} ${activeCountry.includes(item.name) ? styles.active : ''}`}
              onClick={handleOnClickCountry}
            >
              {item.name}
            </div>
          )
        })}
      </div>
    </div>
  );
}
