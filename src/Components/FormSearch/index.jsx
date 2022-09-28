import './styles.css'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { getDocs, collection } from 'firebase/firestore/lite'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'

export default function FormSearch() {

    const [usersDB, setUsersDB] = useState([])
    const [search, setSearch] = useState('')
    const [userList, setUserlist] = useState(false)

    const handleSearch = debounce(e => {
        setSearch(e?.target?.value)
    }, 500)

    useEffect(() => {
        const collectionRef = collection(db, 'users')
        getDocs(collectionRef)
            .then(res => {
                const data = res.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                setUsersDB(data)
            }) 
    }, []);

    useEffect(() => {
        if(search.length) {
            const findUsers = usersDB.filter(user => user.email.startsWith(search))
            setUserlist(findUsers)
        } else {
            setUserlist(false)
        }
    }, [search]);


  return (
    <div className='alumnos-root'>
        {
            usersDB &&
            <form className='formSearch'>
                <input 
                    className='searchInput'
                    placeholder='Busque por email del alumno...'
                    onChange={handleSearch}
                />
            </form>
        }
        {
            !userList ?
            <p className='notFound'>*aun no has encontrado ningun usuario!</p>
            :
            <ul>
                {
                    userList.map(user => (
                        <li key={user.id}><Link to={`/alumno/:${user.name}`} onClick={localStorage.setItem('alumno', JSON.stringify(user))}>{user.name}</Link></li>
                    ))
                }
            </ul>
        }
    </div>
  )
}