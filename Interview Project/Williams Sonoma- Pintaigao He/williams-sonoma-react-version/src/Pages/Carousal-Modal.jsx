import React from "react";
import "./Carousal-Modal.css"
class Carousal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayImage: props.images[props.startIndex],
            index: props.startIndex
        }
    }


    render() {
        let nextImage = () => {
            let index = this.state.index + 1 === this.props.images.length ? 0 : this.state.index + 1
            this.setState({ displayImage: this.props.images[index], index: index })
        }
        let prevImage = () => {
            let index = this.state.index === 0 ? this.props.images.length - 1 : this.state.index - 1
            this.setState({ displayImage: this.props.images[index], index: index })
        }

        let selectImage = (index) => {
            this.setState({ displayImage: this.props.images[index], index: index })
        }
        return (
            <div className="carousal-modal" onClick={(e) => { this.props.displayModal() }}>
                <div className="carousal-modal-container">
                    <button className="carousal-left" onClick={(e) => { prevImage(); e.stopPropagation(); }}>◀︎</button>
                    <div className="carousal-image-container">
                        <div><img src={this.state.displayImage.href} /></div>
                    </div>
                    <button className="carousal-right" onClick={(e) => { nextImage(); e.stopPropagation(); }}>►</button>
                </div>
                <div className="carousal-image-group">
                    {this.props.images.map((image, index) => {
                        return (<img src={image.href} className={"carousal-image-group-single " + (this.state.index === index ? "carousal-border" : "")} alt={image.href} onClick={(e) => { selectImage(index); e.stopPropagation() }} />)
                    })}
                </div>
            </div>
        )
    }
}

export default Carousal;