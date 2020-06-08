![lint](https://github.com/zypox/dom-element-path/workflows/ci/badge.svg)

# dom-element-path

Get unique dom element path for specified element.

# Installation


npm:
```
npm install dom-element-path
```

yarn:
```
yarn add dom-element-path
```

# Usage

```javascript
import domElementPath from 'dom-element-path';

const body = domElementPath(document.body);
console.log(body);
```

Output:

```
html > body
```

One of the common use cases is where you have event in some sort of event handler and want to get path of element that the event was fired off:

```javascript
import domElementPath from 'dom-element-path';

const onClick = event => {
    const clickedElementPath = domElementPath(event.target);
    console.log(clickedElementPath);
};
```

Output:

```
html > header > div.header-menu > ul > li:nth-of-type(4) > a.login-button
```

# Development

run linter:
```
yarn lint
```

run tests:
```
yarn test
```

create build:
```
yarn build
```
