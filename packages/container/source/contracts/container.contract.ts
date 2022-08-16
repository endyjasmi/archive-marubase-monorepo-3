import { BindingKey, BindingTag, Callable } from "./common.contract.js";
import { ProviderInterface, ProviderName } from "./provider.contract.js";
import { RegistryInterface } from "./registry.contract.js";
import { ResolverInterface } from "./resolver.contract.js";
import { ScopeInterface } from "./scope.contract.js";

export interface ContainerInterface {
  readonly booted: boolean;

  readonly parent?: this;

  readonly providers: Record<ProviderName, ProviderInterface>;

  readonly registry: RegistryInterface;

  readonly scope: ScopeInterface;

  bind(bindingKey: BindingKey): ContainerBinding;

  boot(): Promise<void>;

  bound(bindingKey: BindingKey): boolean;

  call<Result>(callable: Callable, ...args: unknown[]): Result;

  create<Result>(constructor: Function, ...args: unknown[]): Result;

  fork(): this;

  install(name: ProviderName, provider: ProviderInterface): this;

  installed(name: ProviderName): boolean;

  resolve<Result>(bindingKey: BindingKey, ...args: unknown[]): Result;

  resolveTag<Result>(bindingTag: BindingTag): Result[];

  shutdown(): Promise<void>;

  unbind(bindingKey: BindingKey): this;

  uninstall(name: ProviderName): this;
}

export type ContainerBinding = {
  toCallable(callable: Callable): ResolverInterface;

  toClass(constructor: Function): ResolverInterface;

  toConstant(constant: unknown): ResolverInterface;

  toKey(targetKey: BindingKey): ResolverInterface;

  toTag(bindingTag: BindingTag): ResolverInterface;
};
