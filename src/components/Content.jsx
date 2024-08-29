import React, { useEffect, useState } from 'react';
import { PlusIcon,Folder,DownArrow,RightArrow } from '../Icons';
import NoteEditor from './NoteEditor';
import data from '../Data/data.json';
import ContentWindow from './ContentWindow';
import CreateNote from './CreateNote';
import './Content.css';

const Content = () => {
    // Inital Data
    const [categoryData, setCategoryData] = useState([]);  


    // Store Initial Data
    useEffect(() => {
        setCategoryData(data.notesCategoryData)
    },[])

    // Store Selected Category Data 
    const [selectedCategory, setSelectedCategory] = useState([]);

    // Store Selected Field Data
    const [selectedField, setSelectedField] = useState([]);

    // Sub Categorys Array
    var elementSubCategoryCount = {};

    // Icon switcher
    const [click, setClick] = useState({
        button1: false,
        button2: false,
        button3: false
    });

    // Category Sub Categorys Counter
    if(categoryData){
        categoryData.forEach(function (item){
            var elementId = item.id;
            var subCategoryCount = item.subCategorys.length

            elementSubCategoryCount[elementId] = subCategoryCount
        })
    } 

    const buttonSwitcher = (e) => {
        setClick((value) => {
            const updatedState = {};
            Object.keys(value).forEach((key) => {
                updatedState[key] = key === e.target.name
            });
            return updatedState  
        })
    }

    const iconSwitcher = (buttonState) => {
        return buttonState ? RightArrow : DownArrow
    }
    return (
        <div>
          {/* Navbar */}
          <div className='navbar'>
            <button type='button' onClick={() => setSelectedCategory("")}>Your Notes</button>
        
          </div>
          {/* Main Content */}
          <div className='main-content'>
            {/* Sidebar Content */}
            <div className='sidebar'>
              <div className='create-category'>
                <button type='button'>Create Category</button>
                <img src={PlusIcon} alt='Add Icon' />
              </div>
              {/* Category List */}
              <div className='category-list'>
                        {                      
                            categoryData.map(data => {     

                                return(
                                    <div className="item-container" key={data.id} onClick={(e) => {
                                            setSelectedCategory(data)
                                        }}>
                                        <div className="item-content">
                                            <img src={Folder} alt="Folder Icon" className="item-image"/>
                                            <button type='button' onClick={buttonSwitcher} name={`button${data.id}`} className=' item-button '>{data.categoryName} ({elementSubCategoryCount[data.id]})</button>
                                        </div>
                                        <img src={iconSwitcher(click[`button${data.id}`])} className='item-arrow' alt='Arrow Icon'/>
                                    </div>
                                )
                            })
                        }                

                    </div>
                </div>
                {
                    (selectedCategory.length === 0)
                    ?    
                        <CreateNote categoryData={categoryData} setCategoryData={setCategoryData} selectedCategory={selectedCategory}/>
                    : 
                        <ContentWindow selectedCategory={selectedCategory} setSelectedField={setSelectedField}/>
                }
                {
                    (selectedField.length !== 0)
                    ?
                        <NoteEditor selectedField={selectedField} setSelectedField={setSelectedField} setCategoryData={setCategoryData}/>
                    : 
                        ""
                }
            </div>
        </div>
  )
}

export default Content;