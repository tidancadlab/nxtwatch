import { Component } from "react";
import Cookies from "js-cookie";
import ReactPlayer from 'react-player/lazy'
import { BsDot } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { MdPlaylistAdd } from "react-icons/md";
import { BiDislike, BiLike } from "react-icons/bi";
import { Button, Container, Img, Item, ItemContainer, Text } from "../../style_component";
import Store from "../../store.js";
import { FailView, Loading } from '../Components.js'
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

class Trending extends Component {
    state = { fetchStatus: statusCode.initial, videos: [] }

    componentDidMount() {
        this.onGetVideos()
    }

    onGetVideos = async (e) => {
        this.setState({ fetchStatus: statusCode.pending })
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
                this.setState({ videos: videoList(video_details), fetchStatus: statusCode.success })
            } else {
                this.setState({
                    fetchStatus: statusCode.failed
                })
            }
        } catch (error) {
            this.setState({ fetchStatus: statusCode.failed })
        }
    }

    onSuccess = ({ theme,
        likedVideoList,
        dislikedVideoList,
        savedVideoList,
        onLike,
        onDislike,
        onSave
    }) => {
        const { fetchStatus, videos } = this.state
        const isLiked = likedVideoList.includes(videos.id)
        const isDisliked = dislikedVideoList.includes(videos.id)
        const isSaved = savedVideoList.filter(value => value.id === videos.id).length > 0

        if (fetchStatus === statusCode.success) {
            return (
                <Container className="player" gap="16px" >
                    <ReactPlayer light url={videos.videoUrl} controls width="100%" playing />
                    <Container align="stretch" gap="16px" className="data_container">
                        <Text>{videos.title}</Text>
                        <Container className="view_container sm_view" row justify="space-between">
                            <Container row style={{ fontSize: 14 }} className="self_start">
                                <Text color={"#64748b"}>{videos.viewCount} views</Text>
                                <BsDot color={"#64748b"} />
                                <Text color={"#64748b"}>{formatDistanceToNow(new Date(videos.publishedAt))}</Text>
                            </Container>
                            <ItemContainer>
                                <Item>
                                    <Button
                                        onClick={() => onLike(videos.id)}
                                        className="like_btn"
                                        color={!isLiked ? "#64748b" : "#2563eb"}>
                                        <BiLike />
                                        <Text>Like</Text>
                                    </Button>
                                </Item>
                                <Item>
                                    <Button
                                        onClick={() => onDislike(videos.id)}
                                        className="like_btn"
                                        color={!isDisliked ? "#64748b" : "#2563eb"}>
                                        <BiDislike />
                                        <Text>Dislike</Text>
                                    </Button>
                                </Item>
                                <Item>
                                    <Button
                                        onClick={() => onSave(videos)}
                                        className="like_btn"
                                        color={!isSaved ? "#64748b" : "#2563eb"}>
                                        <MdPlaylistAdd />
                                        <Text>Save</Text>
                                    </Button>
                                </Item>
                            </ItemContainer>
                        </Container>
                        <hr />
                    </Container>
                    <Container justify="flex-start" className="profile_video data_container" row gap="16px" >
                        <Container>
                            <Img width="64px" src={videos.channel.profileImageUrl} />
                        </Container>
                        <Container align="flex-start" style={{ fontSize: 14 }}>
                            <Text>{videos.channel.name}</Text>
                            <Text>{videos.channel.subscriberCount} Subscriber</Text>
                        </Container>
                    </Container>
                    <Text className="lg">{videos.description}</Text>
                </Container>

            )
        } else {
            return (
                <Loading />
            )
        }
    }

    render() {
        const { fetchStatus } = this.state
        return (
            <Store.Consumer>
                {value => {
                    return (
                        <Container className="page" bg={!value.theme ? "#f9f9f9" : "#0f0f0f"} data-testid="videoItemDetails">
                            {
                                fetchStatus === statusCode.failed ? (
                                    <FailView onGetVideos={this.onGetVideos} />
                                ) : (
                                    <Container className="page_container">{this.onSuccess(value)}</Container>
                                )
                            }
                        </Container>
                    )
                }}
            </Store.Consumer>
        )
    }
}

export default Trending