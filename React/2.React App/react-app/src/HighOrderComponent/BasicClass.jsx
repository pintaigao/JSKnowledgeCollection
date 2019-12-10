import React from "react";

class Basic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "firstName": "Pintaigao",
            'lastName': "He"
        }
        this.content = "";
    }

    changeState() {
        console.log(this.content);
        this.setState({ "lastName2": "SSS" });
        this.content = "Some things"
        console.log(this.state);
        console.log(this.content);
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