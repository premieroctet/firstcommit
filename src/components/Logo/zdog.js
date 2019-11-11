import Zdog from "zdog";

const getRandomColor = (array = ["#239a3b", "#c6e48b", "#7bc96f", "#196127"]) =>
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
    translate: { y: 40 }
  });

  new Zdog.Hemisphere({
    addTo: logo,
    diameter: 140,
    stroke: false,
    color: "#47fda7",
    backface: "white",
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
        color: x === 0 && y === 0 ? "#47fda7" : getRandomColor()
      });
    });
  });

  return illo;
};

export default buildLogo;
