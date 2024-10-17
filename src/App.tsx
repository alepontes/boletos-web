import { useState } from 'react'
import './App.css'

function App() {

    const data = [
        {
            nomeUC: "CASA DONA COMERCIO VAREJISTA E SOLUÇÕES",
            numeroUC: "3002863513",
            distribuidora: "CEMIG",
            consumidor: "CASA DONA COMERCIO VAR...",
        },
        {
            nomeUC: "Walter Boaventura da Silva",
            numeroUC: "3003336712",
            distribuidora: "CEMIG",
            consumidor: "Walter Boaventura da Silva",
        },
    ];

    const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

    const [selectedYear, setSelectedYear] = useState(2024);

    const renderDataRows = () =>
        data.map((item, index) => (
            <tr key={index}>
                <td>{item.nomeUC}</td>
                <td>{item.numeroUC}</td>
                <td>{item.distribuidora}</td>
                <td>{item.consumidor}</td>
                {Array.from({ length: 12 }).map((_, monthIndex) => (
                    <td key={monthIndex}>
                        <span className="icon-file" /> {/* Aqui você pode adicionar um ícone */}
                    </td>
                ))}
            </tr>
        ));

    return (
        <div className="app">
            <div className="filters">
                <button className="filter-btn">Consumidores</button>
                <button className="filter-btn active">Distribuidoras</button>
                {years.map((year) => (
                    <button
                        key={year}
                        className={`year-btn ${selectedYear === year ? "active" : ""}`}
                        onClick={() => setSelectedYear(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>
            <table className="data-table">
                <thead>
                <tr>
                    <th>Nome da UC</th>
                    <th>Número da UC</th>
                    <th>Distribuidora</th>
                    <th>Consumidor</th>
                    {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"].map(
                        (month) => (
                            <th key={month}>{month}</th>
                        )
                    )}
                </tr>
                </thead>
                <tbody>{renderDataRows()}</tbody>
            </table>
        </div>
    );
};

export default App
