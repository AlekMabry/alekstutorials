import React from 'react';
import { Link } from 'gatsby';

export default function AboutHeader(props) {
    return (
        <div class="about-header">
            <img src={props.about.pfp} alt='Profile picture'/>
            <div class="about-header-description">
                <h2>ABOUT</h2>
                <p>{props.about.about}</p>
            </div>
        </div>
    );
}