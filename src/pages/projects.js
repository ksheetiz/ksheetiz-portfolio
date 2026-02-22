import Layout from '@theme/Layout';
import styles from './projects.module.css';
import projects from '../data/projects.json';

const statusLabel = {
  completed: 'completed',
  wip: 'in progress',
  abandoned: 'abandoned',
};

const statusColor = {
  completed: '#22c55e',
  wip: '#f59e0b',
  abandoned: '#999',
};

export default function Projects() {
  return (
    <Layout title="Projects" description="Things I have built.">
      <main className={styles.wrapper}>
        <div className={styles.header}>
          <p className={styles.title}>projects</p>
          <p className={styles.subtitle}>
            Things I've built — side projects, experiments, and work in progress.
          </p>
        </div>

        <div className={styles.list}>
          {projects.map((project) => (
            <div key={project.title} className={styles.item}>
              <div className={styles.itemTop}>
                <div className={styles.itemLeft}>
                  <span className={styles.itemTitle}>{project.title}</span>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <span
                    className={styles.status}
                    style={{ color: statusColor[project.status] }}
                  >
                    {statusLabel[project.status]}
                  </span>
                  <div className={styles.links}>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                        github ↗
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.link}>
                        live ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <p className={styles.description}>{project.description}</p>
            </div>
          ))}
        </div>

      </main>
    </Layout>
  );
}