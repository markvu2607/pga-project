import React from "react"
import PhotoItem from './PhotoItem'
import { IPhotoParams } from '../../../models/photo'

interface Props {
  photos: Array<IPhotoParams>
  loading: boolean
  handleChangeTitle(id: string | number, value: string): void
  resetData(): void
  saveData(): void
}

const PhotosUI = (props : Props) => {

  const {photos, loading, handleChangeTitle, resetData, saveData} = props

  return (
    <div className="photos">
      <div className="photos-control">
        <button className="" onClick={ e => saveData()}>Confirm</button>
        <button className="" onClick={ e => resetData()}>Reset</button>
      </div>
      <div className="photo-list">
        {photos.map((photo: IPhotoParams, index: number) => {
          return (
            <PhotoItem key={index} photo={photo} handleChangeTitle={handleChangeTitle}></PhotoItem>
          )
        })}
      </div>
    </div>
  )
}

export default PhotosUI