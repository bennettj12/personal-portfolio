import Divider from '../Divider/divider.jsx'
import styles from './SkillsSection.module.scss'
import { SlGraduation, SlLayers, SlPencil } from "react-icons/sl";
export default function SkillsSection() {
    return(
        <div className={styles.skillsContainer}>
            <div className={styles.skillsBox}> 
                <SlGraduation className={styles.skillsIcon} />
                <h3>Education</h3>
                <Divider animate={false}/>
                <p>
                <span className={styles.degree}>B.S. Computer Science</span><br/>
                <span className={styles.school}>University of Illinois at Springfield</span>
                </p>
            </div>
            <div className={styles.skillsBox}> 
                <SlLayers className={styles.skillsIcon} />
                <h3>Skills</h3>
                <Divider reverse animate={false}/>
            </div>
            <div className={styles.skillsBox}> 
                <SlPencil className={styles.skillsIcon} />
                <h3>Etc...</h3>
                <Divider animate={false}/>
            </div>
        </div>
    )
}