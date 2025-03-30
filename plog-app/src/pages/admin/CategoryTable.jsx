import AdminSidebar from "./AdminSidebar";
import { useEffect } from "react";
import "./Admin.css";
import { useSelector , useDispatch } from "react-redux"
import {fetchCategories} from "../../redux/apiCalls/categoriesApicall"
const CategoryTable = () => {
    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();
            useEffect(() => {
                dispatch(fetchCategories());

                window.scrollTo(0, 0);
            },[dispatch]);
    return (
        <section className="table-container">
            <AdminSidebar />
            <div className="category-table">
                <table className="category-table-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Category Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category._id}</td>
                                <td>{category.text}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default CategoryTable;
