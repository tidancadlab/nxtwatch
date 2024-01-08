import { Component } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns'
import { BsDot } from "react-icons/bs";
import { AiFillFire } from "react-icons/ai";
import { Container, Heading, Img, Item, ItemContainer, Text } from "../../style_component";
import Store from "../../store.js";
import './index.css'

class SavedVideos extends Component {

    render() {
        return (
            <Store.Consumer>
                {value => {
                    const { theme, savedVideoList } = value
                    return (
                        <Container style={{ flexGrow: 1, alignSelf: "stretch" }} data-testid="savedVideos" bg={!theme ? "#f9f9f9" : "#0f0f0f"}>
                            {savedVideoList.length <= 0 ?
                                <Container style={{ alignSelf: "stretch" }} className="noData" gap='16px'>
                                    <Img width="400px" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" alt="no saved videos" />
                                    <Heading color={theme ? "white" : "black"}>No saved video found</Heading>
                                    <Text>You can save your video while watching them</Text>
                                </Container> :
                                <Container className="page">
                                    <Container className="trending_heading_container" bg={theme ? "black" : "#d7dfe9"} data-testid="banner">
                                        <Container className="trending_heading_icon" bg={theme ? "#231f20" : "#cbd5e1"}><AiFillFire size={24} /></Container>
                                        <Heading color={theme ? "white" : "black"}>Saved Videos</Heading>
                                    </Container>
                                    <Container className="page_container">
                                        <ItemContainer className="card_container card_trending_container">
                                            {savedVideoList.map(v => <Item key={v.id} className="trending_card">
                                                <Link to={`/videos/${v.id}`}>
                                                    <Img style={{ maxWidth: "unset", maxWidth: 300 }} className="w-full" src={v.thumbnailUrl} alt="channel logo" />
                                                </Link>
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
                            }
                        </Container>
                    )
                }}
            </Store.Consumer>
        )
    }
}

export default SavedVideos