import React, { useState, useContext } from "react";
import { AppContext } from "../HomePage/HomePage.jsx";

import styles from "./StationInfo.module.css";

function StationInfo() {
    const { data, 
            searchInput, 
            cityData,
            testDistrictData,
            stationSearchInput,
            districtCheckStatus, 
          } = useContext(AppContext);

    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const cityNames = cityData.map(item => item.city);

    const handleSort = (key) => {
        if (key === sortKey) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
          setSortKey(key);
          setSortOrder("asc");
        }
    };
    
    const sortedData = data ? [...data]
                        .filter(item => {
                            return districtCheckStatus[item.sarea] === true;
                        })
                        .filter(item => {
                            return item.sarea.includes(stationSearchInput);
                        })
                        .sort((a, b) => {
                            if (sortKey) {
                                const valueA = a[sortKey];
                                const valueB = b[sortKey];
                        
                                if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
                                if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
                            }
                    
                            return 0;
                        })
                        : [];

    let content;
    if (searchInput === "台北市") {
      content = <div className={styles.stationListContainer}>
                    <div className={styles.stationList}>
                        {sortedData.map((item, index) => (
                            <div key={item.sno} className={`${styles.singleStationInfo} ${index % 2 === 0 ? styles.evenRow : styles.oddRow}`}>
                                <div className={styles.infoItem}>
                                    {searchInput}
                                </div>
                                <div className={styles.infoItem}>
                                    {item.sarea}
                                </div>
                                <div className={styles.infoItemStationName}>
                                    <div className={styles.left}>
                                        {item.sna}
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    {item.sbi}
                                </div>
                                <div className={styles.infoItem}>
                                    {item.bemp}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>;
    } else if (cityNames.includes(searchInput)) {
        content = <div className={styles.stationListContainer}>
                    <div className={styles.stationList}>
                        {testDistrictData.map((item, index) => (
                            <div key={item.sno} className={`${styles.singleStationInfo} ${index % 2 === 0 ? styles.evenRow : styles.oddRow}`}>
                                <div className={styles.infoItem}>
                                    {searchInput}
                                </div>
                                <div className={styles.infoItem}>
                                    {item}
                                </div>
                                <div className={styles.infoItem}>
                                    測試_站點名稱
                                </div>
                                <div className={styles.infoItem}>
                                    10
                                </div>
                                <div className={styles.infoItem}>
                                    8
                                </div>
                            </div>
                        ))}
                    </div>
                </div>;
    } else {
      content = <div className={styles.stationList}>
                    <div className={styles.defaultMsg}>
                        <div className={styles.defaultMsgLeft}>
                            請使用上方下拉選單選擇縣市，
                            系統將為您列出當地所有站點..
                        </div>
                    </div>
                </div>;
    };
    
    return (
        <div className={styles.stationInfoBox}>
            <div className={styles.stationInfo}>
                <div className={styles.container}>
                    <div className={styles.subtitle}>
                        <div onClick={() => handleSort({searchInput})}>縣市</div>
                        <div onClick={() => handleSort("sarea")}>區域</div>
                        <div onClick={() => handleSort("sna")}>站點名稱</div>
                        <div onClick={() => handleSort("sbi")}>可借車輛</div>
                        <div onClick={() => handleSort("bemp")}>可還空位</div>
                    </div>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default StationInfo;