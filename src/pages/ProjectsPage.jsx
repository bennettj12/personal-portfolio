import ProjectCard from "@/components/ProjectCard/ProjectCard.jsx";
import styles from './ProjectsPage.module.scss'
export default function ProjectsPage() {
    return (
        <>
        <h1>
            Projects
        </h1>
        <div className={styles.projectsSection}>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
        </div>

        </>

    )
}