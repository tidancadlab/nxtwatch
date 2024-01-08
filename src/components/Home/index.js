import { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import { formatDistanceToNow } from 'date-fns'
import { BsDot, BsSearch } from "react-icons/bs";
import { Button, Container, Heading, Img, Item, ItemContainer, SearchField, SearchInput, Text } from "../../style_component";
import Store from "../../store.js";
import { FailView, Loading, Banner } from "../Components.js";

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

class Home extends Component {
    state = { fetchStatus: statusCode.initial, videos: [], searchText: '' }

    componentDidMount() {
        this.onGetVideos()
    }

    onGetVideos = async () => {
        const { searchText } = this.state
        this.setState({ fetchStatus: statusCode.pending })

        try {
            const jwtToken = Cookies.get("jwt_token")
            const url = `https://apis.ccbp.in/videos/all?search=${searchText}`
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
                this.setState({ fetchStatus: statusCode.failed })
            }
        } catch (error) {
            this.setState({ fetchStatus: statusCode.failed })
        }
    }

    onSearchInput = e => {
        this.setState({ searchText: e.target.value })
    }

    onSuccess = ({ theme }) => {
        const { fetchStatus, videos } = this.state

        if (fetchStatus === statusCode.failed) {
            return (
                <FailView onGetVideos={this.onGetVideos} />
            )
        } else {
            return (
                videos.length <= 0 ?
                    <Container className="noData" gap='16px'>
                        <Img width="300px" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" alt="not found" />
                        <Heading color={theme ? "white" : "black"}>No Search result found</Heading>
                        <Text>Try different key words or remove search filter</Text>
                        <Button className="btn search_btn" bg='#4f46e5' color="white" position="center" onClick={() => {
                            this.onGetVideos()
                        }}>Retry</Button>
                    </Container> : <ItemContainer className="card_container">
                        {videos.map(v => <Item key={v.id} className="card">
                            <Link to={`/videos/` + v.id} >
                                <Img width="100%" src={v.thumbnailUrl} alt="video thumbnail" />
                            </Link>
                            <Container className="card_details">
                                <Img className="avatar" width="24px" src={v.channel.profileImageUrl} alt="channel logo" />
                                <Container className="details_container">
                                    <Text>{v.title}</Text>
                                    <Text color={theme ? "#606060" : "gray"}>{v.channel.name}</Text>
                                    <Container className="view_container" >
                                        <Text color={theme ? "#606060" : "gray"}>{v.viewCount}</Text>
                                        <BsDot color={theme ? "#606060" : "gray"} />
                                        <Text color={theme ? "#606060" : "gray"}>{formatDistanceToNow(new Date(v.publishedAt))}</Text>
                                    </Container>
                                </Container>
                            </Container>
                        </Item>)}
                    </ItemContainer>
            )
        }
    }

    render() {
        const { fetchStatus, searchText } = this.state
        return (
            <Store.Consumer>
                {value => {
                    return (
                        <Container className="page" bg={!value.theme ? "#f9f9f9" : "#181818"} data-testid="home">
                            {value.isBannerShow && <Banner onBannerClose={value.onBannerClose} />}
                            <Container className="page_container">
                                <SearchField borderColor={value.theme ? "#909090" : "#cccccc"}>
                                    <SearchInput type="search" color={value.theme ? "white" : "black"} onChange={this.onSearchInput} placeholder="Search" value={searchText} />
                                    <Button
                                        onClick={this.onGetVideos}
                                        className="btn search_btn"
                                        bg={!value.theme ? "#f4f4f4" : "#231f20"}
                                        color={value.theme ? "#f9f9f9" : "#181818"}
                                        data-testid="searchButton"
                                    >
                                        <BsSearch />
                                    </Button>
                                </SearchField>
                                {fetchStatus === statusCode.pending ? <Loading /> : this.onSuccess(value)}
                            </Container>
                        </Container>
                    )
                }}
            </Store.Consumer>
        )
    }
}

export default Home