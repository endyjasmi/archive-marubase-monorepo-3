import { BindingKey, BindingTag } from "../contracts/common.contract.js";
import { RegistryInterface } from "../contracts/registry.contract.js";
import {
  ResolverInterface,
  ResolveScope,
} from "../contracts/resolver.contract.js";
import { ScopeInterface } from "../contracts/scope.contract.js";
import { ResolverError } from "../errors/resolver.error.js";

export class BaseResolver implements ResolverInterface {
  protected _bindingKey?: BindingKey;

  protected _bindingTagSet = new Set<BindingTag>();

  protected _dependencies: BindingKey[] = [];

  protected _registry: RegistryInterface;

  protected _scope: ResolveScope = "transient";

  public constructor(registry: RegistryInterface) {
    this._registry = registry;
  }

  public get bindingKey(): BindingKey | undefined {
    return this._bindingKey;
  }

  public get bindingTags(): BindingTag[] {
    return Array.from(this._bindingTagSet);
  }

  public get dependencies(): BindingKey[] {
    return this._dependencies;
  }

  public get registry(): RegistryInterface {
    return this._registry;
  }

  public get scope(): ResolveScope {
    return this._scope;
  }

  public clearBindingKey(): this {
    if (typeof this._bindingKey === "undefined") return this;

    this._registry.unsetResolverByKey(this._bindingKey);
    delete this._bindingKey;
    return this;
  }

  public clearBindingTags(...bindingTags: BindingTag[]): this {
    if (this._bindingTagSet.size < 1) return this;

    if (bindingTags.length < 1) {
      for (const bindingTag of this._bindingTagSet)
        this._registry.unsetResolverByTag(bindingTag, this);

      this._bindingTagSet.clear();
      return this;
    }

    for (const bindingTag of bindingTags) {
      this._registry.unsetResolverByTag(bindingTag, this);
      this._bindingTagSet.delete(bindingTag);
    }

    return this;
  }

  public clearDependencies(): this {
    if (this._dependencies.length < 1) return this;

    this._dependencies.splice(0, this._dependencies.length);
    return this;
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  public resolve<Result>(scope: ScopeInterface, ...args: unknown[]): Result {
    const context = `Resolving instance.`;
    const problem = `Method not implemented.`;
    const solution = `Please extends BaseResolver and implement the resolve method.`;
    throw new ResolverError(`${context} ${problem} ${solution}`);
  }

  public setBindingKey(bindingKey: BindingKey): this {
    if (typeof this._bindingKey !== "undefined") this.clearBindingKey();

    this._registry.setResolverByKey(bindingKey, this);
    this._bindingKey = bindingKey;
    return this;
  }

  public setBindingTags(...bindingTags: BindingTag[]): this {
    if (this._bindingTagSet.size > 0) this.clearBindingTags();

    for (const bindingTag of bindingTags) {
      this._registry.setResolverByTag(bindingTag, this);
      this._bindingTagSet.add(bindingTag);
    }

    return this;
  }

  public setDependencies(...dependencies: BindingKey[]): this {
    this._dependencies.splice(0, this._dependencies.length, ...dependencies);
    return this;
  }

  public setScope(scope: ResolveScope): this {
    this._scope = scope;
    return this;
  }
}
