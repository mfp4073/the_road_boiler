import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageEventPage} from './ManageEventPage';

describe ('Manage Event Page', () => {
  it('sets error message when trying to save empty title', () => {
    const props = {
      authors: [],
      actions: { saveEvent: () => { return Promise.resolve(); }},
      event: {id: '', watchHref: '', title: '', authorID: '', length: '', category: ''}
    };
    const wrapper = mount(<ManageEventPage {...props}/>);
    const saveButton = wrapper.find('input').last();
    console.log("HEFRE: ", saveButton);
    // expect(saveButton.prop('type')).toBe(undefined);
    saveButton.simulate('click');
  });
});
