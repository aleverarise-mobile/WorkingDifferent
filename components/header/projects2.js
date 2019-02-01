//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import { initProcessGetProjectsMe, initProcessSetProjectSelected } from '../../store/modules/projects/actions';
import NewProject from '../NewProject';
import { initProcessGetUsersChatProjects, initProcessClearUsersChat } from '../../store/modules/chat/actions';

// create a component
class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0
        }
    }

    componentWillMount() {
        this.props.onProcessProjects()
    }

    updateIndex = (index) => {
        this.setState({ index })
        this.props.onSelectedProjects(this.props.projects[index - 1], index - 1, index)
        if (index >= 1) {
            this.props.onProcessGetUsersChatProjects()
        }else{
            this.props.onProcessClearChat()
        }
    }

    render() {
        let tempProjects = [{ element: NewProject }]
        this.props.projects.map(currentValue => {
            tempProjects.push(currentValue.name);
        })

        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    scrollEventThrottle={16}>
                    <View style={styles.contentContainer}>
                        {
                            this.props.loading &&
                            <ActivityIndicator size="large" color="#16a085" />
                        }

                        {
                            !this.props.loading &&
                            <ButtonGroup
                                buttons={tempProjects}
                                onPress={this.updateIndex}
                                // style global
                                innerBorderStyle={{ width: 0, color: 'white' }}
                                containerStyle={styles.BGHcontainerStyle}
                                textStyle={styles.BGHtextStyle}
                                buttonStyle={styles.BGHbuttonsGroups}
                                // selected
                                selectedIndex={this.props.project.key}
                                selectedButtonStyle={(this.props.project.key === 0) ? styles.BGHselectedButtonStyleNew : styles.BGHselectedButtonStyle}
                                selectedTextStyle={styles.BGHselectecTextStyle} />
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 70,
        marginBottom: 10
    },
    // BUTTONS HEADER
    contentContainer: {
        height: 80
    },
    BGHcontainerStyle: {
        height: 50,
        borderWidth: 0,
        backgroundColor: 'white'
    },
    BGHtextStyle: {
        color: 'black'
    },
    BGHbuttonsGroups: {
        height: 50,
        width: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        marginRight: 10,
        marginLeft: 10,
        borderRightWidth: 0,
    },
    BGHselectedButtonStyle: {
        backgroundColor: '#16a085'
    },
    BGHselectedButtonStyleNew: {
        backgroundColor: '#FFFFFF'
    },
    BGHselectecTextStyle: {
        color: 'white'
    }
});

const mapStateToProps = state => {
    return {
        user: state.login.user,
        loading: state.projects.loading,
        projects: state.projects.projects,
        project: state.projects.project,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onProcessProjects: () => dispatch(initProcessGetProjectsMe()),
        onSelectedProjects: (project, index, key) => dispatch(initProcessSetProjectSelected(project, index, key)),
        onProcessGetUsersChatProjects: () => dispatch(initProcessGetUsersChatProjects()),
        onProcessClearChat: () => dispatch(initProcessClearUsersChat()),
    };
};

//make this component available to the app
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Projects);