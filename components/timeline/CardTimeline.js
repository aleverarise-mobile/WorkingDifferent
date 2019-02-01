//import liraries
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    TouchableHighlight,
    Alert,
    Modal,
} from 'react-native'

import { Col, Row, Grid } from 'react-native-easy-grid'
import SvgUri from 'react-native-svg-uri'
import { Icon } from 'react-native-elements'
import TaskItem from './taks/TaskItem'
import { WebViewQuillViewer } from 'react-native-webview-quilljs'
import { Video } from 'expo'
import Carousel from 'react-native-snap-carousel'

const URL_TASK = 'https://workingdifferent.com/API/task/mile'

// create a component
class CardTimeline extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: '',
            color: '#16a085',
            loading: false,
            task: [],
            modalVisible: false,
            stories: '',
            videoRef: '',
        }
    }

    getTaskForState() {
        fetch(URL_TASK + '/' + this.props.data._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: this.props.user.token,
            },
        })
            .then(resp => resp.json())
            .then(resp => {
                this.setState({ task: resp, loading: false })
            })
            .catch(error => {
                console.log(error)
            })
    }

    setModalVisible(visible, stories) {
        this.setState({ modalVisible: visible, stories })
    }

    _renderItem({ item, index }) {
        return (
            <View
                style={{
                    height: Dimensions.get('window').height,
                }}
            >
                <Video
                    source={{
                        uri: item.title,
                    }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    isLooping
                    useNativeControls={true}
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height - 20,
                    }}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.containerTimelineItem}>
                <Grid>
                    {/* TITLE */}
                    <Row size={10}>
                        <Icon
                            raised
                            name={this.props.select ? 'cancel' : 'check-circle'}
                            color="#FFFFFF"
                            containerStyle={{
                                backgroundColor: this.props.select
                                    ? '#c0392b'
                                    : '#16a085',
                            }}
                            size={15}
                            onPress={() =>
                                this.props.onPress(this.props.data._id)
                            }
                        />
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={{
                                fontSize: 30,
                                fontFamily: 'HelveticaNeue',
                                fontStyle: 'normal',
                                paddingLeft: 30,
                                paddingRight: 30,
                                fontWeight: '300',
                            }}
                        >
                            {this.props.data.name}
                        </Text>
                    </Row>

                    {/* DESCRIPTION */}
                    <Row size={20}>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            style={{ height: 200 }}
                            scrollEnabled={true}
                        >
                            {/* <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'HelveticaNeue',
                                    fontStyle: 'normal',
                                    padding: 15,
                                    fontWeight: '300',
                                }}
                            >
                                Descripcion
                            </Text> */}
                            <WebViewQuillViewer
                                ref={component =>
                                    (this.webViewQuillViewer = component)
                                }
                                contentToDisplay={this.props.data.description}
                            />
                        </ScrollView>
                    </Row>

                    {/* TASKS */}
                    <Row size={5} style={{ marginTop: 15 }}>
                        <Col>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: 'HelveticaNeue',
                                    fontStyle: 'normal',
                                    paddingLeft: 15,
                                    fontWeight: '300',
                                }}
                            >
                                TASKS
                            </Text>
                        </Col>
                        <Col
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            {this.props.data.skills.map((element, key) => {
                                return (
                                    <SvgUri
                                        width="25"
                                        height="25"
                                        key={key}
                                        style={{ marginRight: 10 }}
                                        source={{ uri: element.url }}
                                    />
                                )
                            })}
                        </Col>
                    </Row>

                    {/* STATE TASKS */}
                    <Row size={5} style={{ marginTop: 15 }}>
                        {/* RECRUITING */}
                        <Col>
                            <Icon
                                name="group-work"
                                size={30}
                                color={
                                    this.state.selected == 'recruiting'
                                        ? '#3498db'
                                        : '#b3b3b3'
                                }
                                onPress={() =>
                                    this.setState(
                                        {
                                            selected: 'recruiting',
                                            color: '#3498db',
                                            loading: true,
                                        },
                                        () => {
                                            this.getTaskForState()
                                        }
                                    )
                                }
                            />
                        </Col>

                        {/* IN PROGRESS */}
                        <Col>
                            <Icon
                                name="wrench"
                                type="material-community"
                                size={30}
                                color={
                                    this.state.selected == 'inprogress'
                                        ? '#f39c12'
                                        : '#b3b3b3'
                                }
                                onPress={() =>
                                    this.setState(
                                        {
                                            selected: 'inprogress',
                                            color: '#f39c12',
                                            loading: true,
                                        },
                                        () => {
                                            this.getTaskForState()
                                        }
                                    )
                                }
                            />
                        </Col>

                        {/* WITH ISSUES */}
                        <Col>
                            <Icon
                                name="warning"
                                size={30}
                                color={
                                    this.state.selected == 'withissues'
                                        ? '#e74c3c'
                                        : '#b3b3b3'
                                }
                                onPress={() =>
                                    this.setState(
                                        {
                                            selected: 'withissues',
                                            color: '#e74c3c',
                                            loading: true,
                                        },
                                        () => {
                                            this.getTaskForState()
                                        }
                                    )
                                }
                            />
                        </Col>

                        {/* REVIEWING */}
                        <Col>
                            <Icon
                                name="search"
                                size={30}
                                color={
                                    this.state.selected == 'reviewing'
                                        ? '#f1c40f'
                                        : '#b3b3b3'
                                }
                                onPress={() =>
                                    this.setState(
                                        {
                                            selected: 'reviewing',
                                            color: '#f1c40f',
                                            loading: true,
                                        },
                                        () => {
                                            this.getTaskForState()
                                        }
                                    )
                                }
                            />
                        </Col>

                        {/* COMPLETED */}
                        <Col>
                            <Icon
                                name="check-circle"
                                size={30}
                                color={
                                    this.state.selected == 'Completed'
                                        ? '#1abc9c'
                                        : '#b3b3b3'
                                }
                                onPress={() =>
                                    this.setState(
                                        {
                                            selected: 'Completed',
                                            color: '#1abc9c',
                                            loading: true,
                                        },
                                        () => {
                                            this.getTaskForState()
                                        }
                                    )
                                }
                            />
                        </Col>
                    </Row>

                    {/* LIST TASKS */}
                    <Row size={35} style={{ marginTop: 10 }}>
                        {this.state.loading && (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                            >
                                <ActivityIndicator
                                    size="large"
                                    color={this.state.color}
                                />
                            </View>
                        )}
                        {!this.state.loading && (
                            <View style={{ flex: 1 }}>
                                <ScrollView
                                    contentContainerStyle={{ flexGrow: 1 }}
                                >
                                    {this.state.task.map((element, key) => {
                                        if (
                                            element.state == this.state.selected
                                        ) {
                                            return (
                                                <TaskItem
                                                    data={element}
                                                    key={key}
                                                    color={this.state.color}
                                                />
                                            )
                                        }
                                    })}
                                </ScrollView>
                            </View>
                        )}
                    </Row>

                    {/* STORIES */}
                    <Row size={5} style={{ marginTop: 10 }}>
                        <Col>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: 'HelveticaNeue',
                                    fontStyle: 'normal',
                                    paddingLeft: 15,
                                    fontWeight: '300',
                                }}
                            >
                                STORIES
                            </Text>
                        </Col>
                    </Row>

                    {/* LIST STORIES */}
                    <Row size={20} style={{ marginTop: 10 }}>
                        <Col
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            {this.props.data.skills.map((element, key) => {
                                return (
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setModalVisible(
                                                true,
                                                'https://d1luih2pro3fja.cloudfront.net/stories/1431fc94-eeba-4d9d-960f-5c27b2924910'
                                            )
                                        }}
                                        underlayColor="transparent"
                                        key={key}
                                        style={{
                                            marginTop: 15,
                                            marginLeft: 15,
                                            marginBottom: 15
                                        }}
                                    >
                                        <SvgUri
                                            width="35"
                                            height="35"
                                            source={{ uri: element.url }}
                                        />
                                    </TouchableHighlight>
                                )
                            })}
                        </Col>
                    </Row>

                    <Modal
                        animationType="fade"
                        transparent={false}
                        presentationStyle="fullScreen"
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible)
                        }}
                    >
                        <View style={styles.styleModal}>
                            <View>
                                <Carousel
                                    ref={c => {
                                        this._carousel = c
                                    }}
                                    data={[
                                        {
                                            title:
                                                'https://d1luih2pro3fja.cloudfront.net/stories/1431fc94-eeba-4d9d-960f-5c27b2924910',
                                        },
                                        {
                                            title:
                                                'https://d1luih2pro3fja.cloudfront.net/stories/1431fc94-eeba-4d9d-960f-5c27b2924910',
                                        },
                                        {
                                            title:
                                                'https://d1luih2pro3fja.cloudfront.net/stories/1431fc94-eeba-4d9d-960f-5c27b2924910',
                                        },
                                    ]}
                                    renderItem={this._renderItem}
                                    sliderWidth={Dimensions.get('window').width}
                                    itemWidth={Dimensions.get('window').width}
                                />
                            </View>
                        </View>
                    </Modal>
                </Grid>
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    containerTimelineItem: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        borderRadius: 10,
        marginBottom: 30,
    },
    styleModal: {
        backgroundColor: '#000000',
        flex: 1,
    },
})

//make this component available to the app
export default CardTimeline
