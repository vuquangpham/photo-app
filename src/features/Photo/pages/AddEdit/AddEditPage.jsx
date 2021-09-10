import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addPhoto, updatePhoto } from 'features/Photo/PhotoSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Container } from 'reactstrap';

import './style.scss'

function AddEditPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { photoId } = useParams();
    const isAddMode = !photoId;

    const editedPhoto = useSelector(state => {
        return state.photos.find(photo => photo.id === +photoId)
    })

    const initialValues = isAddMode
        ? {
            title: '',
            categoryId: null,
            photos: '',
        }
        : editedPhoto

    const handleSubmit = (values) => {
        return new Promise(resolve => {
            console.log('Form submit', values);

            setTimeout(() => {
                if (isAddMode) {
                    const newValues = {
                        ...values,
                        id: Math.floor(Math.random() * 10000)
                    }
                    const action = addPhoto(newValues);
                    console.log(action);
                    dispatch(action);
                }
                else {
                    const action = updatePhoto(values);
                    console.log(action);
                    dispatch(action);
                }

                history.push('/photos');
                resolve(true);
            }, 2000);
        })
    }
    return (
        <div className="photo-edit">
            <Banner title="Pick your amazing photo 🤩" />
            <Container>

                <div className="photo-edit__form">
                    <PhotoForm isAddMode={isAddMode} initialValues={initialValues} onSubmit={handleSubmit} />
                </div>
            </Container>
        </div>
    );
}

export default AddEditPage;