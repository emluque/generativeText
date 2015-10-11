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

  describe(".applyToElement()", function () {

    var elem = document.createElement('div');
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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

    it("should style spaces when textSpaces is set to 'style'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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

    it("should style spaces when textSpaces is set to 'style'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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

    it("should transform to '&nbsp' entity and style spaces when using textSpaces = 'style'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'style'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
      var elem = document.createElement('div');
      elem.innerHTML = "one two three four five";
      gt.applyToWords(elem);
      var spans = elem.getElementsByTagName('span');
      expect(spans.length).toBe(5);
    });

    it("should remove spaces and add '&nbsp' entities at the beginning and end of even elements, while not adding a '&nbsp' entitiy at the beggining or the end of the sequence, when using textSpaces = 'even'", function () {
      var gt = new generativeText();
      gt.opts = { textSpaces: 'even'};
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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
      gt.params = { fontSize: { type: "list", values: ['1', '2', '3'], unit: "em", steps: true}};
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

    it("should work on list rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontFamily: {values: ['Helvetica']},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect(elem.style.fontFamily).toBe('Helvetica');
    });

    it("should work on numeric rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontSize: {values: ['1.4'], unit: 'em', type: 'list'},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect(elem.style.fontSize).toBe('1.4em');
    });

    it("should work on color rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        color: {values: ['aaaaaa'], type: 'list'},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect(elem.style.color).toBe('rgb(170, 170, 170)');
    });

    it("should work on transform rules", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        rotateX: {values: ['30'], type: 'list'},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect(elem.style.transform).toBe('rotateX(30deg)');
    });

    it("should work on transform rules that are not deg", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        translateX: {values: ['30'], type: 'list'},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect(elem.style.transform).toBe('translateX(30px)');
    });

    it("should work on transform rules that are not deg an specify their own rule", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        translateX: {values: ['45'], unit: "em", type: 'list'},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect(elem.style.transform).toBe('translateX(45em)');
    });

    it("should work on various transform rules at a time", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        rotateX: {values: ['30'], type: 'list'},
        skewX:  {values: ['30'], type: 'list'},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect(elem.style.transform).toBe('rotateX(30deg) skewX(30deg)');
    });

    it("should work on various rules at a time", function () {
      var elem = document.createElement('span');
      elem.textContent = "A"
      var params = {
        fontFamily: {values: ['Helvetica']},
        fontSize: {values: ['1.4'], unit: 'em', type: 'list'},
        color: {values: ['aaaaaa'], type: 'list'},
      };
      var gt = new generativeText();

      gt.generateStyle(params, elem);
      expect(elem.style.fontFamily).toBe('Helvetica');
      expect(elem.style.fontSize).toBe('1.4em');
      expect(elem.style.color).toBe('rgb(170, 170, 170)');
    });
  });

