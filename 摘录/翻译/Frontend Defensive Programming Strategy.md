# Frontend Defensive Programming Strategy

原文出处：https://juejin.im/post/5de91d0f51882512400acafd?utm_source=gold_browser_extension

## Foreword

Before a page is fully loaded, it will go through the process of loading static resource, http requesting and rendering. What we are going to do is preventing error and handling error on each procedure and to keep great user experience.



## Handling Error when Internet Fail

Take **React** for example, demo: [CodeSandbox](https://codesandbox.io/s/with-loading-5uns7)

```react
function App() {
    const [data, setData] = useState(null);
    useEffect(() => {
        (async () => {
            const data = await request();
            setData(data);
        })();
    });
    if (!data) return null;
    return (
        <div className="App">
            <h1>Hello {data.name}</h1>
        </div>
    );
}
```

if we are experiencing low internet performance, usually during the waiting time we adding a transition page.

```react
function App() {
    ...
    if (!data) return <Loading />;
    ...
}
```

Adding `if (!data) return <Loading />` can solve the problem of waiting time of fetching data, but doesn't sovle the problem of loading static resource time, there also should be a transition page.

In `index.html`

```html
<body>
    <div id="root">
      <div class="loading"><span></span></div>
    </div>
  	<style>
      .loading { ... }
  	</style>
</body>
```

The solution is loading static `<div class="loading"><span></span></div>` first and then `if (!data) return <Loading />`, But there is another problem, 断层，how do we keep the consistance ?

```react
/* render.js */
import React from "react";
import ReactDOM from "react-dom";
export default function render(Component, props) {
    const rootElement = document.getElementById("root");
    ReactDOM.render(<Component {...props} />, rootElement);
}
/* index.js */
import render from "./render";
import request from "./request";
import App from "./App";
(async () => {
    const data = await request();
    render(App, { data });
})();
```



## Handling Error when http request fail

### Time Out

Usually users can wait for 3 ~ 5s until the page fully load, 

##Prevent being attached

 






