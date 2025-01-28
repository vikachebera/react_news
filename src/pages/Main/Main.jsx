import styles from './styles.module.css';
import NewsBanner from "../../commponents/NewsBanner/NewsBanner.jsx";
import {useEffect, useState} from "react";
import {getCategories, getNews} from "../../api/apiNews.js";
import NewsList from "../../commponents/NewsList/NewsList.jsx";
import Skeleton from "../../commponents/Skeleton/Skeleton.jsx";
import Pagination from "../../commponents/Pagination/Pagination.jsx";
import Categories from "../../commponents/Categories/Categories.jsx";
import Search from "../../commponents/Search/Search.jsx";
import {useDebounce} from "../../commponents/helpers/hooks/useDebounce.js";

const Main = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [keywords, setKeywords] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedKeywords =useDebounce(keywords, 1500);
    const totalPages = 10;
    const pageSize = 10;

    const fetchNews = async (currentPage) => {
        try {
            setIsLoading(true);
            const resp = await getNews(
                {
                    page_number: currentPage,
                    page_size: pageSize,
                    category: selectedCategory === "All" ? null : selectedCategory,
                    keywords: keywords,
                }
            )
            setNews(resp.news)
            setIsLoading(false);
        } catch (e) {
            console.log(e);
        }
    };
    const fetchCategories = async () => {
        try {
            const resp = await getCategories(); // Виклик правильної функції
            setCategories(["All", ...resp.categories]);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchNews(currentPage, debouncedKeywords);

    }, [currentPage, selectedCategory,debouncedKeywords])

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    return (
        <main className={styles.main}>
            <Categories category={categories} setSelectedCategory={setSelectedCategory}
                        selectedCategory={selectedCategory}/>
            <Search keywords={keywords} setKeywords={setKeywords}/>

            {news.length > 0 && !isLoading ? <NewsBanner item={news[0]}/> : (<Skeleton type={'banner'} count={1}/>)}
            <Pagination handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        handlePageClick={handlePageClick}
                        currentPage={currentPage}
                        totalPages={totalPages}/>
            {!isLoading ? <NewsList news={news}/> : <Skeleton type={'item'} count={10}/>}

            <Pagination handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage}
                        handlePageClick={handlePageClick}
                        currentPage={currentPage}
                        totalPages={totalPages}/>
        </main>
    )
}

export default Main;