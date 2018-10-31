import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import routes from "app/constants/routes.json";
import { FileNameList } from "app/components/FileList/FileNameList";

Enzyme.configure({ adapter: new Adapter() });

describe("FileNameList", () => {
  it("matches snapshot", () => {
    const files = ["File1", "file2", "File3"];
    const wrapper = shallow(<FileNameList files={files} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("calls onFileItemClick", () => {
    const onFileItemClick = jest.fn();
    const files = ["File1"];
    const pathname = routes.EDITOR;

    const wrapper = mount(
      <FileNameList
        pathname={pathname}
        onFileItemClick={onFileItemClick}
        files={files}
      />
    );

    wrapper.find("ListGroupItem").simulate("click");
    expect(onFileItemClick).toHaveBeenCalledTimes(1);
  });
});
