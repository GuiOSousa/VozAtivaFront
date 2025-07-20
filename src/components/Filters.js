import React, { useState } from 'react';
import './styles/Filters.css';
import getAlerts, { getMapFilter, MapFilter, setMapFilter } from '../access/alerts';



export default function DataFilter() {
    const [data, setData] = useState({
        title: '',
        status: '',
        type: '',
        date: '',
        country: '',
        state: '',
        city: '',
        alerts: []
    });

/*const getFilteredAlerts = () => {
    return data.alerts.map(
        alert => ( <p>{alert.title}</p> )
    )
}*/

const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name, value) => {
	setData(prev => ({
		...prev,
		[name]: prev[name] === value ? "" : value // se já está marcado, desmarca
	}));
};

    const getFilteredData = async() => {
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
            type: translatedType,
            date: data.date,
            country: data.country,
            state: data.state,
            city: data.city
        })
        
        //handleChange( {target: {name: "alerts", value: await getAlerts(getFilteredAlerts())}} )
    };

    return (
        <div className='Filters'>
            <h2>Buscar Alertas</h2>

            <div className='TextField'>
                <p>Título: </p>
                <input className='TextInput'  type={'text'} name={"title"} value={undefined} onChange={handleChange}/>
            </div>
            <div className='TextField'>
                <p>Tipo: </p>
                <div className='CheckboxGrid'>
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

            <div className='TextField'>
                <p>País:</p>
                <input className='TextInput' type={'text'} name={"country"} value={undefined} onChange={handleChange}/>
            </div>
            <div className='TextField'>
                <p>Estado: </p>
                <input className='TextInput' type={'text'} name={"state"} value={undefined} onChange={handleChange}/>
            </div>
            <div className='TextField'>
                <p>Cidade: </p>
                <input className='TextInput' type={'text'} name={"city"} value={undefined} onChange={handleChange}/>
            </div>
            <button className="FilterButton" onClick={async () => await getFilteredData()}> Filtrar </button>
        </div>
    );
}