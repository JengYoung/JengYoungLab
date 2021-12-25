import Matter from 'matter-js';
import star from './Star.svg';

console.log(star);
// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;

// create an engine
const engine = Engine.create();
engine.gravity.y = -0.2;

// create a renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width: 560,
    height: 400,
    background: 'linear-gradient(#2f1347, #161611)',
    wireframes: false,
  },
});

const circles = [];
// create two boxes and a ground
for (let i = 0; i < 55; i += 1) {
  circles.push(
    Bodies.circle(10 + i * 10, 400 + Math.random(100) * 5000, 8, {
      render: { fillStyle: '#fee433' },
    }),
  );
}

// add all of the bodies to the world
Composite.add(engine.world, [...circles]);
// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

setInterval(() => {
  const circles = [];
  for (let i = 0; i < 55; i += 1) {
    circles.push(
      Bodies.circle(10 + i * 10, 400 + Math.random(100) * 5000, 10, {
        render: { fillStyle: '#5162ff' },
      }),
    );
  }
  console.log('hihi');
  Composite.add(engine.world, [...circles]);
}, 15000);
