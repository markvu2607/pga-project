import React from "react"
import { IPhotoParams } from '../../../models/photo'


interface Props {
  photo: IPhotoParams
  handleChangeTitle(id: string | number, value: string): void
}

const PhotoItem = (props: Props) => {

  const {photo, handleChangeTitle} = props

  return(
    <div className="photo-item">
      <img src={photo.thumbnailUrl} alt={photo.title} />
      <div>
        <input type="text" value={photo.title} onChange={ e => handleChangeTitle(photo.id, e.target.value)} />
        <p>{photo.url}</p>
        <div>{Date.now()}</div>
      </div>
    </div>
  )
}

export default PhotoItem