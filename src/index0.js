import "core-js/es/promise";

if (typeof fetch != "undefined") {
  import("./App").then((module) => module.default());
} else {
  import("core-js/stable").then(() => {
    import("./App").then((module) => module.default());
  });
}
