import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FileNameListItem from "app/components/FileList/FileNameListItem";

Enzyme.configure({ adapter: new Adapter() });

describe("FileNameListItem", () => {
  it("matches snapshot", () => {
    const props = {
      file: "file1",
      onFileItemClick: jest.fn(),
      onFileDeleteClick: jest.fn()
    };
    const wrapper = shallow(<FileNameListItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("shows dropdown on click, and calls callback", () => {
    const props = {
      file: "file1",
      onFileItemClick: jest.fn(),
      onFileDeleteClick: jest.fn()
    };
    const wrapper = mount(<FileNameListItem {...props} />);
    wrapper.find("i").simulate("click");

    expect(wrapper.find("DropdownItem")).toHaveLength(1);

    wrapper.find("DropdownItem").simulate("click");
    expect(props.onFileItemClick).toBeCalledTimes(0);
    expect(props.onFileDeleteClick).toBeCalledTimes(1);
  });

  it("calls callback", () => {
    const props = {
      file: "file1",
      onFileItemClick: jest.fn(),
      onFileDeleteClick: jest.fn()
    };
    const wrapper = mount(<FileNameListItem {...props} />);
    wrapper.find("i").simulate("click");

    expect(wrapper.find("ListGroupItem")).toHaveLength(1);

    wrapper.find("ListGroupItem").simulate("click");

    expect(props.onFileItemClick).toBeCalledTimes(1);
    expect(props.onFileDeleteClick).toBeCalledTimes(0);
  });
});
