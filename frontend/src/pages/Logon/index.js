import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
		
export default function Logon() {

    const [id, setId] = useState('');
    const histoy = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id} );

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            histoy.push('profile');
        }catch (error) {
            alert('Falha no Login.')
        }
    }

	return (
		<div className="logon-container">
            <section className="form">
                 <img src={logoImg} alt="Logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="Submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}