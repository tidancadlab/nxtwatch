import { Component } from "react";
import { Container } from "../../style_component";
import Store from "../../store.js";

class SaveVideo extends Component {

    render() {
        return (
            <Store.Consumer>
                {value => {
                    return (
                        <Container className="page">SaveVideo</Container>
                    )
                }}
            </Store.Consumer>
        )
    }
}

export default SaveVideo