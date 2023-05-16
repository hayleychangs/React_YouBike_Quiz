import React, { useState, useEffect, useContext,  useRef } from "react";
import { AppContext } from "../../scenes/HomePage/HomePage.jsx";

import styles from "./Search.module.css";

function Search() {
    const apiUrl = "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";

    const { data, 
            setData, 
            searchInput, 
            setSearchInput, 
            cityData,
            testDistrictData,
            stationSearchInput, 
            setStationSearchInput,
            districtCheckStatus, 
            setDistrictCheckStatus
          } = useContext(AppContext);

    const cityNames = cityData.map(item => item.city);
    const [cityDataList, setCityDataList] = useState(cityData);
    
    const [district, setDistrict] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [selectAll, setSelectAll] = useState(true);

    const [isCityListVisible, setIsCityListVisible] = useState(false);
    
    // 取得api資料
    const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          const apiData = await response.json();
          setData(apiData);
        } catch (error) {
          console.log("取得資料發生錯誤:", error);
        }
    };

    useEffect(() => {
      fetchData();
    }, []);
    
    // 使用api資料
    useEffect(() => {
      function getDistrict() {
        let sareaArray;
        const sareaSet = new Set();
    
        if (data) {
          data.forEach((item) => {
            const sarea = item.sarea;
            sareaSet.add(sarea);
          });
    
          sareaArray = Array.from(sareaSet);
        }
    
        return sareaArray;
      };
    
      const districtData = getDistrict();
      setDistrict(districtData);
      
    }, [data]);

    //顯示清單結果
    function handleFilter (event) {
        let searchWord = event.target.value;
        setSearchInput(searchWord);
        let filterResult;

        filterResult = cityData.filter( (item) =>{
            return item.city?.includes(searchWord) ?? false;
        });


        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(filterResult);
        }

    };

    //站點搜尋
    function handleStationSearch (event) {
      let searchWord = event.target.value;
      setStationSearchInput(searchWord);
    };


    //即時顯示行政區
    function renderCityContent(city) {
      let content;
      switch (city) {
        case "台北市":
          content = <div className={styles.checkBoxContainer}>
                      <div className={styles.selectAllContainer}>
                            <div className={styles.AllCheckText}>全部勾選</div> 
                            <label htmlFor="allCheck"></label>
                              <input
                                id="allCheck"
                                type="checkbox"
                                value="全部勾選"
                                checked={selectAll}
                                onChange={handleSelectAll}
                              />
                      </div>
                      <div className={styles.districtSelectContainer}>
                        {district?.map((sarea) => (
                          <div className={styles.singleSelectContainer}>
                            <div className={styles.SingleCheckText}>{sarea}</div>
                            <label key={sarea}></label>
                              <input
                                type="checkbox"
                                value={sarea}
                                checked={districtCheckStatus[sarea]}
                                onChange={handleCheckboxChange}
                              />
                          </div>
                        ))}
                      </div>
                    </div>;
          break;
        case "新北市":
        case "桃園市":
        case "台中市":
        case "台南市":
        case "高雄市":              
          content = <div className={styles.checkBoxContainer}>
                      <div className={styles.selectAllContainer}>
                            <div className={styles.AllCheckText}>全部勾選</div> 
                            <label htmlFor="allCheck"></label>
                            <input
                              id="allCheck"
                              type="checkbox"
                              value="全部勾選"
                              checked={selectAll}
                              onChange={handleSelectAll}
                            />
                      </div>
                      <div className={styles.districtSelectContainer}>
                        {testDistrictData.map((item) => (
                          <div className={styles.singleSelectContainer}>
                            <div className={styles.SingleCheckText}>{item}</div>
                            <label key={item}></label>  
                            <input
                              type="checkbox"
                              value={item}
                              checked={districtCheckStatus[item]}
                              onChange={handleCheckboxChange}
                            />
                          </div>
                        ))}
                      </div>
                </div>;
          break;
        default:
          content = null;
      }
      return content;
    };

    // 初始化勾選狀態  
    useEffect(() => {
      const initialDistrictCheckStatus = {};

      if (searchInput=="") {
        setFilteredData([]);
      };
    
      if (searchInput === "台北市") {
        district.forEach((sarea) => {
          initialDistrictCheckStatus[sarea] = true;
        });
        setFilteredData([]);
      } else if (cityNames.includes(searchInput)) {
        testDistrictData.forEach((item) => {
          initialDistrictCheckStatus[item] = true;
        });
        setFilteredData([]);
      };

      setDistrictCheckStatus(initialDistrictCheckStatus);

    }, [searchInput]);

    useEffect(() => {
      setSelectAll(Object.values(districtCheckStatus).every((value) => value));
    }, [districtCheckStatus]);

    //勾選狀態判斷
    const handleSelectAll = () => {
      setSelectAll((prevSelectAll) => {
        const newSelectAll = !prevSelectAll;
    
        setDistrictCheckStatus((prevDistrictCheckStatus) => {
          const newDistrictCheckStatus = { ...prevDistrictCheckStatus };
    
          Object.keys(newDistrictCheckStatus).forEach((key) => {
            newDistrictCheckStatus[key] = newSelectAll;
          });
    
          return newDistrictCheckStatus;
        });
    
        return newSelectAll;
      });
    };

    const handleCheckboxChange = (event) => {
      const { value, checked } = event.target;
      setDistrictCheckStatus((prevState) => ({
        ...prevState,
        [value]: checked,
      }));
    };

    useEffect(() => {
      const hasUncheckedDistrict = Object.values(districtCheckStatus).some((value) => value === false);
      if (hasUncheckedDistrict) {
        setSelectAll(false);
      } else {
        setSelectAll(true);
      }
    }, [districtCheckStatus]);

    //點選縣市清單元素進行搜尋
    function handleCitySelection(city) {
      setSearchInput(city);
      setIsCityListVisible(false);
    };

    //--------------------------------------------------
    function handleOnFocus (event) {
      event.target.placeholder="";
      setSearchInput("");
    };

    function handleStationSearchOnFocus (event) {
      event.target.placeholder="";
      setStationSearchInput("");
    };

    function handleOnBlur (event) {
      event.target.placeholder="選擇縣市";
    };

    function handleStationSearchOnBlur (event) {
      event.target.placeholder="搜尋站點";
    };

    function handleToggleCityList() {
      setIsCityListVisible(!isCityListVisible);
      setCityDataList(cityData);
    }; 

    function handleKeyDown(event) {
        if (event.keyCode === 8) {
          setSearchInput("");
        };
    };
    function handleStationSearchKeyDown(event) {
      if (event.keyCode === 8) {
        setStationSearchInput("");
      };
    };

    let clickRef = useRef();

    useEffect(() => {
        const handler = (e) => {
            if(! clickRef.current.contains(e.target)){
                setIsCityListVisible(false);
                setCityDataList([]);
            };
        };

        document.addEventListener("mousedown", handler);

        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    });

    return (
        <div className={styles.search}>
          <div className={styles.container} ref={clickRef}>
            <div className={styles.cityMenu}>
              <input
                  type="text"
                  value={searchInput || ""}
                  placeholder="選擇縣市"
                  onFocus={handleOnFocus}
                  onBlur={handleOnBlur}
                  onChange={handleFilter}
                  onKeyDown={handleKeyDown}
                  className={styles.citySearchInput}
              />
              <input
                  type="text"
                  value={stationSearchInput || ""}
                  placeholder="搜尋站點"
                  onFocus={handleStationSearchOnFocus}
                  onBlur={handleStationSearchOnBlur}
                  onChange={handleStationSearch}
                  onKeyDown={handleStationSearchKeyDown}
                  className={styles.stationSearchInput}
              />
              <div className={styles.dropDownBtn} 
                   onClick={handleToggleCityList}
              >
                  <img className={styles.dropImg} src="/assets/icon.png" alt="dropDownIcon"/>
              </div>
              <div className={styles.searchBtn}>
                  <img className={styles.searchImg} src="/assets/search.png" alt="dropDownIcon"/>
              </div>
              {isCityListVisible && (
                <div className={styles.cityList}>
                  {cityDataList.map((cityItem, index) => (
                    <li className={styles.cityItems} 
                        key={index} 
                        onClick={() => handleCitySelection(cityItem.city)}
                    >
                      {cityItem.city}
                    </li>
                  ))}
                </div>
              )}
              {filteredData.length !== 0 && (
                <div className={styles.resultsItem}>
                  {filteredData.slice(0, 5).map((value, i) => {
                      return (
                          <li className={styles.cityItems}
                              key={i}
                              onClick={() => handleCitySelection(value.city)}
                          >
                              {value.city}
                          </li>
                      )
                  })}
                </div>
              )}
              {renderCityContent(searchInput)}
            </div>
          </div>
        </div>
    );
}

export default Search;