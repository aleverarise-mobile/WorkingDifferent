//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

// create a component
class Loading extends Component {
    render() {
        return (
            <Modal
                transparent={true}
                animationType={'fade'}
                visible={this.props.loading}
                onRequestClose={() => { console.log('close modal') }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={this.props.loading} />
                    </View>
                </View>
            </Modal>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

//make this component available to the app
const mapStateToProps = state => {
    console.log(state)
    return {
        loading: state.login.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

//make this component available to the app
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading);