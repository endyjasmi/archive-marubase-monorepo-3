import { expect } from "chai";
import { Map as ImmutableMap } from "immutable";
import { Cache } from "./cache.js";

describe("Cache", function () {
  let cache: Cache;
  beforeEach(function () {
    cache = new Cache();
  });

  describe("get storeMap", function () {
    it("should return store map", function () {
      const returnStoreMap = cache.storeMap;
      expect(returnStoreMap).to.be.an.instanceOf(ImmutableMap);
    });
  });

  describe("#delete(bindingKey)", function () {
    context("when there is value", function () {
      beforeEach(function () {
        cache.set("key", "value");
      });
      it("should return self", function () {
        const returnSelf = cache.delete("key");
        expect(returnSelf).to.equal(cache);
      });
    });
    context("when there is no value", function () {
      it("should return self", function () {
        const returnSelf = cache.delete("key");
        expect(returnSelf).to.equal(cache);
      });
    });
  });

  describe("#fork()", function () {
    it("should return fork", function () {
      const returnFork = cache.fork();
      expect(returnFork).to.not.equal(cache);
    });
  });

  describe("#get(bindingKey)", function () {
    context("when there is value", function () {
      beforeEach(function () {
        cache.set("key", "value");
      });
      it("should return value", function () {
        const returnValue = cache.get("key");
        expect(returnValue).to.equal("value");
      });
    });
    context("when there is no value", function () {
      it("should return undefined", function () {
        const returnValue = cache.get("key");
        expect(returnValue).to.be.undefined;
      });
    });
  });

  describe("#has(bindingKey)", function () {
    context("when there is value", function () {
      beforeEach(function () {
        cache.set("key", "value");
      });
      it("should return true", function () {
        const hasValue = cache.has("key");
        expect(hasValue).to.be.true;
      });
    });
    context("when there is no value", function () {
      it("should return false", function () {
        const hasValue = cache.has("key");
        expect(hasValue).to.be.false;
      });
    });
  });

  describe("#set(bindingKey, value)", function () {
    context("when there is value", function () {
      beforeEach(function () {
        cache.set("key", "value");
      });
      it("should return self", function () {
        const returnSelf = cache.set("key", "value");
        expect(returnSelf).to.equal(cache);
      });
    });
    context("when there is no value", function () {
      it("should return self", function () {
        const returnSelf = cache.set("key", "value");
        expect(returnSelf).to.equal(cache);
      });
    });
  });
});
