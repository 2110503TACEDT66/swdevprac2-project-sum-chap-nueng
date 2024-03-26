"use client"
import LocationDateReserve from "@/components/LocationDateReserve";
import { useSearchParams } from "next/navigation";
import { useReducer, useState } from "react";
import dayjs , {  Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addReservation } from "@/redux/cartSlice";
// import { ReservationItem } from "../../../interfaces";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"
import { useSession } from "next-auth/react";
import Image from "next/image";
export default function Reservations () {

   const urlParams = useSearchParams()
   const cid = urlParams.get('id')
   const model = urlParams.get('model')
   // console.log(model)

   const {data : session} = useSession()
    
   const dispatch = useDispatch<AppDispatch>()

  
        
   // if (!session || !session.user.token ) return <div>Please login to book the campground</div>
   // const profile =  getUserProfile(session.user.token)
   
   

   const makeReservation = ()=> {

      if (nights<1 || nights>3) {
         alert("Please book nights again with number 1-3")
         
      }
      else if (cid && model && date && nights && session) {

          
         const item:ReservationItem = {
             bookDate: dayjs(date).format("YYYY/MM/DD"),
             campground:model,
             user : 'ss',
             night: nights
           
         }
         dispatch(addReservation(item))
         
      }
   }

   //  const [pickupDate,setPickupDate] = useState<Dayjs|null>(null)
   //  const [pickupLocation,setPickupLocation] = useState<string>("BKK")
   //  const [returnDate,setReturnDate] = useState<Dayjs|null>(null)
   //  const [returnLocation,setReturnLocation] = useState<string>("BKK")
       const [date,setDate] = useState<Dayjs|null>(null)
    
      const [nights,setNight] = useState<number>(1)
     
      
    

    return (
     <div className = "w-full flex flex-col items-center space-y-4 relative">
       <Image src = 'https://drive.google.com/uc?id=1YUAalXhTp982UX0Ichj1PeaVG3DGxeVZ' alt='image'  width={0} height={0} sizes='100vw' className=' m-0 relative w-full h-[600px] opacity-[70%] '/>
       <div className="bg-black w-[50%] h-[400px] opacity-[80%] absolute my-20 left-[280px] top-[70px]">  </div>
        
        <div className="absolute py-5 left-[310px] top-[70px]">
        <div className=" text-white font-bold text-center text-4xl my-3">BOOKING</div>
        <div className="text-xl font-medium font-bold  text-slate-400 bg-white px-2 py-3 rounded-sm w-[410px]"> Campground {model}</div>

        <div className='flex items-center w-1/2 my-2'>
                 <label className="w-auto block text-gray-700 pr-4" htmlFor='seats'>
                  Nights: </label>
                  <input type='number' required id="seats" name="seats" value={nights} placeholder='3' min={1} max={3} className="bg-white border border-2 border-gray-200 w-full h-[55px] rounded p-2 text-gray-700 text-center"
                   onChange={(e)=>setNight(parseInt(e.target.value))}></input>
             </div>

       
           <div className="text-md flex flex-row text-left text-gray-600 p-0">
            <div className="my-7">Pick Date</div>
            <LocationDateReserve onDateChange={(value:Dayjs)=>{setDate(value)}}/>
            </div>
       
       
        <div className="flex flex-row">
         <div className="text-white my-10 text-sm"> LETS START YOUR JOURNEY!!</div>

        <button className="rounded-xl bg-orange-500 text-white font-bold  px-4 py-3 hover:bg-indigo-600 hover:text-white mx-[20px] my-6" onClick={makeReservation}>BOOK FOR NOW</button>
        </div>
        </div>

        {/* <div className="bg-black w-full h-[30px] px-2 m-0"></div> */}

     </div>
     
    );
}