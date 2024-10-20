import {useEffect, useState} from 'react';
import './App.css';
import {getFaturas} from "./api/invoice.ts";
import {getFilters} from "./api/filters.ts";
import {Filters} from "./interfaces/Filters.ts";
import {Invoice} from "./interfaces/Invoice.ts";

function App() {

    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedYear, setSelectedYear] = useState(2024);

    // @ts-ignore @todo implementar
    const [error, setError] = useState<any>();


    useEffect(() => {

        setLoading(true);

        Promise
            .all([
                getFaturas(),
                getFilters(),
            ])
            .then((data: any) => {
                const [invoices, filters] = data as any;

                setInvoices(invoices);
                setFilters(filters);

                setSelectedYear(filters.years[0]);
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, []);


    const renderDataRows = () =>
        invoices.map((invoice: Invoice, index: any) => (
            <tr key={index}>
                <td>{invoice.personal.name}</td>
                <td>{invoice.personal.clientId}</td>
                <td>{invoice.general.distributor}</td>
                <td>{invoice.personal.name}</td>
                {Array.from({length: 12}).map((_, monthIndex) => (
                    <td key={monthIndex}>
                        <span className="icon-file"/> {/* Aqui você pode adicionar um ícone */}
                    </td>
                ))}
            </tr>
        ));

    return (
        !loading
            ?
            <div className="app">
                <div className="filters">
                    <button className="filter-btn">Consumidores</button>
                    <button className="filter-btn active">Distribuidoras</button>
                    {filters.years?.map((year: any) => (
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
            :
            <p>Carregando</p>
    );

};

export default App
