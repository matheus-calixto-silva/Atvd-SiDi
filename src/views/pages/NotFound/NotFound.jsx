import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.notFoundContainer}>
        <h1 className={styles.notFoundTitle}>404</h1>
        <p className={styles.notFoundMessage}>A página que você está procurando não foi encontrada.</p>
        <a href="/" className={styles.notFoundLink}>Voltar para a página inicial</a>
      </div>
    </section>
  );
};

export default NotFound;