//  setBrowserStyle: function(elem, style, val)
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
      var gt = new generativeText();
      expect(gt.generateListStyle(param, 'px')).toBe('6px');
    });
  });

  describe(".generateListVariation()", function () {

    it("should throw an exception if param.values is not an array", function () {

      var gt = new generativeText();
      expect(gt.generateListVariation).toThrow();
    });


    it("should return a random value within param.values when not using steps", function () {
      var param = {};
      param.values = [0, 1, 2, 3, 4];
      var gt = new generativeText();
      expect(gt.generateListVariation(param)).toBeLessThan(5);
      expect(gt.generateListVariation(param)).toBeGreaterThan(-1);
    });

    it("should return a value based on the currentStep when using steps", function () {
      var param = {};
      param.values = [0, 1, 2, 3, 4];
      param.steps = true;
      var gt = new generativeText();
      gt.currentStep = 2;
      expect(gt.generateListVariation(param)).toBe('2');
      gt.currentStep = 5;
      expect(gt.generateListVariation(param)).toBe('0');
      gt.currentStep = 14;
      expect(gt.generateListVariation(param)).toBe('4');
    });

    it("should return the value in the key returned by the stepFunction when using stepFunction", function () {
      var param = {};
      param.values = [0, 1, 2, 3, 4];
      param.steps = true;
      param.stepFunction = function () {
        return 3;
      };
      var gt = new generativeText();
      expect(gt.generateListVariation(param)).toBe('3');
    });

    it("should provide stepFunction with access to currentStep, totalSteps and valuesLength", function () {
      var param = {};
      param.values = [0, 1, 2, 3, 4];
      param.steps = true;
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
      var gt = new generativeText();
      expect(gt.generateNumericStyle(param, 'px')).toBe('6px');
    });
  });

  describe(".generateNumericVariation()", function () {

    it("should throw an exception if param.min or param.max is not set", function () {

      var gt = new generativeText();
      expect(gt.generateNumericVariation).toThrow();
    });

    it("should behave like a list variation when type is list", function () {
      var param = {};
      param.values = [1];
      param.type = "list";
      var gt = new generativeText();
      expect(gt.generateNumericVariation(param)).toBe('1px');
    });


    var param = {};
    it("should return a random value within param.values when not using steps", function () {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      var gt = new generativeText();
      expect(gt.generateNumericVariation(param)).toBeLessThan(6);
      expect(gt.generateNumericVariation(param)).toBeGreaterThan(-1);
    });

    it("should return a value based on the currentStep when using steps", function () {
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

    it("should return the value in the key returned by the stepFunction when using stepFunction", function () {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      param.steps = true;
      param.stepFunction = function () {
        return 3;
      };
      var gt = new generativeText();
      expect(gt.generateNumericVariation(param)).toBe('3');
    });

    it("should provide stepFunction with access to currentStep, totalSteps, range, min and max", function () {
      var param = {};
      param.min = 0;
      param.max = 5;
      param.unit = "";
      param.steps = true;
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
      var param = {};
      param.r = {fixed: 'aa'};
      param.g = {fixed: 'bb'};
      param.b = {fixed: 'cc'};
      var gt = new generativeText();

      expect(gt.generateColorStyle(param)).toBe('#aabbcc');
    });

    it("should not prefix the color value with a '#' if it already has that prefix", function () {
      var param = {values: ['#aaaaaa'], type: 'list'};
      var gt = new generativeText();

      expect(gt.generateColorStyle(param)).toBe('#aaaaaa');
    });

  });

  describe(".generateColorVariation()", function () {

    it("should behave like a list variation when type is list", function () {
      var param = {};
      param.values = ["787878"];
      param.type = "list";
      var gt = new generativeText();
      expect(gt.generateColorVariation(param)).toBe('787878');
    });

    it("should throw an exception when it's not type list and either r,g or b are not set", function () {
      var param = {};
      param.r = {fixed: '00'};
      param.g = {fixed: '00'};
      var gt = new generativeText();

      var exceptionThrown = false;
      try {
        gt.generateColorVariation(param);
      } catch (e) {
        exceptionThrown = true;
      }
      expect(exceptionThrown).toBe(true);
    });

    it("should agregate r,g and b if it's not type list and", function () {
      var param = {};
      param.r = {fixed: 'aa'};
      param.g = {fixed: 'bb'};
      param.b = {fixed: 'cc'};
      var gt = new generativeText();

      expect(gt.generateColorVariation(param)).toBe('aabbcc');
    });

  });

  describe(".generateRGBHex()", function () {
    it("should throw an exception if c.fixed or (c.min and c.max) are not set", function () {
      var gt = new generativeText();
      expect(gt.generateRGBHex).toThrow();
    });

    it("should return a fixed value when using c.fixed", function () {
      var c = {};
      c.fixed = "aa";
      var gt = new generativeText();
      expect(gt.generateRGBHex(c)).toBe('aa');
    });

    it("should return a random value within range of c.min and c.max when not using steps", function () {
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

    it("should return a value based on the currentStep when using steps", function () {
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

    it("should return the value returned by the stepFunction in Hexa when using stepFunction", function () {
      var c = {};
      c.fixed = null;
      c.min = "aa";
      c.max = "cc";
      c.steps = true;
      c.stepFunction = function () {
        return 16;
      };
      var gt = new generativeText();
      expect(gt.generateRGBHex(c)).toBe('10');
    });

    it("should provide stepFunction with access to currentStep, totalSteps, range, min and max", function () {
      var c = {};
      c.fixed = null;
      c.min = '00';
      c.max = '80';
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
      expect(gt.generateRGBHex(c)).toBe('80');

      c.stepFunction = function () {
        return this.min;
      };
      expect(gt.generateRGBHex(c)).toBe('00');

      c.stepFunction = function () {
        return this.max;
      };
      expect(gt.generateRGBHex(c)).toBe('80');
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

  describe('.rgbCheck()', function () {

    it("should return RGB Units properly", function () {
      var gt = new generativeText();
      expect(gt.rgbCheck("5")).toEqual("05");
      expect(gt.rgbCheck("15")).toEqual("15");
      expect(gt.rgbCheck("aa")).toEqual("aa");
    });

  });

});