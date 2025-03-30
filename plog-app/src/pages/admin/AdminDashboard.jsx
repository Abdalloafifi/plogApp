import"./Admin.css"
import AdminMain from "./AdminMain";
import AdminSidebar from "./AdminSidebar";
import { useEffect } from "react";

const AdminDaxhboard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <section className="admin-dashoard">
            <AdminSidebar />
            <AdminMain />
        </section>
    );
}

export default AdminDaxhboard;