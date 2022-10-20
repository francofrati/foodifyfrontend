import styled from 'styled-components'
import * as React from 'react'
import { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ordersEdit, ordersFetch } from '../../../../Redux/slices/ordersSlice'
import { fetchAllOrders } from '../../../../Redux/thunks/ordersThunks'
import moment from 'moment';

const RestaurantOrdersList = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { list } = useSelector((state) => state.orders)



    useEffect(() => {
        if (list.length === 0) {
            dispatch(fetchAllOrders())
        }
    }, [dispatch, list])






    const rows = list && list.map(order => {
        return {
            id: order._id,
            cName: order.name,
            amount: (order.total_price / 100)?.toLocaleString(),
            dStatus: order.delivery_status,
            date: moment(order.createdAt).fromNow(),
        }
    })

    const columns = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "cName", headerName: "Name", width: 120, },
        { field: "amount", headerName: "Amount($)", width: 100 },
        {
            field: "dStatus",
            headerName: "Status",
            width: 130,
            renderCell: (params) => {
                return <div>
                    {params.row.dStatus === "pending" ? <Pending>Pending</Pending> :
                        params.row.dStatus === "dispatched" ? <Dispatched>Dispatched</Dispatched> :
                            params.row.dStatus === "delivered" ? <Delivered>Delivered</Delivered> :
                                ("error")
                    }
                </div>
            }
        },
        { field: "date", headerName: "Date", width: 120 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 220,
            renderCell: (params) => {
                return (
                    <>
                        <Actions>
                            <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}>
                                Dispatch
                            </DispatchBtn>
                            <DeliveryBtn onClick={() => handleOrderDeliver(params.row.id)}>
                                Deliver
                            </DeliveryBtn>
                            <View onClick={() => navigate(`/admin/order/${params.row.id}`)}>
                                View
                            </View>

                        </Actions>
                    </>
                )
            }
        }
    ]

    const handleOrderDispatch = (id) => {
        dispatch(
            ordersEdit({
                id,
                delivery_status: "dispatched"
            }))
    }

    const handleOrderDeliver = (id) => {
        dispatch(
            ordersEdit({
                id,
                delivery_status: "delivered"
            }))
    }

    // const handleDelete = (id) => {

    //     dispatch(booksDelete(id))
    // }

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


export default RestaurantOrdersList

const DispatchBtn = styled.button`
    background-color: rgb(38, 198, 249);
`

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

const DeliveryBtn = styled.button`
    background-color: rgb(102, 108, 255);
`

const View = styled.button`
    background-color: rgb(114, 225, 40)
`

const Pending = styled.div`
    color: rgb(38, 198, 249);
    background: rgba(253, 181, 40, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`

const Dispatched = styled.div`
    color: rgb(38, 198, 249);
    background-color: rgba(38, 189, 249, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`

const Delivered = styled.div`
    color: rgb(102, 108, 255);
    background-color: rgba(102, 108, 255, 0.12);
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
`