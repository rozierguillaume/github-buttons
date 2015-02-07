// Generated by CoffeeScript 1.9.0
(function() {
  var ButtonAnchor, ButtonFrame, ButtonFrameContent, Element, Frame, _base,
    __slice = [].slice,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  Element = (function() {
    var addClass, addEventListener, hasClass, r_leading_and_trailing_whitespace, r_whitespace, removeClass, removeEventListener;

    function Element(element, callback) {
      this.$ = element && element.nodeType === 1 ? element : document.createElement(element);
      if (callback) {
        callback.apply(this, [this.$]);
      }
    }

    Element.prototype.get = function() {
      return this.$;
    };

    Element.prototype.on = function() {
      var callback, eventName, events, func, _i, _j, _len;
      events = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), func = arguments[_i++];
      callback = (function(_this) {
        return function(event) {
          return func.apply(_this, [event || window.event]);
        };
      })(this);
      for (_j = 0, _len = events.length; _j < _len; _j++) {
        eventName = events[_j];
        addEventListener(this.$, eventName, callback);
      }
    };

    Element.prototype.once = function() {
      var callback, eventName, events, func, _i, _j, _len;
      events = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), func = arguments[_i++];
      callback = (function(_this) {
        return function(event) {
          var eventName, _j, _len;
          for (_j = 0, _len = events.length; _j < _len; _j++) {
            eventName = events[_j];
            removeEventListener(_this.$, eventName, callback);
          }
          return func.apply(_this, [event || window.event]);
        };
      })(this);
      for (_j = 0, _len = events.length; _j < _len; _j++) {
        eventName = events[_j];
        addEventListener(this.$, eventName, callback);
      }
    };

    Element.prototype.addClass = function(className) {
      if (!hasClass(this.$, className)) {
        addClass(this.$, className);
      }
    };

    Element.prototype.removeClass = function(className) {
      if (hasClass(this.$, className)) {
        removeClass(this.$, className);
      }
    };

    Element.prototype.hasClass = function(className) {
      return hasClass(this.$, className);
    };

    addEventListener = function(element, event, func) {
      if (element.addEventListener) {
        element.addEventListener("" + event, func);
      } else {
        element.attachEvent("on" + event, func);
      }
    };

    removeEventListener = function(element, event, func) {
      if (element.removeEventListener) {
        element.removeEventListener("" + event, func);
      } else {
        element.detachEvent("on" + event, func);
      }
    };

    r_whitespace = /[ \t\n\f\r]+/g;

    r_leading_and_trailing_whitespace = /^[ \t\n\f\r]+|[ \t\n\f\r]+$/g;

    addClass = function(element, className) {
      element.className += " " + className;
    };

    removeClass = function(element, className) {
      element.className = (" " + element.className + " ").replace(r_whitespace, " ").replace(" " + className + " ", "").replace(r_leading_and_trailing_whitespace, "");
    };

    hasClass = function(element, className) {
      return (" " + element.className + " ").replace(r_whitespace, " ").indexOf(" " + className + " ") >= 0;
    };

    return Element;

  })();

  Frame = (function(_super) {
    __extends(Frame, _super);

    function Frame(callback) {
      Frame.__super__.constructor.call(this, "iframe", function(iframe) {
        var key, value, _ref, _ref1;
        _ref = {
          allowtransparency: true,
          scrolling: "no",
          frameBorder: 0
        };
        for (key in _ref) {
          value = _ref[key];
          iframe.setAttribute(key, value);
        }
        _ref1 = {
          border: "none",
          height: "0",
          width: "1px"
        };
        for (key in _ref1) {
          value = _ref1[key];
          iframe.style[key] = value;
        }
        if (callback) {
          callback.apply(this, [iframe]);
        }
      });
    }

    Frame.prototype.html = function(html) {
      var contentDocument;
      try {
        contentDocument = this.$.contentWindow.document;
        contentDocument.open();
        contentDocument.write(html);
        contentDocument.close();
      } catch (_error) {}
    };

    Frame.prototype.load = function(src) {
      return this.$.src = src;
    };

    Frame.prototype.size = function() {
      var body, contentDocument, html, size;
      try {
        contentDocument = this.$.contentWindow.document;
        html = contentDocument.documentElement;
        body = contentDocument.body;
        html.style.overflow = body.style.overflow = window.opera ? "scroll" : "visible";
        size = {
          width: body.scrollWidth + "px",
          height: body.scrollHeight + "px"
        };
        html.style.overflow = body.style.overflow = "";
        return size;
      } catch (_error) {
        return {};
      }
    };

    Frame.prototype.resize = function(_arg) {
      var height, width, _ref;
      _ref = _arg != null ? _arg : this.size(), width = _ref.width, height = _ref.height;
      if (width) {
        this.$.style.width = width;
      }
      if (height) {
        return this.$.style.height = height;
      }
    };

    return Frame;

  })(Element);

  ButtonAnchor = (function() {
    var filter_js;

    function ButtonAnchor() {}

    ButtonAnchor.parse = function(element) {
      var href, icon, style;
      return {
        href: filter_js(element.href),
        text: element.getAttribute("data-text") || element.textContent || element.innerText,
        data: {
          count: {
            api: (function() {
              var api;
              if (api = element.getAttribute("data-count-api")) {
                if ("/" !== api.charAt(0)) {
                  api = "/" + api;
                }
                return api;
              }
            })(),
            href: (href = element.getAttribute("data-count-href")) && (href = filter_js(href)) ? href : filter_js(element.href)
          },
          style: (style = element.getAttribute("data-style")) ? style : void 0,
          icon: (icon = element.getAttribute("data-icon")) ? icon : void 0
        }
      };
    };

    filter_js = function(href) {
      if (!/^\s*javascript:/i.test(href)) {
        return href;
      }
    };

    return ButtonAnchor;

  })();

  ButtonFrame = (function(_super) {
    __extends(ButtonFrame, _super);

    function ButtonFrame() {
      var callbacks, hash, reload;
      hash = arguments[0], callbacks = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      ButtonFrame.__super__.constructor.call(this, callbacks.shift());
      reload = (function(_this) {
        return function() {
          var size;
          size = _this.size();
          _this.once("load", function() {
            this.resize(size);
            if (callbacks[0]) {
              callbacks.shift()(this.$);
            }
          });
          _this.load(Config.url + "buttons.html" + hash);
        };
      })(this);
      this.once("load", function() {
        var callback, script;
        if (callback = this.$.contentWindow.callback) {
          script = callback.script;
          if (script.readyState) {
            new Element(script).on("readystatechange", function() {
              if (/loaded|complete/.test(script.readyState)) {
                reload();
              }
            });
          } else {
            new Element(script).on("load", "error", function() {
              reload();
            });
          }
        } else {
          reload();
        }
      });
      this.html("<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n<title></title>\n<base target=\"_blank\"><!--[if lte IE 6]></base><![endif]-->\n<link rel=\"stylesheet\" href=\"" + Config.url + "assets/css/buttons.css\">\n<style>html{visibility:hidden;}</style>\n<script>document.location.hash = \"" + hash + "\";</script>\n</head>\n<body>\n<script src=\"" + Config.script.src + "\"></script>\n</body>\n</html>");
    }

    return ButtonFrame;

  })(Frame);

  ButtonFrameContent = (function() {
    var Button, Count;

    function ButtonFrameContent(options) {
      if (options && options.data) {
        document.body.className = (function() {
          var i, _i, _len, _ref;
          _ref = Config.styles;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            if (i === options.data.style) {
              return i;
            }
          }
          return Config.styles[0];
        })();
        document.getElementsByTagName("base")[0].href = options.href;
        new Button(options, function(buttonElement) {
          document.body.appendChild(buttonElement);
        });
        new Count(options, function(countElement) {
          document.body.appendChild(countElement);
        });
      }
    }

    Button = (function(_super) {
      __extends(Button, _super);

      function Button(options, callback) {
        Button.__super__.constructor.call(this, "a", function(a) {
          a.className = "button";
          if (options.href) {
            a.href = options.href;
          }
          new Element("i", function(icon) {
            icon = document.createElement("i");
            icon.className = (function() {
              var classNames;
              classNames = [options.data.icon || Config.icon];
              if (Config.iconClass) {
                classNames.push(Config.iconClass);
              }
              return classNames.join(" ");
            })();
            a.appendChild(icon);
          });
          new Element("span", function(text) {
            text.appendChild(document.createTextNode(" "));
            a.appendChild(text);
          });
          new Element("span", function(text) {
            if (options.text) {
              text.appendChild(document.createTextNode(options.text));
            }
            a.appendChild(text);
          });
          if (callback) {
            callback(a);
          }
        });
      }

      return Button;

    })(Element);

    Count = (function(_super) {
      __extends(Count, _super);

      function Count(options, callback) {
        if (options.data.count.api) {
          Count.__super__.constructor.call(this, "a", function(a) {
            a.className = "count";
            if (options.data.count.href) {
              a.href = options.data.count.href;
            }
            new Element("b", function(b) {
              a.appendChild(b);
            });
            new Element("i", function(i) {
              a.appendChild(i);
            });
            new Element("span", function(text) {
              var endpoint;
              a.appendChild(text);
              endpoint = (function() {
                var query, url;
                url = options.data.count.api.split("#")[0];
                query = QueryString.parse(url.split("?").slice(1).join("?"));
                query.callback = "callback";
                return (url.split("?")[0]) + "?" + (QueryString.stringify(query));
              })();
              new Element("script", function(script) {
                var head;
                script.async = true;
                script.src = "" + Config.api + endpoint;
                window.callback = function(json) {
                  var data;
                  window.callback = null;
                  if (json.meta.status === 200) {
                    data = FlatObject.flatten(json.data)[options.data.count.api.split("#").slice(1).join("#")];
                    if (Object.prototype.toString.call(data) === "[object Number]") {
                      data = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    text.appendChild(document.createTextNode(" " + data + " "));
                    if (callback) {
                      callback(a);
                    }
                  }
                };
                window.callback.script = script;
                this.on("error", function() {
                  window.callback = null;
                });
                if (script.readyState) {
                  this.on("readystatechange", function() {
                    if (script.readyState === "loaded" && script.children && script.readyState === "loading") {
                      window.callback = null;
                    }
                  });
                }
                head = document.getElementsByTagName("head")[0];
                head.insertBefore(script, head.firstChild);
              });
            });
          });
        }
      }

      return Count;

    })(Element);

    return ButtonFrameContent;

  })();

  if (window._phantom) {
    (_base = HTMLElement.prototype).click || (_base.click = function() {
      var event;
      event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
      this.dispatchEvent(event);
    });
  }

  describe('Element', function() {
    describe('#constructor()', function() {
      it('should use element when element is given', function() {
        var element;
        element = document.createElement("a");
        return expect(new Element(element).get()).to.equal(element);
      });
      it('should create new element when tag name is given', function() {
        return expect(new Element("i").get().nodeType).to.equal(1);
      });
      it('should callback with this', function() {
        var _, _this;
        _this = null;
        _ = new Element("em", function(element) {
          return _this = this;
        });
        return expect(_this).to.equal(_);
      });
      return it('should callback with argument element', function(done) {
        var b;
        b = document.createElement("b");
        return new Element(b, function(element) {
          expect(element).to.equal(b);
          return done();
        });
      });
    });
    describe('#on()', function() {
      var input;
      input = null;
      beforeEach(function() {
        return input = new Element("input", function(element) {
          return document.body.appendChild(element);
        });
      });
      afterEach(function() {
        return document.body.removeChild(input.get());
      });
      it('should call the function on single event type', function() {
        var spy;
        spy = sinon.spy();
        input.on("click", spy);
        input.get().click();
        expect(spy).to.have.been.calledOnce;
        input.get().click();
        return expect(spy).to.have.been.calledTwice;
      });
      it('should call the function on multiple event types', function() {
        var spy;
        spy = sinon.spy();
        input.on("focus", "blur", "click", spy);
        input.get().focus();
        expect(spy).to.have.been.calledOnce;
        input.get().blur();
        expect(spy).to.have.been.calledTwice;
        input.get().click();
        return expect(spy).to.have.been.calledThrice;
      });
      it('should call the function with this', function(done) {
        var a, _this;
        a = document.createElement("a");
        _this = new Element(a);
        _this.on("click", function() {
          expect(this).to.equal(_this);
          return done();
        });
        return a.click();
      });
      return it('should call the function with event', function(done) {
        var b;
        b = document.createElement("b");
        new Element(b).on("click", function(event) {
          expect(event.type).to.equal("click");
          return done();
        });
        return b.click();
      });
    });
    describe('#once()', function() {
      var input;
      input = null;
      beforeEach(function() {
        return input = new Element("input", function(element) {
          return document.body.appendChild(element);
        });
      });
      afterEach(function() {
        return document.body.removeChild(input.get());
      });
      it('should call the function on single event type only once', function() {
        var spy;
        spy = sinon.spy();
        input.once("click", spy);
        input.get().click();
        expect(spy).to.have.been.calledOnce;
        input.get().click();
        input.get().click();
        return expect(spy).to.have.been.calledOnce;
      });
      it('should call the function on multiple event types only once', function() {
        var spy;
        spy = sinon.spy();
        input.once("focus", "blur", spy);
        input.get().focus();
        expect(spy).to.have.been.calledOnce;
        input.get().blur();
        input.get().focus();
        return expect(spy).to.have.been.calledOnce;
      });
      it('should call the function with this', function(done) {
        var a, _this;
        a = document.createElement("a");
        _this = new Element(a);
        _this.once("click", function() {
          expect(this).to.equal(_this);
          return done();
        });
        return a.click();
      });
      return it('should call the function with event', function(done) {
        var b;
        b = document.createElement("b");
        new Element(b).once("click", function(event) {
          expect(event.type).to.equal("click");
          return done();
        });
        return b.click();
      });
    });
    describe('#addClass()', function() {
      return it('should add class to element', function() {
        var a, element;
        element = document.createElement("a");
        element.className = "hello";
        a = new Element(element);
        a.addClass("world");
        expect(a.get().className).to.equal("hello world");
        a.addClass("world");
        return expect(a.get().className).to.equal("hello world");
      });
    });
    describe('#removeClass()', function() {
      return it('should remove class from element', function() {
        var a, element;
        element = document.createElement("a");
        element.className = "hello world";
        a = new Element(element);
        a.removeClass("hello");
        expect(a.get().className).to.equal("world");
        a.removeClass("hello");
        return expect(a.get().className).to.equal("world");
      });
    });
    return describe('#hasClass()', function() {
      return it('should return whether element has class', function() {
        var a, element;
        element = document.createElement("a");
        element.className = "world";
        a = new Element(element);
        expect(a.hasClass("hello")).to.be["false"];
        return expect(a.hasClass("world")).to.be["true"];
      });
    });
  });

  describe('Frame', function() {
    var frame, html;
    frame = null;
    html = "<!DOCTYPE html>\n<html lang=\"ja\">\n<head>\n  <meta charset=\"utf-8\">\n  <title></title>\n</head>\n<body style=\"margin: 0;\">\n  <div style=\"width: 200px; height: 100px;\"></div>\n</body>\n</html>";
    beforeEach(function() {
      return frame = new Frame(function(iframe) {
        return document.body.appendChild(iframe);
      });
    });
    afterEach(function() {
      return document.body.removeChild(frame.get());
    });
    describe('#constructor()', function() {
      return it('should callback with the new iframe', function() {
        expect(frame.get().nodeType).to.equal(1);
        return expect(frame.get().tagName).to.equal("IFRAME");
      });
    });
    describe('#html()', function() {
      return it('should write html when iframe is in same-origin', function(done) {
        frame.on("load", function() {
          expect(frame.get().contentWindow.document.documentElement.getAttribute("lang")).to.equal("ja");
          return done();
        });
        return frame.html(html);
      });
    });
    describe('#load()', function() {
      return it('should load the src url', function() {
        frame.load("../../buttons.html");
        return expect(frame.get().src).to.match(/buttons\.html$/);
      });
    });
    describe('#size()', function() {
      return it('should return the iframe content size', function(done) {
        frame.on("load", function() {
          expect(frame.size()).to.deep.equal({
            width: "200px",
            height: "100px"
          });
          return done();
        });
        return frame.html(html);
      });
    });
    return describe('#resize()', function() {
      return it('should resize the iframe', function(done) {
        frame.resize({
          width: "20px",
          height: "10px"
        });
        expect(frame.get().style.width).to.equal("20px");
        expect(frame.get().style.height).to.equal("10px");
        return done();
      });
    });
  });

}).call(this);
