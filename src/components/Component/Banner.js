import { IoMdClose } from "react-icons/io";
import { BannerContainer, Button, Img, Text } from "../../style_component";

const Banner = ({ onBannerClose }) =>
    <>
        <BannerContainer
            image="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
            style={{ position: "relative" }}
        >
            <Img height="25%" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" alt="nxt watch logo" />
            <Text color="black" size='20px'>Buy Nxt Watch Premium prepaid plans with UPI</Text>
            <Button className="btn banner_btn">GET IT NOW</Button>
            <Button data-testid="close" onClick={() => onBannerClose()} style={{ position: "absolute", top: 20, right: 20 }}><IoMdClose /></Button>
        </BannerContainer>
    </>

export default Banner