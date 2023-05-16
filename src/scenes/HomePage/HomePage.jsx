import React, { useState, createContext } from "react";
import Header from "../Header/Header.jsx";
import Hero from "../Hero/Hero.jsx";
import StationInfo from "../StationInfo/StationInfo.jsx";

import styles from "./HomePage.module.css";

export const AppContext = createContext();

function HomePage() {
    const [data, setData] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [stationSearchInput, setStationSearchInput] = useState("");
    const [districtCheckStatus, setDistrictCheckStatus] = useState({});

    //測試資料
    const cityData = [
                        {
                        "city": "台北市"
                        },
                        {
                        "city": "新北市"
                        },
                        {
                        "city": "桃園市"
                        },
                        {
                        "city": "台中市"
                        },
                        {
                        "city": "台南市"
                        },
                        {
                        "city": "高雄市"
                        }
                     ];
    
    const testDistrictData = [
    "第一區", "第二區", "第三區", "第四區",
    "第五區", "第六區", "第七區", "第八區",
    "第九區", "第十區", "第十一區", "第十二區",
    "第十三區", "第十四區", "第十五區", "第十六區"
    ];

    return (
        <AppContext.Provider value={{ data, setData, searchInput, setSearchInput, cityData, testDistrictData, stationSearchInput, setStationSearchInput, districtCheckStatus, setDistrictCheckStatus }}>
            <div className={styles.home}>
                <Header className={styles.header} />
                <div  className={styles.container}>
                    <Hero className={styles.hero} />
                    <StationInfo className={styles.stationInfo}/>
                </div>
            </div>
        </AppContext.Provider>
    );
}
export default HomePage;