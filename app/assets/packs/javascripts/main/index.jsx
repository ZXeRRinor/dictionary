import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Navbar from './navbar';
import Forum from './forum/forum';
import Dictionary from "./dictionary/dictionary";
import {Col, Row} from 'antd';
import AddNewWord from "./new_word/new_word";
import LoginModal from "./modals/login_modal";
import RegisterModal from "./modals/register_modal";

const initialState = {curr_user: null, navbar_state: 'collapsed', register_modal_visibility: false, login_modal_visibility: false};
let mainReducer = (store = initialState, action) => {
    let type = action.type;
    let payload = action.payload;
    switch (type) {
        case ('set_curr_user'): {
            return ({
                ...store,
                curr_user: payload
            });
        }
        case ('set_navbar_state'): {
            return ({
                ...store,
                navbar_state: payload
            });
        }
        case ('set_register_modal_visibility'): {
            return ({
                ...store,
                register_modal_visibility: payload
            });
        }
        case ('set_login_modal_visibility'): {
            return ({
                ...store,
                login_modal_visibility: payload
            });
        }

    }
    return store;
};

let store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.navbarSizeToState();
        store.subscribe(this.navbarSizeToState);
    }

    navbarSizeToState = () => {
        this.setState({navbar_size: store.getState().navbar_state === 'collapsed' ? 2 : 4});
    };

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Row>
                            <Col span={this.state.navbar_size}>
                                <Route component={Navbar}/>
                                <Route component={LoginModal}/>
                                <Route component={RegisterModal}/>
                            </Col>
                            <Col span={24 - this.state.navbar_size}>
                                <Route path="/dictionary" component={Dictionary}/>
                                <Route path="/discussion/:discussion_id" component={Forum}/>
                                <Route path="/add_new_word/" component={AddNewWord}/>
                            </Col>
                        </Row>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default Index;