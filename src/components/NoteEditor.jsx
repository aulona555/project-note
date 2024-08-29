import React, { useState,useEffect } from 'react';
import './NoteEditor.css';


const NoteEditor = ({setSelectedField, selectedField, setCategoryData }) => {
    const [formData, setFormData] = useState({
        title: '',
        comment: ''
    });


    console.log(selectedField)

    useEffect(() => {
        if(selectedField){
            setFormData(selectedField)
        }
    },[selectedField])

    const handleChange = ( e ) => {
        setFormData((prevData) => ({
            ...prevData,[e.target.name]: e.target.value
        }))
    };

    const deleteNoteHandler = () => {
        setFormData({
            title: "",
            comment: ""
        })

        if(selectedField && selectedField.id){
            setCategoryData((prevCategoryData) => {
                const updatedCategoryData = prevCategoryData.map((category) => {
                    if(category.subCategorys.some((note) => note.id === selectedField.id)){
                        const updatedSubCategorys = category.subCategorys.filter((note) => note.id !== selectedField.id);
                        return {
                            ...category,
                            subCategorys: updatedSubCategorys
                        }
                    }
                    return category;
                })
                return updatedCategoryData
            })
        }

        setSelectedField("");
    }

    const onSubmitHandle = (e) => {
        e.preventDefault();

        // Create new note
        if(selectedField.categoryName){
            setCategoryData((prevData) => { 
                const updatedData = prevData.map((category) => {
                    if(category.id === selectedField.id){
                        const newSubCategory = {
                            id: '',
                            title: formData.title,
                            comment: formData.comment
                        }
                        return {
                            ...category,
                            subCategorys: [...category.subCategorys,newSubCategory]
                        }
                    }
                    return category
                })
                console.log(updatedData)
                return updatedData
            })
        }

        // Update note
        else{
            setCategoryData((prevData) => {
                const updatedNote = prevData.map((category) => {
                    if(category.id === selectedField.id){
                        const updatedSubCategorys = category.subCategorys.map((subItem) => {
                            if(subItem.id === selectedField.id){
                                return {
                                    ...subItem,
                                    title: formData.title,
                                    comment: formData.comment,
                                };
                            }
                            return subItem
                        });
                        return {
                            ...category,
                            subCategorys: updatedSubCategorys
                        }
                    }
                    return category
                })
                return updatedNote
            })
        }

        setSelectedField("")

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
            <div className='button-container'>
                <button type="submit" className='save-button'>Save Changes</button>
                <button
                    type="button"
                    className={`delete-button ${selectedField.length === 0 ? 'hidden' : ''}`}
                    onClick={deleteNoteHandler}
                >
                    Delete Note
                </button>
            </div>
        </form>
    </div>
  )
}

export default NoteEditor;
 