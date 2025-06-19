import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimationContext } from '../context/AnimationContext.jsx'

/** The purpose of this hook is to handle exit-animations and ensure that routing
 * does not happen until said animations have completed
 * 
 * @returns Promise<void>
 */
export default function useAnimatedNavigation() {

    const navigate = useNavigate();
    const controls = useContext(AnimationContext);

    const animatedNavigate = useCallback(async (to) => {
        if(!controls) return;

        await controls.start({
            opacity: 0,
            transition: {duration: .15}
        });
        navigate(to);
        

        

    }, [navigate, controls]);
    return { animatedNavigate }

}