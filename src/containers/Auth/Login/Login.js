import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Login.module.css';
import { Redirect } from 'react-router-dom';
import logo from '../../../assets/images/logo-without-text.png';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import { authAxios } from '../../../utils/api';

class Login extends Component {
    componentDidMount() {
        localStorage.clear();
    }
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'USERNAME'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'PASSWORD'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }


        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        let formIsValid = true;
        for (let inputIdentifier in this.state.controls) {
            formIsValid = this.state.controls[inputIdentifier].valid && formIsValid;
        }
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls, formIsValid: formIsValid });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.username.value, this.state.controls.password.value);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p className={classes.Error}>{this.props.error}</p>
            );


        }


        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (

            <div className={classes.Auth}>
                <img className={classes.Image} src={logo} alt="vectorImage" />
                <h1 className={classes.Heading}>Sign In</h1>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <br />
                    <Button btnType="Danger" width="90%" disabled={!this.state.formIsValid}>SUBMIT</Button>
                </form>
            </div>
        );
    }

}

const mapStateToProps = state => {

    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Login, authAxios));