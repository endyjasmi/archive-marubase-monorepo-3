import { expect } from "chai";
import { Registry } from "../registry.js";
import { Scope } from "../scope.js";
import { BindingTagResolver } from "./binding-tag-resolver.js";

describe("BindingTagResolver", function () {
  describe("#resolve(scope)", function () {
    context("when binding tag is string", function () {
      let bindingTag: string;
      let registry: Registry;
      let resolver: BindingTagResolver;
      beforeEach(function () {
        bindingTag = "tag";
        registry = new Registry();
        resolver = new BindingTagResolver(registry, bindingTag);
      });

      it("should return instance array", function () {
        const scope = new Scope();
        const instances = resolver.resolve(scope);
        expect(instances).to.be.an("array");
      });
    });
  });
});
