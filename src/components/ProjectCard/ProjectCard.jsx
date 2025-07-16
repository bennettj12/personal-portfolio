import { AnimatedButton } from "../AnimatedButton/AnimatedButton.jsx";

import useAnimatedNavigation from "@/hooks/useAnimatedNavigation.jsx";

import Divider from "../Divider/divider.jsx";
import SketchOutline from "../SketchOutline/SketchOutline.jsx";
import styles from './ProjectCard.module.scss';

/** 
 *  ProjectCard shows information about a project and may link to a more in-depth page.
 * 
 */
export default function ProjectCard(
    {
        title = "Undefined Project",
        description = `[Default Project Information, project info missing] Description of a project, should provide a short overview of the project and what kind of things I did on it. Might also provide some information about what I learned or what I got out of it...`,
        id = "example",
        image = "https://picsum.photos/400"
    }
) {

    const { animatedNavigate } = useAnimatedNavigation();

    return(
        <SketchOutline>
            <div className={styles.projectCard}>
                <div className={styles.projectImage}>
                    <img src={image} />
                </div>
                <div className={styles.projectInfo}>
                    <h2 className={styles.projectTitle}>
                        {title}
                    </h2>
                    <Divider/>
                    <p className={styles.projectDescription}>
                        {description}
                    </p>
                    <div className={styles.projectButton}>
                        <AnimatedButton 
                            thickness={1}
                            onClick={() => animatedNavigate(`/projects/${id}`)}
                        >
                            Read More
                        </AnimatedButton>
                    </div>

                </div>
            </div>

        </SketchOutline>
    )
}