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
import {
  ProviderInterface,
  ProviderName,
} from "./contracts/provider.contract.js";
import { RegistryInterface } from "./contracts/registry.contract.js";
import { ScopeInterface } from "./contracts/scope.contract.js";
import { ContainerError } from "./errors/container.error.js";
import { Registry } from "./registry.js";
import { Scope } from "./scope.js";

export class Container implements ContainerInterface {
  protected _booted = false;

  protected _parent?: this;

  protected _providers: Record<ProviderName, ProviderInterface> = {};

  protected _registry: RegistryInterface;

  protected _scope: ScopeInterface;

  public constructor(
    registry = new Registry(),
    scope = new Scope(),
    parent?: ContainerInterface,
  ) {
    this._parent = parent as this | undefined;
    this._registry = registry;
    this._scope = scope;
  }

  public get booted(): boolean {
    return typeof this._parent !== "undefined"
      ? this._parent.booted
      : this._booted;
  }

  public get parent(): this | undefined {
    return this._parent;
  }

  public get providers(): Record<ProviderName, ProviderInterface> {
    return typeof this._parent !== "undefined"
      ? this._parent.providers
      : this._providers;
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

  public async boot(): Promise<void> {
    if (typeof this._parent !== "undefined") {
      const context = `Booting provider.`;
      const problem = `Branch container cannot boot provider.`;
      const solution = `Please boot provider at root container.`;
      throw new ContainerError(`${context} ${problem} ${solution}`);
    }

    if (this._booted) return;

    const providers = Object.values(this._providers);
    const bootPromises: Promise<void>[] = [];
    for (const provider of providers)
      if (provider.boot) bootPromises.push(provider.boot(this));

    this._booted = true;
    await Promise.allSettled(bootPromises);
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
    return new constructor(registry, scope, this);
  }

  public install(name: ProviderName, provider: ProviderInterface): this {
    if (typeof this._parent !== "undefined") {
      const context = `Installing provider.`;
      const problem = `Branch container cannot install provider.`;
      const solution = `Please install provider at root container.`;
      throw new ContainerError(`${context} ${problem} ${solution}`);
    }

    if (name in this._providers) {
      const context = `Installing provider.`;
      const problem = `Provider already exists.`;
      const solution = `Please uninstall existing provider or install at another name.`;
      throw new ContainerError(`${context} ${problem} ${solution}`);
    }

    if (provider.install) provider.install(this);

    if (this._booted && provider.boot) provider.boot(this);

    this._providers[name] = provider;
    return this;
  }

  public installed(name: ProviderName): boolean {
    return typeof this._parent !== "undefined"
      ? this._parent.installed(name)
      : name in this.providers;
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

  public async shutdown(): Promise<void> {
    if (typeof this._parent !== "undefined") {
      const context = `Shutting down provider.`;
      const problem = `Branch container cannot shutdown provider.`;
      const solution = `Please shutdown provider at root container.`;
      throw new ContainerError(`${context} ${problem} ${solution}`);
    }

    if (!this._booted) return;

    const providers = Object.values(this._providers).reverse();
    const shutdownPromises: Promise<void>[] = [];
    for (const provider of providers)
      if (provider.shutdown) shutdownPromises.push(provider.shutdown(this));

    this._booted = false;
    await Promise.allSettled(shutdownPromises);
  }

  public unbind(bindingKey: BindingKey): this {
    const resolver = this._registry.getResolverByKey(bindingKey);
    if (typeof resolver === "undefined") return this;

    resolver.clearBindingKey().clearBindingTags();
    return this;
  }

  public uninstall(name: ProviderName): this {
    if (typeof this._parent !== "undefined") {
      const context = `Uninstalling provider.`;
      const problem = `Branch container cannot uninstall provider.`;
      const solution = `Please uninstall provider at root container.`;
      throw new ContainerError(`${context} ${problem} ${solution}`);
    }

    const provider = this._providers[name];
    if (typeof provider === "undefined") return this;

    if (this._booted && provider.shutdown) {
      provider.shutdown(this).then(() => {
        if (!provider.uninstall) return Promise.resolve();
        else provider.uninstall(this);
      });
      return this;
    }

    if (provider.uninstall) provider.uninstall(this);
    return this;
  }
}
