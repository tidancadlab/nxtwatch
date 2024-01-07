import { Component } from "react";
import Cookies from 'js-cookie'
import { Main, Container, Form, Field, Label, Img, Input, Button, Text } from '../../style_component'
import Store from "../../store";
import './index.css'

const statusCode = {
    initial: "INITIAL",
    pending: "PENDING",
    success: "SUCCESS",
    failed: "FAILED",
    error: false,
    rejected: "REJECTED"
}

class Login extends Component {
    state = { isError: statusCode.error, errorMsg: '', fetchStatus: statusCode.initial, form: { username: '', password: '' }, showPassword: false }

    onLogin = async (e) => {
        e.preventDefault()
        const { history } = this.props
        const { form } = this.state
        this.setState({ fetchStatus: statusCode.initial, isError: statusCode.error, errorMsg: '' })

        try {
            const response = await fetch(`https://apis.ccbp.in/login`, {
                method: 'POST',
                body: JSON.stringify(form)
            })
            if (response.ok) {
                const { jwt_token } = await response.json()
                Cookies.set("jwt_token", jwt_token, { expires: 7 })
                history.replace('/')
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

    onInput = e => {
        this.setState(previous => ({ form: { ...previous.form, [e.target.id]: e.target.value } }))
    }

    onPasswordShow = () => {
        this.setState(previous => ({ showPassword: !previous.showPassword }))
    }

    render() {
        const { isError, errorMsg, showPassword, form } = this.state

        return (
            <Store.Consumer>
                {value => {
                    const { theme } = value
                    return (
                        <Main className="main" dark={theme} >
                            <Container>
                                <Form className="" dark={theme} onSubmit={this.onLogin} >
                                    <Img className="logo" width="30%" src={theme ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"} alt="" />
                                    <Field>
                                        <Label htmlFor="username">USERNAME</Label>
                                        <Input type="text" id="username" dark={theme} onChange={this.onInput} value={form.username} />
                                    </Field>
                                    <Field>
                                        <Label htmlFor="password">PASSWORD</Label>
                                        <Input type={showPassword ? "text" : "password"} id="password" dark={theme} onChange={this.onInput} value={form.password} />
                                    </Field>
                                    <Field row>
                                        <Input type="checkbox" id="showPassword" checked={showPassword} onClick={this.onPasswordShow} readOnly />
                                        <Label htmlFor="showPassword">Show Password</Label>
                                    </Field>
                                    <Button position="stretch" className="btn" bg="#3b82f6" color="white" type="submit">Login</Button>
                                    {isError && <Text className="error_text">*{errorMsg}</Text>}
                                </Form>
                            </Container>
                        </Main>)
                }}
            </Store.Consumer>
        )
    }
}
export default Login