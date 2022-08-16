import { expect } from "chai";
import { BindingKey } from "../contracts/common.contract.js";
import { ResolveScope } from "../contracts/resolver.contract.js";
import { ResolverError } from "../errors/resolver.error.js";
import { Registry } from "../registry.js";
import { Scope } from "../scope.js";
import { BindingKeyResolver } from "./binding-key-resolver.js";

const bindingKeys: BindingKey[] = [Date, Symbol("Date"), "Date"];
bindingKeys.forEach((bindingKey) => {
  const bindingKeyName =
    typeof bindingKey !== "string"
      ? typeof bindingKey !== "function"
        ? `Symbol(${bindingKey.toString()})`
        : `Class(${bindingKey.name})`
      : bindingKey;
  describe(`BindingKeyResolver (${bindingKeyName})`, function () {
    let registry: Registry;
    let resolver: BindingKeyResolver;
    beforeEach(function () {
      registry = new Registry();
      resolver = new BindingKeyResolver(registry, bindingKey);
    });

    describe("#resolve(scope, ...args)", function () {
      const resolveScopes: ResolveScope[] = [
        "container",
        "resolve",
        "singleton",
        "transient",
      ];
      resolveScopes.forEach((resolveScope) => {
        context(`when there is binding in ${resolveScope} scope`, function () {
          beforeEach(function () {
            registry
              .createClassResolver(Date)
              .setBindingKey(bindingKey)
              .setScope(resolveScope);
          });

          it("should return instance", function () {
            const scope = new Scope();
            const instance0 = resolver.resolve(scope);
            expect(instance0).to.be.an.instanceOf(Date);

            const instance1 = resolver.resolve(scope);
            expect(instance1).to.be.an.instanceOf(Date);
          });
        });
      });

      context("when there is no binding", function () {
        it("should throw resolver error", function () {
          const scope = new Scope();
          const runFn = (): unknown => resolver.resolve(scope);
          expect(runFn).to.throw(ResolverError);
        });
      });
    });
  });
});
