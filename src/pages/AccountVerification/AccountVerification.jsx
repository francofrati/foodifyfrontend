import React,{ useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'

import { accountVerificationURL, userByIdURL } from '../../assets/endpoints'



const AccountVerification = () => {

    const [code, setCode] = useState('')

    const [error, setError] = useState('')

    const params = useParams()

    const navigate = useNavigate()

    const { id } = params

    useEffect(()=>{
        axios.get(userByIdURL(id))
        .then(r=>{    
            if(!r.data.status)navigate('/')
        })        
    },[id,navigate])


    const submit = async (e) => {
        e.preventDefault()

        const verifyCodeAnswer = await axios.post(accountVerificationURL, { code, userId: id })

        if (verifyCodeAnswer.data.status) {

            navigate('/restaurantes')
            return

        }
        setError(verifyCodeAnswer.data.msg)
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} autoFocus />
                <button type='submit'>Verificar</button>
            </form>
            {error !== ''
                ? <h5>{error}</h5>
                : <></>
            }
        </div>
    )
}

export default AccountVerification