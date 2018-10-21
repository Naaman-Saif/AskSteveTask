jest.useFakeTimers();
import React from "react";
import AuthLoading from "../src/screens/AuthLoading";
import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<AuthLoading />).toJSON();
  expect(tree).toMatchSnapshot();
});
