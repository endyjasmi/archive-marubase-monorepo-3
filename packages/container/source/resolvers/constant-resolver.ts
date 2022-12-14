import { RegistryInterface } from "../contracts/registry.contract.js";
import { BaseResolver } from "./base-resolver.js";

export class ConstantResolver extends BaseResolver {
  protected _constant: unknown;

  public constructor(registry: RegistryInterface, constant: unknown) {
    super(registry);
    this._constant = constant;
  }

  public resolve<Result>(): Result {
    return this._constant as Result;
  }
}
