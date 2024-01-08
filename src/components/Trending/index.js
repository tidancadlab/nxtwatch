import { Component } from "react";
import Cookies from "js-cookie";
import { formatDistanceToNow } from 'date-fns'
import { BsDot } from "react-icons/bs";
import { AiFillFire } from "react-icons/ai";
import { Container, Img, Item, ItemContainer, Text } from "../../style_component";
import { BannerSmall, FailView, Loading } from "../Components.js";
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
    "channel": {
        "name": data.channel.name,
        "profileImageUrl": data.channel.profile_image_url
    },
    "viewCount": data.view_count,
    "publishedAt": data.published_at
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
            const url = `https://apis.ccbp.in/videos/trending`
            const response = await fetch(url, {
                headers: {
                    authorization: `bearer ${jwtToken}`
                }
            })
            if (response.ok) {
                const { videos } = await response.json()
                this.setState({
                    fetchStatus: statusCode.success, videos: videos.map(value => videoList(value))
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

        if (fetchStatus === statusCode.pending) {
            return (
                <Loading />
            )
        } else {
            return (
                <Container className="page" >
                    <BannerSmall Icon={AiFillFire} title={"Trending"} />
                    <Container className="page_container">
                        <ItemContainer className="card_container card_trending_container">
                            {videos.map(v => <Item key={v.id} className="trending_card">
                                <Link to={`/videos/${v.id}`} ><Img height="166px" style={{ maxWidth: "unset" }} src={v.thumbnailUrl} alt="video thumbnail" /></Link>
                                <Container className="trending_details">
                                    <Text className="title">{v.title}</Text>
                                    <Text color={theme ? "#606060" : "gray"}>{v.channel.name}</Text>
                                    <Container className="view_container" >
                                        <Text color={theme ? "#606060" : "gray"}>{v.viewCount} views</Text>
                                        <BsDot color={theme ? "#606060" : "gray"} />
                                        <Text color={theme ? "#606060" : "gray"}>{formatDistanceToNow(new Date(v.publishedAt))}</Text>
                                    </Container>
                                </Container>
                            </Item>)}
                        </ItemContainer>
                    </Container>
                </Container>
            )
        }
    }

    render() {
        const { fetchStatus } = this.state
        return (
            <Store.Consumer>
                {value => {
                    return (
                        <Container className="page" bg={!value.theme ? "#f9f9f9" : "#0f0f0f"} data-testid="trending">
                            {fetchStatus === statusCode.failed ?
                                <FailView onGetVideos={this.onGetVideos} /> : this.onSuccess(value)}
                        </Container>
                    )
                }}
            </Store.Consumer>
        )
    }
}

export default Trending