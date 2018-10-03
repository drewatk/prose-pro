import { toggleShowHistory, toggleShowFileList } from "app/actions/view";

describe("View Actions", () => {
  test("Toggle Show History", () => {
    expect(toggleShowHistory()).toMatchSnapshot();
  });
  test("Toggle Show File List", () => {
    expect(toggleShowFileList()).toMatchSnapshot();
  });
});
