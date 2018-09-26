import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProjectSetup from '../../../app/components/ProjectSetup';

Enzyme.configure({ adapter: new Adapter() });

describe('ProjectSetup', () => {
  it('should should display a setup page', () => {
    const wrapper = shallow(<ProjectSetup />);
    expect(wrapper.find('DraftEditor')).toHaveLength(1);
  });

  it('should should display BlockStyleControls', () => {
    const wrapper = shallow(<ProjectSetup />);
    expect(wrapper.find('BlockStyleControls')).toHaveLength(1);
  });

  it('should should display InlineStyleControls', () => {
    const wrapper = shallow(<ProjectSetup />);
    expect(wrapper.find('InlineStyleControls')).toHaveLength(1);
  });

  // TODO: Add tests for inputting into draftjs, investigation needed
});
