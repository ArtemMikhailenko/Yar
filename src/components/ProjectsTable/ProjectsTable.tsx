import { useState, useEffect } from "react";
import styles from "./ProjectsTable.module.css";
import { useNavigate } from "react-router-dom";

interface ProjectData {
  _id: string;
  name: string;
  symbol: string;
  type: string;
  participants: number;
  totalRaised: number;
  athSinceIDO: string;
  endDate: string;
  chain: string;
  logoUrl: string;
  description: string;
}

const ProjectsTable = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleViewToken = (tokenName: string) => {
    navigate(`/token/${encodeURIComponent(tokenName)}`);
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/projects?status=Active`);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();

        // Преобразуем endDate в более читаемый формат
        const formattedProjects = data.map((project: ProjectData) => ({
          ...project,
          endDate: project.endDate
            ? new Date(project.endDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "TBA",
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className={styles.container}>
      {/* <h1>Recently Created Projects</h1> */}
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Participants</th>
              <th>Total Raised ($)</th>
              <th>ATH Since IDO</th>
              <th>End Date</th>
              <th>Chain</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id}
                onClick={() => handleViewToken(project.name)}
              >
                <td>
                  <div className={styles.projectName}>
                    <img
                      src={project.logoUrl}
                      alt={project.name}
                      className={styles.projectLogo}
                    />
                    {project.name}
                  </div>
                </td>
                <td>
                  <span className={styles.tokenSymbol}>{project.symbol}</span>
                </td>
                <td>
                  <span className={styles.tokenType}>{project.type}</span>
                </td>
                <td>{project.participants}</td>
                <td>${project.totalRaised.toLocaleString()}</td>
                <td>
                  {project.athSinceIDO !== "TBA" ? (
                    <span className={styles.athBadge}>
                      {project.athSinceIDO}
                    </span>
                  ) : (
                    "TBA"
                  )}
                </td>
                <td>{project.endDate}</td>
                <td>{project.chain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectsTable;
