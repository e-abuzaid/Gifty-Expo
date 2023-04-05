import { calculateAge } from "../utils"

const baseUrl = 'https://gifty-5tpp.onrender.com'
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dhhudmiry/upload"
const amazonUrl = "https://amazon-web-scraping-api.p.rapidapi.com/products/search"
const rapidApiKey = "86f5af10d1msh808640d48e627cfp1a1aa7jsn81b95fad4722"
const uploadPreset = "iwqvfgdz"



export const getPeople = async () => {
    const response = await fetch(`${baseUrl}/person/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result.data
    }
}

export const getPerson = async (id) => {
    const response = await fetch(`${baseUrl}/person/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result
    }
}

export const createPerson = async (person) => {
    const response = await fetch(`${baseUrl}/person/`, {
        method: 'POST',
        body: JSON.stringify(person),
        headers: {
            'Content-Type': "application/json"
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result
    }
}

export const deletePerson = async (id) => {
    const response = await fetch(`${baseUrl}/person/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result
    }
}


export const getEvent = async (id) => {
    const response = await fetch(`${baseUrl}/event/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result
    }
}

export const getEvents = async () => {
    const response = await fetch(`${baseUrl}/event/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result.data
    }
}

export const createEvent = async (event) => {
    const response = await fetch(`${baseUrl}/event/`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
            'Content-Type': "application/json"
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result
    }
}

export const updateEvent = async (event, id) => {
    const response = await fetch(`${baseUrl}/event/${id}`, {
        method: 'PUT',
        body: JSON.stringify(event),
        headers: {
            'Content-Type': "application/json"
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result
    }
}

export const deleteEvent = async (id) => {
    const response = await fetch(`${baseUrl}/event/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result
    }
}

export const uploadImage = async (image) => {
    let base64Img = `data:image/jpg;base64,${image}`
    let data = {
        "file": base64Img,
        "upload_preset": uploadPreset
    }
    const response = await fetch(cloudinaryUrl, {
        body: JSON.stringify(data),
        headers: {
            'content-type': "application/json"
        },
        method: 'POST'
    })
    const result = await response.json()
    return result.secure_url
}

export const generateQueries = async (event, person) => {
    const age = calculateAge(person)
    const prompt =
        `only the titles for a ${event.name} gift
        that is a product and can be purchased online
        for my ${age}-year-old ${person.relationship}
        who is a ${person.gender} ${person.occupation}
        and is interested in
        ${person.interests.length === 1 ? person.interests[0] : person.interests.length > 1 ? person.interests.join(',') : ``}`
        const response = await fetch(`${baseUrl}/openai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt: prompt}),
        })
        if (response.ok) {
            const result = await response.json()
            return result
        }
}

export const getProducts = async (query) => {
  const response = await fetch(`${amazonUrl}?criteria=${query}&page=1&countryCode=EG&languageCode=EN`, {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'amazon-web-scraping-api.p.rapidapi.com'
      }
  })
  if (response.ok) {
    const result = await response.json()
    return result
  }
}

export const fetchProducts = async () => {
    const response = await fetch(`${baseUrl}/product/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result.data
    }
}

export const createProduct = async (product) => {
    const response = await fetch(`${baseUrl}/product/`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': "application/json"
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result
    }
}


export const deleteProduct = async (id) => {
    const response = await fetch(`${baseUrl}/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        }
    })
    if (response.ok) {
        const result = await response.json()
        return result
    }
}