import Matter from 'matter-js';

// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width: 560,
    height: 400,
    background: '#fafafa',
    // wireframes: false
  },
});

const circles = [];
// create two boxes and a ground
for (let i = 0; i < 100; i += 1) {
  circles.push(
    Bodies.circle(i * 5, Math.random(100) * 200, 20, {
      render: { fillStyle: '#6f12ef' },
    }),
  );
}

const ground = Bodies.rectangle(0, 400, 1200, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [...circles, ground]);

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);
