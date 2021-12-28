import React, { useEffect, useState } from "react";

const Stardev = () => {

    const [showData, setShowData] = useState([]);

    useEffect(()=>{
        fetch('https://swapi.dev/api/people')
        .then((res)=>{
            if(res.ok){
                return res.json()
            }
            throw res
        })
        .then(async (data)=>{
                const ppData = [];
                for(let i = 0;i < data.results.length ; i++){
                    const people = data.results[i];
                    const peopleData = {
                        name:people.name,
                        gender:people.gender,
                        homeWorldName:'',
                        films : [],
                        vehicles : [],
                        startships : [] 
                    }
                    await fetch(people.homeworld).then((res)=>{
                        if(res.ok){
                            return res.json()
                        }
                    }).then(({name}) => {
                        peopleData.homeWorldName = name;   
                    })

                    for(let ifilm = 0 ; ifilm< people.films.length ; ifilm++){
                        await fetch(people.films[ifilm]).then((res)=>{
                            if(res.ok){
                                return res.json()
                            }
                        }).then(({title}) => {
                            peopleData.films.push(title);   
                        })
                    }
                    for(let iv = 0 ; iv< people.vehicles.length ; iv++){
                        await fetch(people.vehicles[iv]).then((res)=>{
                            if(res.ok){
                                return res.json()
                            }
                        }).then(({name}) => {
                            peopleData.vehicles.push(name);   
                        })
                    }
                    for(let is = 0 ; is< people.starships.length ; is++){
                        await fetch(people.starships[is]).then((res)=>{
                            if(res.ok){
                                return res.json()
                            }
                        }).then(({name}) => {
                            peopleData.startships.push(name);   
                        })
                    }
                    ppData.push(peopleData)  
                }
                setShowData(ppData);
        })
        .catch(err => console.error("error",err))
    },[])

    return (
        <div>
            <table>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Gender
                    </th>
                    <th>
                        Homeworld
                    </th>
                    <th>
                        Films
                    </th>
                    <th>
                        Vehicles
                    </th>
                    <th>
                        Startships
                    </th>
                </tr>
                {showData && showData.map((val)=>{
                   return <tr>
                    <td>
                      {val.name}
                    </td>
                    <td>
                        {val.gender}
                    </td>
                    <td>
                        {val.homeWorldName}
                    </td>
                    <td>
                        {val.films && val.films.join(',')}
                    </td>  
                    <td>
                        {val.vehicles && val.vehicles.join(',')}
                    </td>
                    <td>
                        {val.startships && val.startships.join(',')}


                    </td>
                    </tr>
               
            })}
            </table> 
        </div>
    )
}

export default Stardev;