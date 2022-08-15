import React from 'react';

export default function TutorialItem(props) {
    const tags = props.tutorial.frontmatter.tags.map(tag => 
        <a href="">{tag}</a>
        );
    return (
        <div class="tutorial-item">
        <div class="tutorial-item-top-container"></div>
        <div class="tutorial-item-bottom-container"></div>
        <div class="tutorial-image">
            <img src={props.tutorial.frontmatter.thumb} alt=''/>
        </div>
        <div class="tutorial-description">
            <div class="tutorial-description-text">
                <a href="localhost"><h2>{props.tutorial.frontmatter.title}</h2></a>
                <p>{props.tutorial.frontmatter.description}</p>
            </div>
            <div class="tutorial-tags">{tags}</div>
        </div>
        </div>
    );
}