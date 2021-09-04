import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './RandomPhoto.scss'

RandomPhoto.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onImageUrlChange: PropTypes.func,
    onRandomButtonBlur: PropTypes.func,
};

function RandomPhoto(props) {
    const { name, imageUrl, onImageUrlChange, onRandomButtonBlur } = props;

    const getRandomImageUrl = () => {
        const randomId = Math.trunc(Math.random() * 2000);
        return `https://picsum.photos/id/${randomId}/300/300`
    }

    const handleRandomPhotoClick = async () => {
        const randomImageUrl = getRandomImageUrl();
        onImageUrlChange(randomImageUrl)
    }

    return (
        <div className="random-photo">
            <div className="random-photo__button">
                <Button
                    outline
                    name={name}
                    color="primary"
                    onBlur={onRandomButtonBlur}
                    onClick={handleRandomPhotoClick}
                >Random a Photo</Button>
            </div>

            <div className="random-photo__photo">
                {imageUrl && <img src={imageUrl} alt="Oops...... not found, please Click again" />}
            </div>
        </div>
    );
}

export default RandomPhoto;