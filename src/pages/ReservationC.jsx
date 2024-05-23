import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/Reservation.css' // 커스텀 CSS 파일 import
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import {
  InputText,
  InputPhoneNumber,
  InputEmail,
} from '../components/form/Input'
import { useInput } from '../hooks/useInput'
import parseDate from '../utils/parseDate'
import { useNavigate } from 'react-router-dom'

// const Step2 = ({ onNext }) => {
//   const [name, handleNameChange] = useInput('')
//   const [contact, handleContactChange] = useInput('')
//   const [email, handleEmailChange] = useInput('')
//   const [etc, handleEtcChange] = useInput('')

//   const handleNext = () => {
//     onNext({ name, contact, email, etc })
//   }

//   return (
//     <div>
//       <BackButton />
//       <h1 className="font-bold pt-5 pl-5">예약자 정보를 입력해주세요.</h1>
//       <div className="flex flex-col space-y-4 p-5">
//         <InputText
//           title="예약자"
//           placeholder="현지수"
//           value={name}
//           onChange={handleNameChange}
//         />
//         <InputPhoneNumber value={contact} onChange={handleContactChange} />
//         <InputEmail value={email} onChange={handleEmailChange} />
//         <label htmlFor="text">
//           <p>요청사항</p>
//           <textarea
//             name="etc"
//             placeholder="요청사항"
//             value={etc}
//             onChange={handleEtcChange}
//             className="border border-gray-300 rounded p-2 resize-none h-24"
//           ></textarea>
//         </label>
//       </div>
//       <Button
//         type="button"
//         onClick={handleNext}
//         text="등록 완료하기"
//         status={!name || !contact || !email || !etc ? 'disabled' : undefined}
//       />
//     </div>
//   )
// }

// const Step3 = ({ formData }) => {
//   const navigate = useNavigate()

//   const handleSubmit = () => {
//     // 서버에 데이터 전송하는 로직 추가
//     console.log('서버에 전송할 데이터:', formData)

//     // 응답이 성공적일 경우 로컬스토리지에 데이터 저장
//     localStorage.setItem('reservationData', JSON.stringify(formData))
//     navigate('/usersuccess') // 성공 페이지로 라우팅
//   }

//   // Step3는 자동으로 handleSubmit을 실행합니다.
//   React.useEffect(() => {
//     handleSubmit()
//   }, [])

//   return <div>Submitting...</div>
// }

export default function Reservation() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})

  const handleNext = data => {
    setFormData(prevData => {
      const newData = { ...prevData, ...data }
      console.log('폼 데이터:', newData) // 서버에 보낼 데이터 콘솔 확인
      return newData
    })
    setStep(step + 1)
  }

  return (
    <div>
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Step3 formData={formData} />}
    </div>
  )
}