import logo from '../../assets/image.png'; // with import

import styles from './Home.module.css';

const Home = () => {
  return (
    <section className={styles.container}>
      <img src={logo} alt="sidi logo" />
    </section>
  )
}

export default Home