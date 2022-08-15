export type BindingKey = Function | string | symbol;

export type BindingTag = string | symbol;

export type Callable =
  | [BindingKey, string | symbol]
  | [Object, string | symbol]
  | (<Result>(...args: unknown[]) => Result);

export type Constructor<Instance> = {
  new (...args: unknown[]): Instance;
};
