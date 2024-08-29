import React, { useState } from 'react';
import './CreateNote.css';


const CreateNote = ({ categoryData,setCategoryData }) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        comment: ''
    });

    const handleChange = ( e ) => {
        setFormData((prevData) => ({
            ...prevData,[e.target.name]: e.target.value
        }))
    };

    const onSubmitHandle = (e) => {
        e.preventDefault();

        const newNote = {
            id: formData.id,
            title: formData.title,
            comment: formData.comment
        };

        setCategoryData((prev) => {
            if(prev.length > 0){
                return [{
                    ...prev[0],
                    subCategorys: [
                        ...prev[0].subCategorys, newNote
                    ]
                },
                ...prev.slice(1)
            ]
            }
        })

        setFormData({
            id: "",
            title: "",
            comment: ""
        })
    }

    return (
        <div className='container'>
        {/* Buttons */}
        <div className='buttons-container'>
            <div className='button-group'>
                <button className='primary-btn' type="button"/>
                <button className='primary-btn' type="button"/>
                <button className='secondary-btn' type="button"/>
            </div>
            <div className='small-button-group'>
                <button type="button"/>
                <button type="button"/>
                <button type="button"/>
            </div>
        </div>
        {/* Content */}
        <form onSubmit={onSubmitHandle}>
            <input
                type='text'
                placeholder='Add a title'
                name='title'
                className='form-section'
                onChange={handleChange}
                value={formData.title || ''}
            />
            <textarea
                placeholder='Write your note here...'
                name='comment'
                className='form-section'
                onChange={handleChange}
                value={formData.comment || ''}
            />
            <div className='save-button-container'>
                <button type="submit">Save Changes</button>
            </div>
        </form>
    </div>
  )
}

export default CreateNote;