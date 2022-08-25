import React, { useState, useEffect, useRef } from 'react'
import '../Liste.css'

export default function Ligue1() {

    const [dataTeam, setDataTeam] = useState([])

    const infiniteFetchData = () => {
        fetch(`https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=French%20Ligue%201`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                const dataReceived = [...dataTeam]

                data.teams.forEach((data) => {
                    dataReceived.push([data.strTeam])
                })

                setDataTeam(dataReceived)
            })
    }

    useEffect(() => {
        infiniteFetchData()
    }, [])

    const dragItem = useRef()
    const dragOverItem = useRef()

    const handleSort = () => {

        let dataItems = [...dataTeam]

        const draggedItemContent = dataItems.splice(dragItem.current, 1)[0]
        dataItems.splice(dragOverItem.current, 0, draggedItemContent)

        dragItem.current = null
        dragOverItem.current = null

        setDataTeam(dataItems)
    }

    return (
        <div className='container'>
            <h1>Ligue 1</h1>
            <div className='list-container'>
                <ul>
                    {dataTeam.map((data, index) => {
                        return <li
                            key={index}
                            className={
                                index === 0 || index === 1 ? 'list-item ldc' :
                                    index === 2 ? 'list-item eliminatoire' :
                                        index === 3 ? 'list-item europa' :
                                            index === 4 ? 'list-item conference' :
                                                index > 15 ? 'list-item relegation' :
                                                    'list-item'
                            }
                            draggable
                            onDragStart={(e) => (dragItem.current = index)}
                            onDragEnter={(e) => (dragOverItem.current = index)}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()}>
                            <h2>{index + 1}</h2>
                            <h3>{data}</h3>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}
