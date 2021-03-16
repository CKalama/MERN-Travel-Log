import React from "react";
import { useForm } from "react-hook-form"; 

const LogEntryForm = () => {
    //These are special to react-hook-form. 
    //register will need to be registered to our entire form, need to do on inputs and textareas, it will take the name and create an object of all the data. 
    const { register, handleSubmit, watch, errors } = useForm();

    //Gives us access to the data on the form. This will also be the data we are sending to our backend server!
    const formSubmit = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(formSubmit)} className="entry-form">

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

            <button>Submit Your Travel Location!</button>
        </form>
    );
};

export default LogEntryForm;





//return (
//     <div>
            
//     </div>
// )