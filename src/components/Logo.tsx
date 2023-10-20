"use client";

import React, { useEffect, memo } from "react";
import Zdog from "zdog";

const getRandomColor = (array = ["#ebedf0", "#239a3b", "#ebedf0", "#c6e48b", "#7bc96f", "#c6e48b"]) =>
    array[Math.floor(Math.random() * array.length)];

const buildLogo = (selector: string) => {
    const illo = new Zdog.Illustration({
        element: selector,
        dragRotate: true,
        zoom: 0.8,
        resize: true
    });

    const logo = new Zdog.Anchor({
        addTo: illo,
        translate: { y: 40, x: -25 }
    });

    new Zdog.Hemisphere({
        addTo: logo,
        diameter: 140,
        stroke: 6,
        fill: false,
        color: "white",
        translate: { z: 30, y: -30, x: 30 }
    });

    const commit = new Zdog.Box({
        width: 10,
        height: 10,
        stroke: 10,
        translate: { x: 15 }
    });

    [0, -30, -60].forEach(y => {
        [0, 30, 60].forEach(x => {
            commit.copy({
                addTo: logo,
                translate: { x, y },
                color: getRandomColor()
            });
        });
    });

    return illo;
};

const CYCLE_COUNT = 150;
let ticker = 0;

const Logo = () => {
    useEffect(() => {
        const logo = buildLogo("#illo");

        const animate = () => {
            let progress = ticker / CYCLE_COUNT;
            let tween = Zdog.easeInOut(progress % 1, 3);

            if (ticker < CYCLE_COUNT) {
                logo.rotate.y = tween * Zdog.TAU;
                ticker++;
            }

            logo.updateRenderGraph();
            requestAnimationFrame(animate);
        };

        logo.updateRenderGraph();
        setTimeout(animate, 1000);

    }, []);

    return <canvas id="illo" className="block w-full h-[200px] cursor-move"/>;
};

export default memo(Logo);
