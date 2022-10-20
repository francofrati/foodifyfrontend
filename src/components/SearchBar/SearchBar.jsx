import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import swal from 'sweetalert'

import { fetchFoodsByTitle, fetchAllFoods} from '../../Redux/thunks/foodsThunks'
import { resetSearch } from '../../Redux/slices/foodSlice'

import s from './SearchBar.module.scss'

const SearchBar = () => {

    const dispatch = useDispatch()

    const { searchEmpty } = useSelector((state) => state.foods)

    const [title, setTitle] = useState('')

    const handleAlert = () => {
        swal({
            title: 'Sorry!',
            text: 'No results were found for this name',
            icon: 'error',
            button: 'OK'
        }).then(res => {
            if(res){
                dispatch(resetSearch)
            }
        })
    }

    function handleInput(e) {
        e.preventDefault()
        setTitle(e.target.value)
    }

    function handleSubmit(e) {
        if(title.length === 0) {
            return swal({
                title: 'Sorry!',
                text: 'Food name is required',
                icon: 'error',
                button: 'OK'
            }).then(res => {
                if(res){
                    dispatch(resetSearch())
                }
            })
        }
        else{
            e.preventDefault()
            dispatch(fetchFoodsByTitle(title))
        }
    }

    function reset() {
        setTitle('')
        dispatch(fetchAllFoods())
    }


    return (
        <div className={s.bar}>
            <input className={s.input} name="title" value={title} placeholder=" Food Name..." onChange={(e) => handleInput(e)} />
            <button className={s.close} onClick={(e) => reset(e)} >X</button>
            <button className={s.button} type="submit" onClick={(e) => handleSubmit(e)}><i class="fas fa-search fa-2x">Buscar</i></button>
            {searchEmpty
                ? handleAlert()
                : null}
        </div>
    )

}

export default SearchBar