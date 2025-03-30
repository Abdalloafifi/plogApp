import { useState } from "react";
import { toast } from "react-toastify";
import {   useDispatch } from "react-redux"
import { createCategoryAdmin} from "../../redux/apiCalls/categoriesApicall"

const AddCategoryForm = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '') return toast.error("title is empty");
        dispatch(createCategoryAdmin({ text: title }));
        console.log(title);
        setTitle('');
    }
    return (
        <div className="add-category">
            <h6 className="add-category-title">
                Add New Category
            </h6>
            <form
            onSubmit={handleSubmit}
            className="add-category-form">
                <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Category Name"
                    className="add-category-input" />
                <button type="submit" className="add-category-button">Add Category</button>
            </form>
        </div>
    );
}

export default AddCategoryForm;