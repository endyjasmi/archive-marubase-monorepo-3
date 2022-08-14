import {
  BindingKey,
  BindingTag,
  Callable,
  Constructor,
} from "./common.contract.js";
import { RegistryInterface } from "./registry.contract.js";
import { ScopeInterface } from "./scope.contract.js";

export interface ResolverInterface<ResolveInstance> {
  readonly bindingKey?: BindingKey;

  readonly bindingTags: BindingTag[];

  readonly dependencies: BindingKey[];

  readonly registry: RegistryInterface;

  readonly scope: ResolverScope;

  clearBindingKey(): this;

  clearBindingTags(...bindingTags: BindingTag[]): this;

  clearDependencies(): this;

  resolve(scope: ScopeInterface, ...args: unknown[]): ResolveInstance;

  setBindingKey(bindingKey: BindingKey): this;

  setBindingTags(...bindingTags: BindingTag[]): this;

  setDependencies(...dependencies: BindingKey[]): this;

  setScope(scope: ResolverScope): this;
}

export type ResolverFactory = {
  createBindingKeyResolver<ResolveInstance>(
    registry: RegistryInterface,
    bindingKey: BindingKey,
  ): ResolverInterface<ResolveInstance>;

  createBindingTagResolver<ResolveInstance>(
    registry: RegistryInterface,
    bindingTag: BindingTag,
  ): ResolverInterface<ResolveInstance>;

  createCallableResolver<ResolveInstance>(
    registry: RegistryInterface,
    callable: Callable<ResolveInstance>,
  ): ResolverInterface<ResolveInstance>;

  createClassResolver<ResolveInstance>(
    registry: RegistryInterface,
    constructor: Constructor<ResolveInstance>,
  ): ResolverInterface<ResolveInstance>;

  createConstantResolver<ResolveInstance>(
    registry: RegistryInterface,
    constant: unknown,
  ): ResolverInterface<ResolveInstance>;
};

export type ResolverScope =
  | "container"
  | "resolver"
  | "singleton"
  | "transient";
