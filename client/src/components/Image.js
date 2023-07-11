import React,{useState, useEffect} from 'react'

const Image = (props) => {
    const [imageSrc, setImageSrc] = useState('')

    useEffect(() => {
        const reader = new FileReader()
        reader.readAsDataURL(props.blob);
        reader.onloadend = function () {
            setImageSrc(reader.result)
        }
    }, [file])

  return (
    <img style={{width: '100%', height: 'auto', maxWidth:"20%"}} src={imageSrc} alt='An uploaded image'/>
  )
}

export default Image