import Cookies from "js-cookie"
import { Route, Redirect } from "react-router-dom"
import { Before, Container, Main } from "../../style_component";
import Header from '../Header/index.js'
import Store from "../../store.js";
import Sidebar from "../Sidebar";

const ProtectedRoute = (props) => {


    if (!Cookies.get('jwt_token')) {
        return <Redirect to="/login" />
    }

    return (
        <Store.Consumer>
            {value => {
                const { theme, onChangeTheme, showSidebar, onShowSidebar } = value
                return (
                    <Main dark={theme} className="main_container">
                        <Header theme={theme} onChangeTheme={onChangeTheme} onShowSidebar={onShowSidebar} showSidebar={showSidebar} />
                        <Container className="junction_container">
                            <Sidebar theme={theme} show={showSidebar} />
                            <Route {...props} />
                        </Container>
                        <Before show={showSidebar} onClick={onShowSidebar}></Before>
                    </Main>
                )
            }}
        </Store.Consumer>
    )
}
export default ProtectedRoute