import React from "react";
import Search from "../../components/search/Search.jsx";

import styles from "./Hero.module.css";

function Hero() {
    return (
        <section>
            <div className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    <div>
                        <div className={styles.title}>
                            站點資訊
                        </div>
                    </div>
                    <div className={styles.searchAndImg}>
                        <Search />
                        <div className={styles.imgContainer}>
                            <img className={styles.img} src="/assets/Frame.png" alt="Frame"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;