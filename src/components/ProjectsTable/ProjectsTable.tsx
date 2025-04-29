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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleViewToken = (tokenName: string) => {
    navigate(`/token/${encodeURIComponent(tokenName)}`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/projects?status=Active`);

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        // Format date for better readability
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
        setError(null);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [BASE_URL]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {projects.length === 0 ? (
        <div className={styles.noProjects}>
          <p>No active projects found.</p>
        </div>
      ) : (
        <>
          <div className={styles.scrollHint}>
            <span className={styles.scrollIcon}>⟷</span>
            <span>Scroll horizontally to see more details</span>
          </div>

          <div className={styles.tableWrapper}>
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
                    className={styles.projectRow}
                  >
                    <td>
                      <div className={styles.projectName}>
                        <img
                          src={project.logoUrl}
                          alt={project.name}
                          className={styles.projectLogo}
                          onError={(e) => {
                            // Fallback for broken images
                            (e.target as HTMLImageElement).src =
                              "/placeholder-logo.png";
                          }}
                        />
                        <span className={styles.projectNameText}>
                          {project.name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.tokenSymbol}>
                        {project.symbol}
                      </span>
                    </td>
                    <td>
                      <span className={styles.tokenType}>{project.type}</span>
                    </td>
                    <td>{project.participants.toLocaleString()}</td>
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
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectsTable;
