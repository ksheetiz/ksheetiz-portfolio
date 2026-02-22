import Layout from '@theme/Layout';
import styles from './reads.module.css';
import reads from '../data/reads.json';

export default function Reads() {
  return (
    <Layout title="Reads" description="Links I find helpful, insightful or worth reading.">
      <main className={styles.wrapper}>
        <div className={styles.header}>
          <p className={styles.title}>reads</p>
          <p className={styles.subtitle}>
            Links I find helpful, insightful, or just interesting.
          </p>
        </div>

        {reads.map((group) => (
          <div key={group.category} className={styles.group}>
            <p className={styles.category}>{group.category}</p>
            {group.items.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
              >
                <div className={styles.itemLeft}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <span className={styles.itemSource}>{item.source}</span>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.tags}>
                    {item.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <span className={styles.arrow}>↗</span>
                </div>
              </a>
            ))}
          </div>
        ))}
      </main>
    </Layout>
  );
}