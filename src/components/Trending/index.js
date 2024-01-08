import { Component } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { formatDistanceToNow } from 'date-fns'
import { BsDot } from "react-icons/bs";
import { AiFillFire } from "react-icons/ai";
import { Button, Container, Heading, Img, Item, ItemContainer, Text } from "../../style_component";
import Store from "../../store.js";
import './index.css'

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
                <div className="loader-container" data-testid="loader">
                    <Loader type="ThreeDots" color={theme ? "#ffffff" : "black"} height="50" width="50" />
                </div>
            )
        } else {
            return (<ItemContainer className="card_container card_trending_container">
                {videos.map(v => <Item key={v.id} className="trending_card">
                    <Img width="300px" src={v.thumbnailUrl} alt="video thumbnail" />
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
            </ItemContainer>)
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
                                <Container className="noData" gap='16px'>
                                    <Img width="300px" src={value.theme ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" :
                                        "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"} alt="failure view" />
                                    <Heading color={value.theme ? "white" : "black"}>Oops! Something Went Wrong</Heading>
                                    <Text>We have some trouble to complete your request. please try again.</Text>
                                    <Button className="btn search_btn" bg='#4f46e5' color="white" position="center" onClick={this.onGetVideos}>Retry</Button>
                                </Container> :
                                <Container className="page" >
                                    <Container className="trending_heading_container" bg={value.theme ? "black" : "#d7dfe9"} data-testid="banner">
                                        <Container className="trending_heading_icon" bg={value.theme ? "#231f20" : "#cbd5e1"}><AiFillFire size={24} /></Container>
                                        <Heading color={value.theme ? "white" : "black"}>Trending</Heading>
                                    </Container>
                                    <Container className="page_container">
                                        {this.onSuccess(value)}
                                    </Container>
                                </Container>}
                        </Container>
                    )
                }}
            </Store.Consumer>
        )
    }
}

export default Trending