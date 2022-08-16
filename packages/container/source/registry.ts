import { Map as HAMTMap, Set as HAMTSet } from "immutable";
import {
  BindingKey,
  BindingTag,
  Callable,
  Constructor,
} from "./contracts/common.contract.js";
import { RegistryInterface } from "./contracts/registry.contract.js";
import {
  ResolverFactory,
  ResolverInterface,
} from "./contracts/resolver.contract.js";
import { BindingKeyResolver } from "./resolvers/binding-key-resolver.js";
import { BindingTagResolver } from "./resolvers/binding-tag-resolver.js";
import { CallableResolver } from "./resolvers/callable-resolver.js";
import { ClassResolver } from "./resolvers/class-resolver.js";
import { ConstantResolver } from "./resolvers/constant-resolver.js";

export const DefaultResolverFactory = {
  createBindingKeyResolver(registry, bindingKey) {
    return new BindingKeyResolver(registry, bindingKey);
  },
  createBindingTagResolver(registry, bindingTag) {
    return new BindingTagResolver(registry, bindingTag);
  },
  createCallableResolver(registry, callable) {
    return new CallableResolver(registry, callable);
  },
  createClassResolver(registry, constructor) {
    return new ClassResolver(registry, constructor);
  },
  createConstantResolver(registry, constant) {
    return new ConstantResolver(registry, constant);
  },
} as ResolverFactory;

export class Registry implements RegistryInterface {
  protected _bindingKeyMap: HAMTMap<BindingKey, ResolverInterface>;

  protected _bindingTagMap: HAMTMap<BindingTag, HAMTSet<ResolverInterface>>;

  protected _resolverFactory: ResolverFactory;

  public constructor(
    bindingKeyMap: HAMTMap<BindingKey, ResolverInterface> = HAMTMap(),
    bindingTagMap: HAMTMap<BindingTag, HAMTSet<ResolverInterface>> = HAMTMap(),
    resolverFactory = DefaultResolverFactory,
  ) {
    this._bindingKeyMap = bindingKeyMap;
    this._bindingTagMap = bindingTagMap;
    this._resolverFactory = resolverFactory;
  }

  public get bindingKeyMap(): HAMTMap<BindingKey, ResolverInterface> {
    return this._bindingKeyMap;
  }

  public get bindingTagMap(): HAMTMap<BindingTag, HAMTSet<ResolverInterface>> {
    return this._bindingTagMap;
  }

  public get resolverFactory(): ResolverFactory {
    return this._resolverFactory;
  }

  public createBindingKeyResolver(bindingKey: BindingKey): ResolverInterface {
    return this._resolverFactory.createBindingKeyResolver(this, bindingKey);
  }

  public createBindingTagResolver(bindingTag: BindingTag): ResolverInterface {
    return this._resolverFactory.createBindingTagResolver(this, bindingTag);
  }

  public createCallableResolver(callable: Callable): ResolverInterface {
    return this._resolverFactory.createCallableResolver(this, callable);
  }

  public createClassResolver(constructor: Function): ResolverInterface {
    return this._resolverFactory.createClassResolver(this, constructor);
  }

  public createConstantResolver(constant: unknown): ResolverInterface {
    return this._resolverFactory.createConstantResolver(this, constant);
  }

  public fork(): this {
    const constructor = this.constructor as Constructor<this>;
    return new constructor(
      this._bindingKeyMap,
      this._bindingTagMap,
      this._resolverFactory,
    );
  }

  public getResolverByKey(
    bindingKey: BindingKey,
  ): ResolverInterface | undefined {
    return this._bindingKeyMap.get(bindingKey);
  }

  public getResolverByTag(bindingTag: BindingTag): ResolverInterface[] {
    return this._bindingTagMap
      .get(bindingTag, HAMTSet<ResolverInterface>())
      .toArray();
  }

  public setResolverByKey(
    bindingKey: BindingKey,
    resolver: ResolverInterface,
  ): this {
    this._bindingKeyMap = this._bindingKeyMap.set(bindingKey, resolver);
    return this;
  }

  public setResolverByTag(
    bindingTag: BindingTag,
    resolver: ResolverInterface,
  ): this {
    const resolverSet = this._bindingTagMap
      .get(bindingTag, HAMTSet<ResolverInterface>())
      .add(resolver);
    this._bindingTagMap = this._bindingTagMap.set(bindingTag, resolverSet);
    return this;
  }

  public unsetResolverByKey(bindingKey: BindingKey): this {
    this._bindingKeyMap = this._bindingKeyMap.delete(bindingKey);
    return this;
  }

  public unsetResolverByTag(
    bindingTag: BindingTag,
    resolver: ResolverInterface,
  ): this {
    const resolverSet = this._bindingTagMap
      .get(bindingTag, HAMTSet<ResolverInterface>())
      .delete(resolver);
    this._bindingTagMap =
      resolverSet.size > 0
        ? this._bindingTagMap.set(bindingTag, resolverSet)
        : this._bindingTagMap.delete(bindingTag);
    return this;
  }
}
