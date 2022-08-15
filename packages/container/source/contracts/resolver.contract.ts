import { BindingKey, BindingTag, Callable } from "./common.contract.js";
import { RegistryInterface } from "./registry.contract.js";
import { ScopeInterface } from "./scope.contract.js";

export interface ResolverInterface {
  readonly bindingKey?: BindingKey;

  readonly bindingTags: BindingTag[];

  readonly dependencies: BindingKey[];

  readonly registry: RegistryInterface;

  readonly scope: ResolverScope;

  clearBindingKey(): this;

  clearBindingTags(...bindingTags: BindingTag[]): this;

  clearDependencies(): this;

  resolve<Instance>(scope: ScopeInterface, ...args: unknown[]): Instance;

  resolveMany<Instance>(scope: ScopeInterface, ...args: unknown[]): Instance[];

  setBindingKey(bindingKey: BindingKey): this;

  setBindingTags(...bindingTags: BindingTag[]): this;

  setDependencies(...dependencies: BindingKey[]): this;

  setScope(scope: ResolverScope): this;
}

export type ResolverFactory = {
  createBindingKeyResolver(
    registry: RegistryInterface,
    bindingKey: BindingKey,
  ): ResolverInterface;

  createBindingTagResolver(
    registry: RegistryInterface,
    bindingTag: BindingTag,
  ): ResolverInterface;

  createCallableResolver(
    registry: RegistryInterface,
    callable: Callable<unknown>,
  ): ResolverInterface;

  createClassResolver(
    registry: RegistryInterface,
    constructor: Function,
  ): ResolverInterface;

  createConstantResolver(
    registry: RegistryInterface,
    constant: unknown,
  ): ResolverInterface;
};

export type ResolverScope = "container" | "resolve" | "singleton" | "transient";
