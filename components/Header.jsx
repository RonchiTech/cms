import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.btnContainer}>
        <Link href="/">
          <a className={styles.link}>
            <button className={styles.btn}>Ronchi.io</button>
          </a>
        </Link>
      </div>
      <Link href="/">
        <a className={styles.link}>Home</a>
      </Link>
      <Link href="/about">
        <a className={styles.link}>About</a>
      </Link>
    </header>
  );
};

export default Header;
