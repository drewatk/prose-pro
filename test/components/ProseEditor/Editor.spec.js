import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProseEditor from '../../../app/components/ProseEditor';

Enzyme.configure({ adapter: new Adapter() });

describe('ProseEditor', () => {
  it('should should display an editor', () => {
    const wrapper = shallow(<ProseEditor />);
    expect(wrapper.find('DraftEditor')).toHaveLength(1);
  });

  it('should should display BlockStyleControls', () => {
    const wrapper = shallow(<ProseEditor />);
    expect(wrapper.find('BlockStyleControls')).toHaveLength(1);
  });

  it('should should display InlineStyleControls', () => {
    const wrapper = shallow(<ProseEditor />);
    expect(wrapper.find('InlineStyleControls')).toHaveLength(1);
  });

  // TODO: Add tests for inputting into draftjs, investigation needed
});
