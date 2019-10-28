import React, { useState } from 'react';


let state = {
    "firstName": "Pintaigao",
    "lastName": "He"
}
function HOOKS() {
    // Declare a new state variable, which we'll call "count"
    const [state1, setState1] = useState(state);
    console.log(state1);

    let clickE = function () {
        setState1({
            lastName: "sss"
        });
        console.log(state1);
    };

    return (
        <div>
            {/* <p>You clicked {count} times</p> */}
            {/* <button onClick={() => setCount(count + 1)}>Click me</button> */}
            <button onClick={clickE}></button>
            <button onClick={() => console.log(state1)}></button>
        </div >
    );
}

export default HOOKS;