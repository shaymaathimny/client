import { setId } from "@material-tailwind/react/components/Tabs/TabsContext";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const DOrganis = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [id, setId] = useState(user?._id);
  const [name, setname] = useState(user?.name);
  const category = useSelector((state) => state.category);
  const [categoryname, setcategoryname] = useState(category?.name);
  const [titre, settitre] = useState("");
  const [description, setdescription] = useState("");
  const [dateDebut, setdateDebut] = useState("");
  const [dateFin, setdateFin] = useState("");
  const [heure, setheure] = useState("");
  const [lieu, setlieu] = useState("");
  const [prix, setprix] = useState("");
  const [particularite, setparticularite] = useState("");
  const [nombreMax, setNombreMax] = useState("");
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(false); 

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      const dat = await axios.post(
        "http://localhost:5000/even/newEvenement",
        {
      titre,
      description,
      dateDebut,
      dateFin,
      heure,
      lieu,
      prix,
      particularite,
      nombreMax,
      categoryname,
        }
      );
      console.log(dat);
      setActive(true);
    } catch (error) {
      console.log(error);
    }
  };

      
  

  const handleMessage = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        "http://localhost:5000/message/create_message",
        {
          message,
          userId: user?._id,
        }
      );
      console.log(data);
      setActive(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user._id);
  return (
    <div>
      <br />
      <br></br>
      <br></br>
      <br></br>
       <br></br>
       <br></br>
       <br></br>
      
      {user.role !== "user" ? (
        
        
        <section class="flex items-center justify-center h-screen">
  <form class="w-full max-w-md bg-white p-8 rounded-lg shadow-md" >
  <h2 class="text-2xl font-bold mb-4">Ajouter un événement</h2>
  
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="titre">
        Titre de l'événement :
      </label>
      <input value={titre} onChange={(e) => settitre(e.target.value)} class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="titre" type="text" placeholder="Titre"/>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="nom">
        Nom d'organisateur :
      </label>
      <input value={name} onChange={(e) => setname(e.target.value)} class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="titre" type="text" placeholder="Titre"/>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="date">
        Date debut de l'événement :
      </label>
      <input value={dateDebut} onChange={(e) => setdateDebut(e.target.value)} class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date"></input>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="date">
        Date fin de l'événement :
      </label>
      <input value={dateFin} onChange={(e) => setdateFin(e.target.value)} class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date"></input>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="location">
        Lieu
      </label>
      <input value={lieu} onChange={(e) => setlieu(e.target.value)}class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="Entrez le lieu de l'événement"/>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="heure">
        Heure de l'événement :
      </label>
      <input value={heure} onChange={(e) => setheure(e.target.value)} class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="heure" type="time"/>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="max-participants">
        Nombre maximum de participants
      </label>
      <input value={nombreMax} onChange={(e) => setNombreMax(e.target.value)}class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="max-participants" type="number" placeholder="Entrez le nombre maximum de participants"/>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
        Catégorie
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" id="category">
          <option>Choisissez une catégorie</option>
          <option value={categoryname} onChange={(e) => setcategoryname(e.target.value)}></option>
          <option>Culture</option>
          <option>Loisirs</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M10 12l-6-6 1.41-1.41L10 9.17l4.59-4.58L16 6l-6 6z"/></svg>
        </div>
      </div>
    </div>
    <div class="flex items-center mt-4">
  <label for="particularites" class="w-32 mr-5 font-medium">Particularités:</label>
  <input value={particularite} onChange={(e) => setparticularite(e.target.value)} type="text" id="particularites" name="particularites" class="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500" placeholder="Saisissez les particularités de l'événement"/>
</div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="description">
        Description de l'événement :
      </label>
      <textarea  value={description} onChange={(e) => setdescription(e.target.value)}class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description"></textarea>
    </div>
    <div class="flex items-center mt-4">
  <label for="prix" class="w-32 mr-4 font-medium">Prix :</label>
  <input value={prix} onChange={(e) => setprix(e.target.value)}type="number" id="prix" name="prix" class="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500" placeholder="Saisissez le prix de l'événement"/>
</div>
<br></br>
<fieldset>
  <legend class="sr-only">Checkbox variants</legend>
  <div class="flex items-center mb-4">
      <input checked id="checkbox-1" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      <label for="checkbox-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree to the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
  </div>
</fieldset>
<br></br>
<button onSubmit={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:-translate-y-1 hover:scale-110">
  Ajouter
</button>
</form>


 /** =============  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-lg font-medium mb-4">Télécharger des images</h2>
    <div class="border-2 border-dashed border-gray-400 p-6">
      <form action="/upload" method="post" enctype="multipart/form-data">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="images">Sélectionner des images</label>
          <input type="file" name="images" id="images" multiple/>
        </div>
        <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Télécharger
        </button>
      </form>
    </div>
  </div>
</section>
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
            <button style={{ color: "green", backgroundColor: "green" }}>
              Submit
            </button>
          ) : (
            <button onClick={handleMessage}>Submit</button>
          )}
        </form>
        
      )}
    </div>
  );
};

export default DOrganis;
