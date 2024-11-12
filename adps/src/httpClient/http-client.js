// Author: Charlotte Fehlhauer
import {useNavigate, navigate} from "react";
import { redirect } from "react-router-dom";

// HttpClient Implementation
export class HttpClient {
  baseURL;

  init(baseURL) {
    this.baseURL = baseURL;
  }

  //GET-REQUESTS
  //Get Request, which require Authorization
  async get(link) {
    // Retrieve the token from localStorage
    const token = sessionStorage.getItem('token'); 
  
    const response = await fetch(`${this.baseURL}/${link}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    });
  
    return this.result(response);
  }

  //Get Request, which don't require Authorization
  async getNoAuth(link) {
    const response = await fetch(`${this.baseURL}/${link}`, {
      method: 'GET',
    });
    return this.result(response);
  }

  //Get-Request containing a specific id but don't need Authentication
  async getWithIdNoAuth(link, id) {
    const response = await fetch(`${this.baseURL}/${link}/${id}`, {
      method: 'GET',
    });
    
    return this.result(response);
  }

  //Get-Request containing a specific id
  async getWithId(link, id) {
    // Retrieve the token from localStorage
    const token = sessionStorage.getItem('token'); 
  
    const response = await fetch(`${this.baseURL}/${link}/${id}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`
      },
    });
    
    return this.result(response);
  }

  //POST - Requests
  //Post Sign-Up/Login Data and retreive token
  async postAuth(link, data) {
    const response = await fetch(`${this.baseURL}/${link}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }); 

    const responseData = await this.result(response);
    sessionStorage.setItem('authToken', responseData.authToken);
    return responseData;
}
  //POST - Request
  async post(link, data) {
    // Retrieve the token from localStorage
    const token = sessionStorage.getItem('token'); 
  
    const response = await fetch(`${this.baseURL}/${link}`, {
      method: 'POST',
      headers: { 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify(data),
      },
    });
  
    return this.result(response);
  }

  //Post - Request with ID
  async postPicture(link, id, data) {
    // Retrieve the token from localStorage
    const token = sessionStorage.getItem('token'); 
  
    const response = await fetch(`${this.baseURL}/${link}/${id}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    
    return this.result(response);
  }
  
  //Put - Request containing a specific id
  async put(link, id, data) {
    // Retrieve the token from localStorage
    const token = sessionStorage.getItem('token'); 
  
    const response = await fetch(`${this.baseURL}/${link}/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    
    return this.result(response);
  }

  //Put - Request containing a specific id
  async delete(link, id) {
    // Retrieve the token from localStorage
    const token = sessionStorage.getItem('token'); 
  
    const response = await fetch(`${this.baseURL}/${link}/${id}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    return this.result(response);
  }

  

    async result(response) {

    if (response.ok) {
      console.log(response)
      return response.json();}
    const message = await response.json();

    const errorMsg = JSON.parse(message)?.message || response.statusText;
    return Promise.reject({ message: errorMsg, statusCode: response.status });
  }
} 

