export type BindingKey = Function | string | symbol;

export type BindingTag = string | symbol;

export type Callable<Result> =
  | [BindingKey, MethodName]
  | [Object, MethodName]
  | ((...args: unknown[]) => Result);

export type Constructor<Instance> = {
  new (...args: unknown[]): Instance;
};

export type Instance<Result> = {
  [methodName: MethodName]: (...args: unknown[]) => Result;
};

export type MethodName = string | symbol;
