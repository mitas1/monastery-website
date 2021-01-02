const Spinner = ({ color = '#29d' }) => (
    <div className="loader">
        <svg className="circular">
            <circle
                className="path"
                cx={50}
                cy={50}
                r={20}
                fill="none"
                strokeWidth={4}
                strokeMiterlimit={10}
            />
        </svg>
        <style jsx>{`
            .loader {
                position: relative;
                margin: 0px auto;
                width: 100px;
                height: 100px;
                zoom: 1;
            }

            .circular {
                animation: rotate 1s linear infinite;
                height: 100px;
                position: relative;
                width: 100px;
            }

            .path {
                stroke: ${color};
                stroke-dasharray: 1, 200;
                stroke-dashoffset: 0;
                animation: dash 1.5s ease-in-out infinite;
                stroke-linecap: round;
            }

            @keyframes rotate {
                100% {
                    transform: rotate(360deg);
                }
            }
            @keyframes dash {
                0% {
                    stroke-dasharray: 1, 200;
                    stroke-dashoffset: 0;
                }
                50% {
                    stroke-dasharray: 89, 200;
                    stroke-dashoffset: -35;
                }
                100% {
                    stroke-dasharray: 89, 200;
                    stroke-dashoffset: -124;
                }
            }
        `}</style>
    </div>
);

export default Spinner;
