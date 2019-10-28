import React from "react";

class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "firstName": "Pintaigao",
            'lastName': "He"
        }
    }

    changeState() {
        this.setState({ "lastName2": "SSS" });
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <button onClick={this.changeState.bind(this)}>Basic Change</button>
                <button onClick={() => console.log(this.state)}>Log State</button>
            </div >
        )
    }
}

export default Basic;