import axios from 'axios'

const uploadImage = async ( file ) => {
    if ( !file ) return

    try {
        const formData = new FormData()
        formData.append('upload_preset', 'curso-vue')
        formData.append('file',file)

        const url = 'https://api.cloudinary.com/v_1/dvvqbwhcc/image/upload'
        const { data } = await axios.post(url, formData)

        return data.secure_url
    } catch ( error ) {
        return null
    }

}

export default uploadImage;