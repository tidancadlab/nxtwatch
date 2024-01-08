import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { IoMdHome } from "react-icons/io";
import { AiFillFire } from "react-icons/ai";
import { SiYoutubegaming } from "react-icons/si";
import { MdPlaylistAdd } from "react-icons/md";
import { Container, Img, Item, ItemContainer, SideBar, Text } from "../../style_component";

const Sidebar = ({ theme, location, show, ...path }) => {
    return <SideBar bg={theme ? "#212121" : "white"} show={show}>
        <ItemContainer className="link_container">
            <Link to='/' className={`${location.pathname === "/" &&(theme? "active-dark" : "active")} link`}>
                <Item className="item" color={theme ? "white" : "black"}>
                    <IoMdHome color={location.pathname === "/" && "red"} />
                    <Text>Home</Text>
                </Item>
            </Link>
            <Link to='/trending' className={`${location.pathname === "/trending" &&(theme? "active-dark" : "active")} link`}>
                <Item className="item" color={theme ? "white" : "black"}>
                    <AiFillFire color={location.pathname === "/trending" && "red"} />
                    <Text>Trending</Text>
                </Item>
            </Link>
            <Link to='/gaming' className={`${location.pathname === "/gaming" &&(theme? "active-dark" : "active")} link`}>
                <Item className="item" color={theme ? "white" : "black"}>
                    <SiYoutubegaming color={location.pathname === "/gaming" && "red"} />
                    <Text>Gaming</Text>
                </Item>
            </Link>
            <Link to='/saved-videos' className={`${location.pathname === "/saved-videos" &&(theme? "active-dark" : "active")} link`}>
                <Item className="item" color={theme ? "white" : "black"}>
                    <MdPlaylistAdd color={location.pathname === "/saved-videos" && "red"} />
                    <Text>Saved Video</Text>
                </Item>
            </Link>
        </ItemContainer>
        <Container className="social_media">
            <Text>CONTACT US</Text>
            <ItemContainer className="">
                <Item>
                    <Img width="30px" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png" alt="facebook logo" />
                </Item>
                <Item>
                    <Img width="30px" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png" alt="twitter logo" />
                </Item>
                <Item>
                    <Img width="30px" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png" alt="linked in logo" />
                </Item>
            </ItemContainer>
            <Text>Enjoy! Now to see your channels and recommendation</Text>
        </Container>
    </SideBar>
}

export default withRouter(Sidebar)