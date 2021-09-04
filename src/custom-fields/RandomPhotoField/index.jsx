import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';
import RandomPhoto from 'components/RandomPhoto';

RandomPhotoField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    label: PropTypes.string,
};

RandomPhotoField.defaultValues = {
    label: ''
}

function RandomPhotoField(props) {
    const { field, form } = props;
    const { label } = props;
    const { name, value, onBlur } = field;

    const handleImageChange = (randomImageUrl) => {
        form.setFieldValue(name, randomImageUrl)
    }
    return (
        <FormGroup>
            <Label for={name}>{label}</Label>


            <RandomPhoto
                name={name}
                imageUrl={value}
                onImageUrlChange={handleImageChange}
                onRandomButtonBlur={onBlur}
            />
        </FormGroup>
    );
}

export default RandomPhotoField;