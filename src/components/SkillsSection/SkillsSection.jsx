import { AnimatedButton } from '../AnimatedButton/AnimatedButton.jsx';
import Divider from '../Divider/divider.jsx'
import SketchOutline from '../SketchOutline/SketchOutline.jsx';
import styles from './SkillsSection.module.scss'
import { SlGraduation, SlLayers, SlPencil } from "react-icons/sl";
import { FaReact, FaJava, FaPython, FaPaintBrush } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { SiDotnet } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import useAnimatedNavigation from '@/hooks/useAnimatedNavigation.jsx';
import { motion } from 'framer-motion';

export default function SkillsSection() {

    const { animatedNavigate } = useAnimatedNavigation();

    let delay = 1;
    const delayDelta = 0.40;
    const getAnimDelay = () => {
        const c = delay;
        delay += delayDelta;
        return c;
    }
    return (
        <div className={styles.skillsContainer}>
            <motion.div
                initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.5,
                            delay: getAnimDelay()
                }}>
                <SketchOutline>
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
                            <AnimatedButton
                                onClick={() => animatedNavigate('/projects/chess-engine')}
                                thickness={1} 
                             >Read about it</AnimatedButton>
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
                <SketchOutline>
                    <div className={styles.skillsBox}> 
                        <SlLayers className={styles.skillsIcon} />
                        <h3>Toolset</h3>
                        <Divider amplitude={1.2} thickness={1}/>
                        <p>I work with a variety of different technologies in order to build & contribute to projects, here are a few:</p>
                        <hr className={styles.skillsHR} />
                        <ul>
                            <li><span><FaJava /></span> Java</li>
                            <li><span><IoLogoJavascript /></span> Javascript</li>
                            <li><span><FaReact /></span> React</li>
                            <li><span><FaPython /></span> Python</li>
                            <li><span><SiDotnet /></span> C#/.NET</li>

                        </ul>
                        
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
                <SketchOutline>
                    <div className={styles.skillsBox}> 
                        <SlPencil className={styles.skillsIcon} />
                        <h3>Recent Interests</h3>
                        <Divider amplitude={1.2} thickness={1}/>
                        <p>I'm committed to improving my skills both technical and otherwise. Here are some of the things I've been doing lately:</p>
                        <hr className={styles.skillsHR} />
                        <ul>
                            <li><span><FaReact /></span> In-depth study of React</li>
                            <motion.li
                                initial="initial"
                                animate="initial"
                                whileHover="animate"
                            >
                                <motion.span
                                    variants={{
                                        initial: {rotate: 0},
                                        animate: {rotate: 180},
                                    }}
                                >
                                    <FaArrowsRotate />
                                </motion.span> Motion/Framer-Motion animations</motion.li>
                            <li><span><FaPaintBrush /></span> Practicing Art & Design skills</li>

                        </ul>
                    </div>
                </SketchOutline>
            </motion.div>

        </div>
    )
}