export type BindingKey = Function | string | symbol;

export type BindingTag = string | symbol;

export type Callable =
  | [BindingKey, string | symbol]
  | [Object, string | symbol]
  | ((...args: unknown[]) => unknown);

export type Constructor<Instance> = {
  new (...args: unknown[]): Instance;
};
