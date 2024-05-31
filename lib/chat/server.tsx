'use server'
import axios from 'axios';



export async function submitMessage(msg: string, cId: string) {

    const req = {
        text: msg,
        conversationId: cId
    }
    let isCall = 1;
    if (msg === "Is there a State Mandate Applicability for Diabetes for Individual Plans in Texas?") {
      await delay(1500);
      return {
        response: `Yes, please visit http://localhost:3000/Texas%20-Mandated%20Beneifits%20%20-%20manhealthben.pdf then go to page 6`
      }
    }
    if (msg === "How about for Small Group Plans?") {
      await delay(1500);
      return {
        response: "No"
      }
    }

    if (msg === "Can I get the State Law Sources for Diabetes on Texas?") {
      await delay(1500);
      return {
        response: `Yes, please visit http://localhost:3000/Texas%20-Mandated%20Beneifits%20%20-%20manhealthben.pdf then go to page 6`
      }
    }

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

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}