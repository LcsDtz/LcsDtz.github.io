import React, { useState, useEffect, useRef } from 'react'
import './NBA.css'

export default function Ligue1() {

    const [dataEast, setDataEast] = useState([])
    const [dataWest, setDataWest] = useState([])

    const [eastPlayoff, setEastPlayoff] = useState([])
    const [westPlayoff, setWestPlayoff] = useState([])

    const [eastPlayin, setEastPlayin] = useState([])
    const [westPlayin, setWestPlayin] = useState([])

    const [eastConf, setEastConf] = useState([[], [], [], []])
    const [westConf, setWestConf] = useState([[], [], [], []])

    const [eastFinal, setEastFinal] = useState([[], []])
    const [westFinal, setWestFinal] = useState([[], []])

    const [final, setFinal] = useState([[], []])
    const [selectedList, setSelectedList] = useState({})

    const infiniteFetchData = () => {
        fetch(`https://www.balldontlie.io/api/v1/teams`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                const dataEastReceived = [...dataEast]
                const dataWestReceived = [...dataWest]

                data.data.forEach((data) => {
                    if (data.conference === 'East')
                        dataEastReceived.push([data.name])
                    else
                        dataWestReceived.push([data.name])
                })

                setDataEast(dataEastReceived)
                setDataWest(dataWestReceived)
            })
    }

    useEffect(() => {
        infiniteFetchData()
    }, [])

    const dragItem = useRef()
    const dragOverItem = useRef()

    const handleEastSort = () => {

        let dataItems = [...dataEast]

        const draggedItemContent = dataItems.splice(dragItem.current, 1)[0]
        dataItems.splice(dragOverItem.current, 0, draggedItemContent)

        dragItem.current = null
        dragOverItem.current = null

        setDataEast(dataItems)
    }

    const handleWestSort = () => {

        let dataItems = [...dataWest]

        const draggedItemContent = dataItems.splice(dragItem.current, 1)[0]
        dataItems.splice(dragOverItem.current, 0, draggedItemContent)

        dragItem.current = null
        dragOverItem.current = null

        setDataWest(dataItems)
    }

    useEffect(() => {
        setEastPlayoff([...dataEast].slice(0, 6))
    }, [dataEast])

    useEffect(() => {
        setWestPlayoff([...dataWest].slice(0, 6))
    }, [dataWest])

    useEffect(() => {
        setEastPlayin([...dataEast.slice(6, 10)])
    }, [dataEast])

    useEffect(() => {
        setWestPlayin([...dataWest.slice(6, 10)])
    }, [dataWest])

    const handleReset = () => {
        setEastPlayoff([...dataEast].slice(0, 6))
        setWestPlayoff([...dataWest].slice(0, 6))
        setEastPlayin([...dataEast.slice(6, 10)])
        setWestPlayin([...dataWest.slice(6, 10)])
        setEastConf([[], [], [], []])
        setWestConf([[], [], [], []])
        setFinal([[], []])
        setEastFinal([[], []])
        setWestFinal([[], []])
        setSelectedList({})
        console.log('?')
    }

    return (
        <>
            <div className='container'>
                <h1>NBA</h1>
                <div className='list-container'>
                    <ul>
                        {dataWest.map((data, index) => {
                            return <li
                                key={index}
                                className={
                                    index < 6 ? 'list-item playoff' :
                                        index > 5 && index < 10 ? 'list-item playin' :
                                            'list-item'
                                }
                                draggable
                                onDragStart={(e) => (dragItem.current = index)}
                                onDragEnter={(e) => (dragOverItem.current = index)}
                                onDragEnd={handleWestSort}
                                onDragOver={(e) => e.preventDefault()}>
                                <h2>{index + 1}</h2>
                                <h3>{data[0]}</h3>
                            </li>
                        })}
                    </ul>
                    <ul>
                        {dataEast.map((data, index) => {
                            return <li
                                key={index}
                                className={
                                    index < 6 ? 'list-item playoff' :
                                        index > 5 && index < 10 ? 'list-item playin' :
                                            'list-item'
                                }
                                draggable
                                onDragStart={(e) => (dragItem.current = index)}
                                onDragEnter={(e) => (dragOverItem.current = index)}
                                onDragEnd={handleEastSort}
                                onDragOver={(e) => e.preventDefault()}>
                                <h2>{index + 1}</h2>
                                <h3>{data[0]}</h3>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
            <h1 className='subtitle'>Bracket</h1>
            <div className="container-btn">
                <button onClick={handleReset}>Reset le bracket</button>
            </div>
            <div className="bracket">
                <div className="west-playin-list">
                    <div className="card playin-card red">
                        {westPlayin.slice(0, 2).map((data, index, row) => {
                            return <h3 key={index} onClick={() => {
                                let array = [...dataWest].slice(0, 6)
                                array.splice(6, 0, data)

                                let tab = [...westPlayin].slice(0, 2)
                                if (index + 1 === row.length) {
                                    tab[1] = ''
                                    setWestPlayin(tab)
                                } else {
                                    tab[0] = ''
                                    setWestPlayin(tab)
                                }
                                if (tab[0] === "" && tab[1] === "") {
                                    setWestPlayin(westPlayoff[6])
                                }
                                setWestPlayoff(array)
                                if (westPlayoff[6]) {
                                    let playoff = [...westPlayoff]
                                    playoff.splice(7, 0, data)
                                    setWestPlayoff(playoff)
                                }
                            }}>
                                {data}
                            </h3>
                        })}
                    </div>
                    <div className="card red">
                        {dataWest.slice(8, 10).map((data, index, row) => {
                            return <h3 key={index} onClick={() => {
                                let tab = [...westPlayin].slice(0, 2)
                                if (tab[0] === "" || tab[0] === dataWest[8] || tab[0] === dataWest[9]) {
                                    tab.splice(1, 0, data)
                                    setWestPlayin(tab)
                                } else if (tab[1] === "" || tab[1] === dataWest[8] || tab[1] === dataWest[9]) {
                                    tab.splice(1, 0, data)
                                    setWestPlayin(tab)
                                }
                            }}>
                                {data}
                            </h3>
                        })}
                    </div>
                </div>
                <div className="west-playoff-list">
                    <div className="card">
                        {westPlayoff.map((data, index) => {
                            if (index === 0) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...westConf]
                                    tab.splice(0, 1, data)
                                    setWestConf(tab)
                                }}>
                                    {data}
                                </h3>
                            } else if (index === 7) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...westConf]
                                    tab.splice(0, 1, data)
                                    setWestConf(tab)
                                }}>
                                    {data}
                                </h3>
                            }
                        })}
                    </div>
                    <div className="card">
                        {westPlayoff.map((data, index) => {
                            if (index === 3) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...westConf]
                                    tab.splice(1, 1, data)
                                    setWestConf(tab)
                                }}>
                                    {data}
                                </h3>
                            } else if (index === 4) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...westConf]
                                    tab.splice(1, 1, data)
                                    setWestConf(tab)
                                }}>
                                    {data}
                                </h3>
                            }
                        })}
                    </div>
                    <div className="card">
                        {westPlayoff.map((data, index) => {
                            if (index === 1) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...westConf]
                                    tab.splice(2, 1, data)
                                    setWestConf(tab)
                                }}>
                                    {data}
                                </h3>
                            } else if (index === 6) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...westConf]
                                    tab.splice(2, 1, data)
                                    setWestConf(tab)
                                }}>
                                    {data}
                                </h3>
                            }
                        })}
                    </div>
                    <div className="card">
                        {westPlayoff.map((data, index) => {
                            if (index === 2) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...westConf]
                                    tab.splice(3, 1, data)
                                    setWestConf(tab)
                                }}>
                                    {data}
                                </h3>
                            } else if (index === 5) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...westConf]
                                    tab.splice(3, 1, data)
                                    setWestConf(tab)
                                }}>
                                    {data}
                                </h3>
                            }
                        })}
                    </div>
                </div>
                <div className="west-semi-list">
                    <div className="card semi-card">
                        {westConf.slice(0, 2).map((data, index) => {
                            return <h3 key={index} onClick={() => {
                                let tab = [...westFinal]
                                tab.splice(0, 1, data)
                                setWestFinal(tab)
                            }}>
                                {data}
                            </h3>
                        })}
                    </div>
                    <div className="card">
                        {westConf.slice(2, 4).map((data, index) => {
                            return <h3 key={index} onClick={() => {
                                let tab = [...westFinal]
                                tab.splice(1, 1, data)
                                setWestFinal(tab)
                            }}>
                                {data}
                            </h3>
                        })}
                    </div>
                </div>
                <div className="west-final-list">
                    <div className="card conf-final-card silver">
                        {westFinal.slice(0, 2).map((data, index) => {
                            return <h3 key={index} onClick={() => {
                                let tab = [...final]
                                tab.splice(0, 1, data)
                                setFinal(tab)
                                console.log(tab)
                            }}>
                                {data}
                            </h3>
                        })}
                    </div>
                </div>

                <div className="final-list">
                    <div className="card final-card gold">
                        {final.slice(0, 2).map((data, index) => {
                            return <h1 key={index} style={
                                data === selectedList.data ? { color: '#FFD700' } : {}
                            }
                                onClick={() =>
                                    setSelectedList({ data: data, color: '#FFD700' })
                                } >
                                {data}
                            </h1>
                        })}
                    </div>
                </div>

                <div className="east-playin-list">
                    <div className="card playin-card red">
                        {eastPlayin.slice(0, 2).map((data, index, row) => {
                            return <h3 key={index} onClick={() => {
                                let array = [...dataEast].slice(0, 6)
                                array.splice(6, 0, data)

                                let tab = [...eastPlayin].slice(0, 2)
                                if (index + 1 === row.length) {
                                    tab[1] = ''
                                    setEastPlayin(tab)
                                } else {
                                    tab[0] = ''
                                    setEastPlayin(tab)
                                }
                                if (tab[0] === "" && tab[1] === "") {
                                    setEastPlayin(eastPlayoff[6])
                                }
                                setEastPlayoff(array)
                                if (eastPlayoff[6]) {
                                    let playoff = [...eastPlayoff]
                                    playoff.splice(7, 0, data)
                                    setEastPlayoff(playoff)
                                }
                            }}>
                                {data}
                            </h3>
                        })}
                    </div>
                    <div className="card red">
                        {dataEast.slice(8, 10).map((data, index, row) => {
                            return <h3 key={index} onClick={() => {
                                let tab = [...eastPlayin].slice(0, 2)
                                if (tab[0] === "" || tab[0] === dataEast[8] || tab[0] === dataEast[9]) {
                                    tab.splice(1, 0, data)
                                    setEastPlayin(tab)
                                } else if (tab[1] === "" || tab[1] === dataEast[8] || tab[1] === dataEast[9]) {
                                    tab.splice(1, 0, data)
                                    setEastPlayin(tab)
                                }
                            }}>
                                {data}
                            </h3>
                        })}
                    </div>
                </div>
                <div className="east-playoff-list">
                    <div className="card">
                        {eastPlayoff.map((data, index) => {
                            if (index === 0) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...eastConf]
                                    tab.splice(0, 1, data)
                                    setEastConf(tab)
                                }}>
                                    {data}
                                </h3>
                            } else if (index === 7) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...eastConf]
                                    tab.splice(0, 1, data)
                                    setEastConf(tab)
                                }}>
                                    {data}
                                </h3>
                            }
                        })}
                    </div>
                    <div className="card">
                        {eastPlayoff.map((data, index) => {
                            if (index === 3) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...eastConf]
                                    tab.splice(1, 1, data)
                                    setEastConf(tab)
                                }}>
                                    {data}
                                </h3>
                            } else if (index === 4) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...eastConf]
                                    tab.splice(1, 1, data)
                                    setEastConf(tab)
                                }}>
                                    {data}
                                </h3>
                            }
                        })}
                    </div>
                    <div className="card">
                        {eastPlayoff.map((data, index) => {
                            if (index === 1) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...eastConf]
                                    tab.splice(2, 1, data)
                                    setEastConf(tab)
                                }}>
                                    {data}
                                </h3>
                            } else if (index === 6) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...eastConf]
                                    tab.splice(2, 1, data)
                                    setEastConf(tab)
                                }}>
                                    {data}
                                </h3>
                            }
                        })}
                    </div>
                    <div className="card">
                        {eastPlayoff.map((data, index) => {
                            if (index === 2) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...eastConf]
                                    tab.splice(3, 1, data)
                                    setEastConf(tab)
                                }}>
                                    {data}
                                </h3>
                            } else if (index === 5) {
                                return <h3 key={index} onClick={() => {
                                    let tab = [...eastConf]
                                    tab.splice(3, 1, data)
                                    setEastConf(tab)
                                }}>
                                    {data}
                                </h3>
                            }
                        })}
                    </div>
                </div>
                <div className="east-semi-list">
                    <div className="card semi-card">
                        {eastConf.slice(0, 2).map((data, index) => {
                            return <h3 key={index} onClick={() => {
                                let tab = [...eastFinal]
                                tab.splice(0, 1, data)
                                setEastFinal(tab)
                            }}>
                                {data}
                            </h3>
                        })}
                    </div>
                    <div className="card">
                        {eastConf.slice(2, 4).map((data, index) => {
                            return <h3 key={index} onClick={() => {
                                let tab = [...eastFinal]
                                tab.splice(1, 1, data)
                                setEastFinal(tab)
                            }}>
                                {data}
                            </h3>
                        })}
                    </div>
                </div>
                <div className="east-final-list">
                    <div className="card conf-final-card silver">
                        {eastFinal.slice(0, 2).map((data, index) => {
                            return <h3 key={index} onClick={() => {
                                let tab = [...final]
                                tab.splice(1, 1, data)
                                setFinal(tab)
                                console.log(tab)
                            }}>
                                {data}
                            </h3>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
