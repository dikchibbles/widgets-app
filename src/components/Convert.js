import React, { useEffect, useState } from "react";
import axios from "axios";

const Convert = ({ language, text }) => {
    const [translations, setTranslations] = useState([{translatedText: 'hello'}]);
    const [debouncedTerm, setDebouncedTerm] = useState(text)

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setDebouncedTerm(text)
        }, 2000)

        return () => {
            clearTimeout(timeoutID)
        }
    }, [text])

    useEffect(() => {
        const translate = async () => {
            const encodedParams = new URLSearchParams();
            encodedParams.append("q", debouncedTerm);
            encodedParams.append("target", language.value);

            const options = {
                method: 'POST',
                url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '4122f3483amsh58a4641df90e077p13dbeejsn7d92b5bcd947',
                    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
                },
                data: encodedParams
            };

            const response = await axios.request(options);
            setTranslations(response.data.data.translations);
        }
        translate();
       
    }, [language, debouncedTerm])

    return (
        <div>{translations[0].translatedText}</div>
    )

}

export default Convert;

