import Divider from "@/components/Divider/divider.jsx";
import HeroSecton from "@/components/HeroSection/HeroSection.jsx";
import SkillsSection from "@/components/SkillsSection/SkillsSection.jsx";

export default function HomePage() {
    return (
        <>
            <HeroSecton/>
            <Divider amplitude={1.5} thickness={1}/>
            <SkillsSection />
        </>
    )
}