'use server'
import axios from 'axios';


export async function submitMessage(msg: string, cId: string) {

    const req = {
        text: msg,
        conversationId: cId
    }
    let isCall = 1;
    const { data } = await axios.post('http://localhost:3001/api/mandy/send', req, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        if( isCall === 1) {
            isCall = isCall + 1;
            return response;
        }
        
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });

    return data;
}
