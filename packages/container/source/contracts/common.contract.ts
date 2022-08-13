export type BindingKey = Constructor<unknown> | string | symbol;

export type BindingTag = string | symbol;

export type Callable<Result> =
  | [BindingKey, string | symbol]
  | [Instance<Result>, string | symbol]
  | ((...args: unknown[]) => Result);

export type Constructor<Instance> = {
  name: string;
  new (...args: unknown[]): Instance;
};

export type Instance<Result> = Record<
  string | symbol,
  (...args: unknown[]) => Result
>;
