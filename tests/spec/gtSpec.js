describe("GenerativeText", function() {

  describe("generativeText()", function () {

    var elem = document.createElement('div');
    var gt = new generativeText();

    it("should initialize totalSteps to 0", function () {
      expect(gt.totalSteps).toBe(0);
    });

    it("should initialize currentStep to 0", function () {
      expect(gt.currentStep).toBe(0);
    });

    it("should initialize memory as an empty array", function () {
      expect(gt.memory.length).toBe(0);
    });


  });

  describe('.inferAndValidateParams()', function () {
    it("should throw an exception if there are errors in the parameters definitions.", function () {
      var params = { backgroundColor: {} };


      var exceptionThrown = false;
      try {
        var gt = new generativeText(params);
      } catch (e) {
        exceptionThrown = true;
      }

      expect(exceptionThrown).toEqual(true);

    });
  });

  describe('.paramTypeInferenceAndValidation()', function () {

    it("should add an error if param is undefined.", function () {
      var errors = [];
      var param;
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "defType", errors);

      expect(errors.length).toEqual(1);
    });

    it("should return parameter transformed to a fixed value type if c is a string.", function () {
      var errors = [];
      var param = "1px solid black";

      var gt = new generativeText();
      param = gt.paramTypeInferenceAndValidation(param, "test", "defType", errors);

      expect(errors.length).toEqual(0);
      expect(param.type).toEqual("fixed");
      expect(param.value).toEqual("1px solid black");

    });

    it("should add an error if param.values is defined and it's not an array.", function () {
      var errors = [];
      var param = { values: "aaaaa" };
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "defType", errors);

      expect(errors.length).toEqual(1);
    });

    it("should add an error if param.values is defined and it's an array of size 0.", function () {
      var errors = [];
      var param = { values: "aaaaa" };
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "defType", errors);

      expect(errors.length).toEqual(1);
    });

    it("should return parameter transformed to a List value type if values is a valid array.", function () {
      var errors = [];
      var param = { values: [1,2,3] };

      var gt = new generativeText();
      param = gt.paramTypeInferenceAndValidation(param, "test", "defType", errors);

      expect(errors.length).toEqual(0);
      expect(param.type).toEqual("list");

    });

    it("should return parameter with listType set to 'sequential' if steps is set to true and it is an infered list type.", function () {
      var errors = [];
      var param = { values: [1,2,3], steps: true };

      var gt = new generativeText();
      param = gt.paramTypeInferenceAndValidation(param, "test", "defType", errors);

      expect(param.type).toEqual('list');
      expect(param.listType).toEqual('sequential');

    });

    it("should return parameter with listType set to 'function' if stepFunction exists and it is an infered list type.", function () {
      var errors = [];
      var param = { values: [1,2,3], stepFunction: function() {} };

      var gt = new generativeText();
      param = gt.paramTypeInferenceAndValidation(param, "test", "defType", errors);

      expect(param.type).toEqual('list');
      expect(param.listType).toEqual('function');

    });

    it("should return parameter with listType set to 'random' if no steps or stepFunction and it is an infered list type.", function () {
      var errors = [];
      var param = { values: [1,2,3] };

      var gt = new generativeText();
      param = gt.paramTypeInferenceAndValidation(param, "test", "defType", errors);

      expect(param.type).toEqual('list');
      expect(param.listType).toEqual('random');

    });

    it("should add an error if param is not a string or an object.", function () {
      var errors = [];
      var param = 15;
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "defType", errors);

      expect(errors.length).toEqual(1);
    });

    it("should add an error if defType is 'List' and param is neither a string nor has values set.", function () {
      var errors = [];
      var param = {};
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "List", errors);

      expect(errors.length).toEqual(1);
    });

    it("should add an error if defType is 'Numeric' and para.min is not defined (when param is neither fixed or list).", function () {
      var errors = [];
      var param = { max: 5};
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "Numeric", errors);

      expect(errors.length).toEqual(1);
    });

    it("should add an error if defType is 'Numeric' and para.min is not a number (when param is neither fixed or list).", function () {
      var errors = [];
      var param = { max: 5, min: "12"};
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "Numeric", errors);

      expect(errors.length).toEqual(1);
    });

    it("should add an error if defType is 'Numeric' and para.max is not defined (when param is neither fixed or list).", function () {
      var errors = [];
      var param = { min: 5};
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "Numeric", errors);

      expect(errors.length).toEqual(1);
    });

    it("should add an error if defType is 'Numeric' and para.max is not a number (when param is neither fixed or list).", function () {
      var errors = [];
      var param = { min: 5, max: "12"};
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "Numeric", errors);

      expect(errors.length).toEqual(1);
    });

    it("should return parameter with param.type set to 'numeric' if defType is 'Numeric' (when param is neither fixed or list).", function () {
      var errors = [];
      var param = { min: 5, max: 12};
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "Numeric", errors);

      expect(errors.length).toEqual(0);
      expect(param.type).toEqual("numeric");
    });

    it("should return parameter with numericType set to 'sequential' if steps is true, there is no stepFunction and defType is 'Numeric' (when param is neither fixed or list).", function () {
      var errors = [];
      var param = { min: 5, max: 12, steps: true};
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "Numeric", errors);

      expect(errors.length).toEqual(0);
      expect(param.numericType).toEqual("sequential");

    });

    it("should return parameter with numericType set to 'function' if there is an stepFunction and defType is 'Numeric' (when param is neither fixed or list).", function () {
      var errors = [];
      var param = { min: 5, max: 12, stepFunction: function(){} };
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "Numeric", errors);

      expect(errors.length).toEqual(0);
      expect(param.numericType).toEqual("function");

    });

    it("should return parameter with numericType set to 'random' if steps and stepFunction are not set and defType is 'Numeric' (when param is neither fixed or list).", function () {
      var errors = [];
      var param = { min: 5, max: 12};
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "Numeric", errors);

      expect(errors.length).toEqual(0);
      expect(param.numericType).toEqual("random");

    });

    it("should return parameter with param.type set to 'color' if defType is 'Color' (when param is neither fixed or list).", function () {
      var errors = [];
      var param = { r: "aa", g: "aa", b: "aa"};
      var gt = new generativeText();
      gt.paramTypeInferenceAndValidation(param, "test", "Color", errors);

      expect(errors.length).toEqual(0);
      expect(param.type).toEqual("color");
    });

  })

  describe('.cTypeInferenceAndValidation()', function () {

    it("should add an error if c is not defined.", function () {
      var errors = [];
      var c;

      var gt = new generativeText();
      gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(errors.length).toEqual(1);

    });

    it("should return c parameter transformed to a fixed value type if c is a string.", function () {
      var errors = [];
      var c = "#aaaaaa";

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(errors.length).toEqual(0);
      expect(c.type).toEqual("fixed");
      expect(c.value).toEqual("#aaaaaa");

    });

    it("should add an error if c is not a string or an object.", function () {
      var errors = [];
      var c = 1;

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(errors.length).toEqual(1);
    });

    it("should add an error if c.min is not defined.", function () {
      var errors = [];
      var c = { max: "aa"};

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(errors.length).toEqual(1);
    });

    it("should add an error if c.min is not a valid value.", function () {
      var errors = [];
      var c = { max: "aa", min: "aaa"};

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(errors.length).toEqual(1);

      var errors = [];
      var c = { max: "aa", min: "aa"};

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(errors.length).toEqual(0);

    });

    it("should add an error if c.max is not defined.", function () {
      var errors = [];
      var c = { min: "aa"};

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(errors.length).toEqual(1);
    });

    it("should add an error if c.max is not a valid value.", function () {
      var errors = [];
      var c = { min: "aa", max: "aaa"};

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(errors.length).toEqual(1);

      var errors = [];
      var c = { min: "aa", max: "aa"};

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(errors.length).toEqual(0);

    });

    it("should return c parameter with min and mx transformed to int.", function () {
      var errors = [];
      var c = { min: "77", max: "fd" };

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(c.min).toEqual(119);
      expect(c.max).toEqual(253);

    });

    it("should return c parameter with steps set rgbType to 'random' if steps or stepFunction are not set.", function () {
      var errors = [];
      var c = { min: "77", max: "fd" };

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(c.type).toEqual('rgb');
      expect(c.rgbType).toEqual('random');

    });

    it("should return c parameter with rgbType set to 'sequential' if there is an stepfunction.", function () {
      var errors = [];
      var c = { min: "77", max: "fd", steps: true };

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(c.type).toEqual('rgb');
      expect(c.rgbType).toEqual('sequential');

    });

    it("should return c parameter with rgbTtype set to 'function' if stepfunction is defined.", function () {
      var errors = [];
      var c = { min: "77", max: "fd", stepFunction: function(){} };

      var gt = new generativeText();
      c = gt.cTypeInferenceAndValidation(c, 'test', errors);

      expect(c.type).toEqual('rgb');
      expect(c.rgbType).toEqual('function');

    });


  });

  describe('.stepFunctionCheck()', function () {

    it("should add an error if stepFunction is not a function.", function () {
      var errors = [];
      var param = {};
      param.stepFunction = "this is a string";

      var gt = new generativeText();
      gt.stepFunctionCheck(param, 'test', errors);

      expect(errors.length).toEqual(1);

      param.stepFunction = function() {};
      gt.stepFunctionCheck(param, 'test', errors);
      expect(errors.length).toEqual(1);

    });

  });


  describe(".applyToElementById()", function () {

    var gt = new generativeText();

    it("should throw an exception if the id does not exist", function () {
      expect(gt.applyToElementById).toThrow();
    });

  });

  describe(".applyToElementsByClassName()", function () {

    var gt = new generativeText();

    it("should throw an exception if the class does not exist", function () {
      expect(gt.applyToElementsByClassName).toThrow();
    });

  });

  describe(".applyToElement()", function () {

    var elem = document.createElement('div');
    elem.innerHTML = "";
    var gt = new generativeText();

    gt.applyToElement(elem);

    it("should set currentStep to 0", function () {
      expect(gt.currentStep).toBe(0);
    });

    it("should clean memory to be an empty array", function () {
      expect(gt.memory.length).toBe(0);
    });

    it("should initialize opts.applyTo to 'text' as default", function () {
      expect(gt.opts.applyTo).toBe("text");
    });

  });

  describe(".applyToElementsSequentially()", function () {

    var elem = document.createElement('div');
    elem.innerHTML = "<p>aaa</><p>bbb</p><p>ccc</p><p>ddd</p>";
    var ps = elem.getElementsByTagName('p');

    var gt = new generativeText();

    it("should throw an exception if elems does not have length or has length 0", function () {
      expect(gt.applyToElementsSequentially).toThrow();
      var arr = [];
      var exceptionThrown = false;
      try {
        gt.applyToElementsSequentially(arr);
      } catch (e) {
        exceptionThrown = true;
      }
      expect(exceptionThrown).toBe(true);

    });

    it("should style DOM elements sequentially", function () {
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      gt.applyToElementsSequentially(ps);
      expect(ps[0].style.fontSize).toBe("1em");
      expect(ps[1].style.fontSize).toBe("2em");
      expect(ps[2].style.fontSize).toBe("3em");
      expect(ps[3].style.fontSize).toBe("1em");
    });

    it("should appemnd element to memory if opts.memory is set to true", function () {
      gt.opts = {
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
      gt.applyToElementsSequentially(ps);
      expect(gt.memory[0]).toBe(ps[0]);
    });

    it("should call pObj.preFunc() if it exists", function () {
      gt.opts = {
        pObj: {
          preFunc: function() {
            if(this.memory.length > 0) {
              var previous = this.memory[ this.currentStep -1 ];
              previous.style.fontWeight = "300";
            }
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
      gt.applyToElementsSequentially(ps);
      expect(ps[0].style.fontWeight).toBe("300");
    });

    it("should call pObj.posFunc() if it exists", function () {
      gt.opts = {
        pObj: {
          posFunc: function() {
            var current = this.memory[ this.currentStep ];
            current.style.fontWeight = "300";
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
      gt.applyToElementsSequentially(ps);
      expect(ps[0].style.fontWeight).toBe("300");
    });

    it("should give pObj.pFuncs access to currentStep", function () {
      var gt = new generativeText();
      gt.opts = {
        pObj: {
          posFunc: function() {
            var current = this.memory[ this.currentStep ];
            current.style.fontWeight = "300";
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
      gt.applyToElementsSequentially(ps);
      expect(gt.opts.pObj.currentStep).toBe(3);
    });




  });

  describe(".initializePObj()", function () {

    it("should set totalSteps on pObj if pObj exists", function () {
      var gt = new generativeText();
      gt.opts = { pObj: {} };
      gt.totalSteps = 127;

      var elem = document.createElement('div');
      gt.initializePObj(elem);
      expect(gt.opts.pObj.totalSteps).toBe(127);

    });

    it("should set memory on pObj if pObj exists", function () {
      var gt = new generativeText();
      gt.opts = { pObj: {} };
      gt.memory = [1,2,3];

      var elem = document.createElement('div');
      gt.initializePObj(elem);
      expect(gt.opts.pObj.memory).toBe(gt.memory);

    });

    it("should set container on pObj if pObj exists", function () {
      var gt = new generativeText();
      gt.opts = { pObj: {} };

      var elem = document.createElement('div');
      gt.initializePObj(elem);
      expect(gt.opts.pObj.container).toBe(elem);

    });

  });

  describe(".initializeApplyToText()", function () {

    it("should set 'style' as the default textspaces on opts if none is given", function () {
      var gt = new generativeText();
      gt.opts = {};
      var text = "0123456789";
      gt.initializeApplyToText(text);
      expect(gt.opts.textSpaces).toBe('style');

    });

    it("should set 'ltr' as the default direction on opts if none is given", function () {
      var gt = new generativeText();
      gt.opts = {};
      var text = "0123456789";
      gt.initializeApplyToText(text);
      expect(gt.opts.direction).toBe('ltr');

    });

    it("should set totalSteps based on the length of param text", function () {
      var gt = new generativeText();
      gt.opts = {};
      var text = "0123456789";
      gt.initializeApplyToText(text);
      expect(gt.totalSteps).toBe(10);

    });

    it("should set totalSteps to not count spaces when using opts.textSpaces nostyleorcount or remove", function () {
      var gt = new generativeText();
      var text = "012 345 67 89";

      gt.opts = { textSpaces: 'nostyleorcount' };
      gt.initializeApplyToText(text);
      expect(gt.totalSteps).toBe(10);

      text = "012 345 67 89 12";
      gt.opts = { textSpaces: 'nostyleorcount' };
      gt.initializeApplyToText(text);
      expect(gt.totalSteps).toBe(12);

    });
  });

  describe(".applyToText()", function () {

    it("should set true as default for opts.removeSpaceDups if it had not been set", function () {
      var gt = new generativeText();
      gt.opts = {};
      gt.params = {};
      var elem = document.createElement('div');
      elem.innerHTML = "0";
      gt.applyToText(elem);
      expect(gt.opts.removeSpaceDups).toBe(true);

    });

    it("should remove space duplicates when this option is true", function () {
      var gt = new generativeText();
      gt.opts = {};
      gt.params = {};
      var elem = document.createElement('div');
      elem.innerHTML = "0   0";
      gt.applyToText(elem);
      expect(elem.textContent.length).toBe(3);

    });

    it("should wrap each character in a <span>", function () {
      var gt = new generativeText();
      gt.opts = {};
      gt.params = {};
      var elem = document.createElement('div');
      elem.innerHTML = "123";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans.length).toBe(3);
      expect(spans[0].textContent).toBe("1");
      expect(spans[1].textContent).toBe("2");
      expect(spans[2].textContent).toBe("3");

    });

    it("should wrap spaces in a <span> when textSpaces is set to 'style'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style'};
      gt.params = {};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans.length).toBe(3);
      expect(spans[0].textContent).toBe("1")
      expect(/\s/.test(spans[1].textContent)).toBe(true);
      expect(spans[2].textContent).toBe("3");
    });

    it("should style characters sequentially", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "12345";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("2em");
      expect(spans[2].style.fontSize).toBe("3em");
      expect(spans[3].style.fontSize).toBe("1em");
      expect(spans[4].style.fontSize).toBe("2em");
    });

    it("should lay characters sequentially from ltr when opts.direction is 'ltr'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style', direction: 'ltr'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "12345";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].textContent).toBe("1");
      expect(spans[1].textContent).toBe("2");
      expect(spans[2].textContent).toBe("3");
      expect(spans[3].textContent).toBe("4");
      expect(spans[4].textContent).toBe("5");
    });

    it("should lay characters sequentially from rtl when opts.direction is 'rtl'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style', direction: 'rtl'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "12345";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].textContent).toBe("5");
      expect(spans[1].textContent).toBe("4");
      expect(spans[2].textContent).toBe("3");
      expect(spans[3].textContent).toBe("2");
      expect(spans[4].textContent).toBe("1");
    });

    it("should style spaces when textSpaces is set to 'style'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("2em");
      expect(spans[2].style.fontSize).toBe("3em");
    });

    it("should not style spaces when textSpaces is set to 'nostyle'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'nostyle'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("");
      expect(spans[2].style.fontSize).toBe("3em");
    });

    it("should not style spaces, skip count on applying of style when textSpaces is set to 'nostyleorcount'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'nostyleorcount'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("");
      expect(spans[2].style.fontSize).toBe("2em");
    });

    it("should remove spaces when textSpaces is set to 'remove'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'remove'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans.length).toBe(2);
      expect(spans[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("2em");
    });

    it("should call pObj.preFunc() if it exists", function () {
      var gt = new generativeText();
      gt.opts = {
        pObj: {
          preFunc: function() {
            if(this.memory.length > 0) {
              var previous = this.memory[ this.currentStep -1 ];
              previous.style.fontWeight = "300";
            }
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontWeight).toBe("300");
    });

    it("should call pObj.posFunc() if it exists", function () {
      var gt = new generativeText();
      gt.opts = {
        pObj: {
          posFunc: function() {
            var current = this.memory[ this.currentStep ];
            current.style.fontWeight = "300";
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "13";
      gt.applyToText(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontWeight).toBe("300");
    });

    it("should give pObj.pFuncs access to currentStep", function () {
      var gt = new generativeText();
      gt.opts = {
        pObj: {
          posFunc: function() {
            var current = this.memory[ this.currentStep ];
            current.style.fontWeight = "300";
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "012345678";
      gt.applyToText(elem);
      expect(gt.opts.pObj.currentStep).toBe(8);
    });

  });

  describe(".applyToWrapped()", function () {

    it("should set true as default for opts.removeSpaceDups if it had not been set", function () {
      var gt = new generativeText();
      gt.opts = {};
      gt.params = {};
      var elem = document.createElement('div');
      elem.innerHTML = "0";
      gt.applyToWrapped(elem);
      expect(gt.opts.removeSpaceDups).toBe(true);

    });

    it("should remove space duplicates when this option is true", function () {
      var gt = new generativeText();
      gt.opts = {};
      gt.params = {};
      var elem = document.createElement('div');
      elem.innerHTML = "0   0";
      gt.applyToWrapped(elem);
      expect(elem.textContent.length).toBe(3);

    });

    it("should wrap words in <span> with whiteSpace set to 'nowrap'", function () {
      var gt = new generativeText();
      gt.opts = {};
      gt.params = {};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three";
      gt.applyToWrapped(elem);
      expect(elem.childNodes.length).toBe(5); //3 words, 2 spaces (that are on their own span
      expect(elem.childNodes[0].style.whiteSpace).toBe("nowrap");
      expect(elem.childNodes[2].style.whiteSpace).toBe("nowrap");
      expect(elem.childNodes[4].style.whiteSpace).toBe("nowrap");
    });

    it("should wrap each character ina word inside a <span>", function () {
      var gt = new generativeText();
      gt.opts = {};
      gt.params = {};
      var elem = document.createElement('div');
      elem.innerHTML = "123 1234 12345678";
      gt.applyToWrapped(elem);
      expect(elem.childNodes[0].getElementsByTagName('span').length).toBe(3);
      expect(elem.childNodes[2].getElementsByTagName('span').length).toBe(4);
      expect(elem.childNodes[4].getElementsByTagName('span').length).toBe(8);
    });

    it("should style characters sequentially", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "123 56";
      gt.applyToWrapped(elem);
      var spans = elem.childNodes[0].getElementsByTagName('span');
      expect(spans[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("2em");
      expect(spans[2].style.fontSize).toBe("3em");
      spans = elem.childNodes[2].getElementsByTagName('span');
      expect(spans[0].style.fontSize).toBe("2em"); //The space is styled too
      expect(spans[1].style.fontSize).toBe("3em");
    });

    it("should lay characters sequentially from ltr when opts.direction is 'ltr'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style', direction: 'ltr'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "123 45";
      gt.applyToWrapped(elem);
      var spans = elem.childNodes[0].getElementsByTagName('span');
      expect(spans[0].textContent).toBe("1");
      expect(spans[1].textContent).toBe("2");
      expect(spans[2].textContent).toBe("3");
      spans = elem.childNodes[2].getElementsByTagName('span');
      expect(spans[0].textContent).toBe("4");
      expect(spans[1].textContent).toBe("5");
    });

    it("should lay characters sequentially from rtl when opts.direction is 'rtl'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style', direction: 'rtl'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "123 45";
      gt.applyToWrapped(elem);
      var spans = elem.childNodes[0].getElementsByTagName('span');
      expect(spans[0].textContent).toBe("5");
      expect(spans[1].textContent).toBe("4");
      spans = elem.childNodes[2].getElementsByTagName('span');
      expect(spans[0].textContent).toBe("3");
      expect(spans[1].textContent).toBe("2");
      expect(spans[2].textContent).toBe("1");
    });


    it("should style spaces when textSpaces is set to 'style'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 312 31";
      gt.applyToWrapped(elem);
      var spans = elem.childNodes;
      expect(spans[1].style.fontSize).toBe("2em");
      expect(spans[3].style.fontSize).toBe("3em");
    });

    it("should not style spaces when textSpaces is set to 'nostyle'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'nostyle'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToWrapped(elem);
      var spans = elem.childNodes;
      expect(spans[0].getElementsByTagName('span')[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("");
      expect(spans[2].getElementsByTagName('span')[0].style.fontSize).toBe("3em");
    });

    it("should not style spaces, skip count on applying of style when textSpaces is set to 'nostyleorcount'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'nostyleorcount'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToWrapped(elem);
      var spans = elem.childNodes;
      expect(spans[0].getElementsByTagName('span')[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("");
      expect(spans[2].getElementsByTagName('span')[0].style.fontSize).toBe("2em");
    });

    it("should remove spaces when textSpaces is set to 'remove'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'remove'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToWrapped(elem);
      var spans = elem.childNodes;
      expect(spans.length).toBe(2);
      expect(spans[0].getElementsByTagName('span')[0].style.fontSize).toBe("1em");
      expect(spans[1].getElementsByTagName('span')[0].style.fontSize).toBe("2em");
    });

    it("should call pObj.preFunc() if it exists", function () {
      var gt = new generativeText();
      gt.opts = {
        pObj: {
          preFunc: function() {
            if(this.memory.length > 0) {
              var previous = this.memory[ this.currentStep -1 ];
              previous.style.fontWeight = "300";
            }
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToWrapped(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].getElementsByTagName('span')[0].style.fontWeight).toBe("300");
    });

    it("should call pObj.posFunc() if it exists", function () {
      var gt = new generativeText();
      gt.opts = {
        pObj: {
          posFunc: function() {
            var current = this.memory[ this.currentStep ];
            current.style.fontWeight = "300";
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "13";
      gt.applyToWrapped(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].getElementsByTagName('span')[0].style.fontWeight).toBe("300");
    });

    it("should give pObj.pFuncs access to currentStep", function () {
      var gt = new generativeText();
      gt.opts = {
        pObj: {
          posFunc: function() {
            var current = this.memory[ this.currentStep ];
            current.style.fontWeight = "300";
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "012345678";
      gt.applyToWrapped(elem);
      expect(gt.opts.pObj.currentStep).toBe(8);
    });

  });

  describe(".initializeApplyToWords()", function () {

    it("should set 'remove' as the default textspaces on opts if none is given", function () {
      var gt = new generativeText();
      gt.opts = {};
      var text = "0123456789";
      gt.initializeApplyToWords(10);
      expect(gt.opts.textSpaces).toBe('remove');

    });

    it("should set 'ltr' as the default direction on opts if none is given", function () {
      var gt = new generativeText();
      gt.opts = {};
      var text = "0123456789";
      gt.initializeApplyToWords(10);
      expect(gt.opts.direction).toBe('ltr');

    });


    it("should set totalSteps based on the length parameter", function () {
      var gt = new generativeText();
      gt.opts = {};
      var text = "0123456789";
      gt.initializeApplyToWords(10);
      expect(gt.totalSteps).toBe(10);

    });

    it("should set totalSteps to account for spaces if opts.textSpaces is set to 'style' or 'nostyle'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: "style"};
      var text = "0123456789";
      gt.initializeApplyToWords(10);
      expect(gt.totalSteps).toBe(19);

    });

  });

  describe(".applyToWords()", function () {

    it("should remove duplicated spaces", function () {
      var gt = new generativeText();
      gt.opts = {textSpaces: "style"};
      gt.params = {};
      var elem = document.createElement('div');
      elem.innerHTML = "aaa    aaaa";
      gt.applyToWords(elem);
      expect(elem.getElementsByTagName('span').length).toBe(3);

    });

    it("should wrap each word in a <span>", function () {
      var gt = new generativeText();
      gt.opts = {};
      gt.params = {};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans.length).toBe(3);
      expect(spans[0].textContent).toBe("one");
      expect(spans[1].textContent).toBe("two");
      expect(spans[2].textContent).toBe("three");

    });

    it("should style words sequentially", function () {
      var gt = new generativeText();
      gt.opts = {};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three four five";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("2em");
      expect(spans[2].style.fontSize).toBe("3em");
      expect(spans[3].style.fontSize).toBe("1em");
      expect(spans[4].style.fontSize).toBe("2em");
    });

    it("should lay words sequentially from ltr when opts.direction is 'ltr'", function () {
      var gt = new generativeText();
      gt.opts = { direction: 'ltr' };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three four five";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].textContent).toBe("one");
      expect(spans[2].textContent).toBe("three");
      expect(spans[4].textContent).toBe("five");
    });

    it("should lay words sequentially from rtl when opts.direction is 'rtl'", function () {
      var gt = new generativeText();
      gt.opts = { direction: 'rtl' };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three four five";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].textContent).toBe("five");
      expect(spans[2].textContent).toBe("three");
      expect(spans[4].textContent).toBe("one");
    });


    it("should transform to '&nbsp' entity and style spaces when using textSpaces = 'style'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three four five";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("2em");
      expect(spans[2].style.fontSize).toBe("3em");
      expect(spans[3].style.fontSize).toBe("1em");
      expect(spans[4].style.fontSize).toBe("2em");
      expect(spans[5].style.fontSize).toBe("3em");
      expect(spans[6].style.fontSize).toBe("1em");
      expect(spans[7].style.fontSize).toBe("2em");
      expect(spans[8].style.fontSize).toBe("3em");

      expect(spans[1].innerHTML).toBe("&nbsp;");
      expect(spans[3].innerHTML).toBe("&nbsp;");
      expect(spans[5].innerHTML).toBe("&nbsp;");
      expect(spans[7].innerHTML).toBe("&nbsp;");
    });

    it("should transform to '&nbsp' entity but not style spaces when using textSpaces = 'nostyle'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'nostyle'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three four five";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("");
      expect(spans[2].style.fontSize).toBe("3em");
      expect(spans[3].style.fontSize).toBe("");
      expect(spans[4].style.fontSize).toBe("2em");
      expect(spans[5].style.fontSize).toBe("");
      expect(spans[6].style.fontSize).toBe("1em");
      expect(spans[7].style.fontSize).toBe("");
      expect(spans[8].style.fontSize).toBe("3em");

      expect(spans[1].innerHTML).toBe("&nbsp;");
      expect(spans[3].innerHTML).toBe("&nbsp;");
      expect(spans[5].innerHTML).toBe("&nbsp;");
      expect(spans[7].innerHTML).toBe("&nbsp;");
    });

    it("should transform to '&nbsp' entity but not style spaces or count when using textSpaces = 'nostyleorcount'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'nostyleorcount'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three four five";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontSize).toBe("1em");
      expect(spans[1].style.fontSize).toBe("");
      expect(spans[2].style.fontSize).toBe("2em");
      expect(spans[3].style.fontSize).toBe("");
      expect(spans[4].style.fontSize).toBe("3em");
      expect(spans[5].style.fontSize).toBe("");
      expect(spans[6].style.fontSize).toBe("1em");
      expect(spans[7].style.fontSize).toBe("");
      expect(spans[8].style.fontSize).toBe("2em");

      expect(spans[1].innerHTML).toBe("&nbsp;");
      expect(spans[3].innerHTML).toBe("&nbsp;");
      expect(spans[5].innerHTML).toBe("&nbsp;");
      expect(spans[7].innerHTML).toBe("&nbsp;");
    });

    it("should remove spaces when using textSpaces = 'nostyleorcount'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'remove'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three four five";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans.length).toBe(5);
    });

    it("should remove spaces and add '&nbsp' entities at the beginning and end of even elements, while not adding a '&nbsp' entitiy at the beggining or the end of the sequence, when using textSpaces = 'even'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'even'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three four";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].innerHTML).toBe("one");
      expect(spans[1].innerHTML).toBe("&nbsp;two&nbsp;");
      expect(spans[2].innerHTML).toBe("three");
      expect(spans[3].innerHTML).toBe("&nbsp;four");
    });

    it("should remove spaces and add '&nbsp' entities at the beginning and end of odd elements, while not adding a '&nbsp' entitiy at the beggining or the end of the sequence, when using textSpaces = 'odd'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'odd'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three ";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].innerHTML).toBe("one&nbsp;");
      expect(spans[1].innerHTML).toBe("two");
      expect(spans[2].innerHTML).toBe("&nbsp;three");
    });

    it("should remove spaces and add '&nbsp' entities at the beginning and end of all elements, while not adding a '&nbsp' entitiy at the beggining or the end of the sequence, when using textSpaces = 'all'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'all'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three ";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].innerHTML).toBe("one&nbsp;");
      expect(spans[1].innerHTML).toBe("&nbsp;two&nbsp;");
      expect(spans[2].innerHTML).toBe("&nbsp;three");
    });

    it("should call pObj.preFunc() if it exists", function () {
      var gt = new generativeText();
      gt.opts = {
        pObj: {
          preFunc: function() {
            if(this.memory.length > 0) {
              var previous = this.memory[ this.currentStep -1 ];
              previous.style.fontWeight = "300";
            }
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "1 3";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontWeight).toBe("300");
    });

    it("should call pObj.posFunc() if it exists", function () {
      var gt = new generativeText();
      gt.opts = {
        pObj: {
          posFunc: function() {
            var current = this.memory[ this.currentStep ];
            current.style.fontWeight = "300";
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "13";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans[0].style.fontWeight).toBe("300");
    });

    it("should give pObj.pFuncs access to currentStep", function () {
      var gt = new generativeText();
      gt.opts = {
        pObj: {
          posFunc: function() {
            var current = this.memory[ this.currentStep ];
            current.style.fontWeight = "300";
          }
        },
        memory: true,
      };
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", type: 'list', listType: 'sequential'}};
      var elem = document.createElement('div');
      elem.innerHTML = "00 11 222 3 4444";
      gt.applyToWords(elem);
      expect(gt.opts.pObj.currentStep).toBe(4);
    });


  });

  describe('.getElementText()', function () {
    it("should get the text from inside a DOM node", function () {
      var el = document.createElement("div");
      el.innerHTML = "<p>aaaa<span>bbbb</span>cccc</p>"
      var gt = new generativeText();
      expect(gt.getElementText(el)).toEqual("aaaabbbbcccc");
    });

  });

  describe('.appendTextElement()', function () {
    it("should append an element", function () {
      var el = document.createElement("div");
      var gtNewElement = document.createElement("span");
      gtNewElement.innerHTML = "AAAA";
      var gt = new generativeText();
      gt.appendTextElement(el, gtNewElement);
      expect(el.innerHTML).toEqual("<span>AAAA</span>");
    });

    it("should append an element to memory if memory is set on opts", function () {
      var el = document.createElement("div");
      var gtNewElement = document.createElement("span");
      gtNewElement.innerHTML = "AAAA";
      var gt = new generativeText();
      gt.opts = {memory: true};
      gt.appendTextElement(el, gtNewElement);

      expect(gt.memory).toEqual([gtNewElement]);
    });

  });


  describe(".generateStyle()", function () {

    it("should throw an exception when the rule name does not exist in defs", function () {
      var params = {
        pedro: {},
      };
      var gt = new generativeText();

      var exceptionThrown = false;
      try {
        gt.generateColorVariation(param);
      } catch (e) {
        exceptionThrown = true;
      }
      expect(exceptionThrown).toBe(true);
    });


    it("should set this.current Parameter", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontFamily: {values: ['Helvetica']},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect(gt.currentParameter).toBe('fontFamily');
    });

    /*
      It became necessary when refactoring for type inference to rewrite all this tests,
      to reflect the fact that params get changed when type inference and validation is done.
      So we are using the generated parameters when testing this function.
     */

    it("should work with string (fixed) values", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontFamily: 'Helvetica',
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      expect(elem.style.fontFamily).toBe('Helvetica');
    });


    it("should work on list rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontFamily: {values: ['Helvetica']},
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      expect(elem.style.fontFamily).toBe('Helvetica');
    });

    it("should work on numeric rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontSize: {values: ['1.4'], unit: 'em'},
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      expect(elem.style.fontSize).toBe('1.4em');
    });

    it("should work on color rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        color: {values: ['aaaaaa']},
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      expect(elem.style.color).toBe('rgb(170, 170, 170)');
    });

    it("should work on transform rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        transformRotateX: {values: ['30']},
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      expect(elem.style.transform).toBe('rotateX(30deg)');
    });

    it("should work on transform rules that are not deg", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        transformTranslateX: {values: ['30']},
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      expect(elem.style.transform).toBe('translateX(30px)');
    });

    it("should work on transform rules that are not deg an specify their own rule", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        transformTranslateX: {values: ['45'], unit: "em"},
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      expect(elem.style.transform).toBe('translateX(45em)');
    });

    it("should work on various transform rules at a time", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        transformRotateX: {values: ['30']},
        transformSkewX:  {values: ['30']},
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      expect(elem.style.transform).toBe('rotateX(30deg) skewX(30deg)');
    });

    it("should work on various rules at a time", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontFamily: {values: ['Helvetica']},
        fontSize: {values: ['1.4'], unit: 'em'},
        color: {values: ['aaaaaa']},
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      expect(elem.style.fontFamily).toBe('Helvetica');
      expect(elem.style.fontSize).toBe('1.4em');
      expect(elem.style.color).toBe('rgb(170, 170, 170)');
    });

    it("should work on boxShadow rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        boxShadow: {
          hShadow: { values: ["1"]},
          vShadow: { values: ["1"]},
          blur: { values: ["1"]},
          spread: { values: ["1"]},
          color: { values: ["#000000"] }
        }
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      console.log(gt.params);

      var es = elem.style.boxShadow;
      //different browsers return property as string differently
      var test = (es === 'rgb(0, 0, 0) 1px 1px 1px 1px' || es === '1px 1px 1px 1px rgb(0, 0, 0)');
      expect(test).toBe(true);
    });

    it("should work on boxShadow array rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        boxShadow: [
          {
            hShadow: { values: ["1"]},
            vShadow: { values: ["1"]},
            blur: { values: ["1"]},
            spread: { values: ["1"]},
            color: { values: ["#000000"] }
          },
          {
            hShadow: { values: ["2"]},
            vShadow: { values: ["2"]},
            blur: { values: ["2"]},
            spread: { values: ["2"]},
            color: { values: ["#ffffff"] }
          }
        ]
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      var es = elem.style.boxShadow;
      //different browsers return property as string differently
      var test = (es === 'rgb(0, 0, 0) 1px 1px 1px 1px, rgb(255, 255, 255) 2px 2px 2px 2px' || es === '1px 1px 1px 1px rgb(0, 0, 0), 2px 2px 2px 2px rgb(255, 255, 255)');
      expect(test).toBe(true);
    });

    it("should work on textShadow rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        textShadow: {
          hShadow: { values: ["1"]},
          vShadow: { values: ["1"]},
          blurRadius: { values: ["1"]},
          color: { values: ["#000000"]},
        }
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      var es = elem.style.textShadow;
      //different browsers return property as string differently
      var test = (es === 'rgb(0, 0, 0) 1px 1px 1px' || es === '1px 1px 1px rgb(0, 0, 0)');
      expect(test).toBe(true);
    });

    it("should work on textShadow array rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        textShadow: [
          {
            hShadow: {values: ["1"]},
            vShadow: {values: ["1"]},
            blurRadius: {values: ["1"]},
            color: {values: ["#000000"]},
          },
          {
            hShadow: { values: ["2"]},
            vShadow: { values: ["2"]},
            blurRadius: {values: ["2"]},
            color: { values: ["#ffffff"]},
          }
        ]
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      var es = elem.style.textShadow;
      //different browsers return property as string differently
      var test = (es === 'rgb(0, 0, 0) 1px 1px 1px, rgb(255, 255, 255) 2px 2px 2px' || es === '1px 1px 1px rgb(0, 0, 0), 2px 2px 2px rgb(255, 255, 255)');
      expect(test).toBe(true);
    });

    it("should work on filter rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        filterHueRotate: {values: ['30']},
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      var worked = false;
      //Firefox
      if(elem.style['filter'] == 'hue-rotate(30deg)') worked = true;
      //Chrome
      if(elem.style['-webkit-filter'] == 'hue-rotate(30deg)') worked = true;
      expect(worked).toBe(true);
    });

    it("should work on various filter rules at a time", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        filterHueRotate: {values: ['30']},
        filterGrayScale: {values: ['30']},
        filterBlur: {values: ['30']},
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      var worked = false;
      //Firefox
      if(elem.style['filter'] == 'hue-rotate(30deg) grayscale(30%) blur(30px)') worked = true;
      //Chrome
      if(elem.style['-webkit-filter'] == 'hue-rotate(30deg) grayscale(30%) blur(30px)') worked = true;
      expect(worked).toBe(true);
    });

    it("should work on filterDropShadow rule", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        filterDropShadow: {
          hShadow: {values: ["1"]},
          vShadow: {values: ["1"]},
          blurRadius: {values: ["1"]},
          color: {values: ["#000000"]},
        },
      };
      var gt = new generativeText(params);

      gt.generateStyle(gt.params, elem);
      var worked = false;
      //Firefox
      if(elem.style['filter'] == 'drop-shadow(1px 1px 1px rgb(0, 0, 0))') worked = true;
      //Chrome
      if(elem.style['-webkit-filter'] == 'drop-shadow(rgb(0, 0, 0) 1px 1px 1px)') worked = true;
      expect(worked).toBe(true);
    });

    it("should work on twoNumeric rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        backgroundSize: {
          x: {type: "fixed", value:"20%"},
          y: {type: "fixed", value:"30%"},
        }
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);

      var es = elem.style.boxShadow;
      //different browsers return property as string differently
      expect(elem.style['background-size']).toBe("20% 30%");
    });

    it("should work on threeNumeric rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        transformOrigin: {
          x: {type: "fixed", value:"20%"},
          y: {type: "fixed", value:"30%"},
          z: {type: "fixed", value:"40px"},
        }
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);

      var es = elem.style.boxShadow;
      //different browsers return property as string differently
      expect(elem.style['transform-origin']).toBe("20% 30% 40px");
    });

  });

  describe(".setBrowserStyle()", function() {

    it("should set transform rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var val = "rotateX(90deg)";

      var gt = new generativeText();
      gt.setBrowserStyle(elem, "transform", val);
      expect(elem.style.transform).toBe('rotateX(90deg)');
    });

    it("should set multiple transform rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var gt = new generativeText();
      gt.setBrowserStyle(elem, "transform", "rotateX(90deg)");
      gt.setBrowserStyle(elem, "transform", "skewX(45deg)");
      expect(elem.style.transform).toBe('rotateX(90deg) skewX(45deg)');
    });

    it("should set the rules only once when adding browser specific syntax", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var gt = new generativeText();
      gt.setBrowserStyle(elem, "transform", "rotateX(90deg)");
      gt.setBrowserStyle(elem, "transform", "skewX(45deg)");
      gt.setBrowserStyle(elem, "-ms-transform", "rotateX(90deg)");
      gt.setBrowserStyle(elem, "-ms-transform", "skewX(45deg)");
      gt.setBrowserStyle(elem, "-webkit-transform", "rotateX(90deg)");
      gt.setBrowserStyle(elem, "-webkit-transform", "skewX(45deg)");
      expect(elem.style.transform).toBe('rotateX(90deg) skewX(45deg)');
    });
  });

  describe(".generateListStyle()", function () {
    it("should add the unit (argument to the function) when the param does not have it", function () {
      var param = {};
      param.values = [6];
      param.type = 'list';
      param.listType = 'random';
      var gt = new generativeText();
      expect(gt.generateListStyle(param, 'px')).toBe('6px');
    });
  });

  describe(".generateListVariation()", function () {

    it("should throw an exception if param.values is not an array", function () {

      var gt = new generativeText();
      expect(gt.generateListVariation).toThrow();
    });


    it("should return a random value within param.values when listType = 'random'", function () {
      var param = {};
      param.values = [0, 1, 2, 3, 4];
      param.listType = 'random';
      var gt = new generativeText();
      expect(gt.generateListVariation(param)).toBeLessThan(5);
      expect(gt.generateListVariation(param)).toBeGreaterThan(-1);
    });

    it("should return a value based on the currentStep when listType = 'sequential'", function () {
      var param = {};
      param.values = [0, 1, 2, 3, 4];
      param.listType = 'sequential';
      var gt = new generativeText();
      gt.currentStep = 2;
      expect(gt.generateListVariation(param)).toBe('2');
      gt.currentStep = 5;
      expect(gt.generateListVariation(param)).toBe('0');
      gt.currentStep = 14;
      expect(gt.generateListVariation(param)).toBe('4');
    });

    it("should return the value in the key returned by the stepFunction when listType = 'function'", function () {
      var param = {};
      param.values = [0, 1, 2, 3, 4];
      param.listType = 'function';
      param.stepFunction = function () {
        return 3;
      };
      var gt = new generativeText();
      expect(gt.generateListVariation(param)).toBe('3');
    });

    it("should provide stepFunction with access to currentStep, totalSteps when listType = 'function'", function () {
      var param = {};
      param.values = [0, 1, 2, 3, 4];
      param.listType = 'function';
      param.stepFunction = function () {
        return this.currentStep + 1;
      };
      var gt = new generativeText();
      gt.currentStep = 2;
      expect(gt.generateListVariation(param)).toBe('3');

      param.stepFunction = function () {
        return this.totalSteps + 1;
      };
      gt.totalSteps = 1;
      expect(gt.generateListVariation(param)).toBe('2');

      param.stepFunction = function () {
        return this.valuesLength - 1;
      };
      expect(gt.generateListVariation(param)).toBe('4');
    });

  });

  describe(".generateNumericStyle()", function () {
    it("should add the unit (argument to the function) when the param does not have it", function () {
      var param = {};
      param.values = [6];
      param.type = "list";
      param.listType = "random";
      var gt = new generativeText();
      expect(gt.generateNumericStyle(param, 'px')).toBe('6px');
    });

    it("should return a fixed value when param.type = 'fixed'", function () {
      var param = {};
      param.type = "fixed"
      param.value = "6px";
      var gt = new generativeText();
      expect(gt.generateNumericStyle(param, 'px')).toBe('6px');
    });

  });

  describe(".generateNumericVariation()", function () {

    it("should return a random value within range of param.min and param.max when numericType = 'random'", function () {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      param.numericType = "random";
      var gt = new generativeText();
      expect(gt.generateNumericVariation(param)).toBeLessThan(6);
      expect(gt.generateNumericVariation(param)).toBeGreaterThan(-1);
    });

    it("should return a value based on the currentStep when numericType = 'sequential'", function () {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      param.numericType = "sequential";
      var gt = new generativeText();
      gt.totalSteps = 5;
      gt.currentStep = 0;
      expect(gt.generateNumericVariation(param)).toBe('0');
      gt.currentStep = 2;
      expect(gt.generateNumericVariation(param)).toBe('2');
      gt.currentStep = 4;
      expect(gt.generateNumericVariation(param)).toBe('4');

    });

    it("should return the value in the key returned by the stepFunction when numericType = 'function'", function () {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      param.numericType = "function";
      param.stepFunction = function () {
        return 3;
      };
      var gt = new generativeText();
      expect(gt.generateNumericVariation(param)).toBe('3');
    });

    it("should provide stepFunction with access to currentStep, totalSteps, range, min and max when numericType = 'function'", function () {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      param.numericType = "function";
      param.stepFunction = function () {
        return this.currentStep + 1;
      };
      var gt = new generativeText();
      gt.currentStep = 2;
      expect(gt.generateNumericVariation(param)).toBe('3');

      param.stepFunction = function () {
        return this.totalSteps + 1;
      };
      gt.totalSteps = 1;
      expect(gt.generateNumericVariation(param)).toBe('2');

      param.stepFunction = function () {
        return this.range;
      };
      expect(gt.generateNumericVariation(param)).toBe('5');

      param.stepFunction = function () {
        return this.min;
      };
      expect(gt.generateNumericVariation(param)).toBe('0');

      param.stepFunction = function () {
        return this.max;
      };
      expect(gt.generateNumericVariation(param)).toBe('5');
    });

  });

  describe(".generateColorStyle()", function () {
    it("should prefix the color value with a '#'", function () {
      var gt = new generativeText();

      var param = {};
      param = { type:"fixed", value:"aabbcc" };
      expect(gt.generateColorStyle(param)).toBe('#aabbcc');
    });

    it("should not prefix the color value with a '#' if it already has that prefix", function () {
      var param = {values: ['#aaaaaa'], type: 'list', listType: "random"};
      var gt = new generativeText();

      expect(gt.generateColorStyle(param)).toBe('#aaaaaa');
    });

    it("should return a fixed value when param.type = 'fixed'", function () {
      var c = {};
      c.type = "fixed"
      c.value = "#aaff77";
      var gt = new generativeText();
      expect(gt.generateRGBHex(c)).toBe('#aaff77');
    });


  });

  describe(".generateColorVariation()", function () {


    it("should agregate r,g and b", function () {
      var param = {};
      param.r = { type:"fixed", value:'aa' };
      param.g = {type:"fixed", value:'bb' };
      param.b = {type:"fixed", value:'cc' };
      var gt = new generativeText();

      expect(gt.generateColorVariation(param)).toBe('aabbcc');
    });

  });

  describe(".generateRGBHex()", function () {

    it("should return a fixed value when c.type = 'fixed'", function () {
      var c = {};
      c.type = "fixed"
      c.value = "aa";
      var gt = new generativeText();
      expect(gt.generateRGBHex(c)).toBe('aa');
    });

    it("should return a random value within range of c.min and c.max when c.type = 'rgb' and c.rgbType = 'random'", function () {
      var c = {};
      c.type = "rgb";
      c.rgbType = "random";
      c.min = 170; //aa
      c.max = 204; //cc
      var gt = new generativeText();
      var testGreater = gt.generateRGBHex(c) >= "aa";
      expect(testGreater).toBe(true);
      var testSmaller = gt.generateRGBHex(c) <= "cc";
      expect(testSmaller).toBe(true);
    });

    it("should return a value based on the currentStep when c.type = 'rgb' and c.rgbType = 'sequential'", function () {
      var c = {};
      c.type = "rgb";
      c.rgbType = "sequential";
      c.min = 0;
      c.max = 16;
      var gt = new generativeText();
      gt.totalSteps = 15;
      gt.currentStep = 0;
      expect(gt.generateRGBHex(c)).toBe('00');
      gt.currentStep = 2;
      expect(gt.generateRGBHex(c)).toBe('02');
      gt.currentStep = 10;
      expect(gt.generateRGBHex(c)).toBe('0a');

    });

    it("should return the value returned by the stepFunction in Hexa when when c.type = 'rgb' and c.rgbType = 'function'", function () {
      var c = {};
      c.type = "rgb";
      c.rgbType = "function";
      c.min = 1;
      c.max = 17;
      c.steps = true;
      c.stepFunction = function () {
        return 16;
      };
      var gt = new generativeText();
      expect(gt.generateRGBHex(c)).toBe('10');
    });

    it("should provide stepFunction with access to currentStep, totalSteps, range, min and max when c.type = 'rgb' and c.rgbType = 'function'", function () {
      var c = {};
      c.type = "rgb";
      c.rgbType = "function";
      c.min = 1;
      c.max = 17;
      c.steps = true;
      c.stepFunction = function () {
        return this.currentStep;
      };
      var gt = new generativeText();
      gt.currentStep = 32;
      expect(gt.generateRGBHex(c)).toBe('20');

      c.stepFunction = function () {
        return this.totalSteps;
      };
      gt.totalSteps = 255;
      expect(gt.generateRGBHex(c)).toBe('ff');

      c.stepFunction = function () {
        return this.range;
      };
      expect(gt.generateRGBHex(c)).toBe('10');

      c.stepFunction = function () {
        return this.min;
      };
      expect(gt.generateRGBHex(c)).toBe('01');

      c.stepFunction = function () {
        return this.max;
      };
      expect(gt.generateRGBHex(c)).toBe('11');
    });

  });

  describe(".generateBoxShadowStyle()", function () {

  });

  describe(".generateTextShadowStyle()", function () {

    it("should throw an exception if some of the required parameters are not set", function () {
      var gt = new generativeText();

      var param = 	{
        hShadow: { type: "list", values: ["3"]},
        vShadow: { type: "list", values: ["3"]},
        blurRadius: { min: 0, max: 10, steps: true},
        color: { type: "generate", r: { min: "00", max: "ff", steps: true}, g: { fixed: "88"}, b: {fixed: "88"} }
      };

      var exceptionThrown = false;
      try {
        gt.generateTextShadowStyle(param);
      } catch (e) {
        exceptionThrown = true;
      }

      expect(exceptionThrown).toBe(false);

      var param = 	{
        vShadow: { type: "list", values: ["3"]},
        blurRadius: { min: 0, max: 10, steps: true},
        color: { type: "generate", r: { min: "00", max: "ff", steps: true}, g: { fixed: "88"}, b: {fixed: "88"} }
      };

      var exceptionThrown = false;
      try {
        gt.generateTextShadowStyle(param);
      } catch (e) {
        exceptionThrown = true;
      }

      expect(exceptionThrown).toBe(true);

      var param = 	{
        hShadow: { type: "list", values: ["3"]},
        blurRadius: { min: 0, max: 10, steps: true},
        color: { type: "generate", r: { min: "00", max: "ff", steps: true}, g: { fixed: "88"}, b: {fixed: "88"} }
      };

      var exceptionThrown = false;
      try {
        gt.generateTextShadowStyle(param);
      } catch (e) {
        exceptionThrown = true;
      }

      expect(exceptionThrown).toBe(true);

      var param = 	{
        hShadow: { type: "list", values: ["3"]},
        vShadow: { type: "list", values: ["3"]},
        color: { type: "generate", r: { min: "00", max: "ff", steps: true}, g: { fixed: "88"}, b: {fixed: "88"} }
      };

      var exceptionThrown = false;
      try {
        gt.generateTextShadowStyle(param);
      } catch (e) {
        exceptionThrown = true;
      }

      expect(exceptionThrown).toBe(true);

      var param = 	{
        hShadow: { type: "list", values: ["3"]},
        vShadow: { type: "list", values: ["3"]},
        blurRadius: { min: 0, max: 10, steps: true},
      };

      var exceptionThrown = false;
      try {
        gt.generateTextShadowStyle(param);
      } catch (e) {
        exceptionThrown = true;
      }

      expect(exceptionThrown).toBe(true);

    });
  });

  describe(".roundUnit()", function () {

    it("should round Units differently according to unit type", function () {
      var gt = new generativeText();
      expect(gt.roundUnit(98.75689, "float")).toEqual("98.76");
      expect(gt.roundUnit(98.75689, "em")).toEqual("98.76em");
      expect(gt.roundUnit(98.75, "px")).toEqual("99px");
    });

  });

  describe(".roundUnit()", function () {

    it("should round Units differently according to unit type", function () {
      var gt = new generativeText();
      expect(gt.roundUnit(98.75689, "float")).toEqual("98.76");
      expect(gt.roundUnit(98.75689, "em")).toEqual("98.76em");
      expect(gt.roundUnit(98.75, "px")).toEqual("99px");
    });

  });

  describe(".removeTrailingZeros()", function() {

    it("should remove trailing zeros", function () {
      var gt = new generativeText();
      expect(gt.removeTrailingZeros("1.5000")).toEqual("1.5");
      expect(gt.removeTrailingZeros("1.500")).toEqual("1.5");
      expect(gt.removeTrailingZeros("1.50")).toEqual("1.5");
      expect(gt.removeTrailingZeros("1.5")).toEqual("1.5");
      expect(gt.removeTrailingZeros("1.000")).toEqual("1");
      expect(gt.removeTrailingZeros("1.00")).toEqual("1");
      expect(gt.removeTrailingZeros("1000.00")).toEqual("1000");
      expect(gt.removeTrailingZeros("900")).toEqual("900");
      expect(gt.removeTrailingZeros("15670")).toEqual("15670");
      expect(gt.removeTrailingZeros("10")).toEqual("10");


    });

  });

  describe('.rgbCheck()', function () {

    it("should return RGB Units properly", function () {
      var gt = new generativeText();
      expect(gt.rgbCheck("5")).toEqual("05");
      expect(gt.rgbCheck("15")).toEqual("15");
      expect(gt.rgbCheck("aa")).toEqual("aa");
    });

  });


});