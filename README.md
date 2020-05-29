![lint](https://github.com/zypox/print-api/workflows/lint/badge.svg)

# dom-element-path

Get unique dom element path for specified element.

# Usage

```javascript
import domElementPath from './dom-element-path';

let body = domElementPath(document.body);
console.log(body);
```

Output:

```
html > body
```

One of the common use cases is where you have event in some sort of event handler:

```javascript
import domElementPath from './dom-element-path';

onClick(event) {
    let clickedElementPath = domElementPath(event.target);
    console.log(clickedElementPath);
};
```

Output:

```
html > header > div.header-menu > ul > li:nth-of-type(4) > a.login-button
```
