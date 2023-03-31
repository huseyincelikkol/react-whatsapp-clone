import React from 'react'
import { IoMdCall } from "react-icons/io"
import { useState, useEffect } from 'react';
import InputEmoji from "react-input-emoji";
import { useParams } from 'react-router-dom';
import * as api from '../api/index'
import moment from 'moment';
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js';

export const ChatDetail = () => {

    const [text, setText] = useState("");
    const [personName, setPersonName] = useState(null)
    const [messages, setMessages] = useState([])
    const { user } = useSelector(state => state.user)
    console.log(user, "user")

    const handleOnEnter = async (text) => {
        const messageContent = {
            name: user?.displayName,
            message: text,
            timestamp: new Date(),
            uid: user?.uid,
            roomid: id
        }
        const { data } = await api.createMessageApi(messageContent)

    }
    const { id } = useParams();

    useEffect(() => {
        const pusher = new Pusher('15241b6d1d1634cab79a', {
            cluster: 'eu'
        });
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function (data) {
         setMessages(prev => [...prev, data])
        });

    }, [])

    useEffect(() => {
        if (id) {
            const detailFunc = async () => {
                const { data } = await api.detailRoomApi(id)
                setPersonName(data)
            }
            const detailMessageFunc = async () => {
                const { data } = await api.detailMessageApi(id)
                setMessages(data)
            }
            detailMessageFunc()
            detailFunc()

        }
    }, [id])

    //console.log("personName" ,personName)

    return (
        <div className='w-3/4 chatDetail'>
            <div className='h-16 bg-gray-200 px-4 py-2 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img className='w-16 rounded-full' src='https://banner2.cleanpng.com/20180505/upw/kisspng-computer-icons-avatar-businessperson-interior-desi-corporae-5aee195c6d1683.4671087315255535004468.jpg' alt=''></img>
                    <div>
                        <div className='font-bold'>{personName?.name}</div>
                        <div className='text-xs'>{moment(personName?.createdAt).format("MMM Do YY")};</div>
                    </div>
                </div>
                <div>
                    <IoMdCall size={25} className="cursor-pointer text-gray-700" />
                </div>

            </div>
            <div className='h4/5 overflow-y-auto'>
                {
                    messages?.map((message, i) => (
                        message?.name === user.displayName ?
                            <div key={i} className='w-[400px] bg-green-300 rounded-md p-2 m-3 ml-auto'>
                                <div>{message?.message}</div>
                                <div className='text-xs flex items-center justify-end'>{moment(message?.createdAt).format("MMM Do YY")}</div>
                            </div> : <div className='w-[400px] bg-white rounded-md p-2 m-3'>
                                <div>{message?.message}</div>
                                <div className='text-xs flex items-center justify-end'>{moment(message?.createdAt).format("MMM Do YY")}</div>
                            </div>


                    ))
                }
                <div className='fixed bottom-0 w-3/4'>
                    <InputEmoji
                        value={text}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder=""
                    />
                </div>
            </div>
        </div>
    )
}
