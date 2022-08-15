import { expect } from "chai";
import { ForkType } from "./contracts/scope.contract.js";
import { Scope } from "./scope.js";

describe("Scope", function () {
  let scope: Scope;
  beforeEach(() => (scope = new Scope()));

  describe("get container()", function () {
    it("should return cache", function () {
      const cache = scope.container;
      expect(cache).to.be.an.instanceOf(Map);
    });
  });

  describe("get resolve()", function () {
    it("should return cache", function () {
      const cache = scope.resolve;
      expect(cache).to.be.an.instanceOf(Map);
    });
  });

  describe("get singleton()", function () {
    it("should return cache", function () {
      const cache = scope.singleton;
      expect(cache).to.be.an.instanceOf(Map);
    });
  });

  ["container", "resolve"].forEach((forkType) => {
    describe(`#fork('${forkType}')`, function () {
      it("should return fork", function () {
        const fork = scope.fork(forkType as ForkType);
        expect(fork).to.be.an.instanceOf(Scope);
        expect(fork).to.not.equal(scope);
      });
    });
  });
});
