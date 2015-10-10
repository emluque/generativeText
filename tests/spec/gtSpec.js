describe("GenerativeText", function() {

  describe(".applyToElementById()", function() {

    var gt = new generativeText();

    it("should thorw an exception if the id does not exist", function() {
      expect(gt.applyToElementById).toThrow();
    });

  });

  describe(".applyToElementsByClassName()", function() {

    var gt = new generativeText();

    it("should thorw an exception if the class does not exist", function() {
      expect(gt.applyToElementsByClassName).toThrow();
    });

  });

  describe(".roundUnit()", function() {

    it("should round Units differently according to unit type", function() {
      var gt = new generativeText();
      expect(gt.roundUnit(98.75689, "opacity")).toEqual("98.76");
      expect(gt.roundUnit(98.75689, "em")).toEqual("98.76em");
      expect(gt.roundUnit(98.75, "px")).toEqual("99px");
    });

  });

  describe('.rgbCheck()', function() {

    it("should return RGB Units properly", function() {
      var gt = new generativeText();
      expect(gt.rgbCheck("5")).toEqual("05");
      expect(gt.rgbCheck("15")).toEqual("15");
      expect(gt.rgbCheck("aa")).toEqual("aa");
    });

  });

  describe('.getElementText()', function() {
    it("should get the text from inside a DOM node", function() {
      var el = document.createElement("div");
      el.innerHTML = "<p>aaaa<span>bbbb</span>cccc</p>"
      var gt = new generativeText();
      expect(gt.getElementText(el)).toEqual("aaaabbbbcccc");
    });

  });

  describe('.appendTextElement()', function() {
    it("should append an element", function() {
      var el = document.createElement("div");
      var gtNewElement = document.createElement("span");
      gtNewElement.innerHTML = "AAAA";
      var gt = new generativeText();
      gt.appendTextElement(el,gtNewElement);
      expect(el.innerHTML).toEqual("<span>AAAA</span>");
    });

    it("should append an element to memory if memory is set on opts", function() {
      var el = document.createElement("div");
      var gtNewElement = document.createElement("span");
      gtNewElement.innerHTML = "AAAA";
      var gt = new generativeText();
      gt.opts = {memory: true};
      gt.appendTextElement(el,gtNewElement);

      expect(gt.memory).toEqual([gtNewElement]);
    });

  });


  describe(".generateListVariation()", function() {

    it("should throw an exception if param.values is not an array", function() {

      var gt = new generativeText();
      expect(gt.generateListVariation).toThrow();
    });


    it("should return a random value within param.values when not using steps", function() {
      var param = {};
      param.values = [0,1,2,3,4];
      var gt = new generativeText();
      expect(gt.generateListVariation(param)).toBeLessThan(5);
      expect(gt.generateListVariation(param)).toBeGreaterThan(-1);
    });

    it("should return a value based on the currentStep when using steps", function() {
      var param = {};
      param.values = [0,1,2,3,4];
      param.steps = true;
      var gt = new generativeText();
      gt.currentStep = 2;
      expect(gt.generateListVariation(param)).toBe('2');
      gt.currentStep = 5;
      expect(gt.generateListVariation(param)).toBe('0');
      gt.currentStep = 14;
      expect(gt.generateListVariation(param)).toBe('4');
    });

    it("should return the value in the key returned by the stepFunction when using stepFunction", function() {
      var param = {};
      param.values = [0,1,2,3,4];
      param.steps = true;
      param.stepFunction = function() {
        return 3;
      };
      var gt = new generativeText();
      expect(gt.generateListVariation(param)).toBe('3');
    });

    it("should provide stepFunction with access to currentStep, totalSteps and valuesLength", function() {
      var param = {};
      param.values = [0,1,2,3,4];
      param.steps = true;
      param.stepFunction = function() {
        return this.currentStep + 1;
      };
      var gt = new generativeText();
      gt.currentStep = 2;
      expect(gt.generateListVariation(param)).toBe('3');

      param.stepFunction = function() {
        return this.totalSteps + 1;
      };
      gt.totalSteps = 1;
      expect(gt.generateListVariation(param)).toBe('2');

      param.stepFunction = function() {
        return this.valuesLength - 1;
      };
      expect(gt.generateListVariation(param)).toBe('4');
    });

  });

  describe(".generateListStyle()", function() {
    it("should add the unit (argument to the function) when the param does not have it", function() {
      var param = {};
      param.values = [6];
      var gt = new generativeText();
      expect(gt.generateListStyle(param, 'px')).toBe('6px');
    });
  });

  describe(".generateNumericVariation()", function() {

    it("should throw an exception if param.min or param.max is not set", function() {

      var gt = new generativeText();
      expect(gt.generateNumericVariation).toThrow();
    });

    it("should behave like a list variation when type is list", function() {
      var param = {};
      param.values = [1];
      param.type = "list";
      var gt = new generativeText();
      expect(gt.generateNumericVariation(param)).toBe('1px');
    });


    var param = {};
    it("should return a random value within param.values when not using steps", function() {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      var gt = new generativeText();
      expect(gt.generateNumericVariation(param)).toBeLessThan(6);
      expect(gt.generateNumericVariation(param)).toBeGreaterThan(-1);
    });

    it("should return a value based on the currentStep when using steps", function() {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      param.steps = true;
      var gt = new generativeText();
      gt.totalSteps = 5;
      gt.currentStep = 0;
      expect(gt.generateNumericVariation(param)).toBe('0');
      gt.currentStep = 2;
      expect(gt.generateNumericVariation(param)).toBe('2');
      gt.currentStep = 4;
      expect(gt.generateNumericVariation(param)).toBe('4');

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
      var gt = new generativeText();
      expect(gt.generateNumericVariation(param)).toBe('3');
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
      var gt = new generativeText();
      gt.currentStep = 2;
      expect(gt.generateNumericVariation(param)).toBe('3');

      param.stepFunction = function() {
        return this.totalSteps + 1;
      };
      gt.totalSteps = 1;
      expect(gt.generateNumericVariation(param)).toBe('2');

      param.stepFunction = function() {
        return this.range;
      };
      expect(gt.generateNumericVariation(param)).toBe('5');

      param.stepFunction = function() {
        return this.min;
      };
      expect(gt.generateNumericVariation(param)).toBe('0');

      param.stepFunction = function() {
        return this.max;
      };
      expect(gt.generateNumericVariation(param)).toBe('5');
    });

  });

  describe(".generateNumericStyle()", function() {
    it("should add the unit (argument to the function) when the param does not have it", function() {
      var param = {};
      param.values = [6];
      param.type = "list";
      var gt = new generativeText();
      expect(gt.generateNumericStyle(param, 'px')).toBe('6px');
    });
  });


  describe(".generateRGBHex()", function() {
    it("should throw an exception if c.fixed or (c.min and c.max) are not set", function() {
      var gt = new generativeText();
      expect(gt.generateRGBHex).toThrow();
    });

    it("should return a fixed value when using c.fixed", function() {
      var c = {};
      c.fixed = "aa";
      var gt = new generativeText();
      expect(gt.generateRGBHex(c)).toBe('aa');
    });

    it("should return a random value within range of c.min and c.max when not using steps", function() {
      var c = {};
      c.fixed = null;
      c.min = "aa";
      c.max = "cc";
      var gt = new generativeText();
      var testGreater = gt.generateRGBHex(c) >= "aa";
      expect(testGreater).toBe(true);
      var testSmaller = gt.generateRGBHex(c) <= "cc";
      expect(testSmaller).toBe(true);
    });

    it("should return a value based on the currentStep when using steps", function() {
      var c = {};
      c.fixed = null;
      c.min = "00";
      c.max = "10";
      c.steps = true;
      var gt = new generativeText();
      gt.totalSteps = 15;
      gt.currentStep = 0;
      expect(gt.generateRGBHex(c)).toBe('00');
      gt.currentStep = 2;
      expect(gt.generateRGBHex(c)).toBe('02');
      gt.currentStep = 10;
      expect(gt.generateRGBHex(c)).toBe('0a');

    });

    it("should return the value returned by the stepFunction in Hexa when using stepFunction", function() {
      var c = {};
      c.fixed = null;
      c.min = "aa";
      c.max = "cc";
      c.steps = true;
      c.stepFunction = function() {
        return 16;
      };
      var gt = new generativeText();
      expect(gt.generateRGBHex(c)).toBe('10');
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
      var gt = new generativeText();
      gt.currentStep = 32;
      expect(gt.generateRGBHex(c)).toBe('20');

      c.stepFunction = function() {
        return this.totalSteps;
      };
      gt.totalSteps = 255;
      expect(gt.generateRGBHex(c)).toBe('ff');

      c.stepFunction = function() {
        return this.range;
      };
      expect(gt.generateRGBHex(c)).toBe('80');

      c.stepFunction = function() {
        return this.min;
      };
      expect(gt.generateRGBHex(c)).toBe('00');

      c.stepFunction = function() {
        return this.max;
      };
      expect(gt.generateRGBHex(c)).toBe('80');
    });

  });

  describe(".generateColorVariation()", function() {

    it("should behave like a list variation when type is list", function() {
      var param = {};
      param.values = ["787878"];
      param.type = "list";
      var gt = new generativeText();
      expect(gt.generateColorVariation(param)).toBe('787878');
    });

    it("should throw an exception when it's not type list and either r,g or b are not set", function() {
      var param = {};
      param.r = {fixed:'00'};
      param.g = {fixed:'00'};
      var gt = new generativeText();

      var exceptionThrown = false;
      try {
        gt.generateColorVariation(param);
      } catch(e) {
        exceptionThrown = true;
      }
      expect(exceptionThrown).toBe(true);
    });

    it("should agregate r,g and b if it's not type list and", function() {
      var param = {};
      param.r = {fixed:'aa'};
      param.g = {fixed:'bb'};
      param.b = {fixed:'cc'};
      var gt = new generativeText();

      expect(gt.generateColorVariation(param)).toBe('aabbcc');
    });

  });

  describe(".generateColorStyle()", function() {
    it("should prefix th value with a '#'", function() {
      var param = {};
      param.r = {fixed:'aa'};
      param.g = {fixed:'bb'};
      param.b = {fixed:'cc'};
      var gt = new generativeText();

      expect(gt.generateColorStyle(param)).toBe('#aabbcc');
    });

  });

  describe(".generateStyle()", function() {

    it("should throw an exception when the rule name does not exist in defs", function() {
      var params = {
        pedro: {},
      };
      var gt = new generativeText();

      var exceptionThrown = false;
      try {
        gt.generateColorVariation(param);
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
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect( elem.style.fontFamily).toBe('Helvetica');
    });

    it("should work on numeric rules", function() {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontSize: { values:['1.4'], unit: 'em',  type: 'list'},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect( elem.style.fontSize).toBe('1.4em');
    });

    it("should work on color rules", function() {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        color: { values:['aaaaaa'], type: 'list'},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
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
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect( elem.style.fontFamily).toBe('Helvetica');
      expect( elem.style.fontSize).toBe('1.4em');
      expect( elem.style.color).toBe('rgb(170, 170, 170)');
    });
  });

});
