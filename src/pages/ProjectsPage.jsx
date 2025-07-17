import ProjectCard from "@/components/ProjectCard/ProjectCard.jsx";
import styles from './ProjectsPage.module.scss'
import { projects } from "@/components/data/projects.jsx";
export default function ProjectsPage() {
    return (
        <>
            <div className={styles.projectsSection}>
                {projects.map((project) => {
                    return (
                    <ProjectCard 
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                    />);
                })}
            </div>

        </>

    )
}