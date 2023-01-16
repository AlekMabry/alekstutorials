import React from 'react';

import ProjectThumbnail from '../ProjectThumbnail/ProjectThumbnail';

export default function ProjectsGallery(props) {
    const services = props.services.map((service) =>
            <ProjectThumbnail project={service}/>
        );

    const projects = props.projects.map((project) =>
            <ProjectThumbnail project={project}/>
        );

    return (
        <div class="project-gallery">
            {services}
            {projects}
        </div>
    );
}