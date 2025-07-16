import styles from './ProjectDetailsPage.module.scss'
import { useParams } from 'react-router-dom'
import { projects } from '../components/data/projects.jsx'
import useAnimatedNavigation from '@/hooks/useAnimatedNavigation.jsx';

import { motion } from 'framer-motion'

//import parse from 'front-matter'
import { marked } from 'marked'

import { useEffect, useState } from 'react';
import SketchOutline from '@/components/SketchOutline/SketchOutline.jsx';
import { AnimatedButton } from '@/components/AnimatedButton/AnimatedButton.jsx';

import Divider from '@/components/Divider/divider.jsx';

export default function ProjectDetailsPage() {
    const { projectId } = useParams();
    const { animatedNavigate } = useAnimatedNavigation();

    const [content, setContent] = useState(null);

    const project = projects.find(p => p.id === projectId)

    useEffect(() => {
        // load markdown content
        const loadMarkdown = async () => {
            try {
                const markdownPath = `../components/data/MD/${projectId}.md`;
                const markdownModule = await import(/* @vite-ignore */ markdownPath);

                const response = await fetch(markdownModule.default);
                const rawMarkdown = await response.text();

                const htmlContent = marked(rawMarkdown);
                setContent(htmlContent);
                
            } catch (err){
                console.err(err);
            }
        }
        loadMarkdown();
    }, [projectId]);


    return content ? (
        <motion.div 
            className={styles.layout}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
        >   
            <aside className={styles.projectInfo}>
                <SketchOutline>
                    <img className={styles.metaImage} src={project.image} />
                    <div className={styles.metaHeader}>
                        <h3>{project.title}</h3>
                        <AnimatedButton thickness={1} onClick={() => animatedNavigate('/projects')}>Go back</AnimatedButton>
                    </div>
                    <Divider />
                    <div className={styles.metaInfobox}>
                        <div className={styles.gridTitle}>Tech:</div>
                        <div className={styles.gridItem}>{project.techDescription}</div>
                        <div className={styles.gridTitle}>Link:</div>
                        <a className={styles.gridItem} href={project.link}>{project.link}</a>
                    </div>


                </SketchOutline>
            </aside>
            <article className={styles.projectArticle}>
                <div className={styles.markdownContent}
                    dangerouslySetInnerHTML={{__html: content}}/>
            </article>
        </motion.div>

    ) : <p>Loading...</p>
}