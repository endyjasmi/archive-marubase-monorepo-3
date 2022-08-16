import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Container } from "./container.js";
import { ProviderInterface } from "./contracts/provider.contract.js";
import { ContainerError } from "./errors/container.error.js";
import { ResolverError } from "./errors/resolver.error.js";
import { Registry } from "./registry.js";
import { BindingKeyResolver } from "./resolvers/binding-key-resolver.js";
import { BindingTagResolver } from "./resolvers/binding-tag-resolver.js";
import { CallableResolver } from "./resolvers/callable-resolver.js";
import { ClassResolver } from "./resolvers/class-resolver.js";
import { ConstantResolver } from "./resolvers/constant-resolver.js";
import { Scope } from "./scope.js";

const { expect } = chai;
chai.use(chaiAsPromised);

describe("Container", function () {
  let container: Container;
  beforeEach(() => (container = new Container()));

  describe("get booted()", function () {
    context("when invoke from root container", function () {
      context("and container is booted", function () {
        beforeEach(async () => container.boot());
        it("should return true", function () {
          const booted = container.booted;
          expect(booted).to.be.true;
        });
      });
      context("and container is not booted", function () {
        it("should return false", function () {
          const booted = container.booted;
          expect(booted).to.be.false;
        });
      });
    });
    context("when invoke from branch container", function () {
      let branch: Container;
      beforeEach(() => (branch = container.fork()));
      context("and container is booted", function () {
        beforeEach(async () => container.boot());
        it("should return true", function () {
          const booted = branch.booted;
          expect(booted).to.be.true;
        });
      });
      context("and container is not booted", function () {
        it("should return false", function () {
          const booted = branch.booted;
          expect(booted).to.be.false;
        });
      });
    });
  });

  describe("get parent()", function () {
    context("when invoke from root container", function () {
      it("should return undefined", function () {
        const parent = container.parent;
        expect(parent).to.be.undefined;
      });
    });
    context("when invoke from branch container", function () {
      it("should return parent", function () {
        const branch = container.fork();
        const parent = branch.parent;
        expect(parent).to.equal(container);
      });
    });
  });

  describe("get providers()", function () {
    context("when invoke from root container", function () {
      it("should return providers", function () {
        const providers = container.providers;
        expect(providers).to.deep.equal({});
      });
    });
    context("when invoke from branch container", function () {
      it("should return providers", function () {
        const branch = container.fork();
        const providers = branch.providers;
        expect(providers).to.deep.equal({});
      });
    });
  });

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

  describe("#boot()", function () {
    context("when container is not booted", function () {
      context("and there is provider", function () {
        let provider: ProviderInterface;
        beforeEach(() => (provider = {}));
        beforeEach(() => container.install("test", provider));
        context("with boot method", function () {
          beforeEach(
            () =>
              (provider.boot = async (): Promise<void> => Promise.resolve()),
          );
          it("should run boot", async function () {
            await container.boot();
          });
        });
        context("with no boot method", function () {
          it("should run boot", async function () {
            await container.boot();
          });
        });
      });
      context("and there is no provider", function () {
        it("should run boot", async function () {
          await container.boot();
        });
      });
    });
    context("when container is booted", function () {
      beforeEach(async () => container.boot());
      it("should run boot", async function () {
        await container.boot();
      });
    });
    context("when invoke from branch", function () {
      it("should throw container error", async function () {
        const branch = container.fork();
        const promise = branch.boot();
        return expect(promise).to.eventually.rejectedWith(ContainerError);
      });
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

  describe("#install(name, provider)", function () {
    let provider: ProviderInterface;
    beforeEach(() => (provider = {}));
    context("when container is booted", function () {
      beforeEach(async () => container.boot());
      context("and there is provider", function () {
        beforeEach(() => container.install("test", provider));
        it("should throw container error", function () {
          const runFn = (): unknown => container.install("test", provider);
          expect(runFn).to.throw(ContainerError);
        });
      });
      context("and there is no provider", function () {
        context("and supplied provider with boot method", function () {
          beforeEach(
            () =>
              (provider.boot = async (): Promise<void> => Promise.resolve()),
          );
          it("should return self", function () {
            const self = container.install("test", provider);
            expect(self).to.equal(container);
          });
        });
        context("and supplied provider with no boot method", function () {
          it("should return self", function () {
            const self = container.install("test", provider);
            expect(self).to.equal(container);
          });
        });
      });
    });
    context("when container is not booted", function () {
      context("and there is provider", function () {
        beforeEach(() => container.install("test", provider));
        it("should throw container error", function () {
          const runFn = (): unknown => container.install("test", provider);
          expect(runFn).to.throw(ContainerError);
        });
      });
      context("and there is no provider", function () {
        context("and supplied provider with install method", function () {
          beforeEach(() => (provider.install = (): unknown => undefined));
          it("should return self", function () {
            const self = container.install("test", provider);
            expect(self).to.equal(container);
          });
        });
        context("and supplied provider with no install method", function () {
          it("should return self", function () {
            const self = container.install("test", provider);
            expect(self).to.equal(container);
          });
        });
      });
    });
    context("when invoke from branch container", function () {
      it("should throw container error", function () {
        const branch = container.fork();
        const runFn = (): unknown => branch.install("test", provider);
        expect(runFn).to.throw(ContainerError);
      });
    });
  });

  describe("#installed(name)", function () {
    context("when invoke from root container", function () {
      context("when there is provider", function () {
        let provider: ProviderInterface;
        beforeEach(() => (provider = {}));
        beforeEach(() => container.install("test", provider));
        it("should return true", function () {
          const installed = container.installed("test");
          expect(installed).to.be.true;
        });
      });
      context("when there is no provider", function () {
        it("should return false", function () {
          const installed = container.installed("test");
          expect(installed).to.be.false;
        });
      });
    });
    context("when invoke from branch container", function () {
      let branch: Container;
      beforeEach(() => (branch = container.fork()));
      context("when there is provider", function () {
        let provider: ProviderInterface;
        beforeEach(() => (provider = {}));
        beforeEach(() => container.install("test", provider));
        it("should return true", function () {
          const installed = branch.installed("test");
          expect(installed).to.be.true;
        });
      });
      context("when there is no provider", function () {
        it("should return false", function () {
          const installed = branch.installed("test");
          expect(installed).to.be.false;
        });
      });
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
        const runFn = (): unknown => container.resolve(Date);
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

  describe("#shutdown()", function () {
    context("when container is booted", function () {
      beforeEach(async () => container.boot());
      context("and there is provider", function () {
        let provider: ProviderInterface;
        beforeEach(() => (provider = {}));
        beforeEach(() => container.install("test", provider));
        context("with shutdown method", function () {
          beforeEach(
            () =>
              (provider.shutdown = async (): Promise<void> =>
                Promise.resolve()),
          );
          it("should run shutdown", async function () {
            await container.shutdown();
          });
        });
        context("with no shutdown method", function () {
          it("should run shutdown", async function () {
            await container.shutdown();
          });
        });
      });
      context("and there is no provider", function () {
        it("should run shutdown", async function () {
          await container.shutdown();
        });
      });
    });
    context("when container is not booted", function () {
      it("should run shutdown", async function () {
        await container.shutdown();
      });
    });
    context("when invoke from branch", function () {
      it("should run shutdown", async function () {
        const branch = container.fork();
        const promise = branch.shutdown();
        return expect(promise).to.eventually.rejectedWith(ContainerError);
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

  describe("#uninstall(name)", function () {
    context("when container is booted", function () {
      beforeEach(async () => container.boot());
      context("and there is provider", function () {
        let provider: ProviderInterface;
        beforeEach(() => (provider = {}));
        beforeEach(() => container.install("test", provider));
        context("with shutdown method", function () {
          beforeEach(
            () =>
              (provider.shutdown = async (): Promise<void> =>
                Promise.resolve()),
          );
          it("should return self", function () {
            const self = container.uninstall("test");
            expect(self).to.equal(container);
          });
        });
        context("with no shutdown method", function () {
          it("should return self", function () {
            const self = container.uninstall("test");
            expect(self).to.equal(container);
          });
        });
        context("with shutdown and uninstall method", function () {
          beforeEach(
            () =>
              (provider.shutdown = async (): Promise<void> =>
                Promise.resolve()),
          );
          beforeEach(() => (provider.uninstall = (): unknown => undefined));
          it("should return self", function () {
            const self = container.uninstall("test");
            expect(self).to.equal(container);
          });
        });
      });
      context("and there is no provider", function () {
        it("should return self", function () {
          const self = container.uninstall("test");
          expect(self).to.equal(container);
        });
      });
    });
    context("when container is not booted", function () {
      context("and there is provider", function () {
        let provider: ProviderInterface;
        beforeEach(() => (provider = {}));
        beforeEach(() => container.install("test", provider));
        context("with uninstall method", function () {
          beforeEach(() => (provider.uninstall = (): unknown => undefined));
          it("should return self", function () {
            const self = container.uninstall("test");
            expect(self).to.equal(container);
          });
        });
        context("with no uninstall method", function () {
          it("should return self", function () {
            const self = container.uninstall("test");
            expect(self).to.equal(container);
          });
        });
      });
      context("and there is no provider", function () {
        it("should return self", function () {
          const self = container.uninstall("test");
          expect(self).to.equal(container);
        });
      });
    });
    context("when invoke from branch", function () {
      it("should throw container error", function () {
        const branch = container.fork();
        const runFn = (): unknown => branch.uninstall("test");
        expect(runFn).to.throw(ContainerError);
      });
    });
  });
});
