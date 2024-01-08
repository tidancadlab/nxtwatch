import { Link, withRouter } from "react-router-dom";
import { IoMdMoon } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { Button, Img, Item, ItemContainer, Nav } from "../../style_component";
import Cookies from "js-cookie";

const Header = ({ theme, onChangeTheme, history }) => (
    <Nav className="header" bg={theme ? "#212121" : "white"}>
        <Link to="/" className='logo_link'>
            <Img
                className="logo"
                height="30px"
                src={theme ?
                    "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" :
                    "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"}
                alt="website logo"
            />
        </Link>
        <ItemContainer>
            <Item>
                <Button
                    className="theme_btn"
                    onClick={onChangeTheme}
                    data-testid="theme"
                >{!theme ? <IoMdMoon color="black" /> : <FiSun color="white" />}</Button>
            </Item>
            <Item>
                <Button className="theme_btn"><Img height="28px" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png" alt="profile" /></Button>
            </Item>
            <Item>
                <Button className="btn logout_btn" onClick={() => {
                    Cookies.remove('jwt_token')
                    history.replace('/login')
                }}>Logout</Button>
            </Item>
        </ItemContainer>
    </Nav>
)

export default withRouter(Header)