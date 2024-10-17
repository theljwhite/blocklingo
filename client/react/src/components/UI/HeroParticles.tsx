import { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function HeroParticles() {
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "#FAD1A4",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#fce0c1",
        // value: "#FFF",
      },
      links: {
        color: "#ffffff",
        distance: 200,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 3,
        straight: true,
      },
      number: {
        density: {
          enable: true,
          area: 500,
        },
        value: 50,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: ["square", "circle"],
        // type: "image",
        options: {
          image: {
            src: "./temp_project_logo_white.png",
            width: 20,
            height: 20,
            replaceColor: true,
          },
        },
      },
      size: {
        value: { min: 5, max: 20 },
      },
    },
    detectRetina: true,
    zIndex: -10,
  };

  return (
    <>{init && <Particles id="hero-particles" options={particlesOptions} />}</>
  );
}
