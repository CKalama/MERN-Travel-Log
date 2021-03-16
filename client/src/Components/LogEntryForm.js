import React from "react";
import {useState} from "react"
import { useForm } from "react-hook-form"; 
import {createLogEntry} from "../API";

//We added this location prop because on App.js we set a requirement that long and lat are needed for the form to be validated. Instead of doing that here, we passed it through a prop that is already doing the work for us in map-gl which will help a lot!
const LogEntryForm = ( { location, onClose } ) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    //These are special to react-hook-form. 
    //register will need to be registered to our entire form, need to do on inputs and textareas, it will take the name and create an object of all the data. 
    const { register, handleSubmit, watch, errors } = useForm();

    //Gives us access to the data on the form. This will also be the data we are sending to our backend server!
    const formSubmit = async (data) => {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const createdEntry = await createLogEntry(data)
            console.log(createdEntry)
            onClose();
        } catch (error) {
            console.error(error)
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(formSubmit)} className="entry-form">
            {/* Ternary Operator that will have error appear or be null depending on sitch */}
            {error ? <h2>{error}</h2> : null}

            <label htmlFor="title">Title</label>
            <input name="title" required ref={register}/>
            <br />
            
            <label htmlFor="comments">Comments</label>
            <textarea name="comments" rows={3} ref={register}/>
            <br />

            <label htmlFor="description">Description</label>
            <textarea name="description" rows={3} ref={register}/>
            <br />

            <label htmlFor="image">Image</label>
            <input name="image" ref={register}/>
            <br />

            <label htmlFor="visitDate">Visited Date</label>
            <input name="visitDate" type="date" required ref={register} />
            <br />

            <button disabled={loading}>{loading ? 'Loading...' : "Submit Your Travel Location!"}</button>
        </form>
    );
};

export default LogEntryForm;





//return (
//     <div>
            
//     </div>
// )