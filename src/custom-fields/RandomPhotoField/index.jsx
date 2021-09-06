import RandomPhoto from 'components/RandomPhoto';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Label } from 'reactstrap';

RandomPhotoField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    label: PropTypes.string,
};

RandomPhotoField.defaultValues = {
    label: ''
}

function RandomPhotoField(props) {
    const { field, form, label } = props;
    const { name, value, onBlur } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    console.log(errors[name], touched[name]);

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
            <div className={showError ? 'is-invalid' : ''}></div>
            <FormFeedback>{errors[name]}</FormFeedback>
        </FormGroup>
    );
}

export default RandomPhotoField;