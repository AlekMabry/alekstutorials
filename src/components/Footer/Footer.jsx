import React from 'react';

import IconLinkedIn from "./icon-linkedin.png";
import IconUpwork from './icon-upwork.png';

export default function Footer(props) {
    return (
        <div class="footer-container">
            <footer>
                <div class="footer-sections">
                    <div class="footer-section">
                        <h2>Cool Stuff</h2>
                    </div>
                    <div class="footer-section">
                        <h2>Services</h2>
                        <ul>
                            <a>Web Development</a>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h2>Contact</h2>
                        <ul>
                            <li><a><img src={IconLinkedIn}/> LinkedIn</a></li>
                            <li><a><img src={IconUpwork}/> Upwork</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-legal">
                    <a>Privacy Policy</a>
                    <p>&nbsp;| Copyright &copy; {new Date().getFullYear()} {props.meta.author}</p>
                </div>
            </footer>
        </div>
    );
}