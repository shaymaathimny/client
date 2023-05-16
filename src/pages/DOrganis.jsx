import { setId } from '@material-tailwind/react/components/Tabs/TabsContext'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import '../css/DOrganis.css';
import * as yup from "yup";
import { useFormik } from "formik";
let schema = yup.object().shape({
  titre: yup.string().required("Titre est Required"),
  nom: yup.string().required("nom is Required"),
  heure: yup.mixed().required('Required'),
});

const DOrganis = () => {
  const user = useSelector((state) => state.user.userInfo)
  const [id, setId] = useState(user?._id)
  const [name, setname] = useState(user?.name)

  const [titre, settitre] = useState('')
  const [description, setdescription] = useState('')
  const [dateDebut, setdateDebut] = useState('')
  const [dateFin, setdateFin] = useState('')
  const [heure, setheure] = useState('')
  const [lieu, setlieu] = useState('')
  const [prix, setprix] = useState('')
  const [particularite, setparticularite] = useState('')
  const [nombreMax, setNombreMax] = useState('')
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('')
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    try {
      const cat = axios.get('http://localhost:5000/category/getAllCategorie')
      cat.then((res) => {
        setCategories(res.data)
      })
      console.log(categories)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleSubmit = async (e) => {
    const data = {
      titre,
      description,
      dateDebut,
      dateFin,
      heure,
      lieu,
      prix,
      particularite,
      nombreMax,
      name,
      categoryId: category,
    }
    console.log('object', data)
    e.preventDefault()
    try {
      const dat = await axios.post(
        'http://localhost:5000/even/newEvenement',
        data,
      )
      console.log(dat)
      setActive(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMessage = async (e) => {
    e.preventDefault()

    try {
      const data = await axios.post(
        'http://localhost:5000/message/create_message',
        {
          message,
          userId: user?._id,
        },
      )
      console.log(data)
      setActive(true)
    } catch (error) {
      console.log(error)
    }
    console.log(user._id)
  }
  const formik = useFormik({
    initialValues: {
      titre: "",
      nom: "",
      heure: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("heu",values)
    },
  });
  return (
    <div>
      {user.role !== 'user' ? (
        <>
          {visible ? (
            <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
              <div className="h-16 flex items-center justify-center">
                <h1 className="text-2xl font-bold">My App</h1>
              </div>
              <div className="flex-grow p-4">
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="block p-2 rounded hover:bg-gray-700">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block p-2 rounded hover:bg-gray-700">
                      Catégories
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block p-2 rounded hover:bg-gray-700">
                      Settings
                    </a>
                  </li>
                </ul>
                <button onClick={() => setVisible(false)}>click me</button>
              </div>
              <div className="flex-2 p-12">hiiiiii</div>
            </div>
          ) : (
            <section class="main-section flex items-center justify-center h-screen">
              <div class="main">
                <div class="form-container">
                  
                  <div class="signup-form">
                    <form
                    onSubmit={formik.handleSubmit}
                      class="register-form"
                      id="register-form"
                    >
                      <div class="form-row">
                        <div class="form-group">
                          <div class="form-input">
                            <label
                              class="block text-gray-700 font-bold mb-2"
                              for="titre"
                            >
                              Titre de l'événement :
                            </label>
                            <input
                              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="titre"
                              type="text"
                              placeholder="Titre"
                              style={{borderColor: `${(formik.touched.titre && formik.errors.titre)? '#f00' : '#ebebeb'}`}}
                              onChange={formik.handleChange("titre")}
                              name='titre'
            onBlur={formik.handleBlur("titre")}
            value={formik.values.titre}
                            />
                            <div className="error">
            {formik.touched.titre && formik.errors.titre}
          </div>
                          </div>
                          <div class="form-input">
                            <label
                              class="block text-gray-700 font-bold mb-2"
                              for="nom"
                            >
                              Nom d'organisateur :
                            </label>
                            <input
                              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="titre"
                              type="text"
                              placeholder="Titre"
                              style={{borderColor: `${(formik.touched.nom && formik.errors.nom)? '#f00' : '#ebebeb'}`}}
                              onChange={formik.handleChange("nom")}
                              name='nom'
            onBlur={formik.handleBlur("nom")}
            value={formik.values.nom}
                            />
                            <div className="error">
            {formik.touched.nom && formik.errors.nom}
          </div>
                          </div>
                          <div class="form-input">
                            <label
                              class="block text-gray-700 font-bold mb-2"
                              for="date"
                            >
                              Date debut de l'événement :
                            </label>
                            <input
                              value={dateDebut}
                              onChange={(e) => setdateDebut(e.target.value)}
                              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="date"
                              type="date"
                            ></input>
                          </div>
                          <div class="form-input">
                            <label
                              class="block text-gray-700 font-bold mb-2"
                              for="date"
                            >
                              Date fin de l'événement :
                            </label>
                            <input
                              value={dateFin}
                              onChange={(e) => setdateFin(e.target.value)}
                              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="date"
                              type="date"
                            ></input>
                          </div>
                          <div class="form-input">
                            <label
                              class="block text-gray-700 text-sm font-bold mb-2"
                              for="location"
                            >
                              Lieu
                            </label>
                            <input
                              value={lieu}
                              onChange={(e) => setlieu(e.target.value)}
                              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="location"
                              type="text"
                              placeholder="Entrez le lieu de l'événement"
                            />
                          </div>
                          <div class="form-input">
                            <label
                              class="block text-gray-700 font-bold mb-2"
                              for="heure"
                            >
                              Heure de l'événement :
                            </label>
                            <input
                              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="heure"
                              type="time"
                              style={{borderColor: `${(formik.touched.heure && formik.errors.heure)? '#f00' : '#ebebeb'}`}}
                              onChange={formik.handleChange("heure")}
                              name='heure'
            onBlur={formik.handleBlur("heure")}
            value={formik.values.heure}
                            />
                            <div className="error">
            {formik.touched.heure && formik.errors.heure}
          </div>
                          </div>
                        </div>
                        <div class="form-group">
                          
                          <div class="form-input">
                            <label
                              class="block text-gray-700 text-sm font-bold mb-2"
                              for="max-participants"
                            >
                              Nombre maximum de participants
                            </label>
                            <input
                              value={nombreMax}
                              onChange={(e) => setNombreMax(e.target.value)}
                              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="max-participants"
                              type="number"
                              placeholder="Entrez le nombre maximum de participants"
                            />
                          </div>
                          <div class="form-input">
                            <label
                              class="block text-gray-700 text-sm font-bold mb-2"
                              for="category"
                            >
                              Catégorie
                            </label>
                            <div class="relative">
                              <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                id="category"
                              >
                                <option value="">
                                  Choisissez une catégorie
                                </option>
                                {categories?.map((item, index) => (
                                  <option key={index} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                  class="fill-current h-4 w-4"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6l-6 6z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div class="form-input">
  <label for="particularites" class="block text-gray-700 font-bold mb-2">Particularités:</label>
  <input value={particularite} onChange={(e) => setparticularite(e.target.value)} type="text" id="particularites" name="particularites" class="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500" placeholder="Saisissez les particularités de l'événement"/>
</div>
                          
                          <div class="form-input">
                            <label
                              class="block text-gray-700 font-bold mb-2"
                              for="description"
                            >
                              Description de l'événement :
                            </label>
                            <textarea
                              value={description}
                              onChange={(e) => setdescription(e.target.value)}
                              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="description"
                              placeholder="Description"
                              style={{maxHeight: "75px", minHeight:"75px"}}
                            ></textarea>
                          </div>
                          <div class="form-input">
                            <label for="prix" class="block text-gray-700 font-bold mb-2">
                              Prix :
                            </label>
                            <input
                              value={prix}
                              onChange={(e) => setprix(e.target.value)}
                              type="number"
                              id="prix"
                              name="prix"
                              class="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                              placeholder="Saisissez le prix de l'événement"
                            />
                          </div>
                          <div class="flex items-center form-input">
                            <input
                              id="checkbox-1"
                              type="checkbox"
                              value=""
                              style={{margin: "0 10px 10px 0"}}
                              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              for="checkbox-1"
                              class="block text-gray-700 font-bold mb-2"
                            >
                              I agree to the{' '}
                              <a
                                href="#"
                                class="text-blue-600 hover:underline dark:text-blue-500"
                              >
                                terms and conditions
                              </a>
                              .
                            </label>
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="bg-white p-6 rounded-lg shadow-md">
                            <h2 class="text-lg font-medium mb-4">
                              Télécharger des images
                            </h2>
                            <div class="border-2 border-dashed border-gray-400 p-6">
                              <form
                                action="/upload"
                                method="post"
                                encType="multipart/form-data"
                              >
                                <div class="form-input">
                                  <label
                                    class="block text-gray-700 font-bold mb-2"
                                    for="images"
                                  >
                                    Sélectionner des images
                                  </label>
                                  <input
                                    type="file"
                                    name="images"
                                    id="images"
                                    multiple
                                  />
                                </div>
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                  Télécharger
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{display: "flex",justifyContent: "space-between", alignItems:"center", width: "100%"}}>
               <button class="bg-red-500  text-white font-bold py-2 px-4 rounded" onClick={()=>setVisible(true)}>Retourner</button>
                      <button  type='submit' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:-translate-y-1 hover:scale-110">
  Ajouter
</button>
                      
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <form>
          <input
            type="text"
            placeholder="hahaha"
            value={user?._id}
            defaultValue={user?._id}
            hidden={true}
          />
          <input
            type="text"
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
          />

          {active ? (
            <button style={{ color: 'green', backgroundColor: 'green' }}>
              Submit
            </button>
          ) : (
            <button type="submit" onClick={handleMessage}>
              Submit
            </button>
          )}
        </form>
      )}
    </div>
  )
}

export default DOrganis
