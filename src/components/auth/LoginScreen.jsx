import React from 'react';
import Swal from 'sweetalert2';
import Local from '../../resources/img/Local.jpg';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import '../../styles/components/auth/LoginScreen.css'


export const LoginScreen = ({ history }) => {

    const dispatch = useDispatch();
    const [formValues, handleInputChange] = useForm({ email: '', password: '' });
    const { email, password } = formValues;


    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.length > 0 && password.length > 0) {
            history.replace('/admin/update')
            dispatch(startLogin(email, password))
        } else {
            Swal.fire('Error', 'Falto llenar algún campo o algun campo incorrecto', 'error')
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="login-box">

                <h1> Bienvenido </h1>
                <img className="img-p" src={Local} alt="xumak"></img>

                <label >Email or Username</label>
                <input type="text" name="email" placeholder="Email or username" autoComplete="off" value={email} onChange={handleInputChange} />

                <label>Password</label>
                <input type="password" name="password" placeholder="Password" autoComplete="off" value={password} onChange={handleInputChange} />

                <button className="btn-submit" type="submit"> Login </button>


                <Link className="link" style={{ textDecoration: 'none' }} to="/auth/register"> Register </Link>
            </form>
        </>
    )
}
