export default function TaskManager() {
  this.tasks = [];

  this.addTask = (taskFunc) => {
    this.tasks = [...this.tasks, taskFunc];
  };

  this.run = async () => {
    if (this.tasks.length) {
      const taskFunc = this.tasks.shift();
      await taskFunc();

      this.run();
    }
  };

  this.hasTask = () => {
    return this.tasks.length;
  };
}
