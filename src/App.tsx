import {useEffect, useState} from 'react';
import './App.css';
import {getFaturas} from "./api/invoice.ts";
import {getFilters} from "./api/filters.ts";
import {Filters} from "./interfaces/Filters.ts";
import {Invoice} from "./interfaces/Invoice.ts";
import {Search} from "./interfaces/Search.ts";

function App() {

    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [filters, setFilters] = useState<Filters>();
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<Search>();

    const handleSelectChangeConsumers = (event: any) => {
        setSearch({
            ...search,
            clientId: event.target.value,
        });
    };

    const handleSelectChangeDistributors = (event: any) => {
        setSearch({
            ...search,
            distributor: event.target.value,
        });
    };

    const handleSelectChangeYear = (year: any) => {

        if (search?.year === year) {
            return setSearch({
                ...search,
                year: undefined,
            });
        }

        setSearch({
            ...search,
            year,
        });
    };

    // @ts-ignore @todo implementar
    const [error, setError] = useState<any>();

    useEffect(() => {

        setLoading(true);

        Promise
            .all([
                getFaturas(search),
                getFilters(),
            ])
            .then((data: any) => {
                const [invoices, filters] = data as any;

                setInvoices(invoices);
                setFilters(filters);
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));

    }, [search]);


    const renderDataRows = () =>
        invoices.map((invoice: Invoice) => (
            <tr key={invoice.id}>
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

                    <select className="filter-btn" value={search?.clientId} onChange={handleSelectChangeConsumers}>
                        <option value="">Consumidores</option>
                        {
                            filters?.consumers?.map(consumer => (
                                <option value={consumer.id}>{consumer.name}</option>
                            ))
                        }
                    </select>

                    <select className="filter-btn" value={search?.distributor} onChange={handleSelectChangeDistributors}>
                        <option value="">Distribuidoras</option>
                        {
                            filters?.distributors?.map((distributor: any) => (
                                <option value={distributor}>{distributor}</option>
                            ))
                        }
                    </select>

                    {filters?.years?.map((year: any) => (
                        <button
                            key={year}
                            className={`year-btn ${search?.year == year ? "active" : ""}`}
                            onClick={() => handleSelectChangeYear(year)}
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
