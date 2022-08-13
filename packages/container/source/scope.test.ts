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
      const returnCache = scope.container;
      expect(returnCache).to.be.an.instanceOf(Cache);
    });
  });

  describe("get resolve", function () {
    it("should return cache", function () {
      const returnCache = scope.resolve;
      expect(returnCache).to.be.an.instanceOf(Cache);
    });
  });

  describe("get singleton", function () {
    it("should return cache", function () {
      const returnCache = scope.singleton;
      expect(returnCache).to.be.an.instanceOf(Cache);
    });
  });

  describe("#fork(type)", function () {
    context("when type is 'container'", function () {
      it("should return fork", function () {
        const returnFork = scope.fork("container");
        expect(returnFork).be.an.instanceOf(Scope);
      });
    });
    context("when type is 'resolve'", function () {
      it("should return fork", function () {
        const returnFork = scope.fork("resolve");
        expect(returnFork).be.an.instanceOf(Scope);
      });
    });
  });
});
