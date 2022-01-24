import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { createOneDmChannel } from "../../store/dmChannel"
import './HomeServer.css'

const Search = () => {
  const [term, setTerm] = useState("")
  const [results, setResults] = useState([])
  const currentUser = useSelector(state => state.session.user)
  // const [isLoaded, setIsLoaded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  // const history = useHistory();
  const dispatch = useDispatch()

  const sessionUser = useSelector(state => state.session.user)

  useEffect(()=> {
    if(term.length > 0) {
      // setIsLoaded(false);
      setShowSearch(true);
      fetch(`/api/users/search/${term}`).then(res => res.json()).then(json => {setResults(json.users.filter(user => user.username !== currentUser.username )); console.log(json)}).catch(e => console.log(e));
      // setIsLoaded(true);
    } else (setResults(""));

  }, [term])

  const handleSearch = (e) => {
    e.preventDefault();
    setTerm(e.target.value);
  }

  const addDmChannel = (user) => {
    console.log('friend', user)
    const payload = {
      userId: sessionUser?.id,
      friendId: user?.id,
      friendAvatar: user?.avatar,
      friendName: user?.username
    }

    dispatch(createOneDmChannel(payload))
  }



  return (
    <div className='search-container' onClick={(e)=> e.stopPropagation()}>
      <form className='search-bar' autoComplete="off">

        <input type="search"
           placeholder='Start Up A Conversation' value={term} onChange={handleSearch} />



        { !!results.length && results?.map(user => (

        <div  className='search-results-div' onClick={()=> {addDmChannel(user)}}>

          <img src={user.avatar}></img>
          <p>{user.username}</p>
          </div>

        ))}

      </form>
    </div>
  )
}

export default Search;
