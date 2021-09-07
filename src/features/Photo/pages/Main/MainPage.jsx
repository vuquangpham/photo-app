import Banner from 'components/Banner';
import PhotoList from 'features/Photo/components/PhotoList';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import Images from '../../../../constants/images';


function MainPage(props) {
    const photos = useSelector(state => state.photos)
    console.log('List of photos: ', photos);

    const handlePhotoEditClick = (photo) => {
        console.log('Edit', photo);
    }

    const handlePhotoRemoveClick = (photo) => {
        console.log('Remove', photo);
    }
    return (
        <div className="phoyo-main">
            <Banner title="Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

            <Container className="text-center" >
                <Button color="primary" type="button" outline><Link to="/photos/add" style={{ all: 'unset' }}>Add new photo</Link></Button>

                <PhotoList
                    photoList={photos}
                    onPhotoEditClick={handlePhotoEditClick}
                    onPhotoRemoveClick={handlePhotoRemoveClick}
                />
            </Container>
        </div>
    );
}

export default MainPage;