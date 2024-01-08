import { Component } from "react";
import Cookies from "js-cookie";
import { SiYoutubegaming } from "react-icons/si";
import { BannerSmall, FailView, Loading } from "../Components.js";
import { Container, Img, Item, ItemContainer, Text } from "../../style_component";
import Store from "../../store.js";
import './index.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";

const statusCode = {
    initial: "INITIAL",
    pending: "PENDING",
    success: "SUCCESS",
    failed: "FAILED",
    error: false,
    rejected: "REJECTED"
}
const videoList = (data) => ({
    "id": data.id,
    "title": data.title,
    "thumbnailUrl": data.thumbnail_url,
    "viewCount": data.view_count,
})

class Trending extends Component {
    state = { fetchStatus: statusCode.initial, videos: [] }

    componentDidMount() {
        this.onGetVideos()
    }

    onGetVideos = async (e) => {
        this.setState({ fetchStatus: statusCode.pending })

        try {
            const jwtToken = Cookies.get("jwt_token")
            const url = `https://apis.ccbp.in/videos/gaming`
            const response = await fetch(url, {
                headers: {
                    authorization: `bearer ${jwtToken}`
                }
            })
            if (response.ok) {
                const { videos } = await response.json()
                this.setState({
                    fetchStatus: statusCode.success, isError: true, videos: videos.map(value => videoList(value))
                })
            } else {
                this.setState({
                    fetchStatus: statusCode.failed
                })
            }

        } catch (error) {
            this.setState({ fetchStatus: statusCode.failed })
        }
    }

    onSuccess = ({ theme }) => {
        const { fetchStatus, videos } = this.state
        return fetchStatus === statusCode.pending ?
            <Loading />
            : (
                <Container className="page">
                    <BannerSmall Icon={SiYoutubegaming} title="Gaming" />
                    <Container className="page_container"><ItemContainer className="card_container">
                        {videos.map(v => <Item key={v.id} className="card">
                            <Link to={`/videos/${v.id}`}><Img className="w-full" width="300px" src={v.thumbnailUrl} alt="channel logo" /></Link>
                            <Container className="trending_details">
                                <Text className="title">{v.title}</Text>
                                <Container className="view_container" >
                                    <Text color={theme ? "#606060" : "gray"}>{v.viewCount} views</Text>
                                </Container>
                            </Container>
                        </Item>)}
                    </ItemContainer></Container>
                </Container>
            )

    }

    render() {
        const { fetchStatus } = this.state
        return (
            <Store.Consumer>
                {value => {
                    return (
                        <Container className="page" bg={!value.theme ? "#f9f9f9" : "#0f0f0f"} data-testid="gaming">
                            {fetchStatus === statusCode.failed ? (<FailView onGetVideos={this.onGetVideos} />) : (
                                this.onSuccess(value))}
                        </Container>
                    )
                }}
            </Store.Consumer>
        )
    }
}

export default Trending