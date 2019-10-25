import React from 'react';
import './Detail.css'
import Carousal from './Carousal-Modal';
class DetailPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            imageG: this.props.location.state.images,
            startIndex: 3,
            heroImage: this.props.location.state.hero.href,
            displayModal: false
        }
    }
    render() {
        let item = this.props.location.state;
        let itemName = item.name
        let price = 0;
        if (item.price) {
            price = item.price.regular
        } else if (item.priceRange) {
            price = item.priceRange.regular.high;
        } else {
            price = 0;
        }

        let changeImage2 = (image) => {
            this.setState({ heroImage: image.href });
        }

        let displayModal = () => {
            this.setState({ displayModal: !this.state.displayModal })
        }

        // setInterval(() => changeImage(), 1000);

        return (
            <React.Fragment>
                {this.state.displayModal && <Carousal images={this.state.imageG} startIndex={this.state.startIndex} displayModal={displayModal} />}
                <div className="detail-container">
                    <div className="detail-container-left">
                        <div className="detail-img-container">
                            <img src={this.state.heroImage} alt="" className="detail-img-hero" onClick={displayModal} />
                            <div className="detail-img-group">
                                {this.state.imageG.map((image) => (<img src={image.href} className="detail-img-group-singe" onClick={() => changeImage2(image)} />))}
                            </div>
                        </div>
                    </div>
                    <div className="detail-info-container">
                        <div className="detail-item-info">
                            <h1>{itemName}</h1>
                            <p>$ {price}</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default DetailPage;

