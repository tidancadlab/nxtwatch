import { Component } from "react";
import { BsDot, BsSearch } from "react-icons/bs";
import Cookies from "js-cookie";
import { formatDistanceToNow } from 'date-fns'
import { Button, Container, Heading, Img, Item, ItemContainer, SearchField, SearchInput, Text } from "../../style_component";
import Store from "../../store.js";
import { AiFillFire } from "react-icons/ai";
import './index.css'
import Loader from "react-loader-spinner";

const statusCode = {
    initial: "INITIAL",
    pending: "PENDING",
    success: "SUCCESS",
    failed: "FAILED",
    error: false,
    rejected: "REJECTED"
}

class Trending extends Component {
    state = { isError: statusCode.error, errorMsg: '', fetchStatus: statusCode.initial, videos: [], searchText: '' }

    componentDidMount() {
        this.onGetVideos()
    }

    onGetVideos = async (e) => {
        const { searchText } = this.state
        this.setState({ fetchStatus: statusCode.pending, isError: statusCode.error, errorMsg: '' })

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

                this.setState({
                    fetchStatus: statusCode.success, isError: true, videos: videos.map(value => videoList(value))
                })
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

    onSearchInput = e => {
        this.setState({ searchText: e.target.value })
    }

    onSuccess = ({ theme }) => {
        const { fetchStatus, videos } = this.state

        if (fetchStatus === statusCode.failed) {
            return (
                <div className="loader-container" data-testid="loader">
                    <Img width="500px" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" />
                </div>
            )
        } else {
            return (<ItemContainer className="card_container card_trending_container">
                {videos.map(v => <Item key={v.id} className="trending_card">
                    <Img width="300px" src={v.thumbnailUrl} alt={v.title} />
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
                            <Container className="trending_heading_container" bg={value.theme ? "black" : "#d7dfe9"}>
                                <Container className="trending_heading_icon" bg={value.theme ? "#231f20" : "#cbd5e1"}><AiFillFire size={24} /></Container>
                                <Heading color={value.theme ? "white" : "black"}>Trending</Heading>
                            </Container>
                            <Container className="page_container">
                                {fetchStatus === statusCode.pending ? <div className="loader-container" data-testid="loader">
                                    <Loader type="ThreeDots" color={value.theme ? "#ffffff" : "black"} height="50" width="50" />
                                </div> : this.onSuccess(value.theme)}
                            </Container>
                        </Container>
                    )
                }}
            </Store.Consumer>
        )
    }
}

export default Trending