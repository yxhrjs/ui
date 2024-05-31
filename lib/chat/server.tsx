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
        response: `Yes, Texas has State Mandate Applicability for Diabetes for Individual Plans.`
      }
    }
    if (msg === "How about for Small Group Plans?") {
      await delay(1500);
      return {
        response: `No, Texas doesn't offer State Mandate Applicability for Diabetes for Small Group Plans.`
      }
    }

    if (msg === "Can I get the State Law Sources for Diabetes on Texas?") {
      await delay(1500);
      return {
        response: `Yes, please visit http://localhost:3000/Texas%20-Mandated%20Beneifits%20%20-%20manhealthben.pdf then go to page 6`
      }
    }

    if (msg === "What's the Consumer Choice Plans for Texas?") {
      await delay(1500);
      return {
        response: `please visit page 2 of http://localhost:3000/Texas%20-Mandated%20Beneifits%20%20-%20manhealthben.pdf `
      }
    }

    if (msg === 'How to know if my plan is a "grandfathered" plan?') {
      await delay(1500);
      return {
        response: `If your health plan has been the same since before March 23, 2010 (when Congress passed the ACA), your plan might be
        “grandfathered” and exempt from some federal mandates. Additionally, some plans issued prior to 2014 are exempt from
        EHB requirements under a transitional policy (https://www.tdi.texas.gov/health/faqs.html#transitionalrenewal).`
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