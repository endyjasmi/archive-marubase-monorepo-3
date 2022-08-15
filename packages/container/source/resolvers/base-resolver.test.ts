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
    context("when binding key is set", function () {
      beforeEach(function () {
        resolver.setBindingKey("key");
      });
      it("should return binding key", function () {
        const bindingKey = resolver.bindingKey;
        expect(bindingKey).to.equal("key");
      });
    });
    context("when binding key is not set", function () {
      it("should return undefined", function () {
        const bindingKey = resolver.bindingKey;
        expect(bindingKey).to.be.undefined;
      });
    });
  });

  describe("get bindingTags()", function () {
    context("when binding tag is set", function () {
      beforeEach(function () {
        resolver.setBindingTags("tag0", "tag1");
      });
      it("should return binding tags", function () {
        const bindingTags = resolver.bindingTags;
        expect(bindingTags).to.deep.equal(["tag0", "tag1"]);
      });
    });
    context("when binding tag is not set", function () {
      it("should return empty array", function () {
        const bindingTags = resolver.bindingTags;
        expect(bindingTags).to.deep.equal([]);
      });
    });
  });

  describe("get dependencies()", function () {
    context("when dependencies is set", function () {
      beforeEach(function () {
        resolver.setDependencies("dep0", "dep1");
      });
      it("should return dependencies", function () {
        const dependencies = resolver.dependencies;
        expect(dependencies).to.deep.equal(["dep0", "dep1"]);
      });
    });
    context("when dependencies is not set", function () {
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
    context("when scope is set to 'container'", function () {
      beforeEach(function () {
        resolver.setScope("container");
      });
      it("should return 'container'", function () {
        const scope = resolver.scope;
        expect(scope).to.equal("container");
      });
    });
    context("when scope is set to 'resolve'", function () {
      beforeEach(function () {
        resolver.setScope("resolve");
      });
      it("should return 'resolve'", function () {
        const scope = resolver.scope;
        expect(scope).to.equal("resolve");
      });
    });
    context("when scope is set to 'singleton'", function () {
      beforeEach(function () {
        resolver.setScope("singleton");
      });
      it("should return 'singleton'", function () {
        const scope = resolver.scope;
        expect(scope).to.equal("singleton");
      });
    });
    context("when scope is not set", function () {
      it("should return 'transient'", function () {
        const scope = resolver.scope;
        expect(scope).to.equal("transient");
      });
    });
  });

  describe("#clearBindingKey()", function () {
    context("when binding key is set", function () {
      beforeEach(function () {
        resolver.setBindingKey("key");
      });
      it("should return self", function () {
        const self = resolver.clearBindingKey();
        expect(self).to.equal(resolver);
      });
    });
    context("when binding key is not set", function () {
      it("should return self", function () {
        const self = resolver.clearBindingKey();
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#clearBindingTags(...bindingTags)", function () {
    context("when binding tag is set and parameter is provided", function () {
      beforeEach(function () {
        resolver.setBindingTags("tag0", "tag1");
      });
      context("and binding tag argument is provided", function () {
        it("should return self", function () {
          const self = resolver.clearBindingTags("tag0", "tag1");
          expect(self).to.equal(resolver);
        });
      });
      context("and binding tag argument is not provided", function () {
        it("should return self", function () {
          const self = resolver.clearBindingTags();
          expect(self).to.equal(resolver);
        });
      });
    });
    context("when binding tag is not set", function () {
      it("should return self", function () {
        const self = resolver.clearBindingTags();
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#clearDependencies()", function () {
    context("when dependencies is set", function () {
      beforeEach(function () {
        resolver.setDependencies("dep0", "dep1");
      });
      it("should return self", function () {
        const self = resolver.clearDependencies();
        expect(self).to.equal(resolver);
      });
    });
    context("when dependencies is not set", function () {
      it("should return self", function () {
        const self = resolver.clearDependencies();
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#resolve(scope, ...args)", function () {
    it("should throw error", function () {
      const scope = new Scope();
      const process = () => resolver.resolve(scope);
      expect(process).to.throw(ResolverError);
    });
  });

  describe("#setBindingKey(bindingKey)", function () {
    context("when binding key is set", function () {
      beforeEach(function () {
        resolver.setBindingKey("key");
      });
      it("should return self", function () {
        const self = resolver.setBindingKey("key");
        expect(self).to.equal(resolver);
      });
    });
    context("when binding key is not set", function () {
      it("should return self", function () {
        const self = resolver.setBindingKey("key");
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#setBindingTags(...bindingTags)", function () {
    context("when binding tag is set", function () {
      beforeEach(function () {
        resolver.setBindingTags("tag0", "tag1");
      });
      it("should return self", function () {
        const self = resolver.setBindingTags("tag0", "tag1");
        expect(self).to.equal(resolver);
      });
    });
    context("when binding tag is not set", function () {
      it("should return self", function () {
        const self = resolver.setBindingTags("tag0", "tag1");
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#setDependencies(...dependencies)", function () {
    context("when dependencies is set", function () {
      beforeEach(function () {
        resolver.setDependencies("dep0", "dep1");
      });
      it("should return self", function () {
        const self = resolver.setDependencies("dep0", "dep1");
        expect(self).to.equal(resolver);
      });
    });
    context("when dependencies is not set", function () {
      it("should return self", function () {
        const self = resolver.setDependencies("dep0", "dep1");
        expect(self).to.equal(resolver);
      });
    });
  });

  describe("#setScope(scope)", function () {
    context("when binding key is set", function () {
      beforeEach(function () {
        resolver.setScope("transient");
      });
      it("should return self", function () {
        const self = resolver.setScope("transient");
        expect(self).to.equal(resolver);
      });
    });
    context("when binding key is not set", function () {
      it("should return self", function () {
        const self = resolver.setScope("transient");
        expect(self).to.equal(resolver);
      });
    });
  });
});
