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
  engine: engine,
});

// create two boxes and a ground
const boxA = Bodies.rectangle(430, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);
