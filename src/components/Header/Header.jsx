import React from 'react';
import styles from "./Header.module.css";

export default React.memo(function Header(props) {
    return (
        <header className={styles.container}>
            <h1>Sorting Visualizer</h1>
        </header>
    )
})
