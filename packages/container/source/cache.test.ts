import { expect } from "chai";
import { Cache } from "./cache.js";
import { BindingKey } from "./index.js";

describe("Cache", function () {
  let cache: Cache;
  beforeEach(function () {
    cache = new Cache();
  });

  describe("[Symbol.iterator]()", function () {
    context("when there is values", function () {
      beforeEach(function () {
        cache.set("key0", "value0");
        cache.set("key1", "value1");
      });
      it("should return iterator", function () {
        const entries: [BindingKey, unknown][] = [];
        for (const entry of cache) entries.push(entry);

        expect(entries).to.deep.equal([
          ["key0", "value0"],
          ["key1", "value1"],
        ]);
      });
    });
    context("when there is no values", function () {
      it("should return iterator", function () {
        const entries: [BindingKey, unknown][] = [];
        for (const entry of cache) entries.push(entry);

        expect(entries).to.deep.equal([]);
      });
    });
  });

  describe("#delete(bindingKey)", function () {
    context("when there is value", function () {
      beforeEach(function () {
        cache.set("key", "value");
      });
      it("should return self", function () {
        const self = cache.delete("key");
        expect(self).to.equal(cache);
      });
    });
    context("when there is no value", function () {
      it("should return self", function () {
        const self = cache.delete("key");
        expect(self).to.equal(cache);
      });
    });
  });

  describe("#entries()", function () {
    context("when there is values", function () {
      beforeEach(function () {
        cache.set("key0", "value0");
        cache.set("key1", "value1");
      });
      it("should return iterator", function () {
        const entries: [BindingKey, unknown][] = [];
        for (const entry of cache.entries()) entries.push(entry);

        expect(entries).to.deep.equal([
          ["key0", "value0"],
          ["key1", "value1"],
        ]);
      });
    });
    context("when there is no values", function () {
      it("should return iterator", function () {
        const entries: [BindingKey, unknown][] = [];
        for (const entry of cache.entries()) entries.push(entry);

        expect(entries).to.deep.equal([]);
      });
    });
  });

  describe("#fork()", function () {
    it("should return fork", function () {
      const fork = cache.fork();
      expect(fork).to.be.an.instanceOf(Cache);
      expect(fork).to.not.equal(cache);
    });
  });

  describe("#get(bindingKey)", function () {
    context("when there is value", function () {
      beforeEach(function () {
        cache.set("key", "value");
      });
      it("should return value", function () {
        const value = cache.get("key");
        expect(value).to.equal("value");
      });
    });
    context("when there is no value", function () {
      it("should return undefined", function () {
        const value = cache.get("key");
        expect(value).to.be.undefined;
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

  describe("#keys()", function () {
    context("when there is values", function () {
      beforeEach(function () {
        cache.set("key0", "value0");
        cache.set("key1", "value1");
      });
      it("should return iterator", function () {
        const keys: BindingKey[] = [];
        for (const key of cache.keys()) keys.push(key);

        expect(keys).to.deep.equal(["key0", "key1"]);
      });
    });
    context("when there is no values", function () {
      it("should return iterator", function () {
        const keys: BindingKey[] = [];
        for (const key of cache.keys()) keys.push(key);

        expect(keys).to.deep.equal([]);
      });
    });
  });

  describe("#set(bindingKey)", function () {
    context("when there is value", function () {
      beforeEach(function () {
        cache.set("key", "value");
      });
      it("should return self", function () {
        const self = cache.set("key", "value");
        expect(self).to.equal(cache);
      });
    });
    context("when there is no value", function () {
      it("should return self", function () {
        const self = cache.set("key", "value");
        expect(self).to.equal(cache);
      });
    });
  });

  describe("#values()", function () {
    context("when there is values", function () {
      beforeEach(function () {
        cache.set("key0", "value0");
        cache.set("key1", "value1");
      });
      it("should return iterator", function () {
        const values: unknown[] = [];
        for (const value of cache.values()) values.push(value);

        expect(values).to.deep.equal(["value0", "value1"]);
      });
    });
    context("when there is no values", function () {
      it("should return iterator", function () {
        const values: unknown[] = [];
        for (const value of cache.values()) values.push(value);

        expect(values).to.deep.equal([]);
      });
    });
  });
});
