import { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './papershelf.module.css';
import papers from '../data/papershelf.json';

const ALL = 'All';

export default function Papershelf() {
  const categories = [ALL, ...papers.map((g) => g.category)];
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL
    ? papers
    : papers.filter((g) => g.category === active);

  return (
    <Layout title="Papershelf" description="Papers I have read with my notes.">
      <div className={styles.layout}>

        {/* Left panel */}
        <aside className={styles.sidebar}>
          <p className={styles.sidebarTitle}>topics</p>
          <ul className={styles.sidebarList}>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className={`${styles.sidebarItem} ${active === cat ? styles.sidebarItemActive : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          <div className={styles.header}>
            <p className={styles.title}>papershelf</p>
            <p className={styles.subtitle}>
              Papers I've read — with a short note on what clicked or what I took away.
            </p>
          </div>

          {filtered.map((group) => (
            <div key={group.category} className={styles.group}>
              <p className={styles.category}>{group.category}</p>
              {group.items.map((item) => (
                <div key={item.url} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <div className={styles.itemLeft}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.itemTitle}
                      >
                        {item.title} <span className={styles.arrow}>↗</span>
                      </a>
                      <span className={styles.itemSource}>{item.source}</span>
                    </div>
                    <div className={styles.tags}>
                      {item.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  {item.note && (
                    <p className={styles.note}>{item.note}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </main>

      </div>
    </Layout>
  );
}