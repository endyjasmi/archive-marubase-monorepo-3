import { Map as HAMTMap, Set as HAMTSet } from "immutable";
import { BindingKey, BindingTag, Callable } from "./common.contract.js";
import { ResolverFactory, ResolverInterface } from "./resolver.contract.js";

export interface RegistryInterface {
  readonly bindingKeyMap: HAMTMap<BindingKey, ResolverInterface>;

  readonly bindingTagMap: HAMTMap<BindingTag, HAMTSet<ResolverInterface>>;

  readonly resolverFactory: ResolverFactory;

  createBindingKeyResolver(bindingKey: BindingKey): ResolverInterface;

  createBindingTagResolver(bindingTag: BindingTag): ResolverInterface;

  createCallableResolver(callable: Callable<unknown>): ResolverInterface;

  createClassResolver(constructor: Function): ResolverInterface;

  createConstantResolver(constant: unknown): ResolverInterface;

  fork(): this;

  getResolverByKey(bindingKey: BindingKey): ResolverInterface | undefined;

  getResolverByTag(bindingTag: BindingTag): ResolverInterface[];

  setResolverByKey(bindingKey: BindingKey, resolver: ResolverInterface): this;

  setResolverByTag(bindingTag: BindingTag, resolver: ResolverInterface): this;

  unsetResolverByKey(bindingKey: BindingKey): this;

  unsetResolverByTag(bindingTag: BindingTag, resolver: ResolverInterface): this;
}
