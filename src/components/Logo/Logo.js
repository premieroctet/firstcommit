import React, { useEffect, memo } from "react";
import { Canvas } from "./elements";
import buildLogo from "./zdog";
import Zdog from "zdog";

const CYCLE_COUNT = 150;
let ticker = 0;

const Logo = () => {
  useEffect(() => {
    const logo = buildLogo("#illo");

    const animate = () => {
      let progress = ticker / CYCLE_COUNT;
      let tween = Zdog.easeInOut(progress % 1,3);
      
      if (ticker < CYCLE_COUNT) {
        logo.rotate.y = tween * Zdog.TAU;
        ticker++;
      }

      logo.updateRenderGraph();
      requestAnimationFrame(animate);
    };

    logo.updateRenderGraph();
    setTimeout(animate,1000);

  }, []);

  return <Canvas id="illo"></Canvas>;
};

export default memo(Logo);
