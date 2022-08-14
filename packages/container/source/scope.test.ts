import { expect } from "chai";
import { Cache } from "./cache.js";
import { Scope } from "./scope.js";

describe("Scope", function () {
  let scope: Scope;
  beforeEach(function () {
    scope = new Scope();
  });

  describe("get container", function () {
    it("should return cache", function () {
      const cache = scope.container;
      expect(cache).to.be.an.instanceOf(Cache);
    });
  });

  describe("get resolve", function () {
    it("should return cache", function () {
      const cache = scope.container;
      expect(cache).to.be.an.instanceOf(Cache);
    });
  });

  describe("get singleton", function () {
    it("should return cache", function () {
      const cache = scope.container;
      expect(cache).to.be.an.instanceOf(Cache);
    });
  });

  describe("#fork(type)", function () {
    context("when type is 'container'", function () {
      it("should return fork", function () {
        const fork = scope.fork("container");
        expect(fork).be.an.instanceOf(Scope);
        expect(fork).to.not.equal(scope);
      });
    });
    context("when type is 'resolve'", function () {
      it("should return fork", function () {
        const fork = scope.fork("resolve");
        expect(fork).be.an.instanceOf(Scope);
        expect(fork).to.not.equal(scope);
      });
    });
  });
});
