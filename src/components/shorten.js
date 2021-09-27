import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../configs";

export default function(props)
{
    const [value, setValue] = useState('');

    const [shortUrl, setShortUrl] = useState('');

    const setInput = (e) =>
    {
        setValue(e.target.value);
    }

    useEffect(() => {
        if (!localStorage.getItem('accessToken'))
        {
            props.history.push('/');
        }
    }, []);

    const shorten = async(e) =>
    {
        e.preventDefault();
        try
        {
            const response = await axios.post(`${config.url}/short`, { url : value}, {
                headers: {
                    'x-access-token': localStorage.getItem('accessToken')
                }
            });

            debugger

            if (response.status === 200 && response.data)
            {
                setShortUrl(response.data[1]);
            }
            else alert('Failed to generate short URL');
        }
        catch (error)
        {
            if (error.response?.status === 401 || error.response?.status === 403)
            {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                alert('Failed to authenticate, please login');
                props.history.push('/');
            }
            else
            {
                alert('Failed to generate short URL');
            }
        }
    }

    return (
        <div className='col-md-6 offset-md-3 text-center'>
            <h1>Enter the URL</h1>
            <form className="form-group">
            <input type = 'text' id = 'inputUrl' className = 'form-control' onChange = {setInput}/>
            <button type="submit" className = 'btn btn-primary btn-lg' onClick = {shorten}>Submit</button>
            </form>

            {
            shortUrl &&
            <div className="alert alert-primary" role="alert">
               <a href = {shortUrl} target = 'blank'>{shortUrl} </a>
            </div>
            }
        </div>
    );
}
