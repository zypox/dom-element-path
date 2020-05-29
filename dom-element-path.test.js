import domElementPath from './dom-element-path';

describe('domElementPath', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = ''; 
  });

  test('it should throw error on other than HTMLElement type', () => {
    let expectedErr = 'element must be of type `HTMLElement`.';
    expect(() => domElementPath("")).toThrow(expectedErr);
    expect(() => domElementPath(1)).toThrow(expectedErr);
    expect(() => domElementPath({})).toThrow(expectedErr);
    expect(() => domElementPath([])).toThrow(expectedErr);
  });

  test('it should not throw an error on HTMLElement type', () => {
    let result = domElementPath(document.body);

    expect(result).toBe('html > body');
  });

  test('it should work on nested elements', () => {
    let div = document.createElement('div');
    let otherDiv = document.createElement('div');
    div.appendChild(otherDiv);

    let result = domElementPath(otherDiv);

    expect(result).toBe('div > div');
  });

  test('it should append element ids to path', () => {
    let div = document.createElement('div');
    div.setAttribute('id', 'some-div');
    let otherDiv = document.createElement('div');
    div.appendChild(otherDiv);

    let result = domElementPath(otherDiv);

    expect(result).toBe('div#some-div > div');
  });

  test('it should append element class to path', () => {
    let div = document.createElement('div');
    div.setAttribute('class', 'some-div')
    let otherDiv = document.createElement('div');
    div.appendChild(otherDiv);

    let result = domElementPath(otherDiv);

    expect(result).toBe('div.some-div > div');
  });

  test('it should append element with multiple classes to path', () => {
    let div = document.createElement('div');
    div.setAttribute('class', 'a b c')
    let otherDiv = document.createElement('div');
    div.appendChild(otherDiv);

    let result = domElementPath(otherDiv);

    expect(result).toBe('div.a.b.c > div');
  });

  test('it should add nth-of-type selector to same elements of same parent', () => {
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');

    document.body.appendChild(div1);
    document.body.appendChild(div2);

    let result = domElementPath(div1);

    expect(result).toBe('html > body > div:nth-of-type(0)');
  });

  test('it should add nth-of-type selector to same elements with same class of same parent', () => {
    let div1 = document.createElement('div');
    div1.setAttribute('class', 'a b')
    let div2 = document.createElement('div');
    div2.setAttribute('class', 'a b')

    document.body.appendChild(div1);
    document.body.appendChild(div2);

    let result = domElementPath(div2);

    expect(result).toBe('html > body > div.a.b:nth-of-type(1)');
  });

  test('it should not add nth-of-type selector to different elements with same class of same parent', () => {
    let div = document.createElement('div');
    div.setAttribute('class', 'a b')
    let span = document.createElement('span');
    span.setAttribute('class', 'a b')

    document.body.appendChild(div);
    document.body.appendChild(span);

    let result = domElementPath(span);

    expect(result).toBe('html > body > span.a.b');
  });

  test('it should not add nth-of-type selector to same elements with id of same parent', () => {
    let div1 = document.createElement('div');
    div1.setAttribute('id', 'some-id')
    let div2 = document.createElement('div');

    document.body.appendChild(div1);
    document.body.appendChild(div2);

    let result = domElementPath(div1);

    expect(result).toBe('html > body > div#some-id');
  });

  test('it should not add nth-of-type selector to same elements with same classes with id of same parent', () => {
    let div1 = document.createElement('div');
    div1.setAttribute('id', 'some-id')
    div1.setAttribute('class', 'a b')
    let div2 = document.createElement('div');
    div2.setAttribute('class', 'a b')

    document.body.appendChild(div1);
    document.body.appendChild(div2);

    let result = domElementPath(div1);

    expect(result).toBe('html > body > div#some-id.a.b');
  });
});
