import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);
    const [debouncedTerm, setDebouncedTerm] = useState(term)

    const onInputChange = (e) => {
        setTerm(e.target.value)
    }

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000)

        return () => {
            clearTimeout(timeoutID)
        }
    }, [term])

    useEffect(() => {
        const searchWiki = async () => {
            const {data} = await axios.get(`https://en.wikipedia.org/w/api.php`, {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm,
                }
            })
            setResults(data.query.search);
        };
        searchWiki();

    }, [debouncedTerm])

    const renderedResults = results.map(result => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org/?curid=${result.pageid}`}>Go</a>
                </div>
                <div className="content">
                    <div className="header">{result.title}</div>
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="ui field">
                    <label>Search</label>
                    <input className="input" type="text" onChange={onInputChange} value={term}></input>
                </div>    
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    )
}

export default Search;




