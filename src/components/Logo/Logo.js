import React, { useEffect, memo } from "react";
import { Canvas } from "./elements";
import buildLogo from "./zdog";

const Logo = () => {
  useEffect(() => {
    const logo = buildLogo("#illo");

    const animate = () => {
      logo.rotate.y += 0.02;
      logo.updateRenderGraph();
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <Canvas id="illo"></Canvas>;
};

export default memo(Logo);
