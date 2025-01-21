import styles from "./Projects.module.css";
import UpcomingProjects from "../../components/UpcomingProjects/UpcomingProjects";
import ProjectsTable from "../../components/ProjectsTable/ProjectsTable";

const Projects = () => {
  return (
    <div className={styles.container}>
      <UpcomingProjects />
      <h1>Recently Created Projects</h1>
      <ProjectsTable />
    </div>
  );
};

export default Projects;
