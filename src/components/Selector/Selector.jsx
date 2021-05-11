import React, { useState, useEffect, useRef } from 'react';
import styles from "./Selector.module.css";
import cx from 'classnames';

export default React.memo(function Selector({ algorithm, handleSelect, play, randomize, stop, isPlaying }) {
    const [isOpen, setOpen] = useState(false);
    
    const selectedRef = useRef();

    function handleClick(e) {
        setOpen(isOpen ? false : true);
    }
    
    useEffect(() => {
        function handleOutsideClick(e) {
            if(selectedRef.current.contains(e.target) == false) {
                if(isOpen) {
                    setOpen(false);
                }
            }
        }

        window.addEventListener('click', handleOutsideClick);
        
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        }
    }, [isOpen]);

    return (
        <div className={styles.customSelectWrapper}>
            <div onClick={handleClick} ref={selectedRef} className={cx(styles.customSelect, isOpen ? styles.open : null)}>
                <div className={styles.customSelect__trigger}>
                    <span>{algorithm}</span>
                    <div className={styles.arrow}></div>
                </div>
                <div className={styles.customOptions}>
                    <span onClick={handleSelect} className={cx(styles.customOption,algorithm === "Bubble Sort" ? styles.selected : null)} data-value="bubble-sort">Bubble Sort</span>
                    <span onClick={handleSelect} className={cx(styles.customOption, algorithm === "Insertion Sort" ? styles.selected : null)} data-value="insertion-sort">Insertion Sort</span>
                    <span onClick={handleSelect} className={cx(styles.customOption, algorithm === "Selection Sort" ? styles.selected : null)} data-value="selection-sort">Selection Sort</span>
                </div>
            </div>
            <div className={styles.btnWrapper}>
                <button disabled={isPlaying} onClick={play} className={cx(styles.btn, styles.play)} type="button">Play</button>
                <button disabled={isPlaying} onClick={randomize} className={cx(styles.btn, styles.reset)} type="reset">Randomize</button>
                <button disabled={!isPlaying} onClick={stop} className={cx(styles.btn, styles.stop)} type="reset">Stop</button>
            </div>
        </div>
    );
});
