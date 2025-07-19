import React, { useState } from 'react';
import './styles/Filters.css';
import { MapFilter, setMapFilter } from '../access/alerts';



export default function DataFilter() {
    const [data, setData] = useState({
        title: '',
        status: '',
        lat: '',
        long: '',
        distance: '',
        type: '',
        date: ''
    });

const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'lat' || name === 'long') {
            setData(prev => ({ ...prev, [name]: value }));
        } else {
            setData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCheckboxChange = (name, value) => {
	setData(prev => ({
		...prev,
		[name]: prev[name] === value ? "" : value // se já está marcado, desmarca
	}));
};

    const getFilteredData = () => {
        let translatedType = ""

        if (data.type === "Ambiental") {
           translatedType = "Environment"
        } else if (data.type === "Segurança") {
            translatedType = "Security"
        } else if (data.type === "Trânsito") {
            translatedType = "Traffic"
        } else if (data.type === "Outros") {
            translatedType = "Others"
        }

        let translatedStatus = ""

        if (data.status === "Aberto") {
            translatedStatus = "Open"
        } else if (data.status === "Fechado") {
            translatedStatus = "Closed"
        }


        setMapFilter({
            title: data.title,
            distance: data.distance,
            status: translatedStatus,
            lat: data.lat,
            long: data.long,
            type: translatedType,
            date: data.date
        })
    };

    return (
        <div className='Filters'>
            <h2>Editar e Filtrar Dados</h2>

            <div className='TextField'>
                <p>Título: </p>
                <input type={'text'} name={"title"} value={undefined} onChange={handleChange}/>
            </div>
            <div className='TextField'>
                <p>Tipo: </p>
                <div style={{ marginBottom: '15px' }}>
                {['Ambiental', 'Trânsito', 'Segurança', 'Outros'].map(tipo => (
                    <label key={tipo}>
                        <input type="checkbox" name="status" value={tipo} checked={data.type === tipo} onChange={() => {handleCheckboxChange('type', tipo)}}/> {tipo}
                    </label>
                ))}
            </div>
            </div>
            <div className='TextField'>
                <p>Status: </p>
                <div style={{ marginBottom: '15px' }}>
                {['Aberto', 'Fechado'].map(status => (
                    <label key={status}>
                        <input type="checkbox" name="status" value={status} checked={data.status === status} onChange={() => {handleCheckboxChange('status', status)}}/> {status}
                    </label>
                ))}
            </div>
            </div>
            <div className='TextField'>
                <p>Latitude: </p>
                <input type={'number'} name={"lat"} value={undefined} onChange={handleChange}/>
            </div>
            <div className='TextField'>
                <p>Longitude: </p>
                <input type={'number'} name={"long"} value={undefined} onChange={handleChange}/>
            </div>
            <div className='TextField'>
                <p>Distância: </p>
                <input type={'number'} name={"distance"} value={undefined} onChange={handleChange}/>
            </div>
            <div className='TextField'>
                <p>Data: </p>
                <div>
                <input
                    type="date"
                    name="date"
                    value={data.date}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            </div>
            

            <button className="FilterButton" onClick={() => console.log(getFilteredData())}> Filtrar </button>
        </div>
    );
}