import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

export default function Cart() {
    const [data, setData] = React.useState([]);
    const [amount, setAmount] = React.useState({});
    const [totalPrice, setTotalPrice] = React.useState(0);

    useEffect(() => {
        async function callApi() {
            let cartItems = localStorage.getItem('cart');
            if (!cartItems)
                return;
            cartItems = JSON.parse(cartItems);
            const request = []
            setAmount(cartItems);
            Object.keys(cartItems).forEach(key => {
                axios.get(`http://localhost:5000/api/products/${key}`).then(res => {
                    setData(data => [...data, res]);
                    setTotalPrice(prev => prev + parseInt(cartItems[res?.data?._id]) * parseInt(res?.data?.price.replace("$", "")))
                })
            })

        }
        callApi();
    }, [])

    return (
        <div>
            <h1>Your Cart</h1>
            {
                data.map((item, index) =>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop:10 }} key={index}>
                        <div style={{ height: '0.1em', width: '30%', height: '400px', marginRight: 50 }}>
                            <img src={item?.data?.image} style={{ objectFit: 'cover', width: 400, height: 400 }} />
                        </div>
                        <div style={{ width: '25%', padding: 20, lineHeight: 2 }}>
                            <div >Tên sản phẩm: <span style={{ fontWeight: 600, fontSize: 16 }}>{item?.data?.name}</span></div>
                            <div>Hãng sản phẩm xuất: {item?.data?.brand}</div>
                            <div>Đơn giá: <span style={{ fontWeight: 600, fontSize: 18 }}>{item?.data?.price}</span></div>

                            <div>Số lượng:
                                <span>
                                    <button onClick={() => {
                                        const temp = amount
                                        temp[item?.data?._id] = parseInt(temp[item?.data?._id]) + 1
                                        setAmount({});
                                        setAmount(temp);
                                        localStorage.setItem('cart', JSON.stringify(temp))
                                        setTotalPrice(prev => prev + parseInt(item?.data?.price.replace("$", "")))
                                    }} style={{ margin: '0 10px' }}>+</button>

                                    {amount[item?.data?._id] || 0}
                                    
                                    <button style={{ margin: '0 10px' }} onClick={() => {
                                        const temp = amount
                                        if (temp[item?.data?._id] === 0)
                                            return
                                        temp[item?.data?._id] = parseInt(temp[item?.data?._id]) - 1
                                        setAmount({});
                                        setAmount(temp);
                                        localStorage.setItem('cart', JSON.stringify(temp))
                                        setTotalPrice(prev => prev - parseInt(item?.data?.price.replace("$", "")))
                                    }}>-</button>
                                </span> </div>
                        </div>
                    </div>
                )
            }
            <div style={{textAlign:'center', marginTop: 30}}>
                <span style={{fontSize: 28, fontWeight: 600}}>Tổng tiền: {
                    totalPrice
                }$</span>
            </div>

            <div style={{textAlign:'center', marginTop: 50}}>
                <button className="button-6" style={{ margin: '0 10px' }}
                onClick={()=>{
                    Swal.fire({
                        title: 'Bạn có muốn thanh toán?',
                        text: "Đơn hành vẫn tồn tại nếu bạn",
                        icon: 'information',
                        showCancelButton: true,
                        confirmButtonText: 'Thanh toán',
                        cancelButtonText: 'Hủy',
                        reverseButtons: true
                      }).then((result) => {
                        if (result.isConfirmed) {
                          swalWithBootstrapButtons.fire(
                            'Thanh toán thành công!',
                            'Đơn hàng đã thanh toán thành công',
                            'success'
                          )
                          localStorage.removeItem('cart')
                          setTotalPrice(0);
                          setData([])
                        } else if (
                          /* Read more about handling dismissals below */
                          result.dismiss === Swal.DismissReason.cancel
                        ) {
                          swalWithBootstrapButtons.fire(
                            'Hủy',
                            'Đơn hàng vẫn tồn tại trong giỏ của bạn',
                            'error'
                          )
                        }
                      })
                     
                }}>Thanh toán</button>
            </div>
        </div>
    )
}
