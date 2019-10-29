import Zdog from "zdog";

const getRandomColor = (array = ["#ebedf0", "#239a3b", "#ebedf0", "#c6e48b", "#7bc96f", "#c6e48b"]) =>
  array[Math.floor(Math.random() * array.length)];

const buildLogo = selector => {
  const illo = new Zdog.Illustration({
    element: selector,
    dragRotate: true,
    zoom: 0.8,
    resize: true
  });

  const logo = new Zdog.Anchor({
    addTo: illo,
    translate: { y: 40, x:-25 }
  });

  new Zdog.Hemisphere({
    addTo: logo,
    diameter: 140,
    stroke: 6,
    fill:false,
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

export default buildLogo;
