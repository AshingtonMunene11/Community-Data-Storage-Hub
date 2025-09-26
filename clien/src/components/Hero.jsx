import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <h1>
          Empowering<br />
          Communities<br />
          with Secure<br />
          Cloud Storage
        </h1>
        <p>
          Providing affordable, secure, and scalable cloud storage solutions to NGOs and
          communities worldwide. Join our mission to democratize digital infrastructure.
        </p>

        <div className={styles.heroButtons}>
          <a href="/about" className={`${styles.btn} ${styles.btnPrimary}`}>Learn More</a>
          <a href="/contact" className={`${styles.btn} ${styles.btnSecondary}`}>Get Started</a>
        </div>

        <div className={styles.heroStats}>
          <div>
            <strong>500+</strong><br />Communities
          </div>
          <div>
            <strong>99.9%</strong><br />Uptime
          </div>
        </div>
      </div>
    </section>
  );
}
