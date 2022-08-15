import { expect } from "chai";
import { Registry } from "../registry.js";
import { Scope } from "../scope.js";
import { ClassResolver } from "./class-resolver.js";

describe("ClassResolver", function () {
  let registry: Registry;
  let resolver: ClassResolver;
  beforeEach(function () {
    registry = new Registry();
    resolver = new ClassResolver(registry, Date);
  });

  describe("#resolve(scope, ...args)", function () {
    it("should return instance", function () {
      const scope = new Scope();
      const instance = resolver.resolve(scope);
      expect(instance).to.be.an.instanceOf(Date);
    });
  });
});
