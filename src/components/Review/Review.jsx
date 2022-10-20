import axios from 'axios'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'

import { reviewURL } from '../../assets/endpoints'

const Review = () => {

    const content = useRef()
    const rate = useRef()

    const { user } = useSelector(state => state.user)
    const params = useParams()
    const restId = params.id

    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            userId: user.id,
            restId,
            content: content.current.value,
            rate: rate.current.value
        }

        axios.post(reviewURL, body)
            .then(r => {
                if (r.data.status) {
                    swal({ title: 'Se publico tu opinion', icon: 'success' })
                }
            })
            .then(re=>{
                content.current.value=''
                rate.current.value=null
            })
            .catch(e => {
                swal({title: e.response.data.msg,icon:'warning'})
            })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea ref={content} name="content" cols="30" rows="10" placeholder='(Opcional)'></textarea>
                </div>
                <div>
                    <input ref={rate} type="number" min={1} max={5} />
                </div>
                <button type='submit'>Publicar Opinión</button>
            </form>
        </div>
    )
}

export default Review