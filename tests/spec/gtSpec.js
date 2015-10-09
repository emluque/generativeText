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
    var param = {
      values: [0, 1,2,3,4]
    }

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

    it("should return a the value returned in the key returned by the stepFunction when using stepFunction", function() {
      param.steps = true;
      param.stepFunction = function() {
        return 3;
      };
      var mock = new generativeText();
      expect(mock.generateListVariation(param)).toBe('2');
    });

    it("should provide stepFunction with access to currentStep and valuesLength", function() {
      param.steps = true;
      param.stepFunction = function() {
        return this.currentStep + 1;
      };
      var mock = new generativeText();
      mock.currentStep = 2;
      expect(mock.generateListVariation(param)).toBe('2');

      param.stepFunction = function() {
        return this.valuesLength - 1;
      };
      expect(mock.generateListVariation(param)).toBe('4');
    });

  });

});
