import React from 'react';
import { motion } from 'framer-motion';
import styles from "./BarChart.module.css";
import cx from "classnames";

const options = {
    duration: 0.1,
    ease: "easeOut"
};

export default function BarChart({ array, sorted }) {
    return (
        <section className={styles.chartContainer}>
            <div className={styles.chart}>
                <ul className={styles.bars}>
                    {array.map(el => {
                        return (
                            <motion.li key={el} layout transition={options}>
                                <div className={cx(styles.bar, sorted ? styles.sorted : null)} style={{height: `${el}px`}}></div>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
