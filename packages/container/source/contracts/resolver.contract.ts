import { BindingKey, BindingTag, Callable } from "./common.contract.js";
import { RegistryInterface } from "./registry.contract.js";
import { ScopeInterface } from "./scope.contract.js";

export interface ResolverInterface {
  readonly bindingKey?: BindingKey;

  readonly bindingTags: BindingTag[];

  readonly dependencies: BindingKey[];

  readonly registry: RegistryInterface;

  readonly scope: ResolveScope;

  clearBindingKey(): this;

  clearBindingTags(...bindingTags: BindingTag[]): this;

  clearDependencies(): this;

  resolve<Result>(scope: ScopeInterface, ...args: unknown[]): Result;

  setBindingKey(bindingKey: BindingKey): this;

  setBindingTags(...bindingTags: BindingTag[]): this;

  setDependencies(...dependencies: BindingKey[]): this;

  setScope(scope: ResolveScope): this;
}

export type ResolveScope = "container" | "resolve" | "singleton" | "transient";

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
    callable: Callable,
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
