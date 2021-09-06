import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import { addPhoto } from 'features/Photo/PhotoSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import './style.scss'

function AddEditPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (values) => {
        return new Promise(resolve => {
            console.log('Form submit', values);

            setTimeout(() => {
                const action = addPhoto(values);
                console.log(action);
                dispatch(action);

                history.push('/photos');
            }, 2000);
        })
    }
    return (
        <div className="photo-edit">
            <Banner title="Pick your amazing photo 🤩" />

            <div className="photo-edit__form">
                <PhotoForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default AddEditPage;