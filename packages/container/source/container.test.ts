import { expect } from "chai";
import { Container } from "./container.js";
import { ResolverError } from "./errors/resolver.error.js";
import { Registry } from "./registry.js";
import { BindingKeyResolver } from "./resolvers/binding-key-resolver.js";
import { BindingTagResolver } from "./resolvers/binding-tag-resolver.js";
import { CallableResolver } from "./resolvers/callable-resolver.js";
import { ClassResolver } from "./resolvers/class-resolver.js";
import { ConstantResolver } from "./resolvers/constant-resolver.js";
import { Scope } from "./scope.js";

describe("Container", function () {
  let container: Container;
  beforeEach(() => (container = new Container()));

  describe("get registry()", function () {
    it("should return registry", function () {
      const registry = container.registry;
      expect(registry).to.be.an.instanceOf(Registry);
    });
  });

  describe("get scope()", function () {
    it("should return scope", function () {
      const scope = container.scope;
      expect(scope).to.be.an.instanceOf(Scope);
    });
  });

  describe("#bind(bindingKey).toCallable(callable)", function () {
    it("should return callable resolver", function () {
      const callableResolver = container.bind("key").toCallable(() => true);
      expect(callableResolver).to.be.an.instanceOf(CallableResolver);
    });
  });

  describe("#bind(bindingKey).toClass(constructor)", function () {
    it("should return class resolver", function () {
      const classResolver = container.bind("key").toClass(Date);
      expect(classResolver).to.be.an.instanceOf(ClassResolver);
    });
  });

  describe("#bind(bindingKey).toConstant(constant)", function () {
    it("should return constant resolver", function () {
      const constantResolver = container.bind("key").toConstant(true);
      expect(constantResolver).to.be.an.instanceOf(ConstantResolver);
    });
  });

  describe("#bind(bindingKey).toKey(targetKey)", function () {
    it("should return binding key resolver", function () {
      const bindingKeyResolver = container.bind("key").toKey("alias");
      expect(bindingKeyResolver).to.be.an.instanceOf(BindingKeyResolver);
    });
  });

  describe("#bind(bindingKey).toTag(bindingTag)", function () {
    it("should return binding tag resolver", function () {
      const bindingTagREsolver = container.bind("key").toTag("tag");
      expect(bindingTagREsolver).to.be.an.instanceOf(BindingTagResolver);
    });
  });

  describe("#bound(bindingKey)", function () {
    context("when there is binding", function () {
      beforeEach(() => container.bind("key").toClass(Date));
      it("should return true", function () {
        const hasBinding = container.bound("key");
        expect(hasBinding).to.be.true;
      });
    });
    context("when there is no binding", function () {
      it("should return false", function () {
        const hasBinding = container.bound("key");
        expect(hasBinding).to.be.false;
      });
    });
  });

  describe("#call(callable, ...args)", function () {
    it("should return callable result", function () {
      const result = container.call(() => new Date());
      expect(result).to.be.an.instanceOf(Date);
    });
  });

  describe("#create(constructor, ...args)", function () {
    it("should return constructor instance", function () {
      const result = container.create(Date);
      expect(result).to.be.an.instanceOf(Date);
    });
  });

  describe("#fork()", function () {
    it("should return fork", function () {
      const fork = container.fork();
      expect(fork).to.be.an.instanceOf(Container);
      expect(fork).to.not.equal(container);
    });
  });

  describe("#resolve(bindingKey, ...args)", function () {
    context("when there is key binding", function () {
      beforeEach(() => {
        container.bind(Date).toClass(Date).setBindingTags("tag0", "tag1");
      });
      it("should return resolve instance", function () {
        const instance = container.resolve(Date);
        expect(instance).to.be.an.instanceOf(Date);
      });
    });
    context("when there is no key binding", function () {
      it("should throw resolver error", function () {
        const runFn = () => container.resolve(Date);
        expect(runFn).to.throw(ResolverError);
      });
    });
  });

  describe("#resolveTag(bindingTag)", function () {
    context("when there is tag binding", function () {
      beforeEach(() => {
        container.bind(Date).toClass(Date).setBindingTags("tag0", "tag1");
      });
      it("should return resolve instance array", function () {
        const instances = container.resolveTag("tag0");
        expect(instances).to.be.an("array");
        expect(instances[0]).to.be.an.instanceOf(Date);
      });
    });
    context("when there is no tag binding", function () {
      it("should return empty array", function () {
        const instances = container.resolveTag("tag0");
        expect(instances).to.be.an("array");
        expect(instances).to.be.empty;
      });
    });
  });

  describe("#unbind(bindingKey)", function () {
    context("when there is binding", function () {
      beforeEach(() => container.bind("key").toClass(Date));
      it("should return self", function () {
        const self = container.unbind("key");
        expect(self).to.equal(container);
      });
    });
    context("when there is no binding", function () {
      it("should return self", function () {
        const self = container.unbind("key");
        expect(self).to.equal(container);
      });
    });
  });
});
