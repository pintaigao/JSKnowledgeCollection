class Component extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1> It is a  Component</h1>
            </div>
        )
    }
}

/* 因为index.html中导入了react library，所以直接 React class */
let root = document.getElementById('root');
ReactDOM.render(
    <div>
        <h1>Hello, world!</h1>
        <Component />
    </div>,
    root
);
