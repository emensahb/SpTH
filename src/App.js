import React from 'react'
import jsonData from './data.json'

// console.log(data)
function App() {
  let Tag="" 
  const data = JSON.parse(JSON.stringify(jsonData))
  const [formData, setFormData] = React.useState({})


  function handleSubmit(event) {
    console.log(event)
    event.preventDefault()
    
  }


  function handleChange(event) {
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }
      }
      
      )
     
    }

  
    function needsParentalConsent(){
      const dob = formData.date_of_birth
      if (dob){
        const now = new Date();
        return new Date(dob) >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
      }
  
    }



  const fullForm = data.map(e => { 
    Tag = e.tag
    const required =  e.required === "true" ? true :false


  

    return (
        <>
            
            <label htmlFor={e.human_label}>{e.human_label}</label>
            <Tag
                key={e.name}
                type={e.type}
                placeholder={e.placeholder}
                name={e.name}
                required={required}
                conditional={e.conditional}
                checked={needsParentalConsent()}
                value={data.name}
                className={e.className}
                onChange={handleChange}
            />
           
        </>
    )
  })

return (
    <div className="form-container">
        <h1>Personal Information</h1>
        <form className="form" onSubmit={handleSubmit}>
          {fullForm} 
          <button className="form--submit">Submit</button>
        </form>
        
    </div>
)

}



export default App; 



