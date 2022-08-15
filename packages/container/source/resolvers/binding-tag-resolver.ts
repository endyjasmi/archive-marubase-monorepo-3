import { BindingTag } from "../contracts/common.contract.js";
import { RegistryInterface } from "../contracts/registry.contract.js";
import { ResolverInterface } from "../contracts/resolver.contract.js";
import { ScopeInterface } from "../contracts/scope.contract.js";
import { BaseResolver } from "./base-resolver.js";

export class BindingTagResolver extends BaseResolver {
  protected _resolveTag: BindingTag;

  public constructor(registry: RegistryInterface, bindingTag: BindingTag) {
    super(registry);
    this._resolveTag = bindingTag;
  }

  public resolve<Result>(scope: ScopeInterface): Result {
    const toInstance = (resolver: ResolverInterface): unknown =>
      resolver.resolve(scope);
    return this._registry
      .getResolverByTag(this._resolveTag)
      .map(toInstance) as unknown as Result;
  }
}
