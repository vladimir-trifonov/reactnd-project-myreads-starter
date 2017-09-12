import React from 'react'
import PropTypes from 'prop-types'

function BookComponent (props) {
  return (
    <div className='book'>
      <div className='book-top'>
        <div className='book-cover' style={{
          backgroundImage: `url("${props.imageLinks.smallThumbnail}")`
        }} />
        <div className='book-shelf-changer'>
          <select value={props.shelf} onChange={e => {
            props.onShelfUpdate(props, e.target.value)
          }}>
            <option disabled>Move to...</option>
            <option value='currentlyReading'>Currently Reading</option>
            <option value='wantToRead'>Want to Read</option>
            <option value='read'>Read</option>
            <option value='none'>None</option>
          </select>
        </div>
      </div>
      <div className='book-title'>{props.title}</div>
      <div className='book-authors'>{props.authors ? props.authors.join(', ') : ''}</div>
    </div>
  )
}

BookComponent.propTypes = {
  imageLinks: PropTypes.object,
  authors: PropTypes.array,
  title: PropTypes.string,
  shelf: PropTypes.string,
  onShelfUpdate: PropTypes.func
}

export default BookComponent
