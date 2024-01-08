import { Component } from "react";
import Cookies from "js-cookie";
import { Button, Container, Heading, Img, Item, ItemContainer, Text } from "../../style_component";
import Store from "../../store.js";
import './index.css'
import { SiYoutubegaming } from "react-icons/si";
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
    state = { isError: statusCode.error, errorMsg: '', fetchStatus: statusCode.initial, videos: [] }

    componentDidMount() {
        this.onGetVideos()
    }

    onGetVideos = async (e) => {
        this.setState({ fetchStatus: statusCode.pending, isError: statusCode.error, errorMsg: '' })

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

                const videoList = (data) => ({
                    "id": data.id,
                    "title": data.title,
                    "thumbnailUrl": data.thumbnail_url,
                    "viewCount": data.view_count,
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

    onSuccess = ({ theme }) => {
        const { fetchStatus, videos } = this.state

        if (fetchStatus === statusCode.pending) {
            return (
                <div className="loader-container" data-testid="loader">
                    <Loader type="ThreeDots" color={theme ? "#ffffff" : "black"} height="50" width="50" />
                </div>
            )
        } else {
            return (<ItemContainer className="card_container">
                {videos.map(v => <Item key={v.id} className="card">
                    <Img width="300px" src={v.thumbnailUrl} alt="channel logo" />
                    <Container className="trending_details">
                        <Text className="title">{v.title}</Text>
                        <Container className="view_container" >
                            <Text color={theme ? "#606060" : "gray"}>{v.viewCount} views</Text>
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
                        fetchStatus === statusCode.failed ? (<Container className="noData" gap='16px'>
                            <Img width="300px" src={value.theme ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" :
                                "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"} alt="failure view" />
                            <Heading color={value.theme ? "white" : "black"}>Oops! Something Went Wrong</Heading>
                            <Text>We have some trouble to complete your request. please try again.</Text>
                            <Button className="btn search_btn" bg='#4f46e5' color="white" position="center" onClick={this.onGetVideos}>Retry</Button>
                        </Container>) : (<Container className="page" bg={!value.theme ? "#f9f9f9" : "#0f0f0f"} data-testid="gaming">
                            <Container className="trending_heading_container" bg={value.theme ? "black" : "#d7dfe9"} data-testid="banner">
                                <Container className="trending_heading_icon" bg={value.theme ? "#231f20" : "#cbd5e1"}><SiYoutubegaming size={24} /></Container>
                                <Heading color={value.theme ? "white" : "black"}>Gaming</Heading>
                            </Container>
                            <Container className="page_container">{this.onSuccess(value)}</Container>
                        </Container>)
                    )
                }}
            </Store.Consumer>
        )
    }
}

export default Trending