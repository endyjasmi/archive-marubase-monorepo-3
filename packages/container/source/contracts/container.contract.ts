import { BindingKey, BindingTag, Callable } from "./common.contract.js";
import { RegistryInterface } from "./registry.contract.js";
import { ResolverInterface } from "./resolver.contract.js";
import { ScopeInterface } from "./scope.contract.js";

export interface ContainerInterface {
  readonly registry: RegistryInterface;

  readonly scope: ScopeInterface;

  bind(bindingKey: BindingKey): ContainerBinding;

  bound(bindingKey: BindingKey): boolean;

  call<Result>(callable: Callable, ...args: unknown[]): Result;

  create<Result>(constructor: Function, ...args: unknown[]): Result;

  fork(): this;

  resolve<Result>(bindingKey: BindingKey, ...args: unknown[]): Result;

  resolveTag<Result>(bindingTag: BindingTag, ...args: unknown[]): Result[];

  unbind(bindingKey: BindingKey): this;
}

export type ContainerBinding = {
  toCallable(callable: Callable): ResolverInterface;

  toClass(constructor: Function): ResolverInterface;

  toConstant(constant: unknown): ResolverInterface;

  toKey(targetKey: BindingKey): ResolverInterface;

  toTag(bindingTag: BindingTag): ResolverInterface;
};
