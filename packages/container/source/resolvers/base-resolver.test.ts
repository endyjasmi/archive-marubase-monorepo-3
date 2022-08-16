import { expect } from "chai";
import { ResolverError } from "../errors/resolver.error.js";
import { Registry } from "../registry.js";
import { Scope } from "../scope.js";
import { BaseResolver } from "./base-resolver.js";

describe("BaseResolver", function () {
  let registry: Registry;
  let resolver: BaseResolver;
  beforeEach(function () {
    registry = new Registry();
    resolver = new BaseResolver(registry);
  });

  describe("get bindingKey()", function () {
    context("when there is binding key", function () {
      beforeEach(function () {
        resolver.setBindingKey("key");
      });

      it("should return binding key", function () {
        const bindingKey = resolver.bindingKey;
        expect(bindingKey).to.equal("key");
      });
    });
    context("when there is no binding key", function () {
      it("should return undefined", function () {
        const bindingKey = resolver.bindingKey;
        expect(bindingKey).to.be.undefined;
      });
    });
  });

  describe("get bindingTags()", function () {
    context("when there is binding tags", function () {
      beforeEach(function () {
        resolver.setBindingTags("tag0", "tag1");
      });

      it("should return binding tags", function () {
        const bindingTags = resolver.bindingTags;
        expect(bindingTags).to.deep.equal(["tag0", "tag1"]);
      });
    });
    context("when there is no binding tags", function () {
      it("should return empty array", function () {
        const bindingTags = resolver.bindingTags;
        expect(bindingTags).to.deep.equal([]);
      });
    });
  });

  describe("get dependencies()", function () {
    context("when there is dependencies", function () {
      beforeEach(function () {
        resolver.setDependencies("dep0", "dep1");
      });

      it("should return dependencies", function () {
        const dependencies = resolver.dependencies;
        expect(dependencies).to.deep.equal(["dep0", "dep1"]);
      });
    });
    context("when there is no dependencies", function () {
      it("should return empty array", function () {
        const dependencies = resolver.dependencies;
        expect(dependencies).to.deep.equal([]);
      });
    });
  });

  describe("get registry()", function () {
    it("should return registry", function () {
      const registry = resolver.registry;
      expect(registry).to.be.an.instanceOf(Registry);
    });
  });

  describe("get scope()", function () {
    context("when there is scope", function () {
      beforeEach(function () {
        resolver.setScope("container");
      });

      it("should return scope", function () {
        const scope = resolver.scope;
        expect(scope).to.equal("container");
      });
    });
    context("when there is no scope", function () {
      it("should return scope", function () {
        const scope = resolver.scope;
        expect(scope).to.equal("transient");
      });
    });
  });

  describe("#clearBindingKey()", function () {
    context("when there is binding key", function () {
      beforeEach(function () {
        resolver.setBindingKey("key");
      });

      it("should return self", function () {
        const self = resolver.clearBindingKey();
        expect(self).to.equal(resolver);
      });
    });
    context("when there is no binding key", function () {
      it("should return self", function () {
        const self = resolver.clearBindingKey();
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#clearBindingTags(...bindingTags)", function () {
    context("when there is binding tags and arguments", function () {
      beforeEach(function () {
        resolver.setBindingTags("tag0", "tag1");
      });

      context("and invoke with arguments", function () {
        it("should return self", function () {
          const self = resolver.clearBindingTags("tag0", "tag1");
          expect(self).to.equal(resolver);
        });
      });
      context("and invoke with no arguments", function () {
        it("should return self", function () {
          const self = resolver.clearBindingTags();
          expect(self).to.equal(resolver);
        });
      });
    });
    context("when there is no binding tags", function () {
      it("should return self", function () {
        const self = resolver.clearBindingTags();
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#clearDependencies()", function () {
    context("when there is dependencies", function () {
      beforeEach(function () {
        resolver.setDependencies("dep0", "dep1");
      });

      it("should return self", function () {
        const self = resolver.clearDependencies();
        expect(self).to.equal(resolver);
      });
    });
    context("when there is no dependencies", function () {
      it("should return self", function () {
        const self = resolver.clearDependencies();
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#resolve(scope, ...args)", function () {
    it("should throw resolver error", function () {
      const scope = new Scope();
      const runFn = (): unknown => resolver.resolve(scope);
      expect(runFn).to.throw(ResolverError);
    });
  });

  describe("#setBindingKey(bindingKey)", function () {
    context("when there is binding key", function () {
      beforeEach(function () {
        resolver.setBindingKey("key");
      });

      it("should return self", function () {
        const self = resolver.setBindingKey("key");
        expect(self).to.equal(resolver);
      });
    });
    context("when there is no binding key", function () {
      it("should return self", function () {
        const self = resolver.setBindingKey("key");
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#setBindingTags(...bindingTags)", function () {
    context("when there is binding tags", function () {
      beforeEach(function () {
        resolver.setBindingTags("tag0", "tag1");
      });

      it("should return self", function () {
        const self = resolver.setBindingTags("tag0", "tag1");
        expect(self).to.equal(resolver);
      });
    });
    context("when there is no binding tags", function () {
      it("should return self", function () {
        const self = resolver.setBindingTags("tag0", "tag1");
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#setDependencies(...dependencies)", function () {
    context("when there is dependencies", function () {
      beforeEach(function () {
        resolver.setDependencies("dep0", "dep1");
      });

      it("should return self", function () {
        const self = resolver.setDependencies("dep0", "dep1");
        expect(self).to.equal(resolver);
      });
    });
    context("when there is no dependencies", function () {
      it("should return self", function () {
        const self = resolver.setDependencies("dep0", "dep1");
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#setScope(scope)", function () {
    context("when there is scope", function () {
      beforeEach(function () {
        resolver.setScope("container");
      });

      it("should return self", function () {
        const self = resolver.setScope("transient");
        expect(self).to.equal(resolver);
      });
    });
    context("when there is no scope", function () {
      it("should return self", function () {
        const self = resolver.setScope("transient");
        expect(self).to.equal(resolver);
      });
    });
  });
});
