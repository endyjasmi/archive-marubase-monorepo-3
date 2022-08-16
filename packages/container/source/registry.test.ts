import { expect } from "chai";
import { Map as HAMTMap } from "immutable";
import { Registry } from "./registry.js";
import { BindingKeyResolver } from "./resolvers/binding-key-resolver.js";
import { BindingTagResolver } from "./resolvers/binding-tag-resolver.js";
import { CallableResolver } from "./resolvers/callable-resolver.js";
import { ClassResolver } from "./resolvers/class-resolver.js";
import { ConstantResolver } from "./resolvers/constant-resolver.js";

describe("Registry", function () {
  let registry: Registry;
  beforeEach(function () {
    registry = new Registry();
  });

  describe("get bindingKeyMap()", function () {
    it("should return binding key map", function () {
      const bindingKeyMap = registry.bindingKeyMap;
      expect(bindingKeyMap).to.be.an.instanceOf(HAMTMap);
    });
  });

  describe("get bindingTagMap()", function () {
    it("should return binding tag map", function () {
      const bindingTagMap = registry.bindingTagMap;
      expect(bindingTagMap).to.be.an.instanceOf(HAMTMap);
    });
  });

  describe("get resolverFactory()", function () {
    it("should return resolver factory", function () {
      const resolverFactory = registry.resolverFactory;
      expect(resolverFactory).to.have.property("createBindingKeyResolver");
      expect(resolverFactory).to.have.property("createBindingTagResolver");
      expect(resolverFactory).to.have.property("createCallableResolver");
      expect(resolverFactory).to.have.property("createClassResolver");
      expect(resolverFactory).to.have.property("createConstantResolver");
    });
  });

  describe("#createBindingKeyResolver(bindingKey)", function () {
    it("should return binding key resolver", function () {
      const bindingKeyResolver = registry.createBindingKeyResolver("key");
      expect(bindingKeyResolver).to.be.an.instanceOf(BindingKeyResolver);
    });
  });

  describe("#createBindingTagResolver(bindingTag)", function () {
    it("should return binding key resolver", function () {
      const bindingTagResolver = registry.createBindingTagResolver("tag");
      expect(bindingTagResolver).to.be.an.instanceOf(BindingTagResolver);
    });
  });

  describe("#createCallableResolver(callable)", function () {
    it("should return callable resolver", function () {
      const callableResolver = registry.createCallableResolver(() => true);
      expect(callableResolver).to.be.an.instanceOf(CallableResolver);
    });
  });

  describe("#createClassResolver(constructor)", function () {
    it("should return class resolver", function () {
      const classResolver = registry.createClassResolver(Date);
      expect(classResolver).to.be.an.instanceOf(ClassResolver);
    });
  });

  describe("#createConstantResolver(constant)", function () {
    it("should return constant resolver", function () {
      const constantResolver = registry.createConstantResolver(true);
      expect(constantResolver).to.be.an.instanceOf(ConstantResolver);
    });
  });

  describe("#fork()", function () {
    it("should return fork", function () {
      const fork = registry.fork();
      expect(fork).to.be.an.instanceOf(Registry);
      expect(fork).to.not.equal(registry);
    });
  });

  describe("#getResolverByKey(bindingKey)", function () {
    context("when there is key binding", function () {
      beforeEach(function () {
        registry
          .createConstantResolver(true)
          .setBindingKey("key")
          .setBindingTags("tag0", "tag1");
      });

      it("should return resolver", function () {
        const resolver = registry.getResolverByKey("key");
        expect(resolver).to.have.property("resolve");
      });
    });
    context("when there is no key binding", function () {
      it("should return undefined", function () {
        const resolver = registry.getResolverByKey("key");
        expect(resolver).to.be.undefined;
      });
    });
  });

  describe("#getResolverByTag(bindingTag)", function () {
    context("when there is tag binding", function () {
      beforeEach(function () {
        registry
          .createConstantResolver(true)
          .setBindingKey("key")
          .setBindingTags("tag0", "tag1");
      });

      it("should return resolver array", function () {
        const resolvers = registry.getResolverByTag("tag0");
        expect(resolvers).to.be.an("array");
        expect(resolvers[0]).to.have.property("resolve");
      });
    });
    context("when there is no tag binding", function () {
      it("should return empty array", function () {
        const resolvers = registry.getResolverByTag("tag0");
        expect(resolvers).to.be.an("array");
        expect(resolvers).to.be.empty;
      });
    });
  });

  describe("#setResolverByKey(bindingKey, resolver)", function () {
    context("when there is key binding", function () {
      beforeEach(function () {
        registry
          .createConstantResolver(true)
          .setBindingKey("key")
          .setBindingTags("tag0", "tag1");
      });

      it("should return self", function () {
        const resolver = new ConstantResolver(registry, true);
        const self = registry.setResolverByKey("key", resolver);
        expect(self).to.equal(registry);
      });
    });
    context("when there is no key binding", function () {
      it("should return self", function () {
        const resolver = new ConstantResolver(registry, true);
        const self = registry.setResolverByKey("key", resolver);
        expect(self).to.equal(registry);
      });
    });
  });

  describe("#setResolverByTag(bindingTag, resolver)", function () {
    context("when there is tag binding", function () {
      beforeEach(function () {
        registry
          .createConstantResolver(true)
          .setBindingKey("key")
          .setBindingTags("tag0", "tag1");
      });

      it("should return self", function () {
        const resolver = new ConstantResolver(registry, true);
        const self = registry.setResolverByTag("tag0", resolver);
        expect(self).to.equal(registry);
      });
    });
    context("when there is no tag binding", function () {
      it("should return self", function () {
        const resolver = new ConstantResolver(registry, true);
        const self = registry.setResolverByTag("tag0", resolver);
        expect(self).to.equal(registry);
      });
    });
  });

  describe("#unsetResolverByKey(bindingKey)", function () {
    context("when there is key binding", function () {
      beforeEach(function () {
        registry
          .createConstantResolver(true)
          .setBindingKey("key")
          .setBindingTags("tag0", "tag1");
      });

      it("should return self", function () {
        const self = registry.unsetResolverByKey("key");
        expect(self).to.equal(registry);
      });
    });
    context("when there is no key binding", function () {
      it("should return self", function () {
        const self = registry.unsetResolverByKey("key");
        expect(self).to.equal(registry);
      });
    });
  });

  describe("#unsetResolverByTag(bindingTag, resolver)", function () {
    context("when there is tag binding", function () {
      beforeEach(function () {
        registry
          .createConstantResolver(true)
          .setBindingKey("key")
          .setBindingTags("tag0", "tag1");
      });

      it("should return self", function () {
        const resolver = new ConstantResolver(registry, true);
        const self = registry.unsetResolverByTag("tag0", resolver);
        expect(self).to.equal(registry);
      });
    });
    context("when there is no tag binding", function () {
      it("should return self", function () {
        const resolver = new ConstantResolver(registry, true);
        const self = registry.unsetResolverByTag("tag0", resolver);
        expect(self).to.equal(registry);
      });
    });
  });
});
