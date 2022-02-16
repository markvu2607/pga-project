import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../redux/reducer'
import PhotosUI from '../components/PhotosUI'
import { Action } from 'redux'
import { fetchThunk } from '../../common/redux/thunk'
import { setPhotos } from '../redux/photoReducer'
import { IPhotoParams } from '../../../models/photo'
import { useSelector } from 'react-redux'

const PhotosPage = () => {

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>()

  const photosRedux = useSelector((state: AppState) => state.photos)

  const [loading, setLoading] = useState<boolean>(false)
  const [photoList, setPhotoList] = useState<Array<IPhotoParams>>(photosRedux)

  const getPhoto = useCallback(async () => {
    setLoading(true)

    const json = await dispatch(
      fetchThunk(`https://jsonplaceholder.typicode.com/photos?_start=0&_end=20`, 'get')
    )

    setLoading(false)

    if(json){
      dispatch(setPhotos(json))
      return
    }
  }, [])

  useEffect(()=> {
    getPhoto()
  }, [getPhoto])

  const handleChangeTitle = (id: string | number, value: string): void => {

    const newPhotoList: Array<IPhotoParams> = photoList.map((elm)=>{
      if(elm.id === id){
        return {...elm, title: value}
      }else {
        return elm
      }
    }) as Array<IPhotoParams>

    setPhotoList(newPhotoList)
  }

  const resetData = () => {
    setPhotoList(photosRedux)
  }

  const saveData = () => {
    dispatch(setPhotos(photoList))
  }

  return (
    <div className="photos-page">
      <PhotosUI 
        photos={photoList}
        loading={loading}
        handleChangeTitle={handleChangeTitle}
        resetData={resetData}
        saveData={saveData}
      />
    </div>
  )
}

export default PhotosPage