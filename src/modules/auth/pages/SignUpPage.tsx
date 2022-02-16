import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { Action } from "redux";
import SignUpForm from "../components/SignUpForm";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode";
import { ISignUpParams } from "../../../models/auth";
import { replace } from "connected-react-router";
import { ROUTES } from "../../../configs/routes";
import { getErrorMessageResponse } from "../../../utils";
import logo from '../../../logo-420-x-108.png';

const SignUpPage = () => {

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([])

  const getLocation = useCallback(async () => {
    setLoading(true)

    const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'))
    setLoading(false)

    if(json?.code === RESPONSE_STATUS_SUCCESS){
      setLocations(json.data)
      return
    }
  }, [])

  useEffect(() => {
    getLocation()
  }, [getLocation])

  const getStates = useCallback(async (pid: string) => {
    setLoading(true)

    const json = await dispatch(fetchThunk(`${API_PATHS.getLocation}?pid=${pid}`, 'get'))
    setLoading(false)

    if(json?.code === RESPONSE_STATUS_SUCCESS){
      setStates(json.data)
      return
    }
  }, [])

  const onSignUp = useCallback( async (values: ISignUpParams) => {
    setErrorMessage('')
    setLoading(true)

    const json = await dispatch(
      fetchThunk(API_PATHS.signUp, 'post',values)
    )

    setLoading(false)

    if(json?.code === RESPONSE_STATUS_SUCCESS) {
      console.log(json.data)
      alert('Chúc mừng bạn đăng ký thành công')
      dispatch(replace(ROUTES.login))
      return
    }

    setErrorMessage(getErrorMessageResponse(json))
  }, [dispatch])

  return (
    <div
    className="container"
    style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />

      <SignUpForm onSignUp={onSignUp} loading={loading} errorMessage={errorMessage} locations={locations} states={states} getStates={getStates} />
    </div>
  )

}

export default SignUpPage