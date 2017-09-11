import React from 'react'

function Book (props) {
  return (
    <div className='book'>
      <div className='book-top'>
        <div className='book-cover' style={
          {
            width: 128, 
            height: 193, 
            backgroundImage: `url("${props.imageLinks.smallThumbnail}")` 
          }
        } />
        <div className='book-shelf-changer'>
          <select value={props.shelf || 'none'} onChange={e => {
              props.onShelfUpdate(props, e.target.value)
            }}>
            <option value='none' disabled>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{props.title}</div>
      <div className='book-authors'>{(props.authors || []).join(', ')}</div>
    </div>
  )
}

export default Book
