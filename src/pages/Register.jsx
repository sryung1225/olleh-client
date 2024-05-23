import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Button from '../components/Button'
import TextArea from '../components/form/TextArea'
import { InputEmail, InputText } from '../components/form/Input'
import { categories } from '../constants/categories'
import DatePicker from 'react-datepicker'
import { addDays, addMonths } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import parseDate from '../utils/parseDate'
import { useInput } from '../hooks/useInput'
import InputImage from '../components/form/InputImage'
import Location from '../components/Location'
import { useNavigate } from 'react-router-dom'

const Step1 = ({ onNext }) => {
  const categoryEntries = Object.entries(categories)
  const [category, setCategory] = useState('')
  const handleCategoryChange = e => {
    setCategory(e.target.value)
  }
  const handleNext = () => {
    onNext({ category })
  }
  return (
    <section className="flex flex-col">
      <Title
        mainText={'어떤 프로그램인가요?'}
        subText={'프로그램의 성격을 알려주세요.'}
      />
      <div className="grid grid-cols-2 gap-[16px] mb-[40px]">
        {categoryEntries.map(([key, item]) => (
          <label
            key={key}
            className={`relative drop-shadow-md flex flex-col gap-[12px] justify-center items-center h-[158px] bg-[#F6F6F6] rounded-lg ${category === key ? 'border-[1px] border-black' : ''}`}
          >
            <input
              type="radio"
              name="category"
              value={key}
              checked={category === key}
              onChange={handleCategoryChange}
              className="a11yHidden"
            />

            {category === key && (
              <img
                src="/src/assets/i-select.svg"
                className="absolute top-[10px] right-[10px]"
              />
            )}
            <img alt={item.name} src={item.img} className="w-[84px] h-[84px]" />
            <span className="text-[14px]">{item.name}</span>
          </label>
        ))}
      </div>
      {category && <Button type="button" onClick={handleNext} text="다음" />}
    </section>
  )
}

const Step2 = ({ onNext }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const onChange = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  const handleNext = () => {
    if (startDate && endDate) {
      const start = parseDate(startDate)
      const end = parseDate(endDate)
      onNext({ start, end })
    }
  }
  return (
    <section className="flex flex-col relative">
      <Title
        mainText={'일멍님! 공간이 비어있는 기간을 알려주세요.'}
        subText={'대여 가능한 범위를 설정해주세요.'}
      />
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        maxDate={addMonths(new Date(), 5)}
        excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
        selectsRange
        inline
      />
      <Button
        type="button"
        onClick={handleNext}
        text="다음"
        status={!startDate || !endDate ? 'disabled' : undefined}
      />
    </section>
  )
}

const Step3 = ({ onSubmit }) => {
  const [name, handleName] = useInput('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useInput('')
  const [photos, setPhotos] = useState([])
  const [email, handleEmail] = useInput('')
  const handleSubmit = () => {
    onSubmit({ name, address, description, photos, email })
  }
  return (
    <section className="flex flex-col">
      <Title mainText={'공간의 상세 정보를 입력해주세요.'} />
      <InputText
        title={'빈 공간의 이름을 알려주세요.'}
        value={name}
        onChange={handleName}
      />
      <Location address={address} setAddress={setAddress} />
      <TextArea
        title={'공간을 소개해주세요.'}
        value={description}
        onChange={setDescription}
      />
      <InputImage photos={photos} setPhotos={setPhotos} />
      <InputEmail value={email} onChange={handleEmail} />
      <Button type="button" onClick={handleSubmit} text="등록 완료하기" />
    </section>
  )
}

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})
  const handleNext = data => {
    setFormData(prevData => {
      const newData = { ...prevData, ...data }
      return newData
    })
    setStep(step + 1)
  }
  const handleSubmit = data => {
    setFormData(prevData => {
      const newData = { ...prevData, ...data }
      return newData
    })
    console.log(formData)
    navigate('/ownersuccess')
  }
  useEffect(() => {
    console.log('폼 업뎃!', formData)
  }, [formData])

  return (
    <main className="px-[20px]">
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Step3 onSubmit={handleSubmit} />}
    </main>
  )
}
