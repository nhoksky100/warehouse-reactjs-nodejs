import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { NavLink, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { setCookie } from '../setCookie';

const getdataAccount = () => axios.get('/getAccount').then((res) => res.data)

class LoginCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataAccount: null,
            username: '',
            password: '',
            isDisabled: false,
            isShowHidePassword: false,
        };
        this.timer = null;
        this._isMounted = false
    }

    isChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.getData();
    }

    handleKeyDown = (e) => {
        const isEnglishOrNumberOrSpecial = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]*$/.test(e.key);
        if (!isEnglishOrNumberOrSpecial) {
            e.preventDefault();
        }
        if (e.keyCode === 13) {
            this.handleClickLogin();
        }
    }

    handleKeyDownUser = (e) => {
        if (e.keyCode === 13) {
            this.handleClickLogin();
        }
    }

    getData = () => {
        getdataAccount()
            .then((res) => {
                if (this._isMounted) {
                    this.setState({ dataAccount: Array.isArray(res) ? res : [] });
                }
            })
            .catch((error) => {
                if (this._isMounted) {
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" /><i>Lỗi {error} !</i></div>);
                }
            });
    }

    handleClickLogin = () => {
        const { dataAccount, username, password } = this.state;
        let flagLogin = false;
        if (this.state.isDisabled) {
            return;
        }

        this.setState({ isDisabled: true });

        if (Array.isArray(dataAccount)) {
            const promises = dataAccount.map((value) => {
                if ((username === value.accountUserName || username === value.accountEmail) && value.accountStatus === 'Đang sử dụng') {
                    let dataLogin = value;
                    return axios.post('/login_Account', { dataLogin, username, password })
                        .then((res) => {
                            if (res.data.isLogin) {
                                flagLogin = true;
                                delete dataLogin.accountPassword;
                                dataLogin.accountPermission = res.data.hashPermission;
                                setCookie('loginObject', dataLogin, 1140);
                                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" /><i>Đăng nhập thành công!</i></div>);
                            }
                        })
                        .catch((error) => {
                            console.error('Error during login:', error);
                        });
                }
                return Promise.resolve();
            });

            Promise.all(promises)
                .then(() => {
                    if (!flagLogin) {
                        toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" /><i>Tên tài khoản /email hoặc mật khẩu không đúng!</i></div>);
                    }
                    setTimeout(() => {
                        this.setState({
                            isDisabled: false,
                            username: '',
                            password: ''
                        });
                    }, 1500);
                });
        } else {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" /><i>Không có dữ liệu tài khoản.</i></div>);
            this.setState({ isDisabled: false });
        }
    }

    isShowForm = () => {
        const { dataAccount } = this.state;
        return (
            <Fragment>
                <div className="container-login100">
                    <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                        <span className="login100-form-title p-b-53">Đăng Nhập</span>
                        <div className="p-t-31 p-b-9">
                            <span className="txt1">Tên tài khoản / Email</span>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Username is required">
                            <input onKeyDown={this.handleKeyDownUser} onChange={(e) => this.isChange(e)} className="input100" type="text" value={this.state.username} name="username" />
                            <span className="focus-input100" />
                        </div>
                        <div className="p-t-13 p-b-9">
                            <span className="txt1">Mật khẩu</span>
                            <NavLink to="/login/password-retrieval" className="txt2 bo1 m-l-5">Quên?</NavLink>
                        </div>
                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input onChange={(e) => this.isChange(e)} onKeyDown={this.handleKeyDown} value={this.state.password} className="input100" type={this.state.isShowHidePassword ? "text" : "password"} name="password" />
                            <span className="focus-input100" />
                            <i onClick={() => this.setState({ isShowHidePassword: !this.state.isShowHidePassword })} style={{ position: 'absolute', right: '0', top: '0', fontSize: '25px', cursor: 'pointer' }} className={this.state.isShowHidePassword ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true"></i>
                        </div>
                        <div className="container-login100-form-btn m-t-17">
                            <button disabled={this.state.isDisabled} onClick={() => this.handleClickLogin()} className="login100-form-btn">Đăng Nhập</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

    render() {
        try {
            const cookies = new Cookies();
            const loginCustomerToken = cookies.get('loginObject');
            if (!loginCustomerToken) {
                return (
                    <div className="limiter">
                        {this.isShowForm()}
                    </div>
                );
            } else {
                return <Navigate to='/' />;
            }
        } catch (error) {
            return <div><p>Đã xảy ra lỗi khi xử lý dữ liệu.</p></div>;
        }
    }
}

export default LoginCustomer;
