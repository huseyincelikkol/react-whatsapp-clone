import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BiCommentDetail, BiSearch } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useState } from 'react'
import * as api from '../api/index'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Pusher from 'pusher-js'

export const Sidebar = () => {
    const { user } = useSelector(state => state.user)
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const pusher = new Pusher('15241b6d1d1634cab79a', {
            cluster: 'eu'
        });
        const channel = pusher.subscribe('rooms');
        channel.bind('inserted', function (data) {
         setRooms(prev => [...prev, data])
        });

    }, [])


    useEffect(() => {
        const allRooms = async () => {
            const { data } = await api.allRoomApi()
            setRooms(data)
        }
        allRooms()

    }, [])

    console.log(rooms, "roomss");


    const addingPerson = async () => {
        const newPrompt = prompt("Yeni bir ad giriniz")
        console.log(newPrompt, "newPrompt")

        if (newPrompt) {
            const { data } = await api.createRoomApi({ groupName: newPrompt })

            //console.log(data,"data")

            //setRooms(prev => [...prev, data])

        }
    }
    return (
        <div className='w-1/4 border-r'>
            <div className='bg-gray-200 h-16 flex items-center justify-between p-3'>
                <img className='w-12 rounded-full' src={user?.photoURL} alt=""></img>
                <div className='flex items-center gap-5'>
                    <BiCommentDetail size={23} className='text-gray-600 cursor-pointer' />
                    <BsThreeDotsVertical size={23} className='text-gray-600 cursor-pointer' />
                </div>
            </div>
            <div className='bg-gray-100 flex items-center p-2'>
                <div className='bg-white flex items-center gap-2 border p-2 flex-1'>
                    <BiSearch size={20} className="text-gray-600" />
                    <input className='outline-none border-none bg-transparent flex-1' type="text" placeholder='Arama Yapınız'></input>
                </div>
            </div>
            <div onClick={addingPerson} className='bg-green-600 text-white p-2 m-2 text-center rounded-lg cursor-pointer hover:opacity-90 transition-opacity '>
                Yeni Kişi Ekle
            </div>
            <div>
                {
                    rooms?.map((room, i) => (
                        <div onClick={() => navigate(`chat/${room?._id}`)} key={i} className="items-center flex justify-between p-2 cursor-pointer hover:bg-gray-200">
                            <div className='flex items-start gap-2'>
                                <img className='w-16 rounded-full' src="data:image/png;base64,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" alt=""></img>
                                <div>
                                    <div className=''>{room?.name}</div>
                                    
                                </div>
                            </div>
                            <div className='text-xs text-gray-700'>
                                {moment(room?.createdAt).format("MMM Do YY")};
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
