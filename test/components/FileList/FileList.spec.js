import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import routes from "app/constants/routes.json";
import { FileNameList } from "app/components/FileList/FileNameList";

Enzyme.configure({ adapter: new Adapter() });

describe("FileNameList", () => {
  it("matches snapshot", () => {
    const wrapper = shallow(<FileNameList />);
    expect(wrapper).toMatchSnapshot();
  });

  it("calls onFileItemClick", () => {
    const onFileItemClick = jest.fn();
    const pathname = routes.EDITOR;

    const wrapper = shallow(
      <FileNameList pathname={pathname} onFileItemClick={onFileItemClick} />
    );

    wrapper.find("#file-item").simulate("click");
    expect(onFileItemClick).toHaveBeenCalledTimes(1);
  });
});
