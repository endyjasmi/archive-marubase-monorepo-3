import { Map as ImmutableMap, Set as ImmutableSet } from "immutable";
import {
  BindingKey,
  BindingTag,
  Callable,
  Constructor,
} from "./common.contract.js";
import { ResolverFactory, ResolverInterface } from "./resolver.contract.js";

export interface RegistryInterface {
  readonly bindingKeyMap: ImmutableMap<BindingKey, ResolverInterface<unknown>>;

  readonly bindingKeys: BindingKey[];

  readonly bindingTagMap: ImmutableMap<
    BindingTag,
    ImmutableSet<ResolverInterface<unknown>>
  >;

  readonly bindingTags: BindingTag[];

  readonly factory: ResolverFactory;

  createBindingKeyResolver<ResolveInstance>(
    bindingKey: BindingKey,
  ): ResolverInterface<ResolveInstance>;

  createBindingTagResolver<ResolveInstance>(
    bindingTag: BindingTag,
  ): ResolverInterface<ResolveInstance>;

  createCallableResolver<ResolveInstance>(
    callable: Callable<ResolveInstance>,
  ): ResolverInterface<ResolveInstance>;

  createClassResolver<ResolveInstance>(
    constructor: Constructor<ResolveInstance>,
  ): ResolverInterface<ResolveInstance>;

  createConstantResolver<ResolveInstance>(
    constant: ResolveInstance,
  ): ResolverInterface<ResolveInstance>;

  deleteResolverByKey(bindingKey: BindingKey): this;

  deleteResolverByTag<ResolveInstance>(
    bindingTag: BindingTag,
    resolver: ResolverInterface<ResolveInstance>,
  ): this;

  fork(): this;

  getResolverByKey<ResolveInstance>(
    bindingKey: BindingKey,
  ): ResolverInterface<ResolveInstance> | undefined;

  getResolverByTag<ResolveInstance>(
    bindingTag: BindingTag,
  ): ResolverInterface<ResolveInstance>[];

  setResolverByKey<ResolveInstance>(
    bindingKey: BindingKey,
    resolver: ResolverInterface<ResolveInstance>,
  ): this;

  setResolverByTag<ResolveInstance>(
    bindingTag: BindingTag,
    resolver: ResolverInterface<ResolveInstance>,
  ): this;
}
