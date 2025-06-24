import Divider from "@/components/Divider/divider.jsx";
import HeroSecton from "@/components/HeroSection/HeroSection.jsx";
import SkillsSection from "@/components/SkillsSection/SkillsSection.jsx";

export default function HomePage() {
    return (
        <>
            <HeroSecton/>
            <Divider color="var(--accent2)" reverse animate={false}/>
            <SkillsSection />
        </>
    )
}