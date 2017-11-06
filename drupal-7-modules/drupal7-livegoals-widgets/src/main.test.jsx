import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';

expect.extend(expectJSX);

/*
  This file tests the tester
 */

class TestComponent extends React.Component {}

describe('expect-jsx', () => {
  it('works', () => {
    expect(<div />).toEqualJSX(<div />);
    // ok

    expect(<span />).toNotEqualJSX(<div/>);
    // ok

    expect(<div><TestComponent /></div>).toIncludeJSX(<TestComponent />);
    // ok
  });
  it('doesn\'t not work', () => {
    expect(<div />).toEqualJSX(<div />);
    // ok

    expect(<span />).toNotEqualJSX(<div/>);
    // ok

    expect(<div><TestComponent /></div>).toIncludeJSX(<TestComponent />);
    // ok
  });
});
