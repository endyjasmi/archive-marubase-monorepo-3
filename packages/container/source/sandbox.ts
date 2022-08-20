import { Container } from "./container.js";

const container = new Container();
container.bind("log").toCallable((...args) => args);
container
  .bind("random")
  .toCallable(() => Math.random())
  .setScope("transient");
console.info("root", container.resolve("random"));
console.info("root", container.resolve("random"));
console.info("root#resolve", container.resolve("log"));

const branch0 = container.fork();
console.info("branch0", branch0.resolve("random"));
console.info("branch0", branch0.resolve("random"));
console.info("branch0#resolve", branch0.resolve("log"));

const branch1 = container.fork();
console.info("branch1", branch1.resolve("random"));
console.info("branch1", branch1.resolve("random"));
console.info("branch1#resolve", branch1.resolve("log"));
