import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'

Banner.propTypes = {
    title: PropTypes.string,
    backgroundUrl: PropTypes.string,
};

Banner.defaultProps = {
    title: '',
    backgroundUrl : ''
}

function Banner(props) {
    const { title, backgroundUrl } = props;

    const backgroundImage = backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {};
    return (
        <section className="banner" style={backgroundImage}>
            <h1 className="banner__title">{title}</h1>
        </section>
    );
}

export default Banner;