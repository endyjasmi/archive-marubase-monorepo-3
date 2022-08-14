import {
  BindingKey,
  BindingTag,
  Callable,
  Constructor,
} from "./common.contract.js";
import { RegistryInterface } from "./registry.contract.js";
import { ResolverInterface } from "./resolver.contract.js";
import { ScopeInterface } from "./scope.contract.js";

export interface ContainerInterface {
  readonly registry: RegistryInterface;

  readonly scope: ScopeInterface;

  bind(bindingKey: BindingKey): ContainerBinding;

  bound(bindingKey: BindingKey): boolean;

  call<ResolveInstance>(
    callable: Callable<ResolveInstance>,
    ...args: unknown[]
  ): ResolveInstance;

  create<ResolveInstance>(
    constructor: Constructor<ResolveInstance>,
    ...args: unknown[]
  ): ResolveInstance;

  fork(): this;

  resolve<ResolveInstance>(
    bindingKey: BindingKey,
    ...args: unknown[]
  ): ResolveInstance;

  resolveTag<ResolveInstance>(
    bindingTag: BindingTag,
    ...args: unknown[]
  ): ResolveInstance;

  unbind(bindingKey: BindingKey): this;
}

export type ContainerBinding = {
  to<ResolveInstance>(
    constructor: Constructor<ResolveInstance>,
  ): ResolverInterface<ResolveInstance>;

  toAlias<ResolveInstance>(
    aliasKey: BindingKey,
  ): ResolverInterface<ResolveInstance>;

  toCallable<ResolveInstance>(
    callable: Callable<ResolveInstance>,
  ): ResolverInterface<ResolveInstance>;

  toConstant<ResolveInstance>(
    constant: ResolveInstance,
  ): ResolverInterface<ResolveInstance>;

  toTag<ResolveInstance>(
    bindingTag: BindingTag,
  ): ResolverInterface<ResolveInstance>;
};
