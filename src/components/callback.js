import axios from "axios";
import { config } from "../configs";
import { useEffect } from "react";

export default function(props)
{
    useEffect(()=>{
        signIn(props)
    }, []);
    return (<></>);
}

const signIn = async(props) =>
{
    try
    {
        const code =  new URL(window.location.href).searchParams.get('code')

        const response = await axios.post(`${config.url}/auth/signin`, { code });

        if (response.status === 200)
        {
            // If success? Store tokens in local storage
            await localStorage.setItem('accessToken', response.data.accessToken);
            await localStorage.setItem('refreshToken', response.data.refreshToken);

            props.history.push('/shorten')
            // return true;
        }
        else
        {
            props.history.push('/');
        }
    }
    catch (error)
    {
        props.history.push('/');
    }
}

