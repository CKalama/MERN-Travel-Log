import React from "react"; 

const LogEntryForm = () => {
    return (
        <form className="entry-form">
            <label for="title">Title</label>
            <input name="title" required/>
            <br />
            
            <label for="comments">Comments</label>
            <textarea name="comments" rows={3}/>
            <br />

            <label for="description">Description</label>
            <textarea name="description" rows={3}/>
            <br />

            <label for="image">Image</label>
            <input name="image" />
            <br />

            <label for="visitDate">Visited Date</label>
            <input name="visitDate" type="date" />
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