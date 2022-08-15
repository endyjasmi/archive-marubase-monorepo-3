import { expect } from "chai";
import { BindingTag } from "../contracts/common.contract.js";
import { Registry } from "../registry.js";
import { Scope } from "../scope.js";
import { BindingTagResolver } from "./binding-tag-resolver.js";

const bindingTags: BindingTag[] = [Symbol("Date"), "Date"];
bindingTags.forEach((bindingTag) => {
  const bindingTagName =
    typeof bindingTag !== "string"
      ? `Symbol(${bindingTag.toString()})`
      : bindingTag;
  describe(`BindingTagResolver (${bindingTagName})`, function () {
    let registry: Registry;
    let resolver: BindingTagResolver;
    beforeEach(() => (registry = new Registry()));
    beforeEach(() => (resolver = new BindingTagResolver(registry, bindingTag)));

    describe("#resolve(scope, ...args)", function () {
      context("when there is binding", function () {
        beforeEach(() => {
          registry
            .createClassResolver(Date)
            .setBindingKey(Date)
            .setBindingTags(bindingTag);
        });
        it("should return instance array", function () {
          const scope = new Scope();
          const instances = resolver.resolve<Date[]>(scope);
          expect(instances).to.be.an("array");
          expect(instances[0]).to.be.an.instanceOf(Date);
        });
      });
      context("when there is no binding", function () {
        it("should return empty array", function () {
          const scope = new Scope();
          const instances = resolver.resolve<Date[]>(scope);
          expect(instances).to.be.an("array");
          expect(instances).to.be.empty;
        });
      });
    });
  });
});
