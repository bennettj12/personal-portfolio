export default function SVGFilters() {
    // This should be included once at the start of our layout.
    // As a result, we should be able to reference these filters anywhere.
    return (

        <svg aria-hidden="true" style={{ position: 'absolute', height: 0, width: 0 }}>

            <defs>
                <filter 
                    id="pencilTexture"
                    primitiveUnits="userSpaceOnUse"
                    x="0" y="0"
                    width="140%" height="140%"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence 
                        type="fractalNoise" 
                        baseFrequency="0.35" 
                        numOctaves="5"
                    />
                    <feDisplacementMap 
                        in="SourceGraphic" 
                        scale="0.1"
                    />
                </filter>      
            </defs>

        </svg>

    );
}