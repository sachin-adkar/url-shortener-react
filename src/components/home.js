import GoogleButton from 'react-google-button';
import axios from 'axios';
import { config } from "../configs";

import { useEffect } from "react";

export default function(props)
{
    useEffect(() => {
        if (localStorage.getItem('accessToken'))
        {
            props.history.push('/shorten');
        }
    }, []);

    return (
    <div className='col-md-6 offset-md-3 text-center'>
        <h1>Welcome to URL shortener</h1>

        <div className='col-md-6 offset-md-3 text-center'>
            <GoogleButton
            onClick = {googleSignIn}/>
        </div>
    </div>
    );
}

const googleSignIn = async() =>
{
    try
    {
        const response = await axios.get(`${config.url}/auth/getGoogleAuthUri`);

        if (response?.data)
        {
            window.location = response.data.authUrl;
        }
        else
        {
            alert('Server did not respond');
        }
    }
    catch(error)
    {
        alert('Server did not respond');
    }
}