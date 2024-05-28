"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var db = require('../models/index');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var randToken = require('rand-token');
var saltRounds = 10;
var accessTokenLife = "1h";
var refreshTokenLife = "10h";
var TokenSecret = "abc";
var createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, res) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
              var isExist, hashPassword, dataForRefreshToken, refreshToken, userRaw, user, dataForAccessTokenAction, dataForRefreshTokenAction, accessTokenAction, refreshTokenAction;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    console.log('data ne ', data.username);
                    if (!data.username || !data.password || !data.email) {
                      resolve({
                        errCode: 1,
                        errMessage: "Missing required parameter"
                      });
                    }
                    // Check Exist
                    _context.next = 5;
                    return db.User.findOne({
                      where: {
                        username: data.username
                      }
                    });
                  case 5:
                    isExist = _context.sent;
                    if (isExist) {
                      resolve({
                        errCode: 1,
                        errMessage: "Username or email existed"
                      });
                    }
                    hashPassword = bcrypt.hashSync(data.password, saltRounds); // Create refreshToken
                    dataForRefreshToken = {
                      username: data.username,
                      email: data.email
                    };
                    _context.next = 11;
                    return getJWTToken(dataForRefreshToken, refreshTokenLife);
                  case 11:
                    refreshToken = _context.sent;
                    _context.next = 14;
                    return db.User.create({
                      username: data.username,
                      password: hashPassword,
                      email: data.email,
                      refreshToken: refreshToken,
                      role: "R01",
                      address: data.address
                    });
                  case 14:
                    userRaw = _context.sent;
                    _context.next = 17;
                    return db.Cart.create({
                      userId: userRaw.id
                    });
                  case 17:
                    _context.next = 19;
                    return db.User.findOne({
                      where: {
                        id: userRaw.id
                      },
                      include: [{
                        model: db.Cart
                      }]
                    });
                  case 19:
                    user = _context.sent;
                    dataForAccessTokenAction = {
                      email: userRaw.email
                    };
                    dataForRefreshTokenAction = {
                      email: userRaw.email,
                      username: userRaw.username
                    };
                    _context.next = 24;
                    return getJWTToken(dataForAccessTokenAction, accessTokenLife);
                  case 24:
                    accessTokenAction = _context.sent;
                    refreshTokenAction = userRaw.refreshToken;
                    if (refreshToken) {
                      _context.next = 34;
                      break;
                    }
                    console.log('tao refreshToken');
                    _context.next = 30;
                    return getJWTToken(dataForRefreshTokenAction, refreshTokenLife);
                  case 30:
                    refreshToken = _context.sent;
                    // Nếu userRaw này chưa có refresh token thì lưu refresh token đó vào database
                    userRaw.refreshToken = refreshToken;
                    _context.next = 34;
                    return userRaw.save();
                  case 34:
                    resolve({
                      errCode: 0,
                      user: user,
                      errMessage: "Create successfully",
                      accessToken: accessTokenAction,
                      refreshToken: refreshTokenAction
                    });
                    _context.next = 41;
                    break;
                  case 37:
                    _context.prev = 37;
                    _context.t0 = _context["catch"](0);
                    console.log(_context.t0);
                    reject(_context.t0);
                  case 41:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 37]]);
            }));
            return function (_x3, _x4) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var login = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data, res) {
    var user, isPasswordValid, dataForAccessToken, dataForRefreshToken, accessToken, refreshToken;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          if (!(!data.username || !data.password)) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", {
            errCode: 1,
            errMessage: "Missing required parameter"
          });
        case 3:
          _context3.next = 5;
          return db.User.findOne({
            where: {
              username: data.username
            },
            include: [{
              model: db.Cart
            }]
          });
        case 5:
          user = _context3.sent;
          if (user) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", {
            errCode: 1,
            errMessage: "Username or password is incorrect"
          });
        case 8:
          _context3.next = 10;
          return bcrypt.compareSync(data.password, user.password);
        case 10:
          isPasswordValid = _context3.sent;
          if (isPasswordValid) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", {
            errCode: 1,
            errMessage: "Password is incorrect"
          });
        case 13:
          dataForAccessToken = {
            username: user.username,
            email: user.email
          };
          dataForRefreshToken = {
            email: user.email
          };
          _context3.next = 17;
          return getJWTToken(dataForAccessToken, accessTokenLife);
        case 17:
          accessToken = _context3.sent;
          _context3.t0 = user.refreshToken;
          if (_context3.t0) {
            _context3.next = 23;
            break;
          }
          _context3.next = 22;
          return getJWTToken(dataForRefreshToken, refreshTokenLife);
        case 22:
          _context3.t0 = _context3.sent;
        case 23:
          refreshToken = _context3.t0;
          return _context3.abrupt("return", {
            errCode: 0,
            errMessage: "Login successfully",
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken
          });
        case 27:
          _context3.prev = 27;
          _context3.t1 = _context3["catch"](0);
          console.log(_context3.t1);
          throw _context3.t1;
        case 31:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 27]]);
  }));
  return function login(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var refreshAccessToken = function refreshAccessToken(refreshToken, res) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var user, dataForAccessToken, accessToken;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return db.User.findOne({
              where: {
                refreshToken: refreshToken
              }
            });
          case 3:
            user = _context4.sent;
            if (user) {
              _context4.next = 8;
              break;
            }
            resolve({
              errCode: 1,
              errMessage: "refresh token expired or not exist"
            });
            _context4.next = 15;
            break;
          case 8:
            if (!(refreshToken == user.refreshToken)) {
              _context4.next = 15;
              break;
            }
            dataForAccessToken = {
              username: user.username,
              email: user.email
            };
            _context4.next = 12;
            return getJWTToken(dataForAccessToken, accessTokenLife);
          case 12:
            accessToken = _context4.sent;
            res.cookie('access-token', accessToken, {
              maxAge: 1000 * 60 * 1
            });
            resolve({
              errCode: 0,
              errMessage: "refresh access token successfully"
            });
          case 15:
            _context4.next = 20;
            break;
          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 20:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 17]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var getAllUser = function getAllUser() {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var users;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return db.User.findAll({});
          case 3:
            users = _context5.sent;
            if (!users) {
              resolve({
                errCode: 1,
                errMessage: "There no users existed"
              });
            } else {
              resolve({
                errCode: 0,
                errMessage: "Success",
                users: users
              });
            }
            _context5.next = 10;
            break;
          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 10:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 7]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var deleteUser = function deleteUser(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            i;
            _context6.next = 4;
            return db.User.findOne({
              where: {
                id: data
              }
            });
          case 4:
            user = _context6.sent;
            if (user) {
              _context6.next = 9;
              break;
            }
            resolve({
              errCode: 1,
              errMessage: "There no user existed"
            });
            _context6.next = 12;
            break;
          case 9:
            _context6.next = 11;
            return user.destroy();
          case 11:
            resolve({
              errCode: 0,
              errMessage: "Delete successfully"
            });
          case 12:
            _context6.next = 17;
            break;
          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 17:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 14]]);
    }));
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var createAdmin = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(data) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
              var isExist, hashPassword, user;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    console.log(data);
                    if (!data.username || !data.password) {
                      resolve({
                        errCode: 1,
                        errMessage: "Misssing required parameter"
                      });
                    }
                    _context7.next = 5;
                    return db.User.findOne({
                      where: {
                        username: data.username,
                        role: "R02"
                      }
                    });
                  case 5:
                    isExist = _context7.sent;
                    if (!isExist) {
                      _context7.next = 10;
                      break;
                    }
                    resolve({
                      errCode: 1,
                      errMessage: "Username existed"
                    });
                    _context7.next = 15;
                    break;
                  case 10:
                    hashPassword = bcrypt.hashSync(data.password, saltRounds);
                    _context7.next = 13;
                    return db.User.create({
                      username: data.username,
                      password: hashPassword,
                      role: "R02"
                    });
                  case 13:
                    user = _context7.sent;
                    resolve({
                      errCode: 0,
                      errMessage: "Create successfully",
                      user: user
                    });
                  case 15:
                    _context7.next = 20;
                    break;
                  case 17:
                    _context7.prev = 17;
                    _context7.t0 = _context7["catch"](0);
                    reject(_context7.t0);
                  case 20:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7, null, [[0, 17]]);
            }));
            return function (_x14, _x15) {
              return _ref8.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function createAdmin(_x13) {
    return _ref7.apply(this, arguments);
  };
}();
var loginAdmin = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
              var user, isPasswordValid;
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.prev = 0;
                    if (!(!data.username || !data.password)) {
                      _context9.next = 5;
                      break;
                    }
                    resolve({
                      errCode: 1,
                      errMessage: "Missing required parameter"
                    });
                    _context9.next = 16;
                    break;
                  case 5:
                    _context9.next = 7;
                    return db.User.findOne({
                      where: {
                        username: data.username,
                        role: "R02"
                      }
                    });
                  case 7:
                    user = _context9.sent;
                    if (user) {
                      _context9.next = 12;
                      break;
                    }
                    resolve({
                      errCode: 1,
                      errMessage: "Username or password was incorrect"
                    });
                    _context9.next = 16;
                    break;
                  case 12:
                    _context9.next = 14;
                    return bcrypt.compareSync(data.password, user.password);
                  case 14:
                    isPasswordValid = _context9.sent;
                    if (isPasswordValid) {
                      resolve({
                        errCode: 0,
                        errMessage: "login successfully",
                        user: user
                      });
                    } else {
                      resolve({
                        errCode: 1,
                        errMessage: "Username or password was incorrect"
                      });
                    }
                  case 16:
                    _context9.next = 21;
                    break;
                  case 18:
                    _context9.prev = 18;
                    _context9.t0 = _context9["catch"](0);
                    reject(_context9.t0);
                  case 21:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9, null, [[0, 18]]);
            }));
            return function (_x17, _x18) {
              return _ref10.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function loginAdmin(_x16) {
    return _ref9.apply(this, arguments);
  };
}();
var getJWTToken = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(dataForToken, time) {
    var accessToken;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return jwt.sign(dataForToken, TokenSecret, {
            algorithm: 'HS256',
            expiresIn: time
          });
        case 2:
          accessToken = _context11.sent;
          return _context11.abrupt("return", accessToken);
        case 4:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function getJWTToken(_x19, _x20) {
    return _ref11.apply(this, arguments);
  };
}();
module.exports = {
  createUser: createUser,
  login: login,
  refreshAccessToken: refreshAccessToken,
  getAllUser: getAllUser,
  deleteUser: deleteUser,
  createAdmin: createAdmin,
  loginAdmin: loginAdmin
};