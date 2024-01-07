import { BannerContainer, Button, Img, Text } from "../../style_component";

const Banner = () => <BannerContainer
    image="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png">
    <Img height="25%" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" />
    <Text color="black" size='20px'>Buy Nxt Watch Premium prepaid plans with UPI</Text>
    <Button className="btn banner_btn">GET IT NOW</Button>
</BannerContainer>

export default Banner