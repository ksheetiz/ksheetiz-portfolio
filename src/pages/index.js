import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const stats = [
  { label: 'Questions leetcode', value: '268' },
  { label: 'codeforces rating', value: '900' },
  { label: 'read papers', value: '2' },
  { label: 'projects', value: '—' },
];

const currently = [
  { type: 'building', text: 'Geospatial weather forecast data pipelines using Zarr format', link: 'https://zarr.readthedocs.io' },
  { type: 'reading', text: 'The Lost Symbol — Dan Brown', link: 'https://www.amazon.com/Lost-Symbol-Robert-Langdon/dp/0385533470' },
  { type: 'playing', text: 'Metal Gear Solid Delta: Snake Eater — PS5', link: 'https://www.konami.com/games/mgs3/' },
  { type: 'listening', text: 'Timeless — The Weeknd', link: 'https://open.spotify.com/track/4vUmTMuQqjdnvlZmAH61Qk' },
];

const recentPosts = [
  { title: 'How I went from 400MB weather files to a few KBs', slug: '/blog/zarr-weather-data', date: 'Feb 2025' },
];

const recentDSA = [
  //{ title: 'Two Sum', slug: '/dsa/arrays/two-sum', platform: 'LeetCode #1 · Easy' },
];

const recentPapers = [
  { title: 'Bloom Paradon - When not to use a Bloom Filter', slug: '/papershelf', date: 'Early 2025' },
];

export default function Home() {
  return (
    <Layout title="Ksheetiz Agrahari" description="Software Engineer · Full Stack Developer">
      <main className={styles.hero}>

        <p className={styles.name}>Ksheetiz Agrahari</p>
        <p className={styles.tagline}>
          Software Engineer · Full Stack Developer. I build things for the web,
          read papers, and document what I learn along the way.
        </p>

        <div className={styles.links}>
          <Link className={styles.link} to="/blog">blog</Link>
          <Link className={styles.link} to="/dsa">dsa</Link>
          <Link className={styles.link} to="/papershelf">papershelf</Link>
          <Link className={styles.link} to="/projects">projects</Link>
          <Link className={styles.link} to="/about">about</Link>
          <Link className={styles.link} href="https://github.com/ksheetiz">github</Link>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Currently */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>currently</p>
          {currently.map((item) => (
            <a
              key={item.type}
              className={styles.currentItem}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.currentType}>{item.type}</span>
              <span className={styles.currentText}>{item.text}</span>
              <span className={styles.currentArrow}>↗</span>
            </a>
          ))}
        </div>

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <div className={styles.section}>
            <p className={styles.sectionTitle}>recent posts</p>
            {recentPosts.map((post) => (
              <Link key={post.slug} className={styles.card} to={post.slug}>
                <p className={styles.cardTitle}>{post.title}</p>
                <p className={styles.cardMeta}>{post.date}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Recent DSA */}
        {recentDSA.length > 0 && (
          <div className={styles.section}>
            <p className={styles.sectionTitle}>recent dsa</p>
            {recentDSA.map((item) => (
              <Link key={item.slug} className={styles.card} to={item.slug}>
                <p className={styles.cardTitle}>{item.title}</p>
                <p className={styles.cardMeta}>{item.platform}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Recent Papers */}
        {recentPapers.length > 0 && (
          <div className={styles.section}>
            <p className={styles.sectionTitle}>recent papers</p>
            {recentPapers.map((paper) => (
              <Link key={paper.slug} className={styles.card} to={paper.slug}>
                <p className={styles.cardTitle}>{paper.title}</p>
                <p className={styles.cardMeta}>{paper.date}</p>
              </Link>
            ))}
          </div>
        )}

      </main>
    </Layout>
  );
}