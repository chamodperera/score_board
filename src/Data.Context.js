import { createContext ,useContext,useState,useEffect} from 'react'
import { teamData } from './teamData'

const DataContext = createContext()

export const useData = ( ) =>{
    return useContext(DataContext)
}


export const DataProvider = ({children}) => {

    const [teams,setTeams] = useState(()=>{
        const localTeamsData = localStorage.getItem('teams')
        return localTeamsData ? JSON.parse(localTeamsData) : teamData
    })
    const [batting,setBatting] = useState('White Wolves')
    const [bowling,setBowling] = useState('Blue Titans')
    const [bat1,setBat1] = useState(Object.keys(teams[batting].players)[0])
    const [bat2,setBat2] = useState(Object.keys(teams[batting].players)[1])
    const [ball,setBall] = useState(Object.keys(teams[bowling].players)[0])

    const [over, setOver] = useState(()=>{
        const localOver = localStorage.getItem('over')
        return localOver ? JSON.parse(localOver) : []
    });

    useEffect(()=>{
        localStorage.setItem('teams',JSON.stringify(teams))
    },[teams])

    useEffect(()=>{
        localStorage.setItem('over',JSON.stringify(over))
    },[over])

    const value = {
        teams,
        batting,
        bowling,
        bat1,
        bat2,
        ball,
        over,
        setTeams,
        setBatting,
        setBowling,
        setBat1,
        setBat2,
        setBall,
        setOver
    }

    return(
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}
