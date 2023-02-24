
import { useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import './style.css';

import api from './services/api';
function App() {

    const [input, setInput] = useState('')
    const [cep, setCep] = useState({});

    //input é a informação que ta jogando pro useState, que nesse caso, ta vindo da busca do cep
    // setInput joga um novo valor pro useState.
    //useState é uma função do próprio react, que foi importada lá em cima
  
      async function handleSearch(){
        if(input === ''){
          alert("Preencha corretamente!")
          return;
        }
        try{
          const response = await api.get(`${input}/json`);
          setCep(response.data);
          setInput("");
        }catch{
          alert("Ops, erro ao buscar CEP.")
          setInput("")
        }

        // try e catch é o seguinte, o try é o que tu ta tentando fazer acontecer, e o catch é o que acontece caso não aconteça o que tu quer no try.
        //await é pra que a página espere a resposta da requisição http da api
      
      }
  
    return (
    <div className="container">

      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        /> 

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="FFF"/>
        </button>

      </div>

    {Object.keys(cep).length > 0 &&(

    <main className='main'>
    <h2>CEP: {cep.cep}</h2>

    <span>{cep.logradouro}</span>
    <span>Complemento: {cep.complemento}</span>
    <span>{cep.bairro}</span>
    <span>{cep.localidade} - {cep.uf}</span>

    </main>
    )}
      
    </div>
  );
}

export default App;
