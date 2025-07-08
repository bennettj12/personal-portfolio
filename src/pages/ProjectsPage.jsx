export default function ProjectsPage() {
    return (
        <>
        <h1>
            Projects Page Test
        </h1>
        <svg width="200" height="200">
            <defs>
                <filter id="testFilter" filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                    <feTurbulence baseFrequency="0.2" numOctaves="2"/>
                    <feDisplacementMap in="SourceGraphic" scale="5"/>
                </filter>
            </defs>
            <rect width="200" height="200" filter="url(#testFilter)" fill="blue"/>
        </svg>
        </>

    )
}