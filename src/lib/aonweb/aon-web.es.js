import { Web3 as S } from "web3";
import { create as A, encrypt as N, sign as U, decrypt as D, signTransaction as R, Transaction as x } from "web3-eth-accounts";
const m = {
  TYPE_TG: 1,
  TYPE_FP: 2
};
let l = class {
  constructor({
    rpc_url: t = "https://dev.rpc.aonet.ai",
    type: s = m.TYPE_FP,
    server: n = "https://dev.rpc.aonet.ai",
    password: i = "",
    storeage_url: o = "",
    timeout: r = 3e3,
    force_aon: c = !0
  } = {}) {
    if (this.rpc_url = t, this.type = s, this.server = n, this.password = i, this.storeage_url = o, this.timeout = r, this.force_aon = c, this.type == m.TYPE_FP && this.storeage_url == "")
      throw new Error("storeage_url must be set when type = TYPE_FP");
  }
  static get LoginTypes() {
    return m;
  }
};
var g;
(function(e) {
  e.NUMBER = "NUMBER_NUMBER", e.HEX = "NUMBER_HEX", e.STR = "NUMBER_STR", e.BIGINT = "NUMBER_BIGINT";
})(g || (g = {}));
var w;
(function(e) {
  e.HEX = "BYTES_HEX", e.UINT8ARRAY = "BYTES_UINT8ARRAY";
})(w || (w = {}));
g.BIGINT, w.HEX;
g.HEX, w.HEX;
var _;
(function(e) {
  e.EARLIEST = "earliest", e.LATEST = "latest", e.PENDING = "pending", e.SAFE = "safe", e.FINALIZED = "finalized";
})(_ || (_ = {}));
var T;
(function(e) {
  e.chainstart = "chainstart", e.frontier = "frontier", e.homestead = "homestead", e.dao = "dao", e.tangerineWhistle = "tangerineWhistle", e.spuriousDragon = "spuriousDragon", e.byzantium = "byzantium", e.constantinople = "constantinople", e.petersburg = "petersburg", e.istanbul = "istanbul", e.muirGlacier = "muirGlacier", e.berlin = "berlin", e.london = "london", e.altair = "altair", e.arrowGlacier = "arrowGlacier", e.grayGlacier = "grayGlacier", e.bellatrix = "bellatrix", e.merge = "merge", e.capella = "capella", e.shanghai = "shanghai";
})(T || (T = {}));
var v = function(e, t, s, n) {
  function i(o) {
    return o instanceof s ? o : new s(function(r) {
      r(o);
    });
  }
  return new (s || (s = Promise))(function(o, r) {
    function c(h) {
      try {
        p(n.next(h));
      } catch (y) {
        r(y);
      }
    }
    function a(h) {
      try {
        p(n.throw(h));
      } catch (y) {
        r(y);
      }
    }
    function p(h) {
      h.done ? o(h.value) : i(h.value).then(c, a);
    }
    p((n = n.apply(e, t || [])).next());
  });
};
const P = Symbol.for("web3/base-provider");
class f {
  static isWeb3Provider(t) {
    return t instanceof f || !!(t && t[P]);
  }
  // To match an object "instanceof" does not work if
  // matcher class and object is using different package versions
  // to overcome this bottleneck used this approach.
  // The symbol value for one string will always remain same regardless of package versions
  // eslint-disable-next-line class-methods-use-this
  get [P]() {
    return !0;
  }
  /**
   * @deprecated Please use `.request` instead.
   * @param payload - Request Payload
   * @param callback - Callback
   */
  send(t, s) {
    this.request(t).then((n) => {
      s(null, n);
    }).catch((n) => {
      s(n);
    });
  }
  /**
   * @deprecated Please use `.request` instead.
   * @param payload - Request Payload
   */
  sendAsync(t) {
    return v(this, void 0, void 0, function* () {
      return this.request(t);
    });
  }
  /**
   * Modify the return type of the request method to be fully compatible with EIP-1193
   *
   * [deprecated] In the future major releases (\>= v5) all providers are supposed to be fully compatible with EIP-1193.
   * So this method will not be needed and would not be available in the future.
   *
   * @returns A new instance of the provider with the request method fully compatible with EIP-1193
   *
   * @example
   * ```ts
   * const provider = new Web3HttpProvider('http://localhost:8545');
   * const fullyCompatibleProvider = provider.asEIP1193Provider();
   * const result = await fullyCompatibleProvider.request({ method: 'eth_getBalance' });
   * console.log(result); // '0x0234c8a3397aab58' or something like that
   * ```
   */
  asEIP1193Provider() {
    const t = Object.create(this), s = t.request;
    return t.request = function(i) {
      return v(this, void 0, void 0, function* () {
        return (yield s(i)).result;
      });
    }, t.asEIP1193Provider = void 0, t;
  }
}
class q {
  constructor(t = new Options()) {
    try {
      this.options = t;
    } catch (s) {
      throw s;
    }
  }
  async setItem(t, s, n) {
    try {
      let i = localStorage.getItem("fingerprint"), o = {
        key: t + "_" + i,
        value: s
      }, r = localStorage.getItem("token");
      r = r.replace(/^\"|\"$/g, "");
      let c = {
        Authorization: "Bearer " + r
      }, a = this.options.storeage_url + "/kvapi/v1/storage/set";
      const h = await (await fetch(a, {
        method: "POST",
        headers: c,
        body: JSON.stringify(o)
      })).json();
      h && h.success ? n(null) : n(new Error(JSON.stringify(h) || ""));
    } catch (i) {
      n(i);
    }
  }
  async getItem(t, s) {
    try {
      let n = localStorage.getItem("token");
      n = n.replace(/^\"|\"$/g, "");
      let i = {
        Authorization: "Bearer " + n
      }, o = localStorage.getItem("fingerprint");
      t = t + "_" + o;
      let r = this.options.storeage_url + "/kvapi/v1/storage/get?key=" + t;
      const a = await (await fetch(r, {
        method: "GET",
        headers: i
      })).json();
      a && a.success ? s(null, a.value) : s(new Error(JSON.stringify(a) || ""), null);
    } catch (n) {
      s(n, null);
    }
  }
}
let d;
const Y = new Uint8Array(16);
function G() {
  if (!d && (d = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !d))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return d(Y);
}
const u = [];
for (let e = 0; e < 256; ++e)
  u.push((e + 256).toString(16).slice(1));
function B(e, t = 0) {
  return u[e[t + 0]] + u[e[t + 1]] + u[e[t + 2]] + u[e[t + 3]] + "-" + u[e[t + 4]] + u[e[t + 5]] + "-" + u[e[t + 6]] + u[e[t + 7]] + "-" + u[e[t + 8]] + u[e[t + 9]] + "-" + u[e[t + 10]] + u[e[t + 11]] + u[e[t + 12]] + u[e[t + 13]] + u[e[t + 14]] + u[e[t + 15]];
}
const L = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), E = {
  randomUUID: L
};
function W(e, t, s) {
  if (E.randomUUID && !t && !e)
    return E.randomUUID();
  e = e || {};
  const n = e.random || (e.rng || G)();
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, B(n);
}
class J extends f {
  constructor(t = new l()) {
    try {
      super(), this.options = t, this.isAON = !0, window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData && (t.type = l.LoginTypes.TYPE_TG), t.type == l.LoginTypes.TYPE_TG ? (this.webapp = window.Telegram.WebApp, this.storage = window.Telegram.WebApp.CloudStorage) : t.type == l.LoginTypes.TYPE_FP && (this.storage = new q(t)), this.keystore = null, this.account = null, this._nextId = 0, this.provider = new S.providers.HttpProvider(t.rpc_url);
    } catch (s) {
      throw s;
    }
  }
  async _getPassword() {
    return await new Promise((s, n) => {
      this.storage.getItem("aon_web_sdk_password", (i, o) => {
        i && n(i), s(o);
      });
    });
  }
  async check(t) {
    try {
      let s = {};
      if (t.type == l.LoginTypes.TYPE_TG)
        s = {
          platform: "telegram",
          initData: this.webapp.initData
        };
      else if (t.type == l.LoginTypes.TYPE_FP) {
        let r = localStorage.getItem("fingerprint");
        r || (r = await new Promise((c, a) => {
          const p = W();
          c(p);
        }), localStorage.setItem("fingerprint", r)), s = {
          platform: "fingerprint",
          visitorId: r
        };
      }
      let n = t.server + "/api/v1/user/check";
      const o = await (await fetch(n, {
        method: "POST",
        body: JSON.stringify(s)
      })).json();
      if (o.code == 0 && o.data) {
        const r = o.data.token;
        return r && this.setAuth(r), o.data;
      }
      return o;
    } catch (s) {
      throw s;
    }
  }
  async setPassword(t) {
    await new Promise((s, n) => {
      this.storage.setItem("aon_web_sdk_password", t, (i) => {
        i && n(i), s();
      });
    });
  }
  generateRandomPassword(t) {
    const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[];',./";
    let n = "";
    for (let i = 0; i < t; i++) {
      const o = Math.floor(Math.random() * s.length);
      n += s[o];
    }
    return n;
  }
  async getAuth() {
    return this.options.type == l.LoginTypes.TYPE_TG ? await new Promise((s, n) => {
      this.storage.getItem("token", (i, o) => {
        i && n(i), s(o);
      });
    }) : localStorage.getItem("token");
  }
  async setAuth(t) {
    this.options.type == l.LoginTypes.TYPE_TG ? await new Promise((s, n) => {
      this.storage.setItem("token", JSON.stringify(t), (i) => {
        i && n(i), s();
      });
    }) : localStorage.setItem("token", t);
  }
  async createUserToServer(t, s) {
    let n = {
      keystore: JSON.stringify(t),
      signature: s
    }, i = await this.getAuth();
    i = i.replace(/^\"|\"$/g, "");
    let o = {
      Authorization: "Bearer " + i
    }, r = this.options.server + "/api/v1/user/create";
    return await (await fetch(r, {
      method: "POST",
      headers: o,
      body: JSON.stringify(n)
    })).json();
  }
  async createUser() {
    let t = this.generateRandomPassword(20), s = A(), n = await N(s.privateKey, t), o = U(JSON.stringify(n), s.privateKey).signature, r = await this.createUserToServer(n, o);
    if (r.code == 0)
      return await this.setPassword(t), {
        keystore: n,
        account: s
      };
    throw new Error(r.error || r.msg);
  }
  async loadKeystore() {
    try {
      let t = await this.check(this.options);
      if (t.code)
        throw new Error(t.msg || t.error);
      if (t.isNewUser) {
        let n = await this.createUser();
        this.account = n.account, this.keystore = n.keystore;
        return;
      }
      let s = await this._getPassword();
      this.keystore = JSON.parse(t.keystore), this.account = await D(this.keystore, s);
    } catch (t) {
      console.log("loadKeystore error", t);
    }
  }
  request(t) {
    return console.log("request", t), t.method == "eth_accounts" || t.method == "eth_requestAccounts" ? new Promise((s, n) => {
      try {
        if (this.account) {
          s([this.account.address]);
          return;
        }
        s([]);
      } catch (i) {
        n(i);
      }
    }) : t.method == "eth_sendTransaction" ? (t.method = "eth_signTransaction", new Promise((s, n) => {
      let i = t.params && t.params.length && t.params[0];
      i.gasLimit || (i.gasLimit = 5e5), this.provider.request({ method: "eth_chainId" }).then((o) => {
        console.log("eth_chainId ", o);
        let r = 100199;
        o.result && (r = parseInt(o.result, 16)), i.chainId || (i.chainId = r), i.v = 27 + i.chainId * 2 + 8, this.provider.request({ method: "eth_getTransactionCount", params: [this.account.address] }).then((c) => {
          console.log("eth_getTransactionCount ", c), i.nonce || (i.nonce = c.result), console.log("before signTransaction param", i), R(new x(i), this.account.privateKey).then((a) => {
            if (console.log("signTransaction ", a), a && a.rawTransaction && a.rawTransaction.length) {
              const p = {
                method: "eth_sendRawTransaction",
                params: [a.rawTransaction],
                id: this._nextId++,
                jsonrpc: "2.0"
              };
              this.provider.request(p).then((h) => {
                console.log("eth_sendRawTransaction ", h), s(h);
              }).catch((h) => {
                console.log("eth_sendRawTransaction error", h), n(h);
              });
            } else
              n(new Error("signTransaction error"));
          }).catch((a) => {
            console.log("signTransaction error", a), n(a);
          });
        }).catch((c) => {
          console.log("eth_getTransactionCount error", c), n(c);
        });
      }).catch((o) => {
        console.log("eth_chainId error", o), n(o);
      });
    })) : this.provider.request(t);
  }
  async send(t, s) {
    console.log("send", t, s);
    const n = {
      method: t,
      params: s,
      id: this._nextId++,
      jsonrpc: "2.0"
    };
    return this.request(n);
  }
}
async function b(e = new l()) {
  console.log("detectEthereumProvider in");
  let t = !1;
  return await new Promise(async (n, i) => {
    if (window.ethereum) {
      if (e.force_aon && !window.ethereum.isAON) {
        let r = await o(e);
        n(r);
      }
      n(window.ethereum);
    } else {
      let r = await o(e);
      n(r);
    }
    async function o(r) {
      if (console.log("createProvider in"), t)
        return;
      t = !0;
      const c = new J(r);
      return await c.loadKeystore(), window.ethereum = c, console.log("createProvider instance", c), c;
    }
  });
}
class j {
  constructor(t = new l()) {
    this.options = t;
  }
  async login() {
    return (await b(this.options)).request({ method: "eth_accounts" });
  }
}
const z = 1, I = 2, k = {
  1: "/api",
  2: "/jwt"
};
class O {
  constructor(t) {
    if (!(t && t.auth && t.auth.length))
      throw new Error("options.auth is not found");
    this.auth = t.auth, this.options = t, this.init();
  }
  init() {
    let t = "/v1";
    this.options && this.options.api_version && this.options.api_version.length && (t = this.options.api_version), this.auth_type = this.parseAuthType(this.auth), this.path = k[this.auth_type] + t;
  }
  parseAuthType(t) {
    const s = this.decodeBase64(t);
    return console.log("parseAuthType", s), s.indexOf("JWT") > -1 ? I : z;
  }
  decodeBase64(t) {
    return typeof window < "u" && typeof window.atob == "function" ? window.atob(t) : Buffer.from(t, "base64").toString("utf-8");
  }
  async prediction(t, s) {
    try {
      let n = "https://api.aonet.ai";
      this.options && this.options.host && this.options.host.length && (n = this.options.host);
      const i = n + this.path + t;
      let o = {
        apikey: this.auth
      };
      if (this.auth_type == I && (o = {
        Authorization: "Bearer " + this.auth
      }), this.options && this.options.headers)
        for (const a in this.options.headers)
          a != "apikey" && a != "Authorization" && (o[a] = this.options.headers[a]);
      const r = await fetch(i, {
        method: "POST",
        headers: o,
        body: JSON.stringify(s)
      });
      return r ? await r.json() : {
        task: {
          is_success: !1,
          task_error: "network error",
          exec_code: "5000"
        }
      };
    } catch (n) {
      console.error("Error:", n);
    }
  }
}
(function(e, t) {
  typeof define == "function" && define.amd ? define(["web3", "web3-eth-accounts"], t) : typeof module == "object" && module.exports ? module.exports = t(require("web3"), require("web3-eth-accounts")) : e.aonweb = t(e.Web3, e.Web3EthAccounts);
})(typeof self < "u" ? self : void 0, function(e, t) {
  return {
    Options: l,
    User: j,
    AI: O,
    detectEthereumProvider: b
  };
});
export {
  O as AI,
  l as Options,
  j as User,
  b as detectEthereumProvider
};
