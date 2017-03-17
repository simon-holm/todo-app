import React, {Component} from 'react';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">ToDo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <AccountsUIWrapper />
                        <li>
                            <a href="#">Made by Simon Holm</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}