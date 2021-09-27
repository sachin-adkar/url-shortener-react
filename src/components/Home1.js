import axios from "axios";
import { useState } from "react";
import { config } from "./src/configs";

export const Home = () => {
    const [value, setValue] = useState('');

    const [shortUrl, setShortUrl] = useState('');

    const setInput = (e) => {
        setValue(e.target.value);
    }

    const shorten = async () => {
        try {
            const response = await axios.post(`${config.url}/s/short`, { url: value }, {
                headers: {
                    'x-access-token': localStorage.getItem('accessToken')
                }
            });
            debugger
            if (response.status === 200 && response.data) {
                setShortUrl(response.data[1]);
            }
            else {
                alert('Failed to generate short URL');
            }
        }
        catch (error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                alert('Failed to authenticate, please login');
            }
            else {
                alert('Failed to generate short URL');
            }
        }
    }


    return (
        <div className='col-md-6 offset-md-3 text-center'>
            <h1>Enter the URL</h1>
            <form className="form-group">
                <input type='text' id='inputUrl' className='form-control' onChange={setInput} />
                <button type="button" className='btn btn-primary btn-lg' onClick={() => shorten()}>Submit</button>
            </form>

            {
                shortUrl &&
                <div className="alert alert-primary" role="alert">
                    <a href={shortUrl} target='blank'>{shortUrl} </a>
                </div>
            }
        </div>
    );
}
