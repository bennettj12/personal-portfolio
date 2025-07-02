import { AnimatedButton } from '../AnimatedButton/AnimatedButton.jsx';
import Divider from '../Divider/divider.jsx'
import SketchOutline from '../SketchOutline/SketchOutline.jsx';
import styles from './SkillsSection.module.scss'
import { SlGraduation, SlLayers, SlPencil } from "react-icons/sl";

import { motion } from 'framer-motion';

export default function SkillsSection() {
    let delay = 1;
    const delayDelta = 0.40;
    const getAnimDelay = () => {
        const c = delay;
        delay += delayDelta;
        return c;
    }
    const skillBoxStyle = {
        margin: "0 .75rem",
    };
    return (
        <div className={styles.skillsContainer}>
            <motion.div
                initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.5,
                            delay: getAnimDelay()
                }}>
                <SketchOutline style={skillBoxStyle}>
                    <div className={styles.skillsBox}> 
                        <SlGraduation className={styles.skillsIcon} />
                        <h3>Education</h3>
                        <Divider amplitude={1.2} thickness={1}/>
                        <p className={styles.educationTitle}>B.S. Computer Science</p>
                        <hr className={styles.skillsHR} />
                        <div className={styles.educationBlock}>
                            <p className={styles.school}>
                                University of Illinois at Springfield
                            </p>
                            <p className={styles.year}>
                                2021
                            </p>
                        </div>
                        <hr className={styles.skillsHR} />
                        
                        <p className={styles.educationTitle}>Capstone project</p>
                        <p className={styles.skillTag}>Chess Engine & AI</p>
                        <p>Built a chess engine & minimax AI in Java for a team-developed web-app</p>
                        
                        <div className={styles.btnContainer}>
                            <AnimatedButton thickness={1} >Read about it</AnimatedButton>
                        </div>


                    </div>
                </SketchOutline>
            </motion.div>
            <motion.div
            initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    duration: 0.5,
                    delay: getAnimDelay()
            }}>
                <SketchOutline style={skillBoxStyle}>
                    <div className={styles.skillsBox}> 
                        <SlLayers className={styles.skillsIcon} />
                        <h3>Toolset</h3>
                        <Divider amplitude={1.2} thickness={1}/>
                    </div>
                </SketchOutline>
            </motion.div>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    duration: 0.5,
                    delay: getAnimDelay()
            }}>
                <SketchOutline style={skillBoxStyle}>
                    <div className={styles.skillsBox}> 
                        <SlPencil className={styles.skillsIcon} />
                        <h3>Etc...</h3>
                        <Divider amplitude={1.2} thickness={1}/>
                    </div>
                </SketchOutline>
            </motion.div>

        </div>
    )
}