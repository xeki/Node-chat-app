const expect = require("expect");
const{isRealString} = require("./validation");

describe("Is Real string",()=>{
  it("should validate valid strings",()=>{
    let valName = "Andrew";
    let valRoom = "developers";

    let res1 = isRealString(valName);
    expect(res1).toBe(true);
    expect(typeof res1).toBe("boolean");
  });
  it("should reject non-string values",()=>{
    let val = 1;

    let res = isRealString(val);
    expect(res).not.toBe(true);
    expect(typeof res).toBe("boolean");
  });
  it("should reject string with only spaces",()=>{
    let val = "    ";

    let res = isRealString(val);
    expect(res).not.toBe(true);
    expect(typeof res).toBe("boolean");
  });
});
