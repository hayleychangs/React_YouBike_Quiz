import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <input 
                        type="checkbox" 
                        id="hamburger-toggle" 
                        className={styles.hamburgerToggle}
                        checked={isOpen} 
                        onClick={handleToggleMenu}
                    />
                    {isOpen ? 
                        <label htmlFor="hamburger-toggle">
                            <img className={styles.close} src="/assets/close.png" alt="menuShowHide"/>
                        </label>
                        : 
                        <label htmlFor="hamburger-toggle">
                            <img className={styles.hamburger} src="/assets/hamburger.png" alt="menuShowHide"/>
                        </label>
                    }
                    <div className={styles.logoContainer}>
                        <Link to="/home">
                            <img className={styles.logo} src="/assets/logo.png" alt="logo"/>
                        </Link>
                    </div>
                    <nav className={`${styles.navMenu} ${isOpen === true ? styles.open : ""}`}>
                        <div className={styles.navMenuContainer}>
                            <div className={styles.navItemText}>
                                <Link to="/directions">
                                    使用說明
                                </Link>
                            </div>
                            <div className={styles.navItemText}>
                                <Link to="/fee">
                                    收費方式
                                </Link>
                            </div>
                            <div className={styles.navItemText}>
                                <Link to="/stations">
                                    站點資訊
                                </Link>
                            </div>
                            <div className={styles.navItemText}>
                                <Link to="/news">
                                    最新消息
                                </Link>
                            </div>
                            <div className={styles.navItemText}>
                                <Link to="/activities">
                                    活動專區
                                </Link>
                            </div>
                        </div>
                    </nav>
                    <div className={`${styles.login} ${isOpen === true ? styles.showLogin : ""}`}>登入</div>
                </div>
            </div>
        </header>
    );
}

export default Header;