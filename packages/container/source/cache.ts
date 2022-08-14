import { Map as ImmutableMap } from "immutable";
import { CacheInterface } from "./contracts/cache.contract.js";
import { BindingKey, Constructor } from "./contracts/common.contract.js";

export class Cache implements CacheInterface {
  protected _storeMap: ImmutableMap<BindingKey, unknown>;

  public constructor(storeMap?: ImmutableMap<BindingKey, unknown>) {
    this._storeMap = storeMap ?? ImmutableMap();
  }

  public [Symbol.iterator](): IterableIterator<[BindingKey, unknown]> {
    return this._storeMap[Symbol.iterator]();
  }

  public delete(bindingKey: BindingKey): this {
    this._storeMap = this._storeMap.delete(bindingKey);
    return this;
  }

  public entries(): IterableIterator<[BindingKey, unknown]> {
    return this._storeMap.entries();
  }

  public fork(): this {
    const constructor = this.constructor as Constructor<this>;
    return new constructor(this._storeMap);
  }

  public get(bindingKey: BindingKey): unknown {
    return this._storeMap.get(bindingKey);
  }

  public has(bindingKey: BindingKey): boolean {
    return this._storeMap.has(bindingKey);
  }

  public keys(): IterableIterator<BindingKey> {
    return this._storeMap.keys();
  }

  public set(bindingKey: BindingKey, value: unknown): this {
    this._storeMap = this._storeMap.set(bindingKey, value);
    return this;
  }

  public values(): IterableIterator<unknown> {
    return this._storeMap.values();
  }
}
