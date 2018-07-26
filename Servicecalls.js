import React from "react";
import axios from 'axios';
//import { reactLocalStorage } from 'reactjs-localstorage';

export default class Servicecalls {

  async requestPost(url, data, headers) {
   console.log('Request URL >>>',  url);
   console.log('Data >>>', data);
    var responseData;
    await axios.post(url, data, headers)
    .then(response => {
      this.responseData = response.data;
      console.log('response Data>>>', this.responseData);
    }).catch(error => {
    });
    return this.responseData;
  }

  async requestPostWithURLEncoded(url, data, headers) {
    // console.log('Request URL >>>',  url);
    // console.log('Data >>>', data);
    // console.log('Headers >>>', headers);
    // return data;

     var responseData;
     await axios.post(url, data, headers)
     .then(response => {
       this.responseData = response.data;
       console.log('response Data>>>', this.responseData);
     }).catch(error => {
     });
     return this.responseData;
   }

  async requestGet(url) {
    // Optionally the request above could also be done as
    console.log('Request URL >>>',  url);
    var responseData;
    await axios.get(url)
    .then(response => {
      this.responseData = response.data;
      console.log('response Data>>>', this.responseData);
    }).catch(error => {

    });
    return this.responseData;
 }
//  async requestGetWithAuthentication(url) {
//   // Optionally the request above could also be done as
//   console.log('Request URL >>>',  url);
//   console.log('Auth Token >>>',  reactLocalStorage.get('AuthenticationToken'));
//   var responseData;
//   await axios.get(url,{
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: reactLocalStorage.get('AuthenticationToken')
      
//     }
//   })
//   .then(response => {
//     this.responseData = response.data;
//     console.log('response Data>>>', this.responseData);
//   }).catch(error => {
//     console.log('error Data>>>', error.data);
//   });
//   return this.responseData;
// }


async requestGetWithAuthenticationFormURL(url) {
  // Optionally the request above could also be done as
  console.log('Request URL >>>',  url);
  console.log('Auth Token >>>',  reactLocalStorage.get('AuthenticationToken'));
  var responseData;
  await axios.get(url,{
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: reactLocalStorage.get('AuthenticationToken')
      
    }
  })
  .then(response => {
    this.responseData = response.data;
    console.log('response Data>>>', this.responseData);
  }).catch(error => {
    console.log('error Data>>>', error.data);
  });
  return this.responseData;
}
}