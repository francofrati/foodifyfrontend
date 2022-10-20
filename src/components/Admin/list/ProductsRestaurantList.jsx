import styled from 'styled-components'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllFoods, fetchFoodsRestaurant } from '../../../Redux/thunks/foodsThunks'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { cleanFoodsState } from '../../../Redux/slices/foodSlice'

const ProductsRestaurantsList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const { foods, foodsRestaurant } = useSelector((state) => state.foods)

    const [reload, setReload] = useState(false)
    
    useEffect(() => {
        if(foodsRestaurant.length === 0) {
            dispatch(fetchFoodsRestaurant(id))
        }
    }, [dispatch, foodsRestaurant, id])

    useEffect(() => {
        dispatch(cleanFoodsState())
    }, [])


  function reloading(){
    
    if (reload){

        return setReload(false)
    }else{
      return setReload(true)
    }
}
  

    useEffect(() => {
        if (foods.length === 0) {
          dispatch(fetchAllFoods());
        //   window.location.reload()
        }

        setReload(false)
      }, [dispatch, foods, reload]);

    

    const rows = foodsRestaurant && foodsRestaurant.map(food => {
        return {
            id: food.id,
            imageUrl: food.image,
            bName: food.title,
            price: food.price.toLocaleString(),
            delete: food.deleted
        }
    })

    const columns = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "imageUrl", headerName: "Image", width:80,
        renderCell: (params) => {
            return (
                <ImageContainer>
                    <img src={params.row.imageUrl} alt="image" />
                </ImageContainer>
            )
        }
    },
        { field: "bName", headerName: "Name", width: 130},
        { field: "bDesc", headerName: "Description", width: 130},
        { field: "price", headerName: "Price", width: 80},
        { field: "delete", headerName: "Delete", width: 80},
        {
            field: "actions",
            headerName: "Actions",
            description: "This column has a value getter and is not sortable",
            sortable: false,
            width: 170,
            renderCell: (params) => {
                return (
                    <Actions>
                        <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
                        <View onClick={() => navigate(`/admin/food/${params.row.id}`)}>View</View>
                    </Actions>
                )
            }
        }
    ]

    const handleDelete = (id) => {
        
        //axios.delete(`/foods/${del}/${id}`)
        axios.delete(`/foods/${id}`)
        .then(fetchFoodsRestaurant(id))
        
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
        <br />
        <br />
        <br />
        <br />
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
            
        </div>
    )
}



export default ProductsRestaurantsList

const ImageContainer = styled.div`
    img {
        height: 40px;
    }
`;

const Actions = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
        border: none;
        outline: none;
        padding: 3px 5px;
        color: white;
        border-radius: 3px;
        cursor: pointer;
    }
`;

const Delete = styled.button`
    background-color: rgb(255, 77, 73);
`;

const View = styled.button`
    background-color: rgb(114, 225, 40);
`;