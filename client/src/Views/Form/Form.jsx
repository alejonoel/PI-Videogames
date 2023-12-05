import React, {useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "../../Components/NavBar/Navbar"
import { getGenres, getPlatforms, postVidegame } from '../../Redux/Actions';
import "./form.css"
import { useNavigate } from 'react-router-dom';

const Form = () => {

  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.allGenres)
  const allPlatforms = useSelector((state) => state.allPlatforms)
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms())
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [state , setState] = useState({
    name:"",
    image:"",
    description:"",
    platform:[],
    date:0,
    rating:"",
    genres:[],
  })

  const [ error , setError] = useState({
    name:"You must enter the name of the game",
    image:"You must enter the url of the image",
    description:"You must enter a description",
    platform:"You must select an option",
    date:"You must select a date",
    rating:"You must enter a value between 1 and 5",
    genres:"You must select an option",
  })

  const validate = (stateErr, name) => {
    switch (name) {
      case "name":
        if (stateErr.name === "") {
          setError({ ...error, name: "You must enter the name of the game" });
        } else {
          setError({ ...error, name: "" });
        }
        break;
      case "image":
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(stateErr.image)) {
          setError({ ...error, image: "You must enter the url of the image" });
        } else {
          setError({ ...error, image: "" });
        }
        break;
      case "description":
        if (stateErr.description === "") {
          setError({ ...error, description: "You must enter a description" });
        } else {
          setError({ ...error, description: "" });
        }
        break;
      case "platform":
        if (stateErr.platform.length === 0) {
          setError({ ...error, platform: "You must select an option" });
          document.getElementsByName(name)[0].value=''
        } else {
          setError({ ...error, platform: "" });
        }
        break;
      case "date":
        if (stateErr.date === "") {
          setError({ ...error, date: "You must select a date" });          
        } else {
          setError({ ...error, date: "" });
        }
        break;
      case "rating":
        if (!isNaN(stateErr.rating) && parseInt(stateErr.rating) >= 1 && parseInt(stateErr.rating) <= 5) {
          setError({ ...error, rating: "" });
        } else {
          setError({ ...error, rating: "You must enter a value between 1 and 5" });
        }
        break;
      case "genres":
        if (stateErr.genres.length === 0) {
          setError({ ...error, genres: "You must select an option"});
          document.getElementsByName(name)[0].value=''
        } else {
          setError({ ...error, genres: "" });
        }
        break;
        default: 
      }
  };

  const handleChange = ( event ) => {
    if(event.target.name==="genres") {

      if(event.target.value ==='' || state.genres.includes(event.target.value)) return

      setState({
        ...state,
        [event.target.name]: [...state.genres, event.target.value]
      })
    } else if (event.target.name==="platform") {      
      if(event.target.value ==='' || state.platform.includes(event.target.value)) return

      setState({
        ...state,
        [event.target.name]: [...state.platform, event.target.value]
      })

    } else {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
    // El {} evita el delay de re-renderizado
    validate( {...state, [event.target.name]: event.target.value} , event.target.name)
  }

  const handleDelete = (event) => {
    const newStateValue = [...state[event.target.name].filter( i => i !== event.target.id)];
    setState({
      ...state,
      [event.target.name]: newStateValue
      }
    )
    validate( {...state, [event.target.name]: newStateValue}, event.target.name)    
  }

  const disabledFunction = () => {
    let disabledAux = true;
    for(let err in error){
        if(error[err]==="") disabledAux = false
        else{
            disabledAux = true;
            break;
        }
    }
    return disabledAux
}

const handleSubmit = (event) => {
  event.preventDefault();
  dispatch(postVidegame(state));
  setTimeout(function(){navigate("/home")}, 2000)
  setState({
    name:"",
    image:"",
    description:"",
    platform:[],
    date:0,
    rating:"",
    genres:[],
  });
  setError({
    name:"You must enter the name of the game",
    image:"You must enter the url of the image",
    description:"You must enter a description",
    platform:"You must select an option",
    date:"You must select a date",
    rating:"You must enter a value between 1 and 5",
    genres:"You must select an option",
  })
}

  return (
    <div >
      <Navbar/>
      <div className='form-container'>
        <form onSubmit={handleSubmit} className='form' >

          <div className='form-row'>
            <div className='form-group'>
              <label>Name:</label>
              <input name="name" onChange={handleChange} type="text" value={state.name}/>
              <label className='form-error'>{error.name}</label>
            </div>
            <div className='form-group'>   
              <label>Image:</label>
              <input name="image" onChange={handleChange} type="text" value={state.image}/>
              <label className='form-error'>{error.image}</label>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>   
              <label>Description:</label>
              <input name="description" onChange={handleChange} type="text" value={state.description}/>
              <label className='form-error'>{error.description}</label>
            </div>
            <div className='form-group display-container'>   
              <label>Platform:</label>
              <select name="platform" onChange={handleChange} value={state.platform}>
                <option value="">Select one platform</option>
                {allPlatforms?.map( (i) => <option key={i} value={i}>{i}</option>)}
              </select>
              <label className='form-error'>{error.platform}</label>
              <div className='display-options'>
                {
                state.platform.map( (i , index) => <div key={index} className="display-item" >
                  <span>{i}</span>
                  <button type='button' name='platform' id={i} onClick={handleDelete}>
                  x</button>
                </div>)
              }
              </div>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>   
              <label>Release date:</label>
              <input name="date" onChange={handleChange} type="date" value={state.date}/>
              <label className='form-error'>{error.date}</label>
            </div>
            <div className='form-group'>   
              <label>Rating:</label>
              <input name="rating" onChange={handleChange} type="number" step="0.1" min="1"  max="5" value={state.rating}/>
              <label className='form-error'>{error.rating}</label>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group display-container'>   
              <label>Add Genres:</label>
              <select name="genres" onChange={handleChange} value={state.genres}>
                <option value="">Select one genre</option>
                {allGenres?.map( (i) => <option key={i} value={i}>{i}</option>)}
              </select>
              <label className='form-error'>{error.genres}</label>
              <div className='display-options'>
              {
                state.genres.map( (i , index) => <span key={index} className="display-item" >
                  <span>{i}</span>
                  <button type='button' name='genres' id={i} onClick={handleDelete}>
                  x</button>
                </span>)
              }
              </div>
            </div>
          </div>

          <input disabled={disabledFunction()} type="submit" />

        </form>
      </div>
    </div>
  )
}

export default Form