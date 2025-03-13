export type Listener<T extends Function> = T;

abstract class State<T extends Function> {
  protected listeners: Listener<T>[] = [];

  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}

export default State;
