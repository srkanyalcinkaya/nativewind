/** @jsxImportSource test */
import { View } from "react-native";

import { render, screen, registerCSS, setupAllComponents } from "test";

setupAllComponents();

describe("debugging", () => {
  const originalLog = console.log;

  beforeAll(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = originalLog;
  });

  test("static props", () => {
    registerCSS(`.my-class {
    color: hsl(0 84.2% 60.2%);
    padding: 10px;
  }`);

    const testID = "debugClassName";

    render(<View testID={testID} className="my-class" />);
    const component = screen.getByTestId(testID);

    expect(component).toHaveStyle({
      color: "rgba(239, 68, 68, 1)",
      padding: 10,
    });

    expect(console.log)
      .toHaveBeenCalledWith(`Debugging component.testID 'debugClassName'

{
  "originalProps": {
    "testID": "debugClassName",
    "className": "my-class"
  },
  "props": {
    "testID": "debugClassName",
    "ref": null,
    "style": {
      "color": "rgba(239, 68, 68, 1)",
      "padding": 10
    }
  }
}`);
  });

  test("animated props", () => {
    registerCSS(`.my-class {
    color: hsl(0 84.2% 60.2%);
    padding: 10px;
    transition: color;
  }`);

    const testID = "debugClassName";

    render(<View testID={testID} className="my-class" />);
    const component = screen.getByTestId(testID);

    expect(component).toHaveStyle({
      color: "rgba(239, 68, 68, 1)",
      padding: 10,
    });

    expect(console.log)
      .toHaveBeenCalledWith(`Debugging component.testID 'debugClassName'

{
  "originalProps": {
    "testID": "debugClassName",
    "className": "my-class"
  },
  "props": {
    "testID": "debugClassName",
    "ref": null,
    "style": {
      "color": "rgba(239, 68, 68, 1) (animated value)",
      "padding": 10
    }
  }
}`);
  });

  test("variables", () => {
    registerCSS(`.my-class {
    color: hsl(0 84.2% var(--test));
    --test: 50%
  }`);

    const testID = "debugClassName";

    render(<View testID={testID} className="my-class" />);
    const component = screen.getByTestId(testID);

    expect(component).toHaveStyle({
      color: "hsl(0, 84.2%, 50%)",
    });

    expect(console.log)
      .toHaveBeenCalledWith(`Debugging component.testID 'debugClassName'

{
  "originalProps": {
    "testID": "debugClassName",
    "className": "my-class"
  },
  "props": {
    "testID": "debugClassName",
    "ref": null,
    "style": {
      "color": "hsl(0, 84.2%, 50%)"
    }
  },
  "variables": {
    "--test": "50%"
  }
}`);
  });

  test("containers", () => {
    registerCSS(`.my-class {
    color: hsl(0 84.2% 60.2%);
    container-name: test;
  }`);

    const testID = "debugClassName";

    render(<View testID={testID} className="my-class" />);
    const component = screen.getByTestId(testID);

    expect(component).toHaveStyle({
      color: "rgba(239, 68, 68, 1)",
    });

    expect(console.log)
      .toHaveBeenCalledWith(`Debugging component.testID 'debugClassName'

{
  "originalProps": {
    "testID": "debugClassName",
    "className": "my-class"
  },
  "props": {
    "testID": "debugClassName",
    "onPressIn": "[Function]",
    "onPressOut": "[Function]",
    "onHoverIn": "[Function]",
    "onHoverOut": "[Function]",
    "onFocus": "[Function]",
    "onBlur": "[Function]",
    "onPress": "[Function]",
    "onLayout": "[Function]",
    "ref": null,
    "style": {
      "color": "rgba(239, 68, 68, 1)"
    }
  },
  "containers": {
    "test": {
      "originalProps": "[Circular]",
      "props": {},
      "guardsEnabled": true,
      "canUpgradeWarn": false,
      "animated": 0,
      "containers": 1,
      "variables": 0,
      "pressable": 1,
      "active": false,
      "hover": false,
      "focus": false,
      "layout": [
        0,
        0
      ]
    },
    "@__": "[Circular]"
  }
}`);
  });
});
