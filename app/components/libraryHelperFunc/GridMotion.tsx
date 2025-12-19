"use client";
import { useEffect, useRef, FC, ReactNode } from 'react';
import { gsap } from 'gsap';
import '../../globals.css';

// interface GridMotionProps {
//     items?: (string | ReactNode)[];
//     gradientColor?: string;
// }
interface GridItem {
    title: string;
    subtitle: string;
}

interface GridMotionProps {
    items?: GridItem[];
    gradientColor?: string;
}


const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'transparent' }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mouseXRef = useRef<number>(
        typeof window !== "undefined" ? window.innerWidth / 2 : 0
    );


    const totalItems = 32;

    const defaultItems: GridItem[] = Array.from({ length: totalItems }, (_, i) => ({
        title: `Card ${i + 1}`,
        subtitle: "This is a subtitle",
    }));

    const combinedItems = items && items.length > 0
        ? items.slice(0, totalItems)
        : defaultItems;


    useEffect(() => {
        gsap.ticker.lagSmoothing(0);

        const handleMouseMove = (e: MouseEvent): void => {
            mouseXRef.current = e.clientX;
        };

        const updateMotion = (): void => {
            const maxMoveAmount = 300;
            const baseDuration = 0.8;
            const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

            rowRefs.current.forEach((row, index) => {
                if (row) {
                    const direction = index % 2 === 0 ? 1 : -1;
                    const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;

                    gsap.to(row, {
                        x: moveAmount,
                        duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
                        ease: 'power3.out',
                        overwrite: 'auto'
                    });
                }
            });
        };

        const removeAnimationLoop = gsap.ticker.add(updateMotion);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            removeAnimationLoop();
        };
    }, []);

    return (
        <div className="noscroll loading" ref={gridRef}>
            <section
                className="intro"
                style={{
                    background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
                }}
            >
                <div className="gridMotion-container">
                    {Array.from({ length: 5 }, (_, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="row"
                            ref={(el) => {
                                rowRefs.current[rowIndex] = el;
                            }}
                        >
                            {Array.from({ length: 7 }, (_, itemIndex) => {
                                const index = rowIndex * 7 + itemIndex;
                                const item = combinedItems[index];

                                return (
                                    <div key={itemIndex} className="row__item">
                                        <div className="card-glass">
                                            <h3 className="card-title" style={{fontWeight:300,fontSize:48}}>{item?.title}</h3>
                                            <p className="card-subtitle" style={{fontWeight:100,fontSize:24}}>{item?.subtitle}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="fullview"></div>
            </section>
        </div>
    );


};

export default GridMotion;
