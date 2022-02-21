import React from 'react';

export default function AboutHeader(props) {
    return (
        <div class="about-header">
            <img src={props.about.profile}/>
            <div class="about-header-description">
                <h2>ABOUT</h2>
                <p>{props.about.description}</p>
            </div>
        </div>
    );
}