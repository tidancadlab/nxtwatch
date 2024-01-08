import Loader from "react-loader-spinner";
import Store from "../store";
import { IoMdClose } from "react-icons/io";
import { BannerContainer, Button, Container, Heading, Img, Text } from "../style_component";

export const Loading = () => (
    <Store.Consumer>
        {
            value => <div className="loader-container" data-testid="loader">
                <Loader type="ThreeDots" color={value.theme ? "#ffffff" : "black"} height="50" width="50" />
            </div>
        }
    </Store.Consumer>
)

export const FailView = ({ onGetVideos }) => (
    <Store.Consumer>
        {
            value => <Container style={{ alignSelf: "stretch" }} className="noData" gap='16px'>
                <Img width="300px" src={value.theme ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" :
                    "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"} alt="failure view" />
                <Heading color={value.theme ? "white" : "black"}>Oops! Something Went Wrong</Heading>
                <Text>We have some trouble to complete your request. please try again.</Text>
                <Button className="btn search_btn" bg='#4f46e5' color="white" position="center" onClick={() => onGetVideos()}>Retry</Button>
            </Container>
        }
    </Store.Consumer>
)


export const Banner = ({ onBannerClose }) => (
    <BannerContainer
        image="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
        style={{ position: "relative" }}
        data-testid="banner"
    >
        <Img height="25%" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="nxt watch logo" />
        <Text color="black" size='20px'>Buy Nxt Watch Premium prepaid plans with UPI</Text>
        <Button className="btn banner_btn">GET IT NOW</Button>
        <Button data-testid="close" onClick={() => onBannerClose()} style={{ position: "absolute", top: 20, right: 20 }}><IoMdClose /></Button>
    </BannerContainer>
)

export const BannerSmall = ({ Icon, title }) => (
    <Store.Consumer>
        {
            value => <Container className="trending_heading_container" bg={value.theme ? "black" : "#d7dfe9"} data-testid="banner">
                <Container className="trending_heading_icon" bg={value.theme ? "#231f20" : "#cbd5e1"}><Icon size={24} /></Container>
                <Heading color={value.theme ? "white" : "black"}>{title}</Heading>
            </Container>
        }
    </Store.Consumer>
)

export const NotFound = () => (
    <Store.Consumer>
        {
            value => <Container style={{ alignSelf: "stretch", padding: 8, textAlign: "center" }} className="noData" gap='16px'>
                <Img width="300px" src={!value.theme ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png" :
                    "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"} alt="failure view" />
                <Heading color={value.theme ? "white" : "black"}>Page Not Found</Heading>
                <Text>We are sorry, the page you requested could not be found</Text>
            </Container>
        }
    </Store.Consumer>
)