//import liraries
import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Dimensions,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import Projects from '../../components/header/Projects'
import { connect } from 'react-redux'
import { initProcessGetProjectsMeMilestones } from '../../store/modules/projects/actions'
import CardTimeline from '../../components/timeline/CardTimeline'
//window.navigator.userAgent = 'react-native';

class Timeline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            select: false,
        }
    }

    render() {
        return (
            <ScrollView scrollEnabled={!this.state.select}>
                <View style={styles.container}>
                    <Projects />
                    {!this.props.loading &&
                        this.props.milestones.map((currentValue, index) => {
                            return (
                                <CardTimeline
                                    key={index}
                                    data={currentValue}
                                    user={this.props.user}
                                    select={this.state.select}
                                    onPress={press =>
                                        this.setState({
                                            select: !this.state.select,
                                        })
                                    }
                                />
                            )
                        })}
                </View>
            </ScrollView>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        padding: 0,
        backgroundColor: '#FFFFFF',
    },
    containerTimeline: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    containerTimelineItem: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        borderRadius: 10,
        height: Dimensions.get('window').height - 250,
    },
})

const mapStateToProps = state => {
    return {
        loading: state.projects.loadingMilestone,
        milestones: state.projects.milestones,
        project: state.projects.project,
        user: state.login.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProcessProjectsMilestones: () =>
            dispatch(initProcessGetProjectsMeMilestones()),
    }
}

//make this component available to the app
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline)
