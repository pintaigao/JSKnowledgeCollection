# Pintaigao's Williams Sonoma Coding Challenge Explaination

## Before Start

​	For this project, I have made two version of this, one is using pure html + css to finish it (folder name is: **./Williams Sonoma Pure HTML**), simply open **index.html ** and then the page will be rendered, just using **JS** and **Jquery** to make the website.

​	If would like to take a look at the react version, please follow the following the step.

## 1. Install and run project

1.  Used terminal and  `cd`  to the path of this react project
    *   `cd /Williams Sonoma- Pintaigao He/williams-sonoma-react-version`
2.  run `npm install` to install the **node_modules**
3.  run `npm start`  to initiate loading the project, open `localhost:3000` in the browser then you will see the rendering page.



## 2. Build System Explaination

​	Basically I use **React** library to build this website, the reason I use **React** to build the website is because: 1. It is popular and almost every company using it. 2. It is easy to use and devlope. 3. It use virtual dom which ensure faster rendering page. So the base architecture of my project as follow:

```
App.js
├── Component
│   └─ Item.jsx
├── Pages
│   └── Carousal-Modal
│   ├── Detail
│   └── Main
├── tests   
├── utils      
└── index.js
```

​	When  **React ** is running, it will check the **App.js** (main entry) first. In **App.js**, bascially define how the router should works when accessing different url, what components should be rendered when switching the url. Then in default, **Main Page** is being rendered after **App.js**. Accoding to each json object, using  **flexbox** css property to build the responsive grid system, make **reusable component (Item.jsx)** to display each of the product.

​	When clicking a single product, the details of this product will be showed, it will show the main hero image and all its relative thumbnail images, if select anyone of them, the main hero image will change to the select one.

​	When clicking the main hero image, the carousal modal will be showed. Inside this modal only Images will be showed, so for now you can choose any of image from the image groups and take a careful look at it.



## 3. Web Responsive

Using **Media Query**, to effectively make the website responsive and mobile friendly. You will see the effect when keep reducing the size of browsers.



## 4. Test

Using **Jest + Enzyme** to test if the **UI** is correctly render or not, (for now because there isn't envolve in any api calls, but in the future these api calls should be tested in Jest before development), so the way to test if these UI are correctly render is: simply run `npm test` in side the terminal and should see a gree pass. Terminal will automatically monitor if any change may fail the test. If any one of them fail the test, test result will become red. 