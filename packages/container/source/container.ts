import {
  BindingKey,
  BindingTag,
  Callable,
  Constructor,
} from "./contracts/common.contract.js";
import {
  ContainerBinding,
  ContainerInterface,
} from "./contracts/container.contract.js";
import { RegistryInterface } from "./contracts/registry.contract.js";
import { ScopeInterface } from "./contracts/scope.contract.js";
import { Registry } from "./registry.js";
import { Scope } from "./scope.js";

export class Container implements ContainerInterface {
  protected _registry: RegistryInterface;

  protected _scope: ScopeInterface;

  public constructor(registry = new Registry(), scope = new Scope()) {
    this._registry = registry;
    this._scope = scope;
  }

  public get registry(): RegistryInterface {
    return this._registry;
  }

  public get scope(): ScopeInterface {
    return this._scope;
  }

  public bind(bindingKey: BindingKey): ContainerBinding {
    return {
      toCallable: (callable: Callable) =>
        this._registry
          .createCallableResolver(callable)
          .setBindingKey(bindingKey),
      toClass: (constructor: Function) =>
        this._registry
          .createClassResolver(constructor)
          .setBindingKey(bindingKey),
      toConstant: (constant: unknown) =>
        this._registry
          .createConstantResolver(constant)
          .setBindingKey(bindingKey),
      toKey: (targetKey: BindingKey) =>
        this._registry
          .createBindingKeyResolver(targetKey)
          .setBindingKey(bindingKey),
      toTag: (bindingTag: BindingTag) =>
        this._registry
          .createBindingTagResolver(bindingTag)
          .setBindingKey(bindingKey),
    };
  }

  public bound(bindingKey: BindingKey): boolean {
    return !!this._registry.getResolverByKey(bindingKey);
  }

  public call<Result>(callable: Callable, ...args: unknown[]): Result {
    const scope = this._scope.fork("resolve");
    return this._registry
      .createCallableResolver(callable)
      .resolve(scope, ...args);
  }

  public create<Result>(constructor: Function, ...args: unknown[]): Result {
    const scope = this._scope.fork("resolve");
    return this._registry
      .createClassResolver(constructor)
      .resolve(scope, ...args);
  }

  public fork(): this {
    const constructor = this.constructor as Constructor<this>;
    const registry = this._registry.fork();
    const scope = this._scope.fork("container");
    return new constructor(registry, scope);
  }

  public resolve<Result>(bindingKey: BindingKey, ...args: unknown[]): Result {
    const scope = this._scope.fork("resolve");
    return this._registry
      .createBindingKeyResolver(bindingKey)
      .resolve(scope, ...args);
  }

  public resolveTag<Result>(bindingTag: BindingTag): Result[] {
    const scope = this._scope.fork("resolve");
    return this._registry.createBindingTagResolver(bindingTag).resolve(scope);
  }

  public unbind(bindingKey: BindingKey): this {
    const resolver = this._registry.getResolverByKey(bindingKey);
    if (typeof resolver === "undefined") return this;

    resolver.clearBindingKey().clearBindingTags();
    return this;
  }
}
