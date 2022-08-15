import { expect } from "chai";
import { Registry } from "../registry.js";
import { ConstantResolver } from "./constant-resolver.js";

describe("ConstantResolver", function () {
  let registry: Registry;
  let resolver: ConstantResolver;
  beforeEach(function () {
    registry = new Registry();
    resolver = new ConstantResolver(registry, new Date());
  });

  describe("#resolve(scope)", function () {
    it("should return instance", function () {
      const instance = resolver.resolve();
      expect(instance).to.be.an.instanceOf(Date);
    });
  });
});
