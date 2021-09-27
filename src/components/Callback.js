import axios from "axios";
import { config } from "../configs";
import { useHistory } from "react-router";

export const Callback = () => {

    const history = useHistory();
    const signIn = async () => {
        try {
            const code = new URL(window.location.href).searchParams.get('code')

            const response = await axios.post(`${config.url}/auth/signin`, { code });

            if (response.status === 200) {
                // If success? Store tokens in local storage
                await localStorage.setItem('accessToken', response.data.accessToken);
                await localStorage.setItem('refreshToken', response.data.refreshToken);

                history.push('/')
            }
            else {
                history.push('/login');
            }
        }
        catch (error) {
            history.push('/login');
        }
    }

    signIn()

    return (<></>);
}

