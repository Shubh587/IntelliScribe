import {ComprehendMedicalClient, DetectEntitiesV2Command} from "@aws-sdk/client-comprehendmedical";
import {fromIni} from "@aws-sdk/credential-providers";

async function extractMedicalData(text) {  // extracts diseases from the given conversation text
    var params = {
        Text: text
    }

    const client = new ComprehendMedicalClient({
        credentials: fromIni({profile: 'intelliscribe'}),
        config: fromIni({profile: 'intelliscribe'})
    });

    const command = new DetectEntitiesV2Command(params);
    const data = await client.send(command);
    
    var medical_history = ""; 
    var symptoms = "";
    var medications = "";

    for (const entity of data["Entities"]) { 
        if (entity["Category"] == "MEDICAL_CONDITION") {
            symptoms += entity["Text"] + " ";
        } else if (entity["Category"] == "MEDICATION") {
            medications += entity["Text"] + " ";
        } else if (entity["Category"] == "TEST_TREATMENT_PROCEDURE") {

            medical_history += entity["Text"] + " ";
        }
        console.log("\n")
    }

    return {
        medical_history: medical_history,
        symptoms: symptoms,
        medications: medications
    }
};


export {extractMedicalData}