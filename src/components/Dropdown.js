import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ selection, options, onSelectedChange, label }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) {
                return;
            }
            setOpen(false)
        };

        document.body.addEventListener('click', (event) => onBodyClick, {capture: true})

        return () => {
            document.body.removeEventListener('click', onBodyClick, {capture: true})
        }
    }, [])

    const renderedOptions = options.map(option => {
        if (option.value === selection.value) {
            return null;
        }

        return (
            <div 
                key={option.value} 
                className="item"
                onClick={() => { onSelectedChange(option) }}
            >
                {option.label}
            </div>
        );
    });
    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div onClick={ () => setOpen(!open) } className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selection.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;




