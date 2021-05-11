import React  from 'react';
import { motion } from 'framer-motion';
import styles from "./BarChart.module.css";
import cx from "classnames";

const options = {
    duration: 0.1,
    ease: "easeOut"
};

export default React.forwardRef(function BarChart({ array, sorted, updateSize }, ref) {
    return (
        <section className={styles.chartContainer}>
            <div className={styles.chart} ref={ref}>
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
})
