import { BindingKey, Constructor } from "../contracts/common.contract.js";
import { RegistryInterface } from "../contracts/registry.contract.js";
import { ResolverInterface } from "../contracts/resolver.contract.js";
import { ScopeInterface } from "../contracts/scope.contract.js";
import { BaseResolver } from "./base-resolver.js";

export class ClassResolver extends BaseResolver {
  protected _constructor: Function;

  public constructor(registry: RegistryInterface, constructor: Function) {
    super(registry);
    this._constructor = constructor;
  }

  public resolve<Instance>(
    scope: ScopeInterface,
    ...args: unknown[]
  ): Instance {
    const toInstance = (resolver: ResolverInterface): unknown =>
      resolver.resolve(scope);
    const toResolver = (bindingKey: BindingKey): ResolverInterface =>
      this._registry.createBindingKeyResolver(bindingKey);
    const constructor = this._constructor as Constructor<Instance>;
    const constructorArgs = this._dependencies
      .map(toResolver)
      .map(toInstance)
      .concat(...args);
    return new constructor(...constructorArgs);
  }
}
