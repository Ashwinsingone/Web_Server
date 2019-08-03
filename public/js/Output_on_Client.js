const addressForm = document.querySelector('form')

const temperature_index = document.querySelector('#temperature_index')
const location_index = document.querySelector('#location_index')

addressForm.addEventListener('submit', (e) => {
    e.preventDefault()
   
    const search = document.querySelector('input')
    
    fetch('http://localhost:3000/pinpoint?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if(data.error)
            {
                return location_index.textContent= data.error
            }
            else if(data ==[])
            {
                return location_index.textContent= 'Enter a valid address'
            }
        
            temperature_index.textContent= data.forecast
            location_index.textContent ='Location: ' + data.geocode.location
        })
    }) 
    
})
