import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { fetchCategories } from "../../redux/apiCalls/categoriesApicall";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
    const sidebarRef = useRef(null);
    const dispatch = useDispatch();

    // تحديد حجم الشاشة
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) setIsOpen(true);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // جلب التصنيفات تلقائيًا على الشاشات الكبيرة
    useEffect(() => {
        dispatch(fetchCategories());
        if (!isMobile) setIsOpen(true);
    }, [dispatch, isMobile]);

    const categories = useSelector((state) => state.categories.categories);

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    // إغلاق القائمة عند النقر خارجها (للشاشات الصغيرة فقط)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobile]);

    return (
        <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`} ref={sidebarRef}>
            {/* زر التبديل يظهر فقط على الشاشات الصغيرة */}
            {isMobile && (
                <div className="sidebar-toggle" onClick={toggleSidebar}>
                    {isOpen ? (
                        <i className="bi bi-chevron-right"></i>
                    ) : (
                        <i className="bi bi-chevron-left"></i>
                    )}
                </div>
            )}

            {/* محتوى الـ Sidebar */}
            {isOpen && (
                <ul className="sidebar-links">
                    <h1>Filter</h1>
                    <hr />
                    {categories?.map((category, index) => (
                        <li key={index}>
                            <Link
                                className="sidebar-link"
                                to={`/posts/category/${category.text}`}
                                onClick={() => isMobile && setIsOpen(false)}
                            >
                                {category.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Sidebar;