import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg'

import './styles.css';

import api from '../../services/api'

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('');

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    const ongId = localStorage.getItem('ongId')

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })
      history.push('/profile')
    } catch (error) {
      alert('Error ao cadastrar o caso. Tnete nomvante')
    }

  }

  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={logoImg} />

          <h1>Cadastrar novo Caso</h1>
          <p>Descreva o caso detalhamente para encontrar um heroí para resolver isso</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
        </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Titulo do Caso"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <input
            placeholder="Valor em Reais"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}