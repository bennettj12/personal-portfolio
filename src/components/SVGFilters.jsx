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
                    width="1" height="1"
                    colorInterpolationFilters="sRGB"
                >
                    <feTurbulence 
                        type="fractalNoise" 
                        baseFrequency="0.2" 
                        numOctaves="3"
                    />
                    <feDisplacementMap 
                        in="SourceGraphic" 
                        scale="3.5"
                    />
                </filter>      
            </defs>

        </svg>

    );
}