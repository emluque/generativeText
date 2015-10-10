describe("GenerativeText", function() {

  describe(".applyToElementById()", function() {

    var mock = new generativeText();

    it("should thorw an exception if the id does not exist", function() {
      expect(mock.applyToElementById).toThrow();
    });

  });

  describe(".applyToElementsByClassName()", function() {

    var mock = new generativeText();

    it("should thorw an exception if the class does not exist", function() {
      expect(mock.applyToElementsByClassName).toThrow();
    });

  });

  describe(".roundUnit()", function() {

    it("should round Units differently according to unit type", function() {
      var mock = new generativeText();
      expect(mock.roundUnit(98.75689, "opacity")).toEqual("98.76");
      expect(mock.roundUnit(98.75689, "em")).toEqual("98.76em");
      expect(mock.roundUnit(98.75, "px")).toEqual("99px");
    });

  });

  describe('.rgbCheck()', function() {

    it("should return RGB Units properly", function() {
      var mock = new generativeText();
      expect(mock.rgbCheck("5")).toEqual("05");
      expect(mock.rgbCheck("15")).toEqual("15");
      expect(mock.rgbCheck("aa")).toEqual("aa");
    });

  });

  describe('.getElementText()', function() {
    it("should get the text from inside a DOM node", function() {
      var mockElement = document.createElement("div");
      mockElement.innerHTML = "<p>aaaa<span>bbbb</span>cccc</p>"
      var mock = new generativeText();
      expect(mock.getElementText(mockElement)).toEqual("aaaabbbbcccc");
    });

  });

  describe('.appendTextElement()', function() {
    it("should append an element", function() {
      var mockElement = document.createElement("div");
      var mockNewElement = document.createElement("span");
      mockNewElement.innerHTML = "AAAA";
      var mock = new generativeText();
      mock.appendTextElement(mockElement,mockNewElement);
      expect(mockElement.innerHTML).toEqual("<span>AAAA</span>");
    });

    it("should append an element to memory if memory is set on opts", function() {
      var mockElement = document.createElement("div");
      var mockNewElement = document.createElement("span");
      mockNewElement.innerHTML = "AAAA";
      var mock = new generativeText();
      mock.opts = {memory: true};
      mock.appendTextElement(mockElement,mockNewElement);

      expect(mock.memory).toEqual([mockNewElement]);
    });

  });


  describe(".generateListVariation()", function() {

    it("should throw an exception if param.values is not an array", function() {

      var mock = new generativeText();
      expect(mock.generateListVariation).toThrow();
    });


    it("should return a random value within param.values when not using steps", function() {
      var param = {};
      param.values = [0,1,2,3,4];
      var mock = new generativeText();
      expect(mock.generateListVariation(param)).toBeLessThan(5);
      expect(mock.generateListVariation(param)).toBeGreaterThan(-1);
    });

    it("should return a value based on the currentStep when using steps", function() {
      var param = {};
      param.values = [0,1,2,3,4];
      param.steps = true;
      var mock = new generativeText();
      mock.currentStep = 2;
      expect(mock.generateListVariation(param)).toBe('2');
      mock.currentStep = 5;
      expect(mock.generateListVariation(param)).toBe('0');
      mock.currentStep = 14;
      expect(mock.generateListVariation(param)).toBe('4');
    });

    it("should return the value in the key returned by the stepFunction when using stepFunction", function() {
      var param = {};
      param.values = [0,1,2,3,4];
      param.steps = true;
      param.stepFunction = function() {
        return 3;
      };
      var mock = new generativeText();
      expect(mock.generateListVariation(param)).toBe('3');
    });

    it("should provide stepFunction with access to currentStep, totalSteps and valuesLength", function() {
      var param = {};
      param.values = [0,1,2,3,4];
      param.steps = true;
      param.stepFunction = function() {
        return this.currentStep + 1;
      };
      var mock = new generativeText();
      mock.currentStep = 2;
      expect(mock.generateListVariation(param)).toBe('3');

      param.stepFunction = function() {
        return this.totalSteps + 1;
      };
      mock.totalSteps = 1;
      expect(mock.generateListVariation(param)).toBe('2');

      param.stepFunction = function() {
        return this.valuesLength - 1;
      };
      expect(mock.generateListVariation(param)).toBe('4');
    });

  });

  describe(".generateListStyle()", function() {
    it("should add the unit (argument to the function) when the param does not have it", function() {
      var param = {};
      param.values = [6];
      var mock = new generativeText();
      expect(mock.generateListStyle(param, 'px')).toBe('6px');
    });
  });

  describe(".generateNumericVariation()", function() {

    it("should throw an exception if param.min or param.max is not set", function() {

      var mock = new generativeText();
      expect(mock.generateNumericVariation).toThrow();
    });

    it("should behave like a list variation when type is list", function() {
      var param = {};
      param.values = [1];
      param.type = "list";
      var mock = new generativeText();
      expect(mock.generateNumericVariation(param)).toBe('1px');
    });


    var param = {};
    it("should return a random value within param.values when not using steps", function() {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      var mock = new generativeText();
      expect(mock.generateNumericVariation(param)).toBeLessThan(6);
      expect(mock.generateNumericVariation(param)).toBeGreaterThan(-1);
    });

    it("should return a value based on the currentStep when using steps", function() {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      param.steps = true;
      var mock = new generativeText();
      mock.totalSteps = 5;
      mock.currentStep = 0;
      expect(mock.generateNumericVariation(param)).toBe('0');
      mock.currentStep = 2;
      expect(mock.generateNumericVariation(param)).toBe('2');
      mock.currentStep = 4;
      expect(mock.generateNumericVariation(param)).toBe('4');

    });

    it("should return the value in the key returned by the stepFunction when using stepFunction", function() {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      param.steps = true;
      param.stepFunction = function() {
        return 3;
      };
      var mock = new generativeText();
      expect(mock.generateNumericVariation(param)).toBe('3');
    });

    it("should provide stepFunction with access to currentStep, totalSteps, range, min and max", function() {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      param.steps = true;
      param.stepFunction = function() {
        return this.currentStep + 1;
      };
      var mock = new generativeText();
      mock.currentStep = 2;
      expect(mock.generateNumericVariation(param)).toBe('3');

      param.stepFunction = function() {
        return this.totalSteps + 1;
      };
      mock.totalSteps = 1;
      expect(mock.generateNumericVariation(param)).toBe('2');

      param.stepFunction = function() {
        return this.range;
      };
      expect(mock.generateNumericVariation(param)).toBe('5');

      param.stepFunction = function() {
        return this.min;
      };
      expect(mock.generateNumericVariation(param)).toBe('0');

      param.stepFunction = function() {
        return this.max;
      };
      expect(mock.generateNumericVariation(param)).toBe('5');
    });

  });

  describe(".generateNumericStyle()", function() {
    it("should add the unit (argument to the function) when the param does not have it", function() {
      var param = {};
      param.values = [6];
      param.type = "list";
      var mock = new generativeText();
      expect(mock.generateNumericStyle(param, 'px')).toBe('6px');
    });
  });


  describe(".generateRGBHex()", function() {
    it("should throw an exception if c.fixed or (c.min and c.max) are not set", function() {
      var mock = new generativeText();
      expect(mock.generateRGBHex).toThrow();
    });

    it("should return a fixed value when using c.fixed", function() {
      var c = {};
      c.fixed = "aa";
      var mock = new generativeText();
      expect(mock.generateRGBHex(c)).toBe('aa');
    });

    it("should return a random value within c.values when not using steps", function() {
      var c = {};
      c.fixed = null;
      c.min = "aa";
      c.max = "cc";
      var mock = new generativeText();
      var testGreater = mock.generateRGBHex(c) >= "aa";
      expect(testGreater).toBe(true);
      var testSmaller = mock.generateRGBHex(c) <= "cc";
      expect(testSmaller).toBe(true);
    });

    it("should return a value based on the currentStep when using steps", function() {
      var c = {};
      c.fixed = null;
      c.min = "00";
      c.max = "10";
      c.steps = true;
      var mock = new generativeText();
      mock.totalSteps = 15;
      mock.currentStep = 0;
      expect(mock.generateRGBHex(c)).toBe('00');
      mock.currentStep = 2;
      expect(mock.generateRGBHex(c)).toBe('02');
      mock.currentStep = 10;
      expect(mock.generateRGBHex(c)).toBe('0a');

    });

    it("should return the value in the key returned by the stepFunction when using stepFunction", function() {
      var c = {};
      c.fixed = null;
      c.min = "aa";
      c.max = "cc";
      c.steps = true;
      c.stepFunction = function() {
        return 16;
      };
      var mock = new generativeText();
      expect(mock.generateRGBHex(c)).toBe('10');
    });

    it("should provide stepFunction with access to currentStep, totalSteps, range, min and max", function() {
      var c = {};
      c.fixed = null;
      c.min = '00';
      c.max = '80';
      c.steps = true;
      c.stepFunction = function() {
        return this.currentStep;
      };
      var mock = new generativeText();
      mock.currentStep = 32;
      expect(mock.generateRGBHex(c)).toBe('20');

      c.stepFunction = function() {
        return this.totalSteps;
      };
      mock.totalSteps = 255;
      expect(mock.generateRGBHex(c)).toBe('ff');

      c.stepFunction = function() {
        return this.range;
      };
      expect(mock.generateRGBHex(c)).toBe('80');

      c.stepFunction = function() {
        return this.min;
      };
      expect(mock.generateRGBHex(c)).toBe('00');

      c.stepFunction = function() {
        return this.max;
      };
      expect(mock.generateRGBHex(c)).toBe('80');
    });

  });

  describe(".generateColorVariation()", function() {

    it("should behave like a list variation when type is list", function() {
      var param = {};
      param.values = ["787878"];
      param.type = "list";
      var mock = new generativeText();
      expect(mock.generateColorVariation(param)).toBe('787878');
    });

    it("should throw an exception when either r,g or b are not set", function() {
      var param = {};
      param.r = {fixed:'00'};
      param.g = {fixed:'00'};
      var mock = new generativeText();

      var exceptionThrown = false;
      try {
        mock.generateColorVariation(param);
      } catch(e) {
        exceptionThrown = true;
      }
      expect(exceptionThrown).toBe(true);
    });

    it("should agregate r,g and b", function() {
      var param = {};
      param.r = {fixed:'aa'};
      param.g = {fixed:'bb'};
      param.b = {fixed:'cc'};
      var mock = new generativeText();

      expect(mock.generateColorVariation(param)).toBe('aabbcc');
    });

  });

  describe(".generateColorStyle()", function() {
    it("should prefix th value with a '#'", function() {
      var param = {};
      param.r = {fixed:'aa'};
      param.g = {fixed:'bb'};
      param.b = {fixed:'cc'};
      var mock = new generativeText();

      expect(mock.generateColorStyle(param)).toBe('#aabbcc');
    });

  });

  describe(".generateStyle()", function() {

    it("should throw an exception when the rule name does not exist in defs", function() {
      var params = {
        pedro: {},
      };
      var mock = new generativeText();

      var exceptionThrown = false;
      try {
        mock.generateColorVariation(param);
      } catch(e) {
        exceptionThrown = true;
      }
      expect(exceptionThrown).toBe(true);
    });

    it("should work on list rules", function() {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontFamily: { values:['Helvetica']},
      };
      var mock = new generativeText();

      mock.generateStyle(params, elem);
      expect( elem.style.fontFamily).toBe('Helvetica');
    });

    it("should work on numeric rules", function() {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontSize: { values:['1.4'], unit: 'em',  type: 'list'},
      };
      var mock = new generativeText();

      mock.generateStyle(params, elem);
      expect( elem.style.fontSize).toBe('1.4em');
    });

    it("should work on color rules", function() {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        color: { values:['aaaaaa'], type: 'list'},
      };
      var mock = new generativeText();

      mock.generateStyle(params, elem);
      expect( elem.style.color).toBe('rgb(170, 170, 170)');
    });

    it("should work on various rules at a time", function() {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontFamily: { values:['Helvetica']},
        fontSize: { values:['1.4'], unit: 'em',  type: 'list'},
        color: { values:['aaaaaa'], type: 'list'},
      };
      var mock = new generativeText();

      mock.generateStyle(params, elem);
      expect( elem.style.fontFamily).toBe('Helvetica');
      expect( elem.style.fontSize).toBe('1.4em');
      expect( elem.style.color).toBe('rgb(170, 170, 170)');
    });
  });

});
