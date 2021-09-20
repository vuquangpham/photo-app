import Banner from 'components/Banner';
import PhotoList from 'features/Photo/components/PhotoList';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import Images from 'constants/images';
import { removePhoto } from '../../PhotoSlice'
function MainPage(props) {
    const photos = useSelector(state => state.photos)
    const dispatch = useDispatch();
    const history = useHistory();

    const handlePhotoEditClick = (photo) => {
        const editPhotoUrl = `photos/${photo.id}`;
        history.push(editPhotoUrl)
    }

    const handlePhotoRemoveClick = (photo) => {
        const removePhotoId = photo.id;
        const action = removePhoto(removePhotoId);
        dispatch(action)
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