import Layout from '@theme/Layout';
import styles from './about.module.css';

export default function About() {
  return (
    <Layout title="About" description="About Ksheetiz Agrahari">
      <main className={styles.wrapper}>

        <div className={styles.header}>
          <p className={styles.title}>about</p>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>who</p>
          <p className={styles.text}>
            Hey, I'm Ksheetiz. I'm a software engineer who graduated in 2023 and somehow
            ended up working with geospatial data — which sounds niche until you realize
            how much of the world runs on knowing where things are.
          </p>
          <p className={styles.text}>
            I work at a startup at IIT Delhi where we're building tools that let people
            — farmers, NGO workers, folks in villages — actually use geospatial data
            without needing a geography degree. It's one of those problems where the
            technical challenge and the human impact are both real, and that combination
            keeps me genuinely invested.
          </p>
          <p className={styles.text}>
            If you're curious about where I work or what we're building,{' '}
            <a href="https://linkedin.com/in/ksheetiz" target="_blank" rel="noopener">
              my LinkedIn
            </a>{' '}
            has the details.
          </p>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>stack</p>
          <p className={styles.text}>
            Day to day it's Python, React, OpenLayers, Leaflet, and AWS. I've been
            deep in Zarr lately — a format for storing chunked, compressed N-dimensional
            arrays that is genuinely one of the more elegant pieces of tech I've worked with.
          </p>
          <div className={styles.stack}>
            {['Python', 'React', 'OpenLayers', 'Leaflet', 'AWS', 'Zarr'].map((tech) => (
              <span key={tech} className={styles.stackItem}>{tech}</span>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>how I think</p>
          <p className={styles.text}>
            I'm the kind of person who gets genuinely excited about technology debates.
            ML vs traditional systems, Rust vs C, blockchain's actual use cases — I'll
            happily talk about any of it for hours. I look up to people like Jensen Huang
            and Linus Torvalds not because they're famous but because they built things
            that changed how the world works, and they did it with taste.
          </p>
          <p className={styles.text}>
            I try to learn something new every day. Not in a hustle-culture way —
            more like I just get genuinely restless if I'm not figuring something out.
            This site is part of that. Writing things down forces me to actually understand them.
          </p>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>outside the terminal</p>
          <p className={styles.text}>
            I have a PS5, a PSVR2, and a game library that's getting a little out of hand.
            Souls-likes are my favorite genre — Sekiro and Elden Ring sit at the top.
            There's something about how FromSoftware designs difficulty that I find
            philosophically interesting — the idea that struggling with something and
            eventually overcoming it is more satisfying than being handed the answer.
            Which, honestly, applies to a lot more than just games.
          </p>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>say hi</p>
          <p className={styles.text}>
            I'm always happy to talk — about geospatial tech, DSA, whatever you're
            building, or why Sekiro is a masterpiece. Find me on{' '}
            <a href="https://twitter.com/ksheetiz" target="_blank" rel="noopener">X</a>
            {' '}or{' '}
            <a href="https://linkedin.com/in/ksheetiz" target="_blank" rel="noopener">LinkedIn</a>.
          </p>
        </div>

      </main>
    </Layout>
  );
}