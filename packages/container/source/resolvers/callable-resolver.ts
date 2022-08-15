import {
  BindingKey,
  Callable,
  Instance,
} from "../contracts/common.contract.js";
import { RegistryInterface } from "../contracts/registry.contract.js";
import { ResolverInterface } from "../contracts/resolver.contract.js";
import { ScopeInterface } from "../contracts/scope.contract.js";
import { BaseResolver } from "./base-resolver.js";

export class CallableResolver extends BaseResolver {
  protected _callable: Callable;

  public constructor(registry: RegistryInterface, callable: Callable) {
    super(registry);
    this._callable = callable;
  }

  public resolve<Result>(scope: ScopeInterface, ...args: unknown[]): Result {
    const toInstance = (resolver: ResolverInterface): unknown =>
      resolver.resolve(scope);
    const toResolver = (bindingKey: BindingKey): ResolverInterface =>
      this._registry.createBindingKeyResolver(bindingKey);
    const callableArgs = this._dependencies
      .map(toResolver)
      .map(toInstance)
      .concat(...args);
    if (typeof this._callable === "function")
      return this._callable(...callableArgs) as Result;

    const [bindingKeyOrInstance, methodName] = this._callable;
    try {
      const bindingKey = bindingKeyOrInstance as BindingKey;
      const instance = this._registry
        .createBindingKeyResolver(bindingKey)
        .resolve<Instance<Result>>(scope);
      return instance[methodName](...callableArgs);
    } catch (error) {
      const instance = bindingKeyOrInstance as Instance<Result>;
      return instance[methodName](...callableArgs);
    }
  }
}
