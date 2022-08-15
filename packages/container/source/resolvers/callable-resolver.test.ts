import { expect } from "chai";
import { Callable } from "../contracts/common.contract.js";
import { Registry } from "../registry.js";
import { Scope } from "../scope.js";
import { CallableResolver } from "./callable-resolver.js";

const callables: Callable[] = [
  [Date, "getTime"],
  [new Date(), "getTime"],
  () => new Date().getTime(),
];
callables.forEach((callable) => {
  const callableName =
    typeof callable !== "function"
      ? typeof callable[0] !== "object"
        ? "binding"
        : "object"
      : "function";
  describe(`CallableResolver (${callableName})`, function () {
    let registry: Registry;
    let resolver: CallableResolver;
    beforeEach(() => (registry = new Registry()));
    beforeEach(() => (resolver = new CallableResolver(registry, callable)));

    describe("#resolve(scope, ...args)", function () {
      beforeEach(() => {
        registry.createConstantResolver(Date.now()).setBindingKey("time");
        registry.createClassResolver(Date).setBindingKey(Date);
        resolver.setDependencies("time");
      });
      it("should return instance", function () {
        const scope = new Scope();
        const instance = resolver.resolve(scope);
        expect(instance).to.be.a("number");
      });
    });
  });
});
