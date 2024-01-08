import { Component } from "react";
import ReactPlayer from 'react-player/lazy'
import { BiDislike, BiLike } from "react-icons/bi";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import { Button, Container, Heading, Img, Item, ItemContainer, Text } from "../../style_component";
import Store from "../../store.js";
import './index.css'
import { BsDot } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { MdPlaylistAdd } from "react-icons/md";

const statusCode = {
    initial: "INITIAL",
    pending: "PENDING",
    success: "SUCCESS",
    failed: "FAILED",
    error: false,
    rejected: "REJECTED"
}

class Trending extends Component {
    state = { isError: statusCode.error, errorMsg: '', fetchStatus: statusCode.initial, videos: [] }

    componentDidMount() {
        this.onGetVideos()
    }

    onGetVideos = async (e) => {
        this.setState({ fetchStatus: statusCode.pending, isError: statusCode.error, errorMsg: '' })
        const { match } = this.props

        try {
            const jwtToken = Cookies.get("jwt_token")
            const url = `https://apis.ccbp.in/videos/${match.params.id}`
            const response = await fetch(url, {
                headers: {
                    authorization: `bearer ${jwtToken}`
                }
            })
            if (response.ok) {
                const { video_details } = await response.json()

                const videoList = (data) => ({
                    "id": data.id,
                    "title": data.title,
                    "thumbnailUrl": data.thumbnail_url,
                    "viewCount": data.view_count,
                    "videoUrl": data.video_url,
                    "channel": {
                        "name": data.channel.name,
                        "profileImageUrl": data.channel.profile_image_url,
                        "subscriberCount": data.channel.subscriber_count
                    },
                    "publishedAt": data.published_at,
                    "description": data.description
                })

                this.setState({ videos: videoList(video_details), fetchStatus: statusCode.success })
            } else {
                const { error_msg } = await response.json()
                this.setState({
                    fetchStatus: statusCode.failed, isError: true, errorMsg: error_msg
                })
            }

        } catch (error) {
            this.setState({ fetchStatus: statusCode.failed, isError: true, errorMsg: 'Something Went Wrong' })
        }
    }

    onSuccess = ({ theme }) => {
        const { fetchStatus, videos } = this.state
        if (fetchStatus === statusCode.success) {
            console.log(fetchStatus)
            console.log(videos)
            return (
                <Container className="player" >
                    <ReactPlayer light url={videos.videoUrl} controls width="100%" playing />
                    <Container align="stretch" gap="16px" className="data_container">
                        <Text>{videos.title}</Text>
                        <Container className="view_container" row justify="space-between">
                            <Container row>
                                <Text color={theme ? "#606060" : "gray"}>{videos.viewCount}</Text>
                                <BsDot color={theme ? "#606060" : "gray"} />
                                <Text color={theme ? "#606060" : "gray"}>{formatDistanceToNow(new Date(videos.publishedAt))}</Text>
                            </Container>
                            <ItemContainer>
                                <Item>
                                    <Button className="like_btn">
                                        <BiLike />
                                        <Text>Like</Text>
                                    </Button>
                                </Item>
                                <Item>
                                    <Button className="like_btn">
                                        <BiDislike />
                                        <Text>Dislike</Text>
                                    </Button>
                                </Item>
                                <Item>
                                    <Button className="like_btn">
                                        <MdPlaylistAdd />
                                        <Text>Save</Text>
                                    </Button>
                                </Item>
                            </ItemContainer>
                        </Container>
                        <hr />
                    </Container>
                    <Container justify="flex-start" className="profile_video data_container" row >
                        <Container>
                            <Img width="64px" src={videos.channel.profileImageUrl} />
                        </Container>
                        <Container align="flex-start">
                            <Text>{videos.channel.name}</Text>
                            <Text>{videos.channel.subscriberCount} Subscriber</Text>
                            <Text>{videos.description}</Text>

                        </Container>
                    </Container>
                </Container>

            )
        } else {
            return (
                <div className="loader-container" data-testid="loader">
                    <Loader type="ThreeDots" color={theme ? "#ffffff" : "black"} height="50" width="50" />
                </div>
            )

        }
    }

    render() {
        const { fetchStatus } = this.state
        return (
            <Store.Consumer>
                {value => {
                    return (
                        fetchStatus === statusCode.failed ? (<Container className="noData" gap='16px'>
                            <Img width="300px" src={value.theme ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" :
                                "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"} />
                            <Heading color={value.theme ? "white" : "black"}>Oops! Something Went Wrong</Heading>
                            <Text>We have some trouble to complete your request. please try again.</Text>
                            <Button className="btn search_btn" bg='#4f46e5' color="white" position="center" onClick={this.onGetVideos}>Retry</Button>
                        </Container>) : (<Container className="page" bg={!value.theme ? "#f9f9f9" : "#0f0f0f"} data-testid="gaming">
                            <Container className="page_container">{this.onSuccess(value)}</Container>
                        </Container>)
                    )
                }}
            </Store.Consumer>
        )
    }
}

export default Trending