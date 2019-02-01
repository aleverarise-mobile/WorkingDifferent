//import liraries
import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { FormInput, FormValidationMessage } from 'react-native-elements'
import validate from '../../../tools/validate'
import * as Animatable from 'react-native-animatable'
import { initProcessLogin } from '../../../store/modules/auth/login/actions'
import Loading from '../../../components/Loading'
import { Snackbar } from 'react-native-paper'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            emailError: [],
            emailShake: false,
            password: '',
            passwordError: [],
            passwordShake: false,
            visibleSnackbar: true,
        }
    }

    onSubmit() {
        let tempEmail = validate('email', this.state.email)
        if (tempEmail) {
            this.setState({ emailError: tempEmail.email, emailShake: true })
        } else {
            this.setState({ emailError: [], passwordShake: true })
            let temp = validate('password', this.state.password)
            if (temp) {
                this.setState({
                    passwordError: temp.password,
                    passwordShake: true,
                })
            } else {
                this.setState({ passwordError: [], passwordShake: true })
                this.props.onProcessLogin(this.state.email, this.state.password)
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.loading && <Loading />}

                {this.props.error && (
                    <Snackbar
                        visible={this.state.visibleSnackbar}
                        onDismiss={() =>
                            this.setState({ visibleSnackbar: false })
                        }
                        duration={1500}
                    >
                        {this.props.message}
                    </Snackbar>
                )}

                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                />

                <FormInput
                    placeholder="Username"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    autoFocus={true}
                    shake={this.state.emailShake}
                    keyboardType="email-address"
                    value={this.state.email}
                    onEndEditing={() => {
                        let temp = validate('email', this.state.email)
                        if (temp) {
                            this.setState({
                                emailError: temp.email,
                                emailShake: true,
                            })
                        } else {
                            this.setState({ emailError: [], emailShake: true })
                        }
                    }}
                    onChangeText={text => this.setState({ email: text })}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                        this.secondTextInput.focus()
                    }}
                    blurOnSubmit={false}
                    inputStyle={styles.inputForm}
                />
                {this.state.emailError.map((currentValue, index) => {
                    return (
                        <FormValidationMessage key={'email ' + index}>
                            {currentValue}
                        </FormValidationMessage>
                    )
                })}

                <FormInput
                    placeholder="Password"
                    autoCapitalize="none"
                    placeholderTextColor="black"
                    value={this.state.password}
                    secureTextEntry={true}
                    blurOnSubmit={true}
                    onChangeText={text => this.setState({ password: text })}
                    ref={input => {
                        this.secondTextInput = input
                    }}
                    onSubmitEditing={() => this.onSubmit()}
                    inputStyle={styles.inputForm}
                />
                {this.state.passwordError.map((currentValue, index) => {
                    return (
                        <FormValidationMessage key={'password ' + index}>
                            {currentValue}
                        </FormValidationMessage>
                    )
                })}

                <Animatable.View
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                >
                    <View
                        style={{
                            marginTop: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TouchableHighlight
                            underlayColor="transparent"
                            onPress={() => this.onSubmit()}
                        >
                            <Image
                                source={require('../../../assets/newbotton.png')}
                                style={{ width: 80, height: 80 }}
                            />
                        </TouchableHighlight>
                    </View>
                </Animatable.View>
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    logo: {
        marginBottom: 10,
        width: 250,
        height: 100,
    },
    inputForm: {
        textAlign: 'center',
        fontSize: 25,
        color: 'black',
        fontFamily: 'HelveticaNeue',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginTop: 10,
        marginBottom: 10,
    },
})

//make this component available to the app

const mapStateToProps = state => {
    return {
        loading: state.login.loading,
        message: state.login.message,
        error: state.login.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProcessLogin: (email, password) =>
            dispatch(initProcessLogin(email, password)),
    }
}

//make this component available to the app
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
