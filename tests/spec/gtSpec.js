describe("GenerativeText", function() {

  it("should round Unit", function() {
    expect(generativeText.roundUnit(98.75689, "em")).toEqual("98.76em");
  });

});
