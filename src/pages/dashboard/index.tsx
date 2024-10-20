import './style.css';
import 'chart.js/auto';
import {Chart} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import {getDashboard} from "../../api/dashboard.ts";
import {Dashboard as IDashboard} from "../../interfaces/Dashboard.ts";


function Dashboard() {

    const [loading, setLoading] = useState<boolean>(true);
    const [energyChart, setEnergyChart] = useState<any>();
    const [financialChart, setFinancialChart] = useState<any>();

    // @ts-ignore @todo implementar mensagem de erro
    const [error, setError] = useState<string>();

    const handlerEnergyChart = (energy: IDashboard['energy']) => {
        setFinancialChart({
            labels: [
                'Total',
                'Compensada',
            ],
            datasets: [{
                label: 'Resultados de Energia (kWh)',
                data: [energy.total, energy.compensated],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                ],
                hoverOffset: 4
            }]
        })
    }

    const handlerFinancialChart = (financial: IDashboard['financial']) => {
        setEnergyChart({
            labels: [
                'Valor Total sem GD',
                'Economia GD',
            ],
            datasets: [{
                label: 'Resultados Financeiros (R$)',
                data: [financial.total, financial.saving],
                backgroundColor: [
                    'rgba(255,223,64,0.83)',
                    'rgb(0,255,146)',
                ],
                hoverOffset: 4
            }]
        })
    }

    useEffect(() => {

        setLoading(true);

        getDashboard()
            .then((data: IDashboard) => {
                handlerEnergyChart(data.energy);
                handlerFinancialChart(data.financial);
            })
            .catch(() => setError(''))
            .finally(() => {
                setLoading(false);
            })
    }, [])


    return (
        <>
            {
                !loading
                    ?
                    <div className="card-container">
                        <div className="card">
                            <Chart type='pie' data={energyChart}/>
                        </div>

                        <div className="card">
                            <Chart type='pie' data={financialChart}/>
                        </div>

                    </div>
                    :
                    <p>Carregando</p>
            }
        </>
    );

};

export default Dashboard
