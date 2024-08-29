import React, { useEffect, useState } from 'react'
import { PlusIcon } from '../Icons';
import './ContentWindow.css';

const ContentWindow = ({selectedCategory,setSelectedField}) => {
    const [subCategorys,setSubCategorys] = useState([]);
    const [searchText, setSearchText] = useState([]);

    useEffect(() => {
        if(selectedCategory && selectedCategory.id){
            setSubCategorys(selectedCategory.subCategorys)
        }
    },[selectedCategory])

    // Search Function
    const searchHandler = (e) => {
        const inputValue = e.target.value.toLowerCase();
        setSearchText(subCategorys.filter(item => item.title.toLowerCase().includes(inputValue)))
    }

    return (
        <div className={subCategorys.length === 0 ? "hidden" : "container"}>
      <div className='content-window'>
        {/* Create Note Button */}
        <div 
          className="create-note-button"
          onClick={() => setSelectedField(selectedCategory)}
        >
          <button type='button'>Create Note</button>
          <img src={PlusIcon} alt='Add Icon' />
        </div>
        {/* Search Input */}
        <div className='search-input-container'>
          <input 
            type='text' 
            placeholder='Search' 
            className='search-input' 
            onChange={searchHandler} 
          />
        </div>
      </div>
      {/* Notes List */}
      {
        searchText.length > 0 ? (
          searchText.map(item => (
            <div 
              key={item.id} 
              className='note-item'
              onClick={() => setSelectedField(item)}
            >
              <h1>{item.title}</h1>
              <p>{item.comment}</p>
            </div>
          ))
        ) : (
          subCategorys.map(item => (
            <div 
              key={item.id} 
              className='note-item'
              onClick={() => setSelectedField(item)}
            >
              <h1>{item.title}</h1>
              <p>{item.comment}</p>
            </div>
                            ))    
                        )
            }
        </div>
    );
};

export default ContentWindow;