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

  describe(".generateListVariation()", function() {

    var param = {};
    it("should throw an exception if param.values is not an array", function() {

      var mock = new generativeText();
      expect(mock.generateListVariation).toThrow();
    });

    param.values = [0,1,2,3,4];

    it("should return a random value within param.values when not using steps", function() {
      var mock = new generativeText();
      expect(mock.generateListVariation(param)).toBeLessThan(5);
      expect(mock.generateListVariation(param)).toBeGreaterThan(-1);
    });

    it("should return a value based on the currentStep when using steps", function() {
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
      param.steps = true;
      param.stepFunction = function() {
        return 3;
      };
      var mock = new generativeText();
      expect(mock.generateListVariation(param)).toBe('3');
    });

    it("should provide stepFunction with access to currentStep, totalSteps and valuesLength", function() {
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


  describe(".generateNumericVariation()", function() {

    var param = {};
    it("should throw an exception if param.min or param.max is not set", function() {

      var mock = new generativeText();
      expect(mock.generateNumericVariation).toThrow();
    });

    it("should return a random value within param.values when not using steps", function() {
      param.min = 0;
      param.max = 5;
      param.unit = "";
      var mock = new generativeText();
      expect(mock.generateNumericVariation(param)).toBeLessThan(6);
      expect(mock.generateNumericVariation(param)).toBeGreaterThan(-1);
    });

    it("should return a value based on the currentStep when using steps", function() {
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
      param.stepFunction = function() {
        return 3;
      };
      var mock = new generativeText();
      expect(mock.generateNumericVariation(param)).toBe('3');
    });

    it("should provide stepFunction with access to currentStep, totalSteps, range, min and max", function() {
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

});
