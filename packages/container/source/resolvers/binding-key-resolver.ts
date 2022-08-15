import { BindingKey } from "../contracts/common.contract.js";
import { RegistryInterface } from "../contracts/registry.contract.js";
import { ScopeInterface } from "../contracts/scope.contract.js";
import { ResolverError } from "../errors/resolver.error.js";
import { BaseResolver } from "./base-resolver.js";

export class BindingKeyResolver extends BaseResolver {
  protected _resolveKey: BindingKey;

  public constructor(registry: RegistryInterface, bindingKey: BindingKey) {
    super(registry);
    this._resolveKey = bindingKey;
  }

  public resolve<Instance>(
    scope: ScopeInterface,
    ...args: unknown[]
  ): Instance {
    const resolveKey = this._resolveKey;
    const resolver = this._registry.getResolverByKey(resolveKey);
    if (typeof resolver === "undefined") {
      const resolveKeyName =
        typeof resolveKey !== "string"
          ? typeof resolveKey !== "symbol"
            ? `Class(${resolveKey.name})`
            : `Symbol(${resolveKey.toString()})`
          : `"${resolveKey}"`;

      const context = `Resolving instance.`;
      const problem = `Binding not found at ${resolveKeyName}.`;
      const solution = `Please bind to key before resolve.`;
      throw new ResolverError(`${context} ${problem} ${solution}`);
    }

    const instance = resolver.resolve<Instance>(scope, ...args);
    if (resolver.scope === "transient") return instance;

    const cache = scope[resolver.scope];
    return !cache.has(resolveKey)
      ? (cache.set(resolveKey, instance).get(resolveKey) as Instance)
      : (cache.get(resolveKey) as Instance);
  }
}
