import { render, screen } from "@testing-library/react";
import App from "./App";
import Logo from "./Logo";
import logoSvg from "./logo.svg";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("<Logo />", () => {
  it("renders an image", () => {
    render(<Logo />);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", logoSvg);
    expect(logo).toHaveAttribute("alt", "logo");
  });
});

// 원시 값의 일치 여부 확인, 객체 참조 확인
it("1 + 2의 결과는 3이어야 한다.", () => {
  expect(1 + 2).toBe(3);
});

// NOTE: toEqual() - 값의 일치 여부를 확인하지만 객체의 경우 참조를 확인하는 것이 아닌 모든 프로퍼티의 값을 재귀적으로 비교하여 일치하는지 검증.
const car1 = {
  category: "SUV",
  options: {
    airConditaional: true,
    seat: "cool",
    color: "brown",
  },
};

const car2 = {
  category: "SUV",
  options: {
    airConditaional: true,
    seat: "cool",
    color: "brown",
  },
};

test("car1과 car2는 동일한 특징을 가진 차이다.", () => {
  expect(car1).toEqual(car2);
});

// NOTE: toHaveBeenCalled(): spy를 사용, 특정 함수가 정상적으로 호출되었는지를 검증.
describe("toHaveBeenCalled", () => {
  let foo;
  let bar;

  beforeEach(() => {
    foo = {
      setBar(val) {
        bar = val;
      },
    };

    jest.spyOn(foo, "setBar");

    foo.setBar(123);
  });

  it("호출이 되어야 한다.", () => {
    expect(foo.setBar).toHaveBeenCalled();
  });
});

// toHaveBeenCalledWith() : 함수에 어떠한 인자가 넘어가 실행되었는지 함께 검증한다.
describe("toHaveBeenCalledWith", () => {
  let foo;
  let bar;

  beforeEach(() => {
    foo = {
      setBar(value) {
        bar = value;
      },
    };

    jest.spyOn(foo, "setBar");

    foo.setBar(123);
  });

  it("호출될 때 123이라는 인자를 기록한다.", () => {
    expect(foo.setBar).toHaveBeenCalledWith(123);
  });
});

//toHaveBeenCalledTimes() : 함수가 정확히 몇 번 호출되었는지를 확인한다.
describe("toHaveBeenCalledTimes", () => {
  let foo;
  let bar;

  beforeEach(() => {
    foo = {
      setBar(value) {
        bar = value;
      },
    };

    jest.spyOn(foo, "setBar");

    foo.setBar(123);
    foo.setBar(123);
  });

  it("2번 호출 되어야 한다.", () => {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });
});

// NOTE: toHaveProperty)() - 의도한 속성과 값을 갖고 있는지를 살펴본다.
// NOTE: not 메서드 - 체인으로 사용할 수 있으며, 결과 값의 반대인지를 확인한다.
describe("toHaveProperty", () => {
  const testCar = {
    category: "truck",
    options: {
      color: "black",
      seat: "cool",
      airConditaional: false,
    },
  };

  test("자동차의 옵션이 올바르게 입력되었는가?", () => {
    expect(testCar).toHaveProperty("category", "truck");
    expect(testCar).toHaveProperty("options.color", "black");
    expect(testCar).toHaveProperty("options.seat", "cool");
    // expect(testCar).toHaveProperty("options.airConditaional", "false"); // error; boolean vs string
    expect(testCar).toHaveProperty("options.airConditaional", false);

    expect(testCar).not.toHaveProperty("options.airConditaional", true);
  });
});

describe("match 메서드 테스트", () => {
  // NOTE: toMatch() - 문자열이 정규식에 대응되는지를 확인한다.
  test("문자열을 올바르게 포함하고 있는가?", () => {
    expect("Hello, World!").not.toMatch(/Hello, w/);
    expect("Hello, World!").toMatch(/Hello/);
  });
  const testObj = {
    options: {
      1: 2,
    },
  };
  const testOptions = {
    1: 2,
  };

  test("옵션을 정확하게 포함하고 있는가?", () => {
    expect(testObj).toMatchObject({ options: testOptions });
  });
});
