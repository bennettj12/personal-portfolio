import styles from './ProjectDetailsPage.module.scss'
import { useParams } from 'react-router-dom'
import useAnimatedNavigation from '@/hooks/useAnimatedNavigation.jsx';
export default function ProjectDetailsPage() {
    const { projectId } = useParams();
    const { animatedNavigate } = useAnimatedNavigation();
    return (
        <article>
            <h1>
                Project Case Study: {projectId}
            </h1>
            <button onClick={() => animatedNavigate('/projects')}>Go back</button>
        </article>

    )
}