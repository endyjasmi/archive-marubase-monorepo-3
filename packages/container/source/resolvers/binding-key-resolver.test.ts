import { expect } from "chai";
import { ResolverError } from "../errors/resolver.error.js";
import { Registry } from "../registry.js";
import { Scope } from "../scope.js";
import { BindingKeyResolver } from "./binding-key-resolver.js";

describe("BindingKeyResolver", function () {
  describe("#resolve(scope, ...args)", function () {
    context("when bindingKey is Date class", function () {
      let bindingKey: typeof Date;
      let registry: Registry;
      let resolver: BindingKeyResolver;
      beforeEach(function () {
        bindingKey = Date;
        registry = new Registry();
        resolver = new BindingKeyResolver(registry, bindingKey);
      });

      context("and there is binding with 'container' scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry
            .createConstantResolver(instance)
            .setBindingKey(bindingKey)
            .setScope("container");
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("and there is binding with 'resolve' scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry
            .createConstantResolver(instance)
            .setBindingKey(bindingKey)
            .setScope("resolve");
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("and there is binding with 'singleton' scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry
            .createConstantResolver(instance)
            .setBindingKey(bindingKey)
            .setScope("singleton");
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("and there is binding with no scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry.createConstantResolver(instance).setBindingKey(bindingKey);
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("when there is no binding", function () {
        it("should throw error", function () {
          const scope = new Scope();
          const process = () => resolver.resolve(scope);
          expect(process).to.throw(ResolverError);
        });
      });
    });

    context("when bindingKey is string", function () {
      let bindingKey: string;
      let registry: Registry;
      let resolver: BindingKeyResolver;
      beforeEach(function () {
        bindingKey = "Date";
        registry = new Registry();
        resolver = new BindingKeyResolver(registry, bindingKey);
      });

      context("and there is binding with 'container' scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry
            .createConstantResolver(instance)
            .setBindingKey(bindingKey)
            .setScope("container");
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("and there is binding with 'resolve' scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry
            .createConstantResolver(instance)
            .setBindingKey(bindingKey)
            .setScope("resolve");
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("and there is binding with 'singleton' scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry
            .createConstantResolver(instance)
            .setBindingKey(bindingKey)
            .setScope("singleton");
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("and there is binding with no scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry.createConstantResolver(instance).setBindingKey(bindingKey);
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("when there is no binding", function () {
        it("should throw error", function () {
          const scope = new Scope();
          const process = () => resolver.resolve(scope);
          expect(process).to.throw(ResolverError);
        });
      });
    });

    context("when bindingKey is symbol", function () {
      let bindingKey: symbol;
      let registry: Registry;
      let resolver: BindingKeyResolver;
      beforeEach(function () {
        bindingKey = Symbol("Date");
        registry = new Registry();
        resolver = new BindingKeyResolver(registry, bindingKey);
      });

      context("and there is binding with 'container' scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry
            .createConstantResolver(instance)
            .setBindingKey(bindingKey)
            .setScope("container");
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("and there is binding with 'resolve' scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry
            .createConstantResolver(instance)
            .setBindingKey(bindingKey)
            .setScope("resolve");
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("and there is binding with 'singleton' scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry
            .createConstantResolver(instance)
            .setBindingKey(bindingKey)
            .setScope("singleton");
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("and there is binding with no scope", function () {
        beforeEach(function () {
          const instance = new Date();
          registry.createConstantResolver(instance).setBindingKey(bindingKey);
        });
        it("should return instance", function () {
          const scope = new Scope();
          const instance0 = resolver.resolve(scope);
          expect(instance0).to.be.an.instanceOf(Date);

          const instance1 = resolver.resolve(scope);
          expect(instance1).to.be.an.instanceOf(Date);
        });
      });

      context("when there is no binding", function () {
        it("should throw error", function () {
          const scope = new Scope();
          const process = () => resolver.resolve(scope);
          expect(process).to.throw(ResolverError);
        });
      });
    });
  });
});
