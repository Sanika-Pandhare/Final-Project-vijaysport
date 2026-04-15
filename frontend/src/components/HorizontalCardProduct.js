import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { FaHeart } from "react-icons/fa"
import { FiHeart } from "react-icons/fi"
import { Link } from 'react-router-dom'
import Context from '../context'
// import toggleWishlist from '../helpers/toggleWishlist'
// import getWishlist from '../helpers/getWishlist'

const HorizontalCardProduct = ({category, heading}) => {

    const [data,setData] = useState([])
    const context = useContext(Context) || {}
    const fetchWishlistCount = context?.fetchWishlistCount || (()=>{})
    const [loading,setLoading] = useState(true)
    const loadingList = new Array(10).fill(null)

    // ✅ ALWAYS SAFE ARRAY
    // const [wishlistIds, setWishlistIds] = useState([])

    const [loadingWishlist,setLoadingWishlist] = useState(false)

    const scrollElement = useRef()

    const fetchData = async() =>{
        try{
            setLoading(true)
            const categoryProduct = await fetchCategoryWiseProduct(category)
            setData(categoryProduct?.data || [])
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[category])

    // // ✅ FETCH ONLY ONCE
    // const fetchWishlist = async () => {
    //     try{
    //         const res = await getWishlist()
    //         const ids = res?.data?.map(item => item?.productId?._id) || []
    //         setWishlistIds(ids)
    //     }catch(err){
    //         console.log(err)
    //         setWishlistIds([]) // safety
    //     }
    // }

    // useEffect(() => {
    //     fetchWishlist()
    // }, [])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }

    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            <div className='flex items-center gap-4 overflow-x-scroll scrollbar-none' ref={scrollElement}>

                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 hidden md:block z-10' onClick={scrollLeft}>
                    <FaAngleLeft/>
                </button>

                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 hidden md:block z-10' onClick={scrollRight}>
                    <FaAngleRight/>
                </button>

                {
                    loading ? (
                        loadingList.map((_,index)=>(
                            <div key={index} className='w-[180px] h-[250px] bg-gray-200 rounded'></div>
                        ))
                    ) : (
                        data.map((product,index)=>{

                            // ✅ FIXED SAFE CHECK
                            // const isLiked = wishlistIds?.includes(product?._id)

                            return(
                                <Link 
                                    key={product?._id || index}
                                    to={"/product/"+product?._id} 
                                    className='w-[180px] min-w-[180px] bg-white rounded-md shadow-sm overflow-hidden'
                                >

                                    <div className='relative h-[200px] w-full bg-gray-100'>

                                        {/* ❤️ LIKE BUTTON */}
                                        

                                        <img 
                                            src={product?.productImage?.[0] || ""}
                                            className='w-full h-full object-cover'
                                            alt="product"
                                        />
                                    </div>

                                    <div className='p-2'>

                                        <p className='text-sm font-medium truncate'>
                                            {product?.productName}
                                        </p>

                                        <div className='flex items-center gap-2 text-sm mt-1'>
                                            <span className='font-semibold'>
                                                ₹{product?.sellingPrice}
                                            </span>

                                            <span className='line-through text-gray-400 text-xs'>
                                                ₹{product?.price}
                                            </span>

                                            <span className='text-green-600 text-xs'>
                                                {product?.price ? Math.round(
                                                  ((product.price - product.sellingPrice) / product.price) * 100
                                                ) : 0}% off
                                            </span>
                                        </div>

                                        <div className='flex items-center gap-1 mt-2'>
                                            <span className='bg-green-600 text-white text-xs px-2 py-[2px] rounded'>
                                                4.1 ★
                                            </span>
                                            <span className='text-xs text-gray-500'>(3,324)</span>
                                        </div>

                                    </div>

                                </Link>
                            )
                        })
                    )
                }

            </div>
        </div>
    )
}

export default HorizontalCardProduct