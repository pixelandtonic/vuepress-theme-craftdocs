const storagePrefix = function (base) {
  let p = base
    .replace(/^\//, "")
    .replace(/\/$/, "")
    .replace(/\//g, ".");
  return p ? p + "." : "";
};

const setStorage = function (name, value, base) {
  console.log(`setStorage(${base})`);
  if (typeof localStorage === "undefined") {
    return;
  }
  localStorage[storagePrefix(base) + name] = value;
};

const getStorage = function (name, base) {
  console.log(`getStorage(${base})`);
  if (typeof localStorage === "undefined") {
    return;
  }
  name = storagePrefix(base) + name;
  if (typeof localStorage[name] === "undefined") {
    return;
  }
  return localStorage[name];
};

export { storagePrefix, getStorage, setStorage };
